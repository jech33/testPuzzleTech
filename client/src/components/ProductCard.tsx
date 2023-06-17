import { MdStar } from 'react-icons/md';
import { CartProduct } from '../store/projectStore.types';

const ProductCard = (product: CartProduct) => {
  const { category, image, price, title, rating } = product;
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
        <div className="card-actions justify-between items-center">
          <p className="text-xl font-bold">{price.toFixed(2)}</p>
          <button className="btn btn-outline btn-info">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
