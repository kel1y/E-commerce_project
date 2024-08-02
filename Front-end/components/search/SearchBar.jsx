import React, { useEffect, useState } from 'react';
import '../../styles/searchProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import search from '../../assets/Icons/search.svg';
import arrow from '../../assets/Icons/arrow.svg';
import { searchProduct } from '../../redux/slices/product/searchProduct';
import useNavigateSearch from '../../hooks/useNavigateSearch';
import useSearch from '../../hooks/useSearch';
import loader from '../../assets/loader.svg';
import { fetchCategories } from '../../redux/slices/product/categories';
import { showErrorMessage } from '../../utils/toast';

const SearchBar = () => {
  const { categories, loading } = useSelector((store) => store.category);
  const { error } = useSelector((store) => store.search);
  const name = useSearch();
  const description = useSearch();
  const minimumPrice = useSearch();
  const Category = useSearch();
  const maximumPrice = useSearch();
  const navigateSearch = useNavigateSearch();
  const dispatch = useDispatch();
  const [openOptions, setOpenOptions] = useState(false);
  const byName = name.value;
  const byCategory = Category.value;
  const byDescription = description.value;
  const byMinimumPrice = minimumPrice.value;
  const byMaximumPrice = maximumPrice.value;
  const handleSearch = () => {
    try {
      if (byMinimumPrice > byMaximumPrice) {
        showErrorMessage('minimum price can not be greater than maximum price');
      } else if (
        byName &&
        byDescription &&
        byMinimumPrice &&
        byMaximumPrice &&
        byName !== 'undefined' &&
        byDescription !== 'undefined' &&
        byMinimumPrice !== 'undefined' &&
        byMaximumPrice !== 'undefined'
      ) {
        const ByName = byName.toLowerCase();
        const queryParams = {
          name: ByName,
          description: byDescription,
          minPrice: byMinimumPrice,
          maxPrice: byMaximumPrice,
        };
        dispatch(searchProduct(queryParams));
        navigateSearch('/search', {
          name: ByName,
          description: byDescription,
          minimumprice: byMinimumPrice,
          maximumprice: byMaximumPrice,
        });
      } else if (
        byName &&
        byMinimumPrice &&
        byMaximumPrice &&
        byName !== 'undefined' &&
        byMinimumPrice !== 'undefined' &&
        byMaximumPrice !== 'undefined'
      ) {
        const queryParams = {
          name: byName,
          minPrice: byMinimumPrice,
          maxPrice: byMaximumPrice,
        };
        dispatch(searchProduct(queryParams));
        navigateSearch('/search', {
          name: byName,
          minimumprice: byMinimumPrice,
          maximumprice: byMaximumPrice,
        });
      } else if (
        byName &&
        byDescription &&
        byName !== 'undefined' &&
        byDescription !== 'undefined'
      ) {
        const queryParams = {
          name: byName,
          description: byDescription,
        };
        dispatch(searchProduct(queryParams));
        navigateSearch('/search', {
          name: byName.toLowerCase(),
          description: byDescription.toLowerCase(),
        });
      } else if (
        byMinimumPrice &&
        byMaximumPrice &&
        byMinimumPrice !== 'undefined' &&
        byMaximumPrice !== 'undefined'
      ) {
        const queryParams = {
          minPrice: byMinimumPrice,
          maxPrice: byMaximumPrice,
        };
        dispatch(searchProduct(queryParams));
        navigateSearch('/search', {
          minimumprice: byMinimumPrice,
          maximumprice: byMaximumPrice,
        });
      } else if (byName && byName !== 'undefined') {
        const queryParams = { name: byName };
        dispatch(searchProduct(queryParams));
        navigateSearch('/search', { name: byName.toLowerCase() });
      } else if (byDescription && byDescription !== 'undefined') {
        const queryParams = { description: byDescription };
        dispatch(searchProduct(queryParams));
        navigateSearch('/search', { description: byDescription.toLowerCase() });
      } else if (byCategory && byCategory !== 'undefined') {
        const queryParams = { category: byCategory };
        dispatch(searchProduct(queryParams));
        navigateSearch('/search', { category: byCategory });
      }
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const handleOpenOptions = () => {
    setOpenOptions((prev) => !prev);
  };
  return (
    <div className="search_bar" data-testid="search-bar">
      <input
        data-testid="input-search"
        type="text"
        name="searchProduct"
        value={name.value}
        className="search_field"
        placeholder="Search"
        onChange={name.onChange}
      />
      <div className="search-options">
        <button
          className="searchButton"
          type="button"
          onClick={handleOpenOptions}
        >
          <span>options </span>
          <img src={arrow} alt="" className="arrow" />
        </button>
        {openOptions && (
          <div className="search_categories">
            <div className="dropdown-content">
              {loading ? null : (
                <select value={Category.value} onChange={Category.onChange}>
                  <option>select category</option>
                  {categories.map((category) => (
                    <option key={category.id}>{category.categoryName}</option>
                  ))}
                </select>
              )}
              <div className="input-options">
                {error && <p>{error}</p>}
                <input
                  type="text"
                  placeholder="description"
                  value={description.value}
                  onChange={description.onChange}
                />
                <input
                  type="text"
                  placeholder="minimum price"
                  value={minimumPrice.value}
                  onChange={minimumPrice.onChange}
                />
                <input
                  type="text"
                  placeholder="maximum price"
                  value={maximumPrice.value}
                  onChange={maximumPrice.onChange}
                />
              </div>
            </div>
          </div>
        )}
        <button onClick={handleSearch} className="search-button" type="submit">
          <img src={search} alt="search" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
