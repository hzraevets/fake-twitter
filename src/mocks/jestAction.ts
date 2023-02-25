import { enableLocalStorageMock, enableMatchMedia } from 'utils/browserMocks';
import { TweetContextInterface } from 'effects/Tweet';
import { storage as identityStorage, testUser } from './identity';
import { nextTweetId, storage as tweetStorage, mockedReadTimeline } from './tweet';

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
    readTimeline: mockedReadTimeline,
    editTweet: () => null,
    deleteTweet: () => null,
  };
}
