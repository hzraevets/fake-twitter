import React from 'react';
import { act } from 'react-dom/test-utils';
import {render, screen} from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
// @ts-ignore
import { create } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { TweetsList } from './TweetsList';
import { timeLineQuery } from 'query/TimeLine';
import { TweetContext } from 'effects/Tweet';
import { prepareTweetProviderPropsWithRead } from 'mocks/jestAction';
import { testUserTweet1, liBaiTweet1 } from 'mocks/tweet';

describe('TweetsList', () => {
  it('render empty TweetList component', async () => {
    /**
     * When testing, code that causes React state updates should be wrapped into act(...):
     *
     *     act(() => {
     *       // fire events that update state
     *     });
     *     // assert on the output
     *
     * This ensures that you're testing the behavior the user would see in the browser.
     * Learn more at https://reactjs.org/link/wrap-tests-with-act
     *
     * also see https://github.com/react-hook-form/react-hook-form/discussions/7125
     **/
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <BrowserRouter>
          <QueryClientProvider client={timeLineQuery}>
            <TweetsList/>
          </QueryClientProvider>
        </BrowserRouter>
      );
    });
  });

  it('render non-empty TweetList component', async () => {
    const providerProps = prepareTweetProviderPropsWithRead();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <BrowserRouter>
          <TweetContext.Provider value={providerProps}>
            <QueryClientProvider client={timeLineQuery}>
              <TweetsList/>
            </QueryClientProvider>
          </TweetContext.Provider>
        </BrowserRouter>
      );
    });

    expect(screen.getByText(liBaiTweet1.content)).toBeInTheDocument();
    expect(screen.getByText(testUserTweet1.content)).toBeInTheDocument();
  });

  it('render empty TweetList to snapshot', () => {
    const renderer = create(
      <BrowserRouter>
        <QueryClientProvider client={timeLineQuery}>
          <TweetsList/>
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('render non-empty TweetList to snapshot', async () => {
    const providerProps = prepareTweetProviderPropsWithRead();

    const renderer = await act(async () => {
      return create(
        <BrowserRouter>
          <TweetContext.Provider value={providerProps}>
            <QueryClientProvider client={timeLineQuery}>
              <TweetsList/>
            </QueryClientProvider>
          </TweetContext.Provider>
        </BrowserRouter>
      );
    });
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
