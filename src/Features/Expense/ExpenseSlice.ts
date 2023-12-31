import { createSlice } from '@reduxjs/toolkit';
import { ExpenseType } from '../../Types/index';

export interface ExpenseState {
    expense: ExpenseType[];
    category: string[];
}

const expenseInitState: ExpenseState = {
    expense: [],
    category: [
        'All',
        'Food',
        'Transport',
        'Entertainment',
        'Health',
        'Education',
        'Shopping',
        'Other',
    ],
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: expenseInitState,
    reducers: {

        ADD_EXPENSE: (state, action) => {
            const id = state.expense.length + 1;
            const newExpense: ExpenseType = {
                id,
                ...action.payload,
                created_at: new Date().toISOString(),
            }
            state.expense.push(newExpense);
        },

        REMOVE_EXPENSE: (state, action) => {
            const temp = state.expense.filter((expense) => expense.id !== action.payload.id);
            state.expense = temp;
        },

        REMOVE_ALL_EXPENSE: (state) => {
            state.expense = [];
        },

        ADD_CATEGORY: (state, action: { payload: { category: string } }) => {
            if (state.category.includes(action.payload.category)) {
                console.log('Category already exists');
                return;
            }
            const temp = state.category;
            temp.push(action.payload.category);
            state.category = temp;
        }

    }
});

export const { ADD_EXPENSE, REMOVE_EXPENSE, ADD_CATEGORY, REMOVE_ALL_EXPENSE } = expenseSlice.actions;
export const expenseSelector = (state: { expense: ExpenseState }) => state.expense.expense;
export const categorySelector = (state: { expense: ExpenseState }) => state.expense.category;

export default expenseSlice.reducer;