import ProductSection from './product-section/ProductSection';
import { recentViewedData } from '@/data/productData';

 
const RecentViewed = () => (
  <div className=" px-4 md:px-12 ">
  <ProductSection
    title="Recently Viewed"
    products={recentViewedData}
    cardSize="small"
    scrollable={true}
  /></div>
);
 
export default RecentViewed;