/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Cart from '../src/views/Cart';

const mockStore = configureMockStore([thunk]);

const initialState = {
  getCart: {
    cart: {
      existingItems: {
        1: { id: 1, productName: 'Product 1', price: 10, quantity: 2 },
        2: { id: 2, productName: 'Product 2', price: 15, quantity: 1 },
      },
      cartTotal: 35,
      message: undefined,
    },
  },
  clearCart: { loading: false },
  deleteItemCart: { loading: false },
  update: { loading: false },
  checkout: { loading: false },
  momoPay: { loading: false },
};
const store = mockStore(initialState);

describe('Cart component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
  });

  test('renders cart items correctly', () => {
    const productNames = screen.getAllByTestId('cart-item-name');
    expect(productNames).toHaveLength(2);
    expect(productNames[0]).toHaveTextContent('Product 1');
    expect(productNames[1]).toHaveTextContent('Product 2');

    const prices = screen.getAllByTestId('cart-item-price');
    expect(prices).toHaveLength(2);
    expect(prices[0]).toHaveTextContent('RWF10');
    expect(prices[1]).toHaveTextContent('RWF15');

    const quantity = screen.getAllByTestId('cart-item-number');
    expect(quantity).toHaveLength(2);
    expect(quantity[0]).toHaveTextContent('2');
    expect(quantity[1]).toHaveTextContent('1');
  });

  test('displays correct total amount', () => {
    const totalAmount = screen.getByText('RWF35');
    expect(totalAmount).toBeInTheDocument();
  });
});
