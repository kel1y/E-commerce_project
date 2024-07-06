/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../src/redux/store';
import Signin from '../src/views/Login';

describe('test signin page', () => {
  test('should test signin page', async () => {
    render(
      <BrowserRouter>
      <Provider store={store}>
        <Signin />
      </Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('signin')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123' },
    });
    fireEvent.submit(screen.getByTestId('signin-form'));
  });
});
