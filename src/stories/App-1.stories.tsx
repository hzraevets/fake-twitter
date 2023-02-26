import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QueryClientProvider } from 'react-query';

import { App } from 'App';
import { ThemeProvider } from 'effects/Theme';
import { IdentityProvider } from 'effects/Identity';
import { TweetProvider } from 'effects/Tweet';
import { timeLineQuery } from 'query/TimeLine';
import { storage as identityStorage, testUser, liBai } from 'mocks/identity';
import './App.css';

const loaderClear = async () => {
  // clear identity
  localStorage.setItem('identity', '{}');
  // clear loginUser
  localStorage.removeItem('loginUser');
  // reset theme
  localStorage.removeItem('theme');

  return {};
};

const presetIdentityArgs = {
  testUser,
  liBai,
};

const presetIdentityArgTypes = {
  testUser: {
    control: {
      type: 'object',
    },
  },
  liBai: {
    control: {
      type: 'object',
    },
  },
};

const loaderPresetIdentity = async () => {
  localStorage.setItem('identity', JSON.stringify(identityStorage));
  return {};
};

const loaderPresetLoggedInAsTestUser = async () => {
  await loaderPresetIdentity();

  localStorage.setItem('loginUser', testUser.username);

  return {};
};

export default {
  title: 'Stories/Common',
  component: App,
  decorators: [
    (Story, Context) => (
      <TweetProvider>
        <ThemeProvider>
          <IdentityProvider>
            <QueryClientProvider client={timeLineQuery}>
              <Story />
            </QueryClientProvider>
          </IdentityProvider>
        </ThemeProvider>
      </TweetProvider>
    ),
  ],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const Default = Template.bind({});

Default.loaders = [loaderClear];

export const DarkTheme = Template.bind({});

DarkTheme.loaders = [
  loaderClear,
  async () => {
    localStorage.setItem('theme', 'dark');
    return {};
  },
];

export const Preset = Template.bind({});

Preset.loaders = [loaderClear, loaderPresetIdentity];

Preset.args = presetIdentityArgs;
Preset.argTypes = presetIdentityArgTypes;

export const LoggedIn = Template.bind({});

LoggedIn.loaders = [loaderClear, loaderPresetLoggedInAsTestUser];

LoggedIn.args = presetIdentityArgs;
LoggedIn.argTypes = presetIdentityArgTypes;
