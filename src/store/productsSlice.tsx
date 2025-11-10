import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  topProductsData, 
  popularProductsData, 
  recentViewedData,
  vegetablesData,
  seedsPlantsData,
  farmToolsData,
  fertilizersData,
  equipmentsData,
  fruitsData,
  drinksData
} from '@/data/productData';

export interface Product {
  id: number;
  image: string;
  title: string;
  subheading: string;
  price: number;
  rating: number;
  category: string;
  subcategory?: string;
  inStock?: boolean;
  unit?: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Combine all products from productData
const allProductsData = [
  ...topProductsData.map(p => ({ ...p, category: 'Top Products', inStock: true })),
  ...popularProductsData.map(p => ({ ...p, category: 'Popular Products', inStock: true })),
  ...recentViewedData.map(p => ({ ...p, category: 'Recently Viewed', inStock: true })),
  ...vegetablesData.map(p => ({ ...p, category: 'Vegetables', inStock: true })),
  ...seedsPlantsData.map(p => ({ ...p, category: 'Seeds & Plants', inStock: true })),
  ...farmToolsData.map(p => ({ ...p, category: 'Farm Tools', inStock: true })),
  ...fertilizersData.map(p => ({ ...p, category: 'Fertilizers', inStock: true })),
  ...equipmentsData.map(p => ({ ...p, category: 'Equipments', inStock: true })),
  ...fruitsData.map(p => ({ ...p, category: 'Fruits', inStock: true })),
  ...drinksData.map(p => ({ ...p, category: 'Drinks', inStock: true }))
];

const initialState: ProductsState = {
  products: allProductsData,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.unshift(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, addProduct, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;
