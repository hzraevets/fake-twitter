import { enableLocalStorageMock, enableMatchMedia } from 'utils/browserMocks';
import { TweetContextInterface } from 'effects/Tweet';
import {ReadNonDeleteTweetParams, ReadNonDeleteTweetResponse, Tweet} from 'models';
import { storage as identityStorage, testUser } from './identity';
import { nextTweetId, storage as tweetStorage } from './tweet';

export function prepareTweetProviderPropsWithoutCRUD(): TweetContextInterface {
  enableMatchMedia();
  enableLocalStorageMock();

  // prepare work for identity
  localStorage.setItem('identity', JSON.stringify(identityStorage));
  localStorage.setItem('loginUser', testUser.username);

  // prepare tweet provider props and return
  return {
    allTweets: tweetStorage,
    nextTweetId,
    addNewTweet: () => null,
    readTimeline: () => Promise.resolve({ data: [] }),
    editTweet: () => null,
    deleteTweet: () => null,
  };
}

export function prepareTweetProviderPropsWithRead(): TweetContextInterface {
  enableMatchMedia();
  enableLocalStorageMock();

  // prepare work for identity
  localStorage.setItem('identity', JSON.stringify(identityStorage));
  localStorage.setItem('loginUser', testUser.username);

  // prepare tweet provider props and return
  return {
    allTweets: tweetStorage,
    nextTweetId,
    addNewTweet: () => null,
    readTimeline: ({ start, offset = 1 }: ReadNonDeleteTweetParams) => {
      const dat: Tweet[] = [];
      let nextCursor: number | null;

      const { hashMap, order } = tweetStorage;

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
    },
    editTweet: () => null,
    deleteTweet: () => null,
  };
}
