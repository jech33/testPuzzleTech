/** Functional **/
import { useSelectProductsState } from '../store/projectStore.selects';
import { CartProduct } from '../store/projectStore.types';

const useCartProduct = (product: CartProduct) => {
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
  return {
    cartProduct,
    isProductInCart,
    addProductToCart,
    removeProductFromCart,
  };
};

export default useCartProduct;
