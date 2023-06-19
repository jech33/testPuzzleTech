import { MdAdd, MdRemove } from 'react-icons/md';
import useCartProduct from '../hooks/useCartProduct';
import { CartProduct } from '../store/projectStore.types';
import { formatCurrency } from '../utils/functions';

const ProductCardSmall = (product: CartProduct) => {
  const { cartProduct, addProductToCart, removeProductFromCart } = useCartProduct(product);
  return (
    <>
      <div className="flex items-center gap-3 rounded-xl border-[1px] border-gray-300 p-2">
        <figure className="h-[90px] min-h-[90px] w-[90px] min-w-[90px]">
          <img src={cartProduct?.image} alt={cartProduct?.title} className="h-full w-full object-contain" />
        </figure>
        <div className="prose flex w-full flex-col overflow-hidden">
          <h4 className="line-clamp-2 h-12 text-ellipsis">{cartProduct?.title}</h4>
          <div className="flex">
            <div className="prose flex min-w-[55%] items-center gap-2">
              <button className="btn-xs btn" onClick={removeProductFromCart}>
                <MdRemove size={14} />
              </button>
              <h4 className="m-0 flex-grow select-none text-center">{cartProduct?.quantity}</h4>
              <button className="btn-success btn-xs btn text-white" onClick={addProductToCart}>
                <MdAdd size={14} />
              </button>
            </div>
          </div>
          <div className="mt-3 flex-grow">
            <p className="m-0">
              {cartProduct?.price ? formatCurrency(cartProduct.price * cartProduct.quantity, 'USD') : ''}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardSmall;
