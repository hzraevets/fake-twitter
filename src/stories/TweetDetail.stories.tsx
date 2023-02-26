import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TweetDetail } from 'views/TweetDetail';
import { ThemeProvider } from 'effects/Theme';
import { testUser } from 'mocks/identity';
import { testUserTweet1, liBaiTweet1 } from 'mocks/tweet';
import { savedIdentity, identityDecoratorWithMemoryRouterGenerator } from 'utils/stories';
import { TweetContext } from 'effects/Tweet';
import { nextTweetId, storage as tweetStorage } from 'mocks/tweet';
import './App.css';

const dynamicDecoratorGen = (tweetId: number) =>
  identityDecoratorWithMemoryRouterGenerator(`/tweet/${tweetId}`, 'tweet/:id', { loginUser: testUser.username }, (element) => (
    <ThemeProvider>
      <TweetContext.Provider
        value={{
          allTweets: tweetStorage,
          nextTweetId,
          addNewTweet: () => null,
          readTimeline: () => Promise.resolve({ data: [] }),
          editTweet: () => null,
          deleteTweet: () => null,
        }}
      >
        {element}
      </TweetContext.Provider>
    </ThemeProvider>
  ));

export default {
  title: 'Views/TweetDetail',
  component: TweetDetail,
  args: { savedIdentity },
} as ComponentMeta<typeof TweetDetail>;

const Template: ComponentStory<typeof TweetDetail> = () => <TweetDetail />;

export const ViewOwnTweet = Template.bind({});

ViewOwnTweet.decorators = [dynamicDecoratorGen(testUserTweet1.id)];

export const ViewOthersTweet = Template.bind({});

ViewOthersTweet.decorators = [dynamicDecoratorGen(liBaiTweet1.id)];
