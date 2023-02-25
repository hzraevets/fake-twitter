import React, { useState } from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { PartialStoryFn, StoryContext } from '@storybook/csf';
import { Args, ReactFramework } from '@storybook/react';

import { UserStorage } from 'models';
import { md5 } from 'utils/md5';
import { IdentityContext, IdentityContextInterface } from 'effects/Identity';
import { liBai, testUser } from 'mocks/identity';
import { Page404 } from 'views/Page404';

type AddWrapperRender = (e: JSX.Element) => React.ReactElement;

export const identityDecoratorGenerator = (
  providerValue: Partial<IdentityContextInterface> = {},
  wrapperCallback: AddWrapperRender | null = null,
) => (
  Story: PartialStoryFn<ReactFramework, Args>,
  Context: StoryContext<ReactFramework, Args>,
) => {
  const contextIdentity = Context.args.savedIdentity;
  const storage: UserStorage = {};

  if (Array.isArray(contextIdentity)) {
    contextIdentity.forEach(user => {
      if (user && user.username && user.firstname && user.password) {
        storage[user.username] = {
          ...user,
          password: md5(user.password),
        };
      }
    });
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ identity, setIdentity ] = useState(storage);

  const commonPart = (
    <IdentityContext.Provider
      value={{
        identity,
        setIdentity,
        loginUser: null,
        setLoginUser: () => null,
        logout: () => null,
        register: () => ({}),
        ...providerValue,
      }}
    >
      <Story/>
    </IdentityContext.Provider>
  );

  if (!wrapperCallback) {
    return (
      <BrowserRouter>
        {commonPart}
      </BrowserRouter>
    );
  }

  return wrapperCallback(commonPart);
};

export const savedIdentity = [
  { ...testUser },
  { ...liBai },
];

export const identityDecoratorWithMemoryRouterGenerator = (
  initialUrl: string,
  routePath: string,
  providerValue: Partial<IdentityContextInterface> = {},
  wrapperCallback: AddWrapperRender | null = null,
) => identityDecoratorGenerator(providerValue, (element) => {
  const view = (
    <MemoryRouter initialEntries={[initialUrl]}>
      <Routes>
        <Route
          path="*"
          element={<Page404/>}
        />
        <Route
          path={routePath}
          element={element}
        />
      </Routes>
    </MemoryRouter>
  );

  if (!wrapperCallback) {
    return view;
  }

  return wrapperCallback(view);
});
