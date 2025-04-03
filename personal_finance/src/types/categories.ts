export const defaultCategories: Category[] = [
  { id: "1", name: "Food", createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Transport", createdAt: new Date(), updatedAt: new Date() },
  { id: "3", name: "Shopping", createdAt: new Date(), updatedAt: new Date() },
  {
    id: "4",
    name: "Entertainment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { id: "5", name: "Other", createdAt: new Date(), updatedAt: new Date() },
];
export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
