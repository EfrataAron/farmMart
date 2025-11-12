'use client';

import { useInitializeProducts } from '@/hooks/useInitializeProducts';

export default function ProductsInitializer() {
  useInitializeProducts();
  return null;
}
