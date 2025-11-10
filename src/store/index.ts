import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import productsReducer from './productsSlice';
import projectsReducer from './projectsSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    products: productsReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

