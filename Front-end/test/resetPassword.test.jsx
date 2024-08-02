/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Reset_Password from '../src/views/ResetPassword';

describe('test forgot-password page', () => {
  test('should test forgot-password page', async () => {
    render(
      <Provider store={store}>
        <Reset_Password />
      </Provider>
    );
    expect(screen.getByTestId('forgot-password')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('New Password');
    expect(input).toBeInTheDocument();
    expect(
      screen.getByText(
        'Fill out your new password and confirm it in their respective fields.'
      )
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Confirm New Password')
    ).toBeInTheDocument();

    fireEvent.submit(screen.getByTestId('forgot-password-form'));
  });
});
