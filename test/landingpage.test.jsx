/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/redux/store';
import LandingPage from '../src/views/LandingPage';
import { HeroBanner } from '../src/components';

test('should test landing page', async () => {
  render(
    <Router>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </Router>
  );

  await waitFor(
    async () => {
      expect(await screen.findByTestId('landing-page')).toBeInTheDocument();
      expect(
        await screen.findByTestId('products-container')
      ).toBeInTheDocument();
      expect(await screen.findByTestId('products-heading')).toBeInTheDocument();
      expect(await screen.findByTestId('products_list')).toBeInTheDocument();
      expect(await screen.findByTestId('banner')).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
});
