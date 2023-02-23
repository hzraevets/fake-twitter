import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import { create } from 'react-test-renderer';

import { ThemeToggler } from './ThemeToggler';

describe('ThemeToggler', () => {
  it('render ThemeToggler component', () => {
    render(<ThemeToggler/>);

    // check theme switch button
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('render ThemeToggler to snapshot', () => {
    const renderer = create(<ThemeToggler/>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
