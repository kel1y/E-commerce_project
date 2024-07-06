import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { Layout, Sidebar } from '../src/components';
import store from '../src/redux/store';
import DashboardHeader from '../src/components/DashboardHeader';
import getUserInfo from '../src/utils/getUserInfo';

describe('NavBar', () => {
    test('should test navigation bar', () => {
        render(
            <BrowserRouter>
            <Provider store={store}>
            <Layout />
            </Provider>
            </BrowserRouter>
        )
        waitFor(() =>{
            const navBar = screen.getByTestId('layout-test-id');
            expect(navBar).toBeInTheDocument();
        })
    });
})

describe('Layout',()=>{
    test('should test dashboard',()=>{
    render(
        <BrowserRouter>
        <Provider store={store}>
        <DashboardHeader />
        </Provider>
        </BrowserRouter>
    )
        waitFor(()=>{

            const dashboard = screen.getByTestId('layout-test-id');
            expect(dashboard).toBeInTheDocument();
        })
         getUserInfo('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiODBjY2ViZDUtNzkwNy00ODQwLWE2YWYtNWE3MzhlOGYxZDM1IiwiZW1haWwiOiJib3Jpc0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJzdGF0dXMiOnRydWV9LCJpYXQiOjE2ODUwMjM5OTgsImV4cCI6MTY4NTYyODc5OH0.ubItcZ-iah3PGbYZ5_heYeIUTd4cx-N0h1tuophjVcE')
    });
})
describe('Sidebar', () => {
    test('renders menu items based on user role', () => {
      vi.mock('../src/utils/getUserInfo', () => ({
        __esModule: true,
        default: () => ({ payload: { role: 'seller' } }),
      }));
      vi.mock('react-router-dom',async () => ({
        ...(await vi.importActual('react-router-dom')),
        useLocation: () => ({ pathname: '/dashboard' }),
      }));
  
      render(
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      );
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    });
  });