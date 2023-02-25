import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

import { TweetsList } from 'views/Timeline/TweetsList';
import { identityDecoratorGenerator, savedIdentity } from 'utils/stories';
import { timeLineQuery } from 'query/TimeLine';
import { TweetContext } from 'effects/Tweet';
import {
  storage as allTweets,
  nextTweetId,
  mockedReadTimeline as readTimeline,
} from 'mocks/tweet';

export default {
  title: 'Components/TweetsList',
  component: TweetsList,
  args: { savedIdentity },
  decorators: [
    identityDecoratorGenerator({}, (element) => (
      <BrowserRouter>
        <TweetContext.Provider
          value={{
            allTweets,
            nextTweetId,
            readTimeline,
            addNewTweet: () => null,
            editTweet: () => null,
            deleteTweet: () => null,
          }}
        >
          <QueryClientProvider client={timeLineQuery}>
            <div id="scrollableDiv">{element}</div>
          </QueryClientProvider>
        </TweetContext.Provider>
      </BrowserRouter>
    )),
  ],
} as ComponentMeta<typeof TweetsList>;

const Template: ComponentStory<typeof TweetsList> = () => (
  <TweetsList/>
);

export const Preview = Template.bind({});
