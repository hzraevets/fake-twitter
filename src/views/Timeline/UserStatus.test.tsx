import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
// @ts-ignore
import { create } from 'react-test-renderer';

import { UserStatus } from './UserStatus';
import { enableLocalStorageMock, enableMatchMedia } from 'utils/browserMocks';
import { IdentityProvider } from 'effects/Identity';
import { storage, testUser } from 'mocks/identity';

describe('UserStatus', () => {
  const { firstname, username } = testUser;

  beforeEach(() => {
    enableMatchMedia();
    enableLocalStorageMock();

    // prepare work for identity
    localStorage.setItem('identity', JSON.stringify(storage));
    localStorage.setItem('loginUser', testUser.username);
  });

  it('render UserStatus component', () => {
    // https://reactrouter.com/en/6.8.1/router-components/memory-router
    render((
      <MemoryRouter initialEntries={[`/${username}`]}>
        <Routes>
          <Route
            path=":username"
            element={
              <IdentityProvider>
                <UserStatus/>
              </IdentityProvider>
            }
          />
        </Routes>
      </MemoryRouter>
    ));

    // check first name render
    expect(screen.getByText(firstname)).toBeInTheDocument();
    // check user name render
    expect(screen.getByText(`@${username}`)).toBeInTheDocument();
    // check log out button
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('render UserStatus to snapshot', () => {
    const renderer = create(
      <MemoryRouter initialEntries={[`/${username}`]}>
        <Routes>
          <Route
            path=":username"
            element={
              <IdentityProvider>
                <UserStatus/>
              </IdentityProvider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
