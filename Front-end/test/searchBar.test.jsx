import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { vi } from 'vitest'
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../src/components/search/SearchBar';
import { searchProduct } from '../src/redux/slices/product/searchProduct';
import { fetchCategories } from '../src/redux/slices/product/categories';
import store from '../src/redux/store';

vi.mock('react-redux', async() => ({
    ...(await vi.importActual('react-redux')),
  useDispatch: vi.fn(),
}));

vi.mock('../src/redux/slices/product/searchProduct', async() => ({
    ...(await vi.importActual('../src/redux/slices/product/searchProduct')),
  searchProduct: vi.fn(),
}));

vi.mock('../src/redux/slices/product/categories', async() => ({
    ...(await vi.importActual('../src/redux/slices/product/categories')),
    fetchCategories: vi.fn()
}));

describe('SearchBar', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    searchProduct.mockClear();
    fetchCategories.mockClear();
  });

  it('should dispatch searchProduct action and navigate on search button click', async () => {
    render(
        <BrowserRouter>
    <Provider store={store} >
    <SearchBar />
    </Provider>
        </BrowserRouter>
    );

    fetchCategories.mockResolvedValueOnce({});
    searchProduct.mockResolvedValueOnce({});

    fireEvent.change(screen.getByTestId('input-search', { name: 'searchProduct' }), {
      target: { value: 'example' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'options' }));
    fireEvent.change(screen.getByPlaceholderText('description'), {
      target: { value: 'example description' },
    });
    fireEvent.change(screen.getByPlaceholderText('minimum price'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByPlaceholderText('maximum price'), {
      target: { value: '100' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'search' }));
    await waitFor(() => {
      expect(searchProduct).toHaveBeenCalledWith({
        name: 'example',
        description: 'example description',
        minPrice: '10',
        maxPrice: '100',
      });
    });
  });
});