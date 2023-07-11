import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card, Column, Content, ScrollArea, Title, TitleGroup } from "./styles";
import { GroupTasks, Tasks } from "./types";

function CardMovable({ children, id, column }: any) {
  return (
    <Draggable key={column + id} draggableId={column + id} index={id}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </Card>
      )}
    </Draggable>
  );
}

export type PropsColumn<T> = {
  id: string;
  tasks: T[];
  renderCard: (props: T) => JSX.Element;
};

function ColumnDroppable<T>({ id, tasks, renderCard }: PropsColumn<T>) {
  return (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <Column ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((item, index) => (
            <CardMovable key={id + index} column={id} id={index}>
              {renderCard(item)}
            </CardMovable>
          ))}
          {provided.placeholder}
        </Column>
      )}
    </Droppable>
  );
}

export type PropsColumns<TGroup, TCard> = {
  index: number;
  groupColumns: GroupTasks<TGroup, TCard>;
  moveItem: (item: TCard, destination: string) => boolean;
  setItems: (itemId: string, tasks: Tasks<TCard>) => void;
};

function Columns<TGroup, TCard>({
  index,
  groupColumns,
  moveItem,
  setItems,
}: PropsColumns<TGroup, TCard>) {
  const { id, group, tasks, renderCard, renderGroup } = groupColumns;

  const columns = Object.entries(groupColumns.tasks);
  return (
    <DragDropContext
      key={"group" + index}
      onDragEnd={(result) => {
        if (!result.destination) return;
        const itemMove = tasks[result.source.droppableId][result.source.index];
        if (moveItem(itemMove, result.destination.droppableId)) {
          const tasksMod = { ...tasks };
          tasksMod[result.source.droppableId].splice(result.source.index, 1);
          tasksMod[result.destination.droppableId].splice(
            result.destination.index,
            0,
            itemMove
          );
          setItems(id, tasksMod);
        }
      }}
    >
      <TitleGroup>{renderGroup(group)}</TitleGroup>
      <Title>
        {columns.map(([key, cards]) => (
          <ColumnDroppable
            key={key}
            id={key}
            tasks={cards}
            renderCard={renderCard}
          />
        ))}
      </Title>
    </DragDropContext>
  );
}

export type PropsKanban<TGroup, TCard> = {
  tasks: GroupTasks<TGroup, TCard>[];
  moveItem: (item: TCard, destination: string) => boolean;
};

export function Kanban<TGroup, TCard>({
  moveItem,
  tasks,
}: PropsKanban<TGroup, TCard>) {
  const [items, setItems] = useState<GroupTasks<TGroup, TCard>[]>(tasks);

  if (!items) return <>No data</>;

  return (
    <Content>
      <Title>
        <Column>
          <Card>A Fazer</Card>
        </Column>
        <Column>
          <Card>Fazendo</Card>
        </Column>
        <Column>
          <Card>Bloqueado</Card>
        </Column>
        <Column>
          <Card>Finalizado</Card>
        </Column>
      </Title>
      <ScrollArea>
        {items.map((groupColumns, index) => (
          <Columns
            key={"group" + index}
            index={index}
            groupColumns={groupColumns}
            moveItem={moveItem}
            setItems={(itemId: string, tasks: Tasks<TCard>) =>
              setItems(
                items.map((items) =>
                  items.id === itemId ? { ...items, tasks } : items
                )
              )
            }
          />
        ))}
      </ScrollArea>
    </Content>
  );
}
