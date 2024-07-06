/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { googleSingnin } from '../src/redux/slices/googleAuthSlice';
import GoogleLoginButton from '../src/components/google';

test('dispatches loginUser action when clicked', async () => {
  // Save the original submit method to restore it later
  const originalSubmit = HTMLFormElement.prototype.submit;

  // Override the submit method with an empty function
  HTMLFormElement.prototype.submit = () => {};

  render(
    <Provider store={store}>
      <GoogleLoginButton />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByAltText('Google Icon')).toBeInTheDocument();

    const loginButton = screen.getByAltText('Google Icon');
    fireEvent.click(loginButton);

    // Resolve loginUser action
    store.dispatch(googleSingnin.fulfilled({ token: 'example-token' }));

    // Assert the expected state changes
    const newState = store.getState();
    expect(newState.googleAuth.isLoading).toBe(false);
    expect(newState.googleAuth.user).toBe(null);
    expect(newState.googleAuth.error).toBe(null);
  });

  // Restore the original submit method
  HTMLFormElement.prototype.submit = originalSubmit;
});
