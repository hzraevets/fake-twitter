import React from 'react';
import { QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import { create } from 'react-test-renderer';

import { NewTweet } from './NewTweet';
import { timeLineQuery } from 'query/TimeLine';

describe('NewTweet', () => {
  it('render NewTweet component', () => {
    render(
      <QueryClientProvider client={timeLineQuery}>
        <NewTweet/>
      </QueryClientProvider>
    );

    // Tweet button
    expect(screen.getByText('Tweet')).toBeInTheDocument();
    // textarea
    expect(screen.getByPlaceholderText('What\'s happening?')).toBeInTheDocument();
  });

  it('render NewTweet to snapshot', () => {
    const renderer = create(
      <QueryClientProvider client={timeLineQuery}>
        <NewTweet/>
      </QueryClientProvider>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
