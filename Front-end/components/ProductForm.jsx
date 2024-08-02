import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import InputField from './InputField';
import back_SVG from '../assets/Chev.svg';
import plus_SVG from '../assets/+.svg';
import notification_SVG from '../assets/Notification.svg';
import logo_SVG from '../assets/Icons/Logo.svg';
import avatar from '../assets/user.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct } from '../redux/slices/product/productAdd';
import { SubmitButton } from './SubmitButton';
import { sidebarActions } from '../redux/slices/sidebar';
import { fetchCategories } from '../redux/slices/product/categories';
import '../styles/addProduct.css';
import DashboardHeader from './DashboardHeader';

const ProductForm = () => {
  const dispatch = useDispatch();
  const uploadStatus = useSelector((state) => state.productAdd);
  const categories = useSelector((state) => state.category.categories);
  const categoriesStatus = useSelector((state) => state.category);
  const [productData, setProductData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    images: [],
    expiryDate: '',
  });
  const [previewURL, setPreviewURL] = useState([]);
  const [errors, setErrors] = useState({});

  const productSchema = Joi.object({
    productName: Joi.string()
      .min(3)
      .pattern(/^[a-zA-Z0-9\s]+$/)
      .required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required(),
    expiryDate: Joi.date().min('now').required(),
    images: Joi.required(),
    category_id: Joi.string().required(),
  });

  const validateForm = (formData) => {
    const { error } = productSchema.validate(formData, { abortEarly: false });
    if (!error) {
      setErrors({});
      return true;
    }

    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    setErrors(newErrors);
    return false;
  };
  const handleImageInput = (filesArray) => {
    const files = filesArray;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const files_length = files.length;
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        previews.push(reader.result);

        if (previews.length === files_length) {
          setPreviewURL(previews);
        }
      };
    }
  };
  const handleInput = (e) => {
    e.preventDefault();

    setProductData({
      productName:
        e.target.name === 'productName'
          ? e.target.value
          : productData.productName,
      description:
        e.target.name === 'description'
          ? e.target.value
          : productData.description,
      category:
        e.target.name === 'category' ? e.target.value : productData.category,
      price: e.target.name === 'price' ? e.target.value : productData.price,
      quantity:
        e.target.name === 'quantity' ? e.target.value : productData.quantity,
      expiryDate:
        e.target.name === 'expiryDate'
          ? e.target.value
          : productData.expiryDate,
      images:
        e.target.name === 'images'
          ? [...productData.images, ...e.target.files]
          : productData.images,
    });

    if (e.target.name === 'images') {
      handleImageInput(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', String(productData.productName));
    formData.append('description', String(productData.description));
    formData.append('category_id', String(productData.category));
    formData.append('price', String(productData.price));
    formData.append('quantity', String(productData.quantity));
    formData.append('expiryDate', String(productData.expiryDate));

    for (let i = 0; i < productData.images.length; i++) {
      formData.append('images', productData.images[i]);
    }

    setErrors({});
    let data = Object.fromEntries(formData.entries());
    if (validateForm(data)) {
      dispatch(saveProduct(formData));
    }
  };

  const onDateFocus = (e) => (e.target.type = 'date');
  const onDateBlur = (e) => (e.target.type = 'text');

  useEffect(() => {
    dispatch(sidebarActions.setActiveTab('products'));
    dispatch(fetchCategories());
    if (!uploadStatus.loading && !uploadStatus.error) {
      setProductData({
        productName: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        images: [],
        expiryDate: '',
      });
      setPreviewURL([]);
    }
  }, [uploadStatus.loading]);
  return (
    <>
    <DashboardHeader text='All products' />
    <div data-testid="product-form" className="productForm-container">
      <div className="title">
        <label>Add new product</label>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="details-wrapper">
          <div className="mini-wrapper">
            <label htmlFor="productName">Name</label>
            <InputField
              type="text"
              name="productName"
              placeholder="Product name"
              value={productData.productName}
              onChange={handleInput}
              />
            {errors.productName && <span>{errors.productName}</span>}
          </div>
          <div className="mini-wrapper">
            <label>Description</label>
            <InputField
              type="text"
              name="description"
              placeholder="Product Description"
              value={productData.description}
              onChange={handleInput}
              />
            {errors.description && <span>{errors.description}</span>}
          </div>
          <div className="mini-wrapper">
            <label>Category</label>
            <div className="category-dropdown">
              <select
                name="category"
                placeholder="Category name"
                value={productData.category}
                onChange={handleInput}
                >
                <option value="" className="list-placeholder">
                  Category name
                </option>

                {categories &&
                  !categoriesStatus.loading &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
              </select>
            </div>
            {errors.category && <span>{errors.category}</span>}
          </div>
          <div className="mini-wrapper">
            <label>Price</label>
            <InputField
              type="text"
              name="price"
              placeholder="Product price"
              value={productData.price}
              onChange={handleInput}
              />
            {errors.price && <span>{errors.price}</span>}
          </div>
          <div className="mini-wrapper">
            <label>Quantity</label>
            <InputField
              type="number"
              name="quantity"
              placeholder="Product quantity"
              value={productData.quantity}
              onChange={handleInput}
              />
            {errors.quantity && <span>{errors.quantity}</span>}
          </div>
          <div className="mini-wrapper">
            <label>Expiry date</label>
            <InputField
              type="text"
              name="expiryDate"
              placeholder="29 Feb 2024"
              value={productData.expiryDate}
              onFocus={onDateFocus}
              onBlur={onDateBlur}
              onChange={handleInput}
              />
            {errors.expiryDate && <span>{errors.expiryDate}</span>}
          </div>
          <SubmitButton loading={uploadStatus.loading} text="Save" />
        </div>
        <div className="images-wrapper">
          <div className="preview-wrapper">
            {previewURL.map((url, index) => (
              <img src={url} alt={`preview-${index}`} key={index} />
            ))}
          </div>
          <label className="custom-file-upload">
            <InputField
              data-testid="image-input"
              type="file"
              name="images"
              onChange={handleInput}
              multiple
              />
            <img src={plus_SVG} />
          </label>
          {errors.images && <span>{errors.images}</span>}
        </div>
      </form>
    </div>
</>
  );
};

export default ProductForm;
