/* eslint-disable import/no-named-as-default */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Reviews from '../src/components/Reviews';

// Mock Redux store
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  reviews: {
    reviews: [
      {
        id: 1,
        avatar: 'avatar.jpg',
        firstname: 'John',
        lastname: 'Doe',
        review: {
          ratings: 4,
          createdAt: '2023-06-15',
          feedback: 'Great product!',
        },
      },
    ],
    loading: false,
  },
});

describe('Reviews component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );
  });

  it('should render the Reviews component', () => {
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('should display reviews', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
  });
  it('should open the modal when "Write a review" button is clicked', () => {
    // Arrange
    const writeReviewButton = screen.getByText('Write a review');

    // Act
    fireEvent.click(writeReviewButton);

    expect(screen.getByLabelText('Rating:')).toBeInTheDocument();
    expect(screen.getByLabelText('Feedback:')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });
  it('should display validation errors when submitting an empty form', () => {
    // Arrange
    const writeReviewButton = screen.getByText('Write a review');
    fireEvent.click(writeReviewButton);
    expect(screen.getByLabelText('Rating:')).toBeInTheDocument();

    // Act
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    // Assert
    expect(screen.getByText('Rating is required')).toBeInTheDocument();
  });
});
