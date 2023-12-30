import { Provider } from "react-redux"
import { persistor, store } from "./Store"
import { PersistGate } from "redux-persist/lib/integration/react";

const StoreProvider = ({ children }: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default StoreProvider