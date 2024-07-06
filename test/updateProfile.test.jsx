import { screen, waitFor, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AddressDetails from "../src/components/profile/AddressDetails";
import AccountDetails from "../src/components/profile/AccountDetails";
import  store  from "../src/redux/store";
import user from '../src/assets/user.jpg'


describe('update profile', () =>{
    test('should update user profile',async () =>{
        const testAccount = {
            firstname: 'John',
            lastname: 'Smith',
            gender: 'male',
            avatar: user,
        }
        render(
            <BrowserRouter>
            <Provider store={store}>
                <AccountDetails data={testAccount} />
            </Provider>
            </BrowserRouter>
        )
        await waitFor(() =>{
            const account = screen.getByTestId('account-details');
            expect(account).toBeInTheDocument()
        expect(account).toBeInTheDocument()
        })
    })
})
describe('update profile', () =>{
    test('should update user profile',async () =>{
        const testAccount = { billingAddress:{
            province: 'province',
            district: 'district',
            cell: 'cell',
            sector: 'sector',
            street: 'street',
        }}
        render(
            <BrowserRouter>
            <Provider store={store}>
                <AddressDetails billingAddress={testAccount} />
            </Provider>
            </BrowserRouter>
        )
        const account = screen.getByTestId('address-details');
        const button = screen.getByText('save');
        expect(account).toBeInTheDocument()
        fireEvent.click(button)
    })
})