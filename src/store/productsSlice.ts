import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as productData from '@/data/productData';

export interface Product {
  id: number;
  title: string;
  subheading: string;
  price: number;
  rating: number;
  image: string;
  category?: string;
  subcategory?: string;
  inStock?: boolean;
  description?: string;
  farmerId?: string;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
}

// Get all products from productData and add inStock property
const allProducts = productData.allProductsData.map(product => ({
  ...product,
  inStock: true
}));

const initialState: ProductsState = {
  items: allProducts,
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, addProduct, setLoading } = productsSlice.actions;
export default productsSlice.reducer;

