import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { within, userEvent } from '@storybook/testing-library';

import { Timeline } from 'views/Timeline';
import { testUser, liBai } from 'mocks/identity';
import {
  savedIdentity,
  identityDecoratorWithMemoryRouterGenerator,
  identityDecoratorGenerator,
} from 'utils/stories';
import { timeLineQuery } from 'query/TimeLine';
import { TweetContext, TweetProvider } from 'effects/Tweet';
import {
  storage as allTweets,
  nextTweetId,
  mockedReadTimeline as readTimeline,
} from 'mocks/tweet';
import { Page404 } from 'views/Page404';
import { ThemeProvider } from 'effects/Theme';

export default {
  title: 'Views/Timeline',
  component: Timeline,
  args: { savedIdentity },
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = () => (
  <Timeline/>
);

export const Preview = Template.bind({});

Preview.decorators = [
  identityDecoratorWithMemoryRouterGenerator(
    `/${testUser.username}`,
    ':username',
    { loginUser: testUser.username },
    (element) => {
      return (
        <div className="app relative h-screen w-full min-w-min bg-blue-400 dark:bg-black text-black dark:text-white">
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
              {element}
            </QueryClientProvider>
          </TweetContext.Provider>
        </div>
      );
    },
  ),
  (Story, Context) => (
    <ThemeProvider>
      <Story/>
    </ThemeProvider>
  ),
];

export const LiBai = Template.bind({});

LiBai.decorators = [
  identityDecoratorGenerator(
    { loginUser: liBai.username },
    (element) => {
      return (
        <div className="app relative h-screen w-full min-w-min bg-blue-400 dark:bg-black text-black dark:text-white">
          <TweetProvider>
            <QueryClientProvider client={timeLineQuery}>
              <MemoryRouter initialEntries={[`/${liBai.username}`]}>
                <Routes>
                  <Route
                    path="*"
                    element={<Page404/>}
                  />
                  <Route
                    path=":username"
                    element={element}
                  />
                </Routes>
              </MemoryRouter>
            </QueryClientProvider>
          </TweetProvider>
        </div>
      );
    }
  ),
  (Story, Context) => (
    <ThemeProvider>
      <Story/>
    </ThemeProvider>
  ),
];

LiBai.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const textarea = canvas.getByPlaceholderText('What\'s happening?');
  const button = canvas.getByRole('button');

  const tweets = [
    '君不见黄河之水天上来，奔流到海不复回。',
    '君不见高堂明镜悲白发，朝如青丝暮成雪。',
    '人生得意须尽欢，莫使金樽空对月。',
    '天生我材必有用，千金散尽还复来。',
    '烹羊宰牛且为乐，会须一饮三百杯。',
    '岑夫子，丹秋生，将进酒，杯莫停。',
    '与君歌一曲，请君为我倾耳听。',
    '钟鼓馔玉不足贵，但愿长醉不复醒。',
    '古来圣贤皆寂寞，惟有饮者留其名。',
    '陈王昔时宴平乐，斗酒十千姿欢谑。',
    '主人何为言少钱，径须沽取对君酌。',
    '五花马，千金裘，',
    '呼儿将出换美酒，与尔同销万古愁。',
  ];

  for (let i = 0; i < tweets.length; i++) {
    await userEvent.type(textarea, tweets[i], {
      delay: tweets[i].length * 20,
    });

    await userEvent.click(button);
  }
};
