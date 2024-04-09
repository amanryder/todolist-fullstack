export type todo = {
  id: number;
  title: string;
  description: string;
  status: string;
  deadLine: Date;
  rowguid: string;
};

export type props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  deadLine: Date;
  setDeadLine: React.Dispatch<React.SetStateAction<Date>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  handleEdit: () => void;
  setSelectedTodoID: React.Dispatch<React.SetStateAction<string>>;
};
