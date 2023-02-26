import React, { useState } from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { PartialStoryFn, StoryContext, PlayFunction } from '@storybook/csf';
import { Args, ReactFramework } from '@storybook/react';

import { UserStorage } from 'models';
import { md5 } from 'utils/md5';
import { IdentityContext, IdentityContextInterface } from 'effects/Identity';
import { liBai, testUser } from 'mocks/identity';
import { Page404 } from 'views/Page404';
import { userEvent, within } from '@storybook/testing-library';

type AddWrapperRender = (e: JSX.Element) => React.ReactElement;

export const identityDecoratorGenerator =
  (providerValue: Partial<IdentityContextInterface> = {}, wrapperCallback: AddWrapperRender | null = null) =>
  (Story: PartialStoryFn<ReactFramework, Args>, Context: StoryContext<ReactFramework, Args>) => {
    const contextIdentity = Context.args.savedIdentity;
    const storage: UserStorage = {};

    if (Array.isArray(contextIdentity)) {
      contextIdentity.forEach((user) => {
        if (user && user.username && user.firstname && user.password) {
          storage[user.username] = {
            ...user,
            password: md5(user.password),
          };
        }
      });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [identity, setIdentity] = useState(storage);

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
        <Story />
      </IdentityContext.Provider>
    );

    if (!wrapperCallback) {
      return <BrowserRouter>{commonPart}</BrowserRouter>;
    }

    return wrapperCallback(commonPart);
  };

export const savedIdentity = [{ ...testUser }, { ...liBai }];

export const identityDecoratorWithMemoryRouterGenerator = (
  initialUrl: string,
  routePath: string,
  providerValue: Partial<IdentityContextInterface> = {},
  wrapperCallback: AddWrapperRender | null = null
) =>
  identityDecoratorGenerator(providerValue, (element) => {
    const view = (
      <MemoryRouter initialEntries={[initialUrl]}>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path={routePath} element={element} />
        </Routes>
      </MemoryRouter>
    );

    if (!wrapperCallback) {
      return view;
    }

    return wrapperCallback(view);
  });

/*
 * See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const loginAction: PlayFunction<ReactFramework, unknown> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const usernameInput = canvas.getByPlaceholderText('username');

  await userEvent.type(usernameInput, testUser.username, {
    delay: 100,
  });

  const passwordInput = canvas.getByPlaceholderText('password');

  await userEvent.type(passwordInput, testUser.password, {
    delay: 100,
  });

  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  const submitButton = canvas.getByRole('button');

  await userEvent.click(submitButton);
};
