/** Functional **/
import { CartProduct } from '../store/projectStore.types';
import { useSelectUserState } from '../store/projectStore.selects';
import { formatCurrency } from '../utils/functions';

/** Assets **/
import { MdAdd, MdRemove, MdStar } from 'react-icons/md';
import useCartProduct from '../hooks/useCartProduct';

const ProductCard = (product: CartProduct) => {
  const { category, image, price, title, rating } = product;
  const { userIsLoggedIn } = useSelectUserState();

  const { cartProduct, isProductInCart, addProductToCart, removeProductFromCart } = useCartProduct(product);

  return (
    <div className="card card-compact relative w-[270px] overflow-hidden bg-base-100 shadow-xl">
      <span className="badge badge-success absolute right-0 w-fit grow-0 rounded-none rounded-bl-xl py-3 text-white">
        {category}
      </span>
      <figure className="px-3 pt-10">
        <img src={image} alt={title} className="h-[100px]" />
      </figure>

      <div className="card-body justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <MdStar className="text-warning" size="1.5rem" />
              <p>{rating.rate}</p>
              <p>({rating.count})</p>
            </div>
          </div>
          <h2 className="card-title line-clamp-2">{title}</h2>

          {/* <div className="line-clamp-3 flex-grow overflow-hidden max-h-[65px]">{description}</div> */}
        </div>
        <div className="card-actions h-[3rem] items-center justify-between">
          <p className="text-xl font-bold">{formatCurrency(price, 'USD')}</p>
          {!userIsLoggedIn ? null : !isProductInCart ? (
            <button className="btn-info btn-outline btn" onClick={addProductToCart}>
              Add to cart
            </button>
          ) : (
            <div className="prose flex min-w-[50%] items-center gap-2">
              <button className="btn h-[34px] min-h-[34px] w-[34px] px-2" onClick={removeProductFromCart}>
                <MdRemove size={20} />
              </button>
              <h3 className="m-0 flex-grow select-none text-center">{cartProduct?.quantity}</h3>
              <button
                className="btn-success btn h-[34px] min-h-[34px] w-[34px] px-0 text-white"
                onClick={addProductToCart}
              >
                <MdAdd size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
