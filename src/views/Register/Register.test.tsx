import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import { create } from 'react-test-renderer';

import { Register } from './';

describe('Register', () => {
  it('render Register page', () => {
    render(<Register/>, { wrapper: BrowserRouter });

    // Page should show the title
    expect(screen.getByText('Create New Account')).toBeInTheDocument();
    // and the Register button
    expect(screen.getByText('Register')).toBeInTheDocument();
    // and the link to jump back to login page
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    // check <input/> element in the page
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('re-enter password')).toBeInTheDocument();
  });

  it('render Register to snapshot', () => {
    const renderer = create(
      <BrowserRouter>
        <Register/>
      </BrowserRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
