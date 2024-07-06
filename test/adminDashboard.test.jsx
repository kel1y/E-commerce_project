/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/redux/store';
import AdminDashboard from '../src/views/AdminDashboard';

test('should test landing page', async () => {
  render(
    <Router>
      <Provider store={store}>
        <AdminDashboard />
      </Provider>
    </Router>
  );

  await waitFor(
    async () => {
      expect(await screen.findByTestId('admin_dashboard')).toBeInTheDocument();
      expect(
        await screen.findByTestId('user_table_container')
      ).toBeInTheDocument();
      expect(await screen.findByTestId('user_table')).toBeInTheDocument();
      expect(await screen.findByTestId('user_table_body')).toBeInTheDocument();
      expect(await screen.findByTestId('admin-dashboard-header')).toBeInTheDocument();
      expect(
        await screen.findByTestId('admin-dashboard-container')
      ).toBeInTheDocument();
      expect(
        await screen.findByTestId('all_products')
      ).toBeInTheDocument();


      //   expect(await screen.findByTestId('products_list')).toBeInTheDocument();
      //   expect(await screen.findByTestId('banner')).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
});
