import { QueryClient } from 'react-query';

import { ReadNonDeleteTweetParams, ReadNonDeleteTweetResponse } from 'models';

export const timeLine = new QueryClient();

export const generateFetchTimeline = (
  readTimeline:  (params: ReadNonDeleteTweetParams) => Promise<ReadNonDeleteTweetResponse>
) => ({ pageParam = 0 }) => {
  return readTimeline({ start: pageParam });
}

export const clearThenReFetch = async (
  readTimeline:  (params: ReadNonDeleteTweetParams) => Promise<ReadNonDeleteTweetResponse>
) => {
  timeLine.clear();

  await setTimeout(() => null, 500);

  timeLine.prefetchInfiniteQuery('timeline', generateFetchTimeline(readTimeline), {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });
}
