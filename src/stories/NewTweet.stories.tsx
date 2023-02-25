import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewTweet } from 'views/Timeline/NewTweet';
import { identityDecoratorGenerator, savedIdentity } from 'utils/stories';
import { timeLineQuery } from 'query/TimeLine';

export default {
  title: 'Components/NewTweet',
  component: NewTweet,
  args: { savedIdentity },
  decorators: [identityDecoratorGenerator()],
} as ComponentMeta<typeof NewTweet>;

const Template: ComponentStory<typeof NewTweet> = () => (
  <QueryClientProvider client={timeLineQuery}>
    <NewTweet />
  </QueryClientProvider>
);

export const Preview = Template.bind({});
