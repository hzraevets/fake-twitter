import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { Register } from 'views/Register';
import { notRegisterUser } from 'mocks/identity';
import { identityDecoratorGenerator, savedIdentity } from 'utils/stories';
import { ThemeProvider } from 'effects/Theme';
import './App.css';

export default {
  title: 'Views/Regiser',
  content: Register,
  decorators: [
    identityDecoratorGenerator(),
    (Story, Context) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: { savedIdentity },
} as ComponentMeta<typeof Register>;

const Template: ComponentStory<typeof Register> = (args) => <Register />;

export const Preview = Template.bind({});

export const Auto = Template.bind({});

Auto.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const usernameInput = canvas.getByPlaceholderText('username');

  await userEvent.type(usernameInput, notRegisterUser.username, {
    delay: 100,
  });

  const firstnameInput = canvas.getByPlaceholderText('first name');

  await userEvent.type(firstnameInput, notRegisterUser.firstname, {
    delay: 100,
  });

  const passwordInput = canvas.getByPlaceholderText('password');

  await userEvent.type(passwordInput, notRegisterUser.password, {
    delay: 100,
  });

  const rePasswordInput = canvas.getByPlaceholderText('re-enter password');

  await userEvent.type(rePasswordInput, notRegisterUser.password, {
    delay: 100,
  });

  const submitButton = canvas.getByRole('button');

  await userEvent.click(submitButton);
};
