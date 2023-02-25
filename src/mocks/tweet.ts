import {
  ReadNonDeleteTweetParams,
  ReadNonDeleteTweetResponse,
  Tweet,
  TweetStorage,
} from 'models';

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
  createTime: 1677250735,
  updateTime: 1677250775,
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

export const mockedReadTimeline = ({ start, offset = 1 }: ReadNonDeleteTweetParams) => {
  const dat: Tweet[] = [];
  let nextCursor: number | null;

  const { hashMap, order } = storage;

  for (nextCursor = start; (dat.length < offset) && nextCursor < order.length; nextCursor++) {
    const tweet = hashMap[order[nextCursor]];

    if (!tweet.isDeleted) {
      dat.push(tweet);
    }
  }

  const res: ReadNonDeleteTweetResponse = { data: dat };

  if (nextCursor < order.length) {
    res.nextCursor = nextCursor;
  }

  return Promise.resolve<ReadNonDeleteTweetResponse>(res);
}

