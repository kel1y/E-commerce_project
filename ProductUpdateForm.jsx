import React, { useEffect, useMemo, useState } from 'react';
import Joi from 'joi';
import InputField from './InputField';
import plus_SVG from '../assets/+.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitButton } from './SubmitButton';
import { sidebarActions } from '../redux/slices/sidebar';
import { fetchCategories } from '../redux/slices/product/categories';
import '../styles/addProduct.css';
import DashboardHeader from './DashboardHeader';
import { useParams } from 'react-router';
import { fetchProduct } from '../redux/slices/product/productFetch';
import spinner from '../assets/Icons/spinner.svg';

import close_SVG from '../assets/close_square.png';
import '../styles/productUpdate.css';
import { updateProduct } from '../redux/slices/product/productUpdate';

const ProductUpdateForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchProductState = useSelector((state) => state.productFetch);
  const uploadStatus = useSelector((state) => state.productUpdate);
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
  const previews = [];

  const productSchema = Joi.object({
    productName: Joi.string()
      .min(3)
      .pattern(/^[a-zA-Z0-9\s]+$/)
      .required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
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

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const files_length = files.length;
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        let existingItem = previews.find((item) => item.name === file.name);
        if (!existingItem) {
          let imageData = {
            url: reader.result,
            name: file.name,
          };
          previews.push(imageData);
        }
        if (previews.length === files_length) {
          setPreviewURL(previews);
        }
      };
    }
  };
  const handleDelImage = (fileName) => {
    const allFiles = productData.images;
    const allPreviews = previewURL;

    const filteredFiles = allFiles.filter((item) => item.name !== fileName);
    const filteredPreviews = allPreviews.filter(
      (item) => item.name !== fileName
    );
    setProductData((prevState) => ({
      ...prevState,
      images: filteredFiles,
    }));
    setPreviewURL(filteredPreviews);
  };
  const convertURLToFile = async (url, counter) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const imageExtension =
      blob.type == 'image/jpeg'
        ? 'jpg'
        : blob.type == 'image/png'
        ? 'png'
        : null;
    const filename = `existingImage${counter}.${imageExtension}`; // You can set a filename or extract it from the URL
    return new File([blob], filename, { type: blob.type });
  };

  const fileAlreadyAdded = (file) => {
    const allFiles = productData.images;
    const existingItem = allFiles.find((item) => item.name === file.name);
    if (existingItem) return true;
    return false;
  };
  const handleImageRetrieval = async (imagesArray) => {
    const files = imagesArray;
    let counter = 0;
    const allFiles = [];

    for (const imageURL of files) {
      let file = await convertURLToFile(imageURL, counter);
      let imageData = {
        url: imageURL,
        name: file.name,
      };

      if (fileAlreadyAdded(file)) continue; //skip if the current file is already added

      previews.push(imageData);
      allFiles.push(file);
      counter++;
    }
    setPreviewURL((prevState) => (previews.length == 0 ? prevState : previews));
    setProductData((prevState) => ({
      ...prevState,
      images: [...productData.images, ...allFiles],
    }));
  };
  const appendToFileList = (fileList, newFiles) => {
    const newFileList = new DataTransfer();
    // Add existing files to the new FileList
    for (let i = 0; i < fileList.length; i++) {
      newFileList.items.add(fileList[i]);
    }

    // Add the new files to the new FileList
    for (let i = 0; i < newFiles.length; i++) {
      newFileList.items.add(newFiles[i]);
    }

    return newFileList.files;
  };

  const convertFileListToFiles = (fileList) => {
    const files = [];

    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }

    return files;
  };
  const handleInput = (e) => {
    e.preventDefault();

    setProductData({
      productName:
        e.target.name === 'productName'
          ? e.target.value
          : productData.productName,
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
          ? [...productData.images, ...convertFileListToFiles(e.target.files)]
          : productData.images,
    });

    if (e.target.name === 'images') {
      const images_current_and_old = appendToFileList(
        e.target.files,
        productData.images
      );
      handleImageInput(Array.from(images_current_and_old));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', String(productData.productName));
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
      dispatch(updateProduct({ productId: id, data: formData }));
    }
  };

  const onDateFocus = (e) => (e.target.type = 'date');
  const onDateBlur = (e) => (e.target.type = 'text');

  useMemo(() => {
    if (fetchProductState.fetchedProduct.productName) {
      const fetchedProduct = fetchProductState.fetchedProduct;
      setProductData({
        productName: fetchedProduct.productName,
        category: fetchedProduct.category_id ? fetchedProduct.category_id : 0,
        price: fetchedProduct.price,
        quantity: fetchedProduct.quantity,
        expiryDate: formatDate(fetchedProduct.expiryDate),
        images: productData.images,
      });
      handleImageRetrieval(fetchedProduct.images);
      console.log('upload state: ', uploadStatus);
    }
  }, [fetchProductState, uploadStatus.serverResponded]);

  useEffect(() => {
    dispatch(sidebarActions.setActiveTab('products'));
    dispatch(fetchCategories());
    dispatch(fetchProduct(id));
  }, [uploadStatus.serverResponded]);

  return (
    <>
      <DashboardHeader text="All products" />
      <div data-testid="product-form" className="productForm-container">
        <div className="title">
          <label>Update product</label>
        </div>
        {fetchProductState.loading && !uploadStatus.loading ? (
          <img
            src={spinner}
            alt="loader"
            height={'55px'}
            style={{ alignSelf: 'center', justifySelf: 'center' }}
          />
        ) : (
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
              <SubmitButton
                className="btn-submit-large"
                loading={uploadStatus.loading}
                text="Save Changes"
              />
            </div>
            <div className="images-wrapper">
              <div className="preview-wrapper">
                {previewURL.map((data, index) => (
                  <div
                    className="product-update-image-container"
                    key={`${data.name}_${index}`}
                  >
                    <img src={data.url} alt={`preview-${data.name}_${index}`} />
                    <img
                      src={close_SVG}
                      className="image-del-button"
                      alt="remove image"
                      onClick={() => handleDelImage(data.name)}
                    />
                  </div>
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
        )}
      </div>
    </>
  );
};

export default ProductUpdateForm;
