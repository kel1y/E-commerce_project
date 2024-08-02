import React from "react";
import { BrowserRouter  } from "react-router-dom";
import { render,screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import  store  from '../src/redux/store';
import GetProfile from "../src/views/ProfilePage";
import Profile from "../src/components/profile/Profile";

describe ('Profile page ', () => {
    test('Getting user profile',async () =>{
        render(
            <BrowserRouter>
            <Provider store={store}>
            <GetProfile />
            </Provider>
            </BrowserRouter>
            )
            await waitFor(()=>{
                const spinner = screen.findByTestId('spinner')
                expect(spinner).toBeDefined();
                expect(screen.getByTestId('get-profile')).toBeInTheDocument();
            })
        })
    })

    describe('render user profile', () =>{
        it('should render profile', async () =>{
            const testData = {
                province: 'province',
                district: 'district',
                cell: 'cell',
                sector: 'sector',
                street: 'street',
            }
            render(
                <BrowserRouter>
        <Profile data={testData} />
            </BrowserRouter>
        )
        await waitFor(() => {
            const profile = screen.getByTestId('profile');
            expect(profile).toBeDefined();
        })
        
    })
    
})
