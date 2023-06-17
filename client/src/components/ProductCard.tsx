/** Functional **/
import { CartProduct } from '../store/projectStore.types';
import { useSelectProductsState, useSelectUserState } from '../store/projectStore.selects';
import { formatCurrency } from '../utils/functions';

/** Assets **/
import { MdAdd, MdRemove, MdStar } from 'react-icons/md';

const ProductCard = (product: CartProduct) => {
  const { category, image, price, title, rating } = product;
  const { userIsLoggedIn } = useSelectUserState();
  const { cartProducts, setCartProducts } = useSelectProductsState();

  const cartProductsIds = cartProducts.map((product) => product.id);
  const isProductInCart = !!cartProductsIds.find((id) => id === product.id);
  const cartProduct = cartProducts.find((cartProd) => cartProd.id === product.id);

  const addProductToCart = () => {
    if (isProductInCart) {
      const newCardProducts = cartProducts.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartProducts(newCardProducts);
      return;
    }

    setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
  };

  const removeProductFromCart = () => {
    const newCardProducts = cartProducts.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartProducts(newCardProducts.filter((product) => product.quantity > 0));
  };

  return (
    <div className="card card-compact relative w-[270px] overflow-hidden bg-base-100 shadow-xl">
      <span className="absolute rounded-none py-3 rounded-bl-xl right-0 badge badge-success w-fit grow-0 text-white">
        {category}
      </span>
      <figure className="px-3 pt-10">
        <img src={image} alt={title} className="h-[100px]" />
      </figure>

      <div className="card-body justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-1 items-center">
              <MdStar className="text-warning" size="1.5rem" />
              <p>{rating.rate}</p>
              <p>({rating.count})</p>
            </div>
          </div>
          <h2 className="card-title line-clamp-2">{title}</h2>

          {/* <div className="line-clamp-3 flex-grow overflow-hidden max-h-[65px]">{description}</div> */}
        </div>
        <div className="card-actions justify-between items-center h-[3rem]">
          <p className="text-xl font-bold">{formatCurrency(price, 'USD')}</p>
          {!userIsLoggedIn ? null : !isProductInCart ? (
            <button className="btn btn-outline btn-info" onClick={addProductToCart}>
              Add to cart
            </button>
          ) : (
            <div className="flex gap-2 min-w-[50%] prose items-center">
              <button className="btn px-2 w-[34px] min-h-[34px] h-[34px]" onClick={removeProductFromCart}>
                <MdRemove size={20} />
              </button>
              <h3 className="select-none m-0 flex-grow text-center">{cartProduct?.quantity}</h3>
              <button
                className="btn btn-success text-white px-0 w-[34px] min-h-[34px] h-[34px]"
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
