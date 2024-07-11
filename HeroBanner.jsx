import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spinner from '../assets/Icons/spinner.svg';
import line from '../assets/Icons/line.svg';
import { useGetProductsQuery } from '../redux/slices/products';
import { fetchCategories } from '../redux/slices/product/categories';

const HeroBanner = () => {
  const { categories } = useSelector((store) => store.category);
  const { isLoading, data } = useGetProductsQuery({
    page: 1,
    limit: 10,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const bannerCategory = categories
    .filter((category) => category.categoryName === 'Furniture')
    .map((item) => item.id);
  if (isLoading || !data) {
    return (
      <div className="banner" data-testid="banner">
        <img
          src={spinner}
          className="banner-spinner"
          alt="loader"
          data-testid="loader"
        />
      </div>
    );
  }
  if (!isLoading && !data.Products) {
    return (
      <div className="products-list">
        <h2>No Products Found</h2>
      </div>
    );
  }

  const products = data.Products.filter(
    (product) => product.category_id === bannerCategory[0]
  ).map((item) => item);
  if (!products) {
    return (
      <div
        className="banner"
        style={{ display: 'none' }}
        data-testid="banner"
      />
    );
  }
  const product1 = products
    .filter((prod1) => prod1.productName === 'modern chair')
    .map((item) => item);
  const product2 = products
    .filter((prod2) => prod2.productName === 'office desk chair')
    .map((item) => item);
  const product3 = products
    .filter((prod3) => prod3.productName === 'home alisa sofa')
    .map((item) => item);
  const product4 = products
    .filter((prod4) => prod4.productName === 'comfy chair')
    .map((item) => item);

  const product = products[0];
  if (!product || !product1 || !product2 || !product3 || !product4) {
    return (
      <div
        className="banner"
        style={{ display: 'none' }}
        data-testid="banner"
      />
    );
  }

  const handleShopNow = () => {
    window.location.href = `/products/${product.id}`;
  };

  return (
    <div className="banner" data-testid="banner">
      <div className="banner_titles" data-testid="banner-titles">
        <p className="title1">TOP COLLECTIONS 2023</p>
        <h1 className="title2">We Serve Your Dream Furniture</h1>
        <img src={line} alt="line" className="line" />
        <p className="title3">Get amazing deals on all furniture</p>
        <button className="shop_now" type="button" onClick={handleShopNow}>
          SHOP NOW
        </button>
      </div>
      <div className="banner_products" data-testid="banner-products">
        <div className="main_picture">
          <img src={product1[0].images[0]} alt="Image1" className="picture1" />
        </div>
        <div className="small_image_container">
          <div className="small_image1">
            <img
              src={product2[0].images[0]}
              alt="Image2"
              className="picture2"
            />
            <p className="price">${product2[0].price}</p>

            <p className="product_desc">{product2[0].productName}</p>
          </div>

          <div className="small_image2">
            <img
              src={product3[0].images[0]}
              alt="Image2"
              className="picture3"
            />
            <p className="price">${product3[0].price}</p>
            <p className="product_desc">{product3[0].productName}</p>
          </div>
          <div className="small-image3">
            <img
              src={product4[0].images[0]}
              alt="Image1"
              className="picture4"
            />
            <p className="price">${product4[0].price}</p>

            <p className="product_desc">{product4[0].productName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
