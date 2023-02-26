import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserStatus } from 'views/Timeline/UserStatus';
import { testUser, liBai } from 'mocks/identity';
import { savedIdentity, identityDecoratorWithMemoryRouterGenerator } from 'utils/stories';
import { ThemeProvider } from 'effects/Theme';
import './App.css';

export default {
  title: 'Components/UserStatus',
  component: UserStatus,
  args: { savedIdentity },
} as ComponentMeta<typeof UserStatus>;

const Template: ComponentStory<typeof UserStatus> = () => <UserStatus />;

export const TestUser = Template.bind({});

TestUser.decorators = [
  identityDecoratorWithMemoryRouterGenerator(`/${testUser.username}`, ':username', { loginUser: testUser.username }),
  (Story, Context) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];

export const LiBai = Template.bind({});

LiBai.decorators = [
  identityDecoratorWithMemoryRouterGenerator(`/${liBai.username}`, ':username', { loginUser: liBai.username }),
  (Story, Context) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
