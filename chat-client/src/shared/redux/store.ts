import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "modules/todos/store/todoSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./slices/authSlice";
import chatReducer from "modules/chat/slices/chatSlice"

const persistConfig = {
    key: 'auth',
    storage,
}

const rootReducer = {
    auth: persistReducer(persistConfig, authReducer),
    chat: chatReducer,
    todos: todoReducer,
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false, }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch