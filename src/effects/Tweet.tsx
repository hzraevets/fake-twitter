import React, { createContext, useState, ReactNode } from 'react';
import getUnixTime from 'date-fns/getUnixTime';

import {
  Tweet,
  TweetStorage,
  CreateNewTweetParams,
  ReadNonDeleteTweetParams,
  ReadNonDeleteTweetResponse,
} from 'models';

export interface TweetContextInterface {
  allTweets: TweetStorage;
  nextTweetId: number;
  addNewTweet: (params: CreateNewTweetParams) => void;
  readTimeline: (params: ReadNonDeleteTweetParams) => Promise<ReadNonDeleteTweetResponse>;
  editTweet: (id: number, content: string) => void;
  deleteTweet: (id: number) => void;
}

const initialTweetStorage: TweetStorage = {
  hashMap: {},
  order: [],
};

const TweetContext = createContext<TweetContextInterface>({
  allTweets: initialTweetStorage,
  nextTweetId: 1,
  addNewTweet: () => null,
  readTimeline: () => Promise.resolve({ data: [] }),
  editTweet: () => null,
  deleteTweet: () => null,
});

const TweetProvider = ({ children }: { children: ReactNode }) => {
  const [ allTweets, setAllTweets ] = useState(initialTweetStorage);
  const [ nextTweetId, setNextTweetId ] = useState(1);

  function addNewTweet(params: CreateNewTweetParams) {
    const now = getUnixTime(new Date());
    const { hashMap, order } = allTweets;

    const newTweet: Tweet = {
      ...params,
      id: nextTweetId,
      createTime: now,
      updateTime: now,
      isDeleted: false,
    };

    setNextTweetId(nextTweetId + 1);
    setAllTweets({
      hashMap: { ...hashMap, [nextTweetId]: newTweet },
      order: [ nextTweetId, ...order ],
    });
  }

  function readTimeline({ start, offset = 1 }: ReadNonDeleteTweetParams) {
    const data: Tweet[] = [];
    let nextCursor: number | null;

    const { hashMap, order } = allTweets;

    for (nextCursor = start; (data.length < offset) && nextCursor < order.length; nextCursor++) {
      const tweet = hashMap[order[nextCursor]];

      if (!tweet.isDeleted) {
        data.push(tweet);
      }
    }

    const res: ReadNonDeleteTweetResponse = { data };

    if (nextCursor < order.length) {
      res.nextCursor = nextCursor;
    }

    return new Promise<ReadNonDeleteTweetResponse>(resolve =>
      setTimeout(() => resolve(res), Math.random() * 1000));
  }

  function editTweet(id: number, content: string) {
    const { hashMap, order } = allTweets;
    const oldTweet = hashMap[id];

    if (!oldTweet) {
      // This should not happen!
      return;
    }

    hashMap[id].content = content;
    hashMap[id].updateTime = getUnixTime(new Date());

    setAllTweets({ hashMap, order });
  }

  function deleteTweet(id: number) {
    const { hashMap } = allTweets;
    let order = allTweets.order;
    const oldTweet = hashMap[id];

    if (!oldTweet) {
      // This should not happen!
      return;
    }

    hashMap[id].isDeleted = true;
    order = order.filter(tid => tid !== id);

    setAllTweets({ hashMap, order });
  }

  return (
    <TweetContext.Provider
      value={{
        allTweets,
        nextTweetId,
        addNewTweet,
        readTimeline,
        editTweet,
        deleteTweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}

export { TweetContext, TweetProvider };
