import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import { create } from 'react-test-renderer';

import { NewTweet } from './NewTweet';

describe('NewTweet', () => {
  it('render NewTweet component', () => {
    render(<NewTweet/>);

    // Tweet button
    expect(screen.getByText('Tweet')).toBeInTheDocument();
    // textarea
    expect(screen.getByPlaceholderText('What\'s happening?')).toBeInTheDocument();
  });

  it('render NewTweet to snapshot', () => {
    const renderer = create(<NewTweet/>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
