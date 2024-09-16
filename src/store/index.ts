import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import userReducer from './userSlice';
import otherUserReducer from './otherUserSlice';

export const store = configureStore({
    reducer: {
        posts: postReducer,
        user: userReducer,
        otherUser: otherUserReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
