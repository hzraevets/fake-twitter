import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
// @ts-ignore
import { create } from 'react-test-renderer';

import { App } from './App';
import { ThemeProvider } from 'effects/Theme';
import { IdentityProvider } from 'effects/Identity';
import { TweetProvider } from 'effects/Tweet';
import { timeLineQuery } from 'query/TimeLine';

describe('App', () => {
  it('render App correctly', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <TweetProvider>
          <ThemeProvider>
            <IdentityProvider>
              <QueryClientProvider client={timeLineQuery}>
                <App/>
              </QueryClientProvider>
            </IdentityProvider>
          </ThemeProvider>
        </TweetProvider>
      );
    });
  });

  it('render App to snapshot', () => {
    const renderer = create(<App/>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
