import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  farmerId?: string;
}

interface ProductState {
  currentProduct: Product | null;
}

const initialState: ProductState = {
  currentProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    clearProduct: (state) => {
      state.currentProduct = null;
    },
  },
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;

