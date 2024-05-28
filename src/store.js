import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../src/features/posts/postsSlice';
import counterReducer from '../src/features/counters/counterSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        counter: counterReducer,
    }
});
