import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import { create } from 'react-test-renderer';

import { Page404 } from './Page404';

describe('Page404', () => {
  it('render Page404 page', () => {
    render(<Page404/>, { wrapper: BrowserRouter });

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Back Home')).toBeInTheDocument();
  });

  it('render Page404 to snapshot', () => {
    const renderer = create(
      <BrowserRouter>
        <Page404/>
      </BrowserRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
