import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('renders correctly, with a title', () => {
    expect(screen.getByText('Profile List')).toBeInTheDocument();
  });

  it('renders buttons to edit profiles', () => {
    expect(screen.getAllByTestId('addProfile').length).toBe(1);
    expect(screen.getAllByTestId('moveDownProfile').length).toBe(1);
    expect(screen.getAllByTestId('moveUpProfile').length).toBe(1);
  });

  it('shows default profiles', () => {
    expect(screen.getAllByText('default').length).toBeGreaterThan(0);
    expect(screen.getAllByText('game').length).toBeGreaterThan(0);
    expect(screen.getAllByText('movie').length).toBeGreaterThan(0);
    expect(screen.getAllByText('music').length).toBeGreaterThan(0);
  });
});
