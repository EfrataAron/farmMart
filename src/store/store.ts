import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/authSlice';
import productReducer from '@/store/productSlice';
import productsReducer from '@/store/productsSlice';
import blogReducer from '@/store/blogSlice';
import projectsReducer from '@/store/projectsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    products: productsReducer,
    blog: blogReducer,
    projects: projectsReducer,
  },
});

// types for later
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
