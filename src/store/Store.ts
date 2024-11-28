import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ExpenseType } from "../types";

interface StoreType {
  expense: ExpenseType[];
  category: string[];
  addExpense: (expense: ExpenseType) => void;
  removeExpense: (id: number) => void;
  removeAllExpense: () => void;
  addCategory: (category: string) => void;
}

const useStore = create<StoreType>()(
  persist(
    (set) => ({
      expense: [] as ExpenseType[],
      category: [
        "All",
        "Food",
        "Transport",
        "Entertainment",
        "Health",
        "Education",
        "Shopping",
        "Other",
      ] as string[],

      addExpense: (expense: ExpenseType) =>
        set((state: StoreType) => {
          const newExpense = { ...expense, id: state.expense.length + 1 };
          return { expense: [...state.expense, newExpense] };
        }),
      removeExpense: (id: number) =>
        set((state: StoreType) => ({
          expense: state.expense.filter((expense) => expense.id !== id),
        })),
      removeAllExpense: () => set((state: StoreType) => ({ expense: [] })),
      addCategory: (category: string) =>
        set((state) => {
          if (state.category.includes(category)) {
            console.log("Category already exists");
            return state; // Return the current state if the category already exists
          }
          return { ...state, category: [...state.category, category] }; // Return the updated state with the new category
        }),
    }),
    {
      name: "expense-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useStore };
