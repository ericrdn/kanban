export type GroupTasks<TGroup, TCard> = {
  id: string;
  group: TGroup;
  tasks: Tasks<TCard>;
  renderCard: (props: TCard) => JSX.Element;
  renderGroup: (props: TGroup) => JSX.Element;
};

export type Tasks<T> = {
  [key: string]: T[];
};
