import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { Login } from 'views/Login';
import { testUser } from 'mocks/identity';
import { identityDecoratorGenerator, savedIdentity } from 'utils/stories';
import { ThemeProvider } from 'effects/Theme';

export default {
  title: 'Views/Login',
  component: Login,
  decorators: [
    identityDecoratorGenerator(),
    (Story, Context) => (
      <ThemeProvider>
        <Story/>
      </ThemeProvider>
    ),
  ],
  args: { savedIdentity },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => (
  <Login/>
);

export const Preview = Template.bind({});

export const Auto = Template.bind({});

/*
* See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
* to learn more about using the canvasElement to query the DOM
*/
Auto.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const usernameInput = canvas.getByPlaceholderText('username');

  await userEvent.type(usernameInput, testUser.username, {
    delay: 100,
  });

  const passwordInput = canvas.getByPlaceholderText('password');

  await userEvent.type(passwordInput, testUser.password, {
    delay: 100
  });

  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  const submitButton = canvas.getByRole('button');

  await userEvent.click(submitButton);
};
