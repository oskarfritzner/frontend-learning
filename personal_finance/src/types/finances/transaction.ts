export type TransactionType = "income" | "expense" | "transfer";

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  date: Date;
  description: string;
  categoryId: string;
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
  type: TransactionType;
};
