/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store  from '../src/redux/store';
import Signup from '../src/views/Signup';

describe('test signup page', () => {
  test('should test signup page', async () => {
    render(
      <BrowserRouter>
      <Provider store={store}>
        <Signup />
      </Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('signup')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Firstname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lastname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Firstname'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Lastname'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123' },
    });
    fireEvent.submit(screen.getByTestId('signup-form'));
  });
});
