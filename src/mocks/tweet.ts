import { Tweet, TweetStorage } from 'models';

export const testUserTweet1: Tweet = {
  id: 1,
  author: 'testUser',
  firstname: 'Test',
  content: 'Hello, world!',
  createTime: 1677073172,
  updateTime: 1677073172,
  isDeleted: false,
};

export const liBaiTweet1: Tweet = {
  id: 2,
  author: 'liBai',
  firstname: 'Li',
  content: '抽刀断水水更流，举杯销愁愁更愁',
  createTime: 1677073926,
  updateTime: 1677073975,
  isDeleted: false,
};

export const storage: TweetStorage = {
  hashMap: {
    [testUserTweet1.id]: testUserTweet1,
    [liBaiTweet1.id]: liBaiTweet1,
  },
  order: [
    liBaiTweet1.id,
    testUserTweet1.id,
  ],
};

export const nextTweetId = 3;
