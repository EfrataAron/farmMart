import React from 'react';
import Image from 'next/image';
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  subheading: string;
  price: number;
  rating: number;
  size?: 'default' | 'small';
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  subheading,
  price,
  rating,
  size = 'default',
}) => {
  const { addItem, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(id);
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const containerClasses =
    size === 'small'
      ? 'w-full h-[280px] sm:h-[300px] md:h-[320px] p-2 text-xs border border-gray-200 rounded-lg bg-white relative group flex flex-col'
      : 'w-full h-[340px] sm:h-[360px] md:h-[380px] p-4 text-base border border-gray-200 rounded-lg bg-white relative group flex flex-col';

  const imageContainerClasses =
    size === 'small'
      ? 'w-full h-[160px] sm:h-[180px] md:h-[200px] flex items-center justify-center mb-2 rounded-t-lg overflow-hidden'
      : 'w-full h-[220px] sm:h-[240px] md:h-[260px] flex items-center justify-center mb-2 rounded-t-lg overflow-hidden';

  const imageHeight = size === 'small' ? 200 : 260;

  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, image, title, subheading, price, rating });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem({
      id,
      title,
      price,
      unit: 'kg', // or product.unit if available
      image,
      quantity: 1
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    toggleWishlist();
  };

  return (
    <div className={containerClasses}>
      <div className={imageContainerClasses}>
        <Image
          src={image}
          alt={title}
          width={220}
          height={imageHeight}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="mb-1 flex items-center justify-between gap-1">
        <h3 className="mt-2 line-clamp-1 flex-1">{title}</h3>
        <button
          onClick={handleToggleWishlist}
          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50 ml-1 flex items-center"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? (
            <AiFillHeart className="w-5 h-5 text-red-500" />
          ) : (
            <AiOutlineHeart className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      <p className="text-gray-500 line-clamp-1 mb-0">{subheading}</p>
      {/* Price + Cart row */}
      <div className="mb-1 font-bold flex items-center justify-between gap-2">
        <span>${price}</span>
        {isInCart(id) ? (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                updateQuantity(id, getItemQuantity(id) - 1);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-xl"
            >
              –
            </button>
            <span className="font-bold text-lg">{getItemQuantity(id)}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                updateQuantity(id, getItemQuantity(id) + 1);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-xl"
            >
              +
            </button>
          </div>
        ) : (
          <AiOutlineShoppingCart
            onClick={handleAddToCart}
            className="text-gray-600 hover:text-green-700 cursor-pointer text-2xl transition-colors"
          />
        )}
      </div>
      {/* Star rating */}
      <div className="flex items-center text-yellow-500 mt-auto">
        {[...Array(5)].map((_, i) =>
          i < rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;