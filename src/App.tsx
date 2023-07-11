import { createGlobalStyle } from "styled-components";
import { Kanban } from "./Kanban";
import { GroupTasks } from "./Kanban/types";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const arrayAleatorio = () =>
  Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () =>
    Math.floor(Math.random() * 100)
  );

export interface DataGroup {
  title: string;
}

export interface DataCard {
  title: string;
}

export default function App() {
  const tasks: GroupTasks<DataGroup, DataCard>[] = arrayAleatorio().map(
    (n) => ({
      id: n.toString(),
      group: { title: n.toString() },
      tasks: {
        todo: arrayAleatorio().map((a) => ({ title: a.toString() })),
        do: arrayAleatorio().map((a) => ({ title: a.toString() })),
        block: arrayAleatorio().map((a) => ({ title: a.toString() })),
        done: arrayAleatorio().map((a) => ({ title: a.toString() })),
      },
      renderCard: (props) => <h1>{props.title}</h1>,
      renderGroup: (props) => <h1>{props.title}</h1>,
    })
  );

  const moveItem = (item: DataCard, destination: string): boolean => {
    return true;
  };

  return (
    <>
      <GlobalStyle />
      <Kanban tasks={tasks} moveItem={moveItem} />
    </>
  );
}
