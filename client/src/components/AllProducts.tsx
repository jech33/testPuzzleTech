/** Libraries **/
import { useRef, useState } from 'react';

/** Functional **/
import ProductCard from './ProductCard';
import { useSelectProductsState } from '../store/projectStore.selects';
import useProjectStore from '../store/projectStore';

const AllProducts = () => {
  const { products, productsLoading } = useSelectProductsState();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchInput, setSearchInput] = useState('');
  const [titleToFilter, setTitleToFilter] = useState('');
  const [categoryToFilter, setCategoryToFilter] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const titles = [...new Set(products.map((product) => product.title))];
  const categories = [...new Set(products.map((product) => product.category))];

  useProjectStore.subscribe(
    (state) => state.products,
    (products) => {
      !filteredProducts.length && setFilteredProducts(products);
    },
  );

  const handleFilter = (type: 'title' | 'category' | 'search', value: string) => {
    const titleValue = type === 'title' ? value.toLowerCase() : titleToFilter.toLowerCase();
    const categoryValue = type === 'category' ? value.toLowerCase() : categoryToFilter.toLowerCase();
    const searchValue = type === 'search' ? value.toLowerCase() : searchInput.toLowerCase();

    switch (type) {
      case 'title':
        setTitleToFilter(value);
        break;
      case 'category':
        setCategoryToFilter(value);
        break;
      case 'search':
        setSearchInput(value);
        break;
      default:
        break;
    }

    const filteredProducts = products.filter((product) => {
      const title = titleValue === '' || product.title.toLowerCase() === titleValue;
      const category = categoryValue === '' || product.category.toLowerCase() === categoryValue;
      const searchBar =
        product.title.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue) ||
        product.price.toString().includes(searchValue);
      return title && category && searchBar;
    });
    setFilteredProducts(filteredProducts);
  };

  const handleSelectTitle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase();
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
    handleFilter('title', value);
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase();
    handleFilter('category', value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    handleFilter('search', value);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center pb-5 py-3 gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          className="input flex-grow min-w-[270px] border-2 border-gray-200"
          onChange={handleInputChange}
          ref={searchInputRef}
        />
        <select className="select w-[150px] border-2 border-gray-200" onChange={handleSelectCategory}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select className="select w-[150px] border-2 border-gray-200" onChange={handleSelectTitle}>
          <option value="">All products</option>
          {titles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-5 justify-center flex-grow overflow-scroll pb-[5rem]">
        {productsLoading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          <>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
