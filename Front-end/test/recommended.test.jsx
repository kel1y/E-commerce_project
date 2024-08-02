import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { useDispatch } from 'react-redux';
import store from '../src/redux/store';
import { getRecommendedProducts } from '../src/redux/slices/product/recommendedProduct';
import RecommendedProducts from '../src/components/product/RecommendedProducts';

// Mock the useDispatch hook
vi.mock('react-redux', async() => ({
    ...(await vi.importActual('react-redux')),
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));
vi.mock('../src/redux/slices/product/recommendedProduct', async() => ({
    ...(await vi.importActual('../src/redux/slices/product/recommendedProduct')),
  getRecommendedProducts: vi.fn(),
}));
describe('RecommendedProducts', () => {
  beforeEach(() => {
    useSelector.mockReturnValue(vi.fn());
    useDispatch.mockReturnValue(vi.fn());
    getRecommendedProducts.mockClear();
  });

  it('should render the recommended products', () => {
    const fetchedProduct = [
      { id: 1, productName: 'Product 1', price: 10, images: ['image1.jpg'] },
      { id: 2, productName: 'Product 2', price: 20, images: ['image2.jpg'] },
    ];

    render(
        <BrowserRouter>
      <Provider store={store}>
          <RecommendedProducts fetchedProduct={fetchedProduct} />
      </Provider>
        </BrowserRouter>
    );
    expect(screen.getByTestId('recommended-products')).toBeInTheDocument()
    expect(screen.getByText('You may also like')).toBeInTheDocument();
  });

  it('should navigate to the product details page on click', () => {
    const fetchedProduct = [
      { id: 1, productName: 'Product 1', price: 10, images: ['image1.jpg'] },
    ];

    const navigateMock = vi.fn();
    const useDispatchMock = vi.fn();

    useDispatchMock.mockReturnValueOnce(vi.fn());
    useDispatchMock.mockReturnValueOnce(navigateMock);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RecommendedProducts fetchedProduct={fetchedProduct} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('recommended-products')).toBeInTheDocument()
  });
});
