import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  AppReducer from "../Features/App/AppSlice"
import ExpenseReducer from "../Features/Expense/ExpenseSlice"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedAppReducer = persistReducer(persistConfig, AppReducer)
const persistedExpenseReducer = persistReducer(persistConfig, ExpenseReducer)



const rootReducer = combineReducers({
    app: persistedAppReducer,
    expense: persistedExpenseReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);