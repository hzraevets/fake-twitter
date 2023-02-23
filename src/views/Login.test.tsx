import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import { create } from 'react-test-renderer';

import { Login } from './Login';

describe('Login', () => {
  it('render Login page', () => {
    render(<Login/>, { wrapper: BrowserRouter });

    // Page should show the title
    expect(screen.getByText('Welcome to Fake Twitter!')).toBeInTheDocument();
    // and the Login button
    expect(screen.getByText('Login')).toBeInTheDocument();
    // and the link to jump to register page
    expect(screen.getByText('Create new account')).toBeInTheDocument();
    // check <input/> element in the page
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('render Login to snapshot', () => {
    const renderer = create(
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('render Login page and test validation error message', async () => {
    render(<Login/>, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Please enter username')).toBeInTheDocument();
    });
  });
});
