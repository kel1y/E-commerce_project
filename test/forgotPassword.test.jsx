/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Forgot_Password from '../src/views/ForgotPassword';

describe('test forgot-password page', () => {
  test('should test forgot-password page', async () => {
    render(
      <Provider store={store}>
        <Forgot_Password />
      </Provider>
    );
    expect(screen.getByTestId('forgot-password')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Forgot your password')).toBeInTheDocument();
    expect(
      screen.getByText(
        'No need to worry, fill out your email address and we’ll send you the password-reset instructions.'
      )
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'gatete@gmail.com' },
    });
    fireEvent.submit(screen.getByTestId('forgot-password-form'));
  });
});
