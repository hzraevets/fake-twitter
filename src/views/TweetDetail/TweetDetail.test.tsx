import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
// @ts-ignore
import { create } from 'react-test-renderer';

import { TweetDetail } from './';
import { IdentityProvider } from 'effects/Identity';
import { TweetContextInterface, TweetContext } from 'effects/Tweet';
import { testUserTweet1, liBaiTweet1 } from 'mocks/tweet';
import { prepareTweetProviderPropsWithoutCRUD } from 'mocks/action';

const customRender = (
  tweetId: number,
  children: ReactNode,
  providerProps: TweetContextInterface,
) => render(
  <MemoryRouter initialEntries={[`/tweet/${tweetId}`]}>
    <Routes>
      <Route
        path="tweet/:id"
        element={(
          <TweetContext.Provider value={providerProps}>
            {children}
          </TweetContext.Provider>
        )}
      />
    </Routes>
  </MemoryRouter>
);

const snapshotCreate = (
  tweetId: number,
  children: ReactNode,
  providerProps: TweetContextInterface,
) => create(
  <MemoryRouter initialEntries={[`/tweet/${tweetId}`]}>
    <Routes>
      <Route
        path="tweet/:id"
        element={(
          <TweetContext.Provider value={providerProps}>
            {children}
          </TweetContext.Provider>
        )}
      />
    </Routes>
  </MemoryRouter>
);

describe('TweetDetail', () => {
  let providerProps: TweetContextInterface;

  beforeEach(() => {
    providerProps = prepareTweetProviderPropsWithoutCRUD();
  });

  it('render login user own tweet with TweetDetail page', () => {
    const { id, content, firstname } = testUserTweet1;

    customRender(id, (
      <IdentityProvider>
        <TweetDetail/>
      </IdentityProvider>
    ), providerProps);

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(firstname)).toBeInTheDocument();
    expect(screen.getByText(`Tweet id: ${id}`)).toBeInTheDocument();

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('render other user tweet with TweetDetail page', () => {
    const { id, content, firstname } = liBaiTweet1;

    customRender(liBaiTweet1.id, (
      <IdentityProvider>
        <TweetDetail/>
      </IdentityProvider>
    ), providerProps);

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(firstname)).toBeInTheDocument();
    expect(screen.getByText(`Tweet id: ${id}`)).toBeInTheDocument();

    expect(screen.queryByText('Edit')).toBeNull();
    expect(screen.queryByText('Delete')).toBeNull();
  });

  it('render login user own tweet to snapshot', () => {
    const { id } = testUserTweet1;
    const renderer = snapshotCreate(id, (
      <IdentityProvider>
        <TweetDetail/>
      </IdentityProvider>
    ), providerProps);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('render other user tweet to snapshot', () => {
    const { id } = liBaiTweet1;
    const renderer = snapshotCreate(id, (
      <IdentityProvider>
        <TweetDetail/>
      </IdentityProvider>
    ), providerProps);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
