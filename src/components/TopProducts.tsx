import ProductSection from './product-section/ProductSection';
import { topProductsData } from '@/data/productData';
 
const TopProducts = () => (
  <div className=" px-4 md:px-12 ">
  <ProductSection
    title="Top Products"
    products={topProductsData}
      // cardSize="default"
      cardSize="small"
    scrollable={true}
  /></div>
);
 
export default TopProducts;
