'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/store/productsSlice';
import { allProductsData } from '@/data/productData';
import { RootState } from '@/store/store';

export function useInitializeProducts() {
  const dispatch = useDispatch();
  const productsLength = useSelector((state: RootState) => state.products?.items?.length || 0);

  useEffect(() => {
    // Only initialize if products are empty
    if (productsLength === 0) {
      const productsWithStock = allProductsData.map(product => ({
        ...product,
        inStock: true
      }));
      dispatch(setProducts(productsWithStock));
    }
  }, [dispatch, productsLength]);
}
