/* eslint-disable react/jsx-pascal-case */
import React from 'react';

import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store'
import Two_FactorAuth from '../src/views/twoFactorAuth';

test('testing two factor authentication > should render the page', () => {
  render(
    <Router>
      <Provider store={store}>
        <Two_FactorAuth />
      </Provider>
    </Router>,
  );

  expect(screen.getByText('Two Factor Authentication')).toBeInTheDocument();
});