import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
// @ts-ignore
import { create } from 'react-test-renderer';

import { Timeline } from './';
import { enableLocalStorageMock, enableMatchMedia } from 'utils/browserMocks';
import { IdentityProvider } from 'effects/Identity';
import { timeLineQuery } from 'query/TimeLine';
import { storage, testUser } from 'mocks/identity';

describe('Timeline', () => {
  const { username } = testUser;

  beforeEach(() => {
    enableMatchMedia();
    enableLocalStorageMock();

    // prepare work for identity
    localStorage.setItem('identity', JSON.stringify(storage));
    localStorage.setItem('loginUser', testUser.username);
  });

  it('render Timeline page', async () => {

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // https://reactrouter.com/en/6.8.1/router-components/memory-router
      render((
        <MemoryRouter initialEntries={[`/${username}`]}>
          <Routes>
            <Route
              path=":username"
              element={
                <QueryClientProvider client={timeLineQuery}>
                  <IdentityProvider>
                    <Timeline/>
                  </IdentityProvider>
                </QueryClientProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      ));
    });
  });

  it('render Timeline to snapshot', async () => {
    const renderer = await act(async () => {
      return create(
        <MemoryRouter initialEntries={[`/${username}`]}>
          <Routes>
            <Route
              path=":username"
              element={
                <QueryClientProvider client={timeLineQuery}>
                  <IdentityProvider>
                    <Timeline/>
                  </IdentityProvider>
                </QueryClientProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
