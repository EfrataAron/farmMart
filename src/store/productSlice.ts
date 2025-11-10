import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name?: string;
  title?: string;
  category: string;
  price: number;
  description?: string;
  quantity?: number;
  status?: string;
  images?: string[];
  imageNames?: string[];
  rating: number;
  subtitle?: string;
  subheading?: string;
  image?: string;
  date?: string;
  stock?: string;
  inStock?: boolean;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, setProducts } = productSlice.actions;
export default productSlice.reducer; 