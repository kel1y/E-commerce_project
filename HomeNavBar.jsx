import React, { useEffect } from 'react';
import menu from '../assets/Icons/menu.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/product/categories';
import { Link } from 'react-router-dom';

const HomeNavBar = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  });
  return (
    <div className="home_nav_bar_container" data-testid="home_nav_bar">
      <div className="categories">
        <button className="all_categories" type="button">
          <img src={menu} alt="menu" className="menu" />
          ALL CATEGORIES
        </button>
        <div className="dropdown_content">
          {categories
            ? categories.map((cat) => {
                return (
                  <div key={cat.id}>
                    <Link to="/">{cat.categoryName}</Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="other_links">
        <div className="home">
          <a href="/">HOME</a>
        </div>
        <div className="about_us">
          <a href="/">ABOUT</a>
        </div>
        <div className="contact_us">
          <a href="/">CONTACT US</a>
        </div>
      </div>
    </div>
  );
};

export default HomeNavBar;
