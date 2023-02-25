import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeToggler } from 'components/ThemeToggler';
import { ThemeProvider } from 'effects/Theme';

export default {
  title: 'Components/ThemeToggler',
  component: ThemeToggler,
} as ComponentMeta<typeof ThemeToggler>;

const Template: ComponentStory<typeof ThemeToggler> = (args) => (
  <ThemeToggler/>
);

export const SwitchTheme = Template.bind({});

SwitchTheme.args = {
  description: 'Try to click switch button at right-top corner',
};

SwitchTheme.decorators = [
  (Story, Context) => {
    const { description } = Context.args;

    return (
      <ThemeProvider>
        <div className="app relative h-24 w-full min-w-min bg-blue-400 dark:bg-black text-black dark:text-white">
          <h1 className="text-2xl font-bold">{ description }</h1>
          <Story/>
        </div>
      </ThemeProvider>
    );
  }
];
