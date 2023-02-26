import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Login } from 'views/Login';
import { identityDecoratorGenerator, savedIdentity, loginAction } from 'utils/stories';
import { ThemeProvider } from 'effects/Theme';
import './App.css';

export default {
  title: 'Views/Login',
  component: Login,
  decorators: [
    identityDecoratorGenerator(),
    (Story, Context) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: { savedIdentity },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login />;

export const Preview = Template.bind({});

export const Auto = Template.bind({});

Auto.play = loginAction;
