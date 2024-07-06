import React from "react";
import "@testing-library/jest-dom";
import "jest-environment-jsdom";
import { expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store  from '../src/redux/store';
import UpdatePassword from "../src/views/updatePswd";




describe("testing update password from", ()=>{
    test("render from with input and button field", async() =>{
        render(
            <Provider store={store}>
             <UpdatePassword />
            </Provider>
          );
        const oldPassword = screen.getByPlaceholderText("Old Password");
        const newPassword = screen.getByPlaceholderText("New Password");
        const confirmPassword = screen.getByPlaceholderText("confirm Password")
        const button = screen.getByRole('button', {type: /submit /i});

        expect(oldPassword).toBeInTheDocument();
        expect(newPassword).toBeInTheDocument();
        expect(confirmPassword).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })
});