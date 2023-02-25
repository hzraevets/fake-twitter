import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewTweet } from 'views/Timeline/NewTweet';
import { identityDecoratorGenerator, savedIdentity } from 'utils/stories';

export default {
  title: 'Components/NewTweet',
  component: NewTweet,
  args: { savedIdentity },
  decorators: [
    identityDecoratorGenerator(),
  ],
} as ComponentMeta<typeof NewTweet>;

const Template: ComponentStory<typeof NewTweet> = () => (
  <NewTweet/>
);

export const Preview = Template.bind({});
