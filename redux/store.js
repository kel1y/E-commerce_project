/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import {
  getProfileReducer,
  updateProfileReducer,
} from './slices/profile/updateProfile';
import { ProductApi } from './slices/products.js';
import productsReducer from './slices/sellerProducts';
import LandingPageProductsReducer from './slices/LandingPage';
import AdminDashboardUsersReducer from './slices/user/getUsers';
import ReviewsReducer from './slices/product/getReviews';
import AddReviewsReducer from './slices/product/addReview';

import productAddSlice from './slices/product/productAdd';
import sidebarSlice from './slices/sidebar';
import categoriesSlice from './slices/product/categories';
import signupSlice from './slices/user/signup';
import signinSlice from './slices/user/login';
import googleAuthSlice from './slices/googleAuthSlice';
import twoFactorAuthSlice from './slices/user/twoFactorAuth';
import forgotPasswordSlice from './slices/user/forgotpassword';
import resetPasswordSlice from './slices/user/resetpassword';
import { searchReducer } from './slices/product/searchProduct';
import getCartSlice from './slices/cart/getCart';
import deleteItemCartSlice from './slices/cart/deleteItemCart';
import clearCartSlice from './slices/cart/clearCart';
import updateCartSlice from './slices/cart/updateCart';
import addCartSlice from './slices/cart/addCart';
import ChangeStatusSlice, {
  FetchStatusSlice,
} from './slices/user/changestatus.js';
import ChangeRoleSlice from './slices/user/changerole.js';
import productFetchSlice from './slices/product/productFetch';
import productUpdateSlice from './slices/product/productUpdate';
import productDeleteSlice from './slices/product/productDelete';
import productAvailabilitySlice from './slices/product/productAvailability';
import checkoutSlice from './slices/cart/payment';
import notificationSlice from './slices/notifications/notificationSlice';
import addProductToWishlistSlice from './slices/productWishlist/AddProductToWishlist';
import getAllProductWishesSlice from './slices/productWishlist/getProductFromWishlist';
import { getRecommendedProductsReducer } from './slices/product/recommendedProduct';
import passwordReducer from './slices/user/updatePassword';
import ordersReducer from './slices/order/getAllOrder';
import momoPaySlice from './slices/cart/momo';

const reducers = {
  [ProductApi.reducerPath]: ProductApi.reducer,
};
const store = configureStore({
  reducer: {
    ...reducers,
    product: productsReducer,
    products: LandingPageProductsReducer,
    productAdd: productAddSlice.reducer,
    sidebar: sidebarSlice.reducer,
    category: categoriesSlice.reducer,
    signup: signupSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    signin: signinSlice.reducer,
    profile: getProfileReducer,
    profileUpdate: updateProfileReducer,
    googleAuth: googleAuthSlice,
    twoFactorAuth: twoFactorAuthSlice.reducer,
    getCart: getCartSlice.reducer,
    deleteItemCart: deleteItemCartSlice.reducer,
    clearCart: clearCartSlice.reducer,
    addCart: addCartSlice.reducer,
    update: updateCartSlice.reducer,
    users: AdminDashboardUsersReducer,
    reviews: ReviewsReducer,
    addreviews: AddReviewsReducer,
    status: ChangeStatusSlice.reducer,
    userstatus: FetchStatusSlice.reducer,
    role: ChangeRoleSlice.reducer,
    search: searchReducer,
    productFetch: productFetchSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productDelete: productDeleteSlice.reducer,
    productAvailability: productAvailabilitySlice.reducer,
    checkout: checkoutSlice.reducer,
    notifications: notificationSlice.reducer,
    addProductToWishlist: addProductToWishlistSlice.reducer,
    getAllProductWishes: getAllProductWishesSlice.reducer,
    recommendedProduct: getRecommendedProductsReducer,
    passwordUpdate: passwordReducer,
    orders: ordersReducer,
    momoPay: momoPaySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductApi.middleware),
});

export default store;
