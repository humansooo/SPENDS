export type ExpenseType = {
  id: number;
  title: string;
  amount: number;
  created_at: string;
  type: string;
};

export interface LoanType {
  id: number;
  title: string;
  type: typeOfLoan;
  duration: Date;
  interest: number;
  amount: number;
  from: string | null;
}

export interface CategoryType {
  id: number;
  name: string;
  tags: string[];
  description: string;
  created_at: string;
}

export interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}
