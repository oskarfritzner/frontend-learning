export type TransactionType = "income" | "expense" | "transfer";

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  date: Date;
  description: string;
  categoryId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
};

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type TransactionFilter = {
  dateRange: DateRange;
  categoryId: string;
  accountId: string;
};
