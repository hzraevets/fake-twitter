import { InfiniteData, QueryClient } from 'react-query';
import getUnixTime from 'date-fns/getUnixTime';

import {
  CreateNewTweetParams,
  ReadNonDeleteTweetParams,
  ReadNonDeleteTweetResponse,
  Tweet,
} from 'models';

export const timeLineQuery = new QueryClient();

export const getNextPageParam = (lastPage: ReadNonDeleteTweetResponse, pages: ReadNonDeleteTweetResponse[]) => {
  return lastPage.nextCursor;
}

export const generateFetchTimeline = (
  readTimeline:  (params: ReadNonDeleteTweetParams) => Promise<ReadNonDeleteTweetResponse>
) => ({ pageParam = 0 }) => {
  return readTimeline({ start: pageParam });
}

export const reFetchQuery = async (
  readTimeline:  (params: ReadNonDeleteTweetParams) => Promise<ReadNonDeleteTweetResponse>,
  clearQuery: boolean = false,
) => {
  if (clearQuery) {
    timeLineQuery.clear();
  }

  await setTimeout(() => null, 100);

  return timeLineQuery.prefetchInfiniteQuery('timeline', generateFetchTimeline(readTimeline), {
    getNextPageParam,
  });
}
export function flattenQueryPages(pages: ReadNonDeleteTweetResponse[]) {
  const flattenTweetList: Tweet[] = [];

  pages.forEach((group: ReadNonDeleteTweetResponse) => {
    flattenTweetList.push(...group.data);
  });

  return flattenTweetList;
}

export function addNewTweetMutation({ author, firstname, content, addNewTweet }: {
  author: string;
  firstname: string;
  content: string;
  addNewTweet: (params: CreateNewTweetParams) => Tweet | null;
}) {
  const now = getUnixTime(new Date());

  const newTweet = addNewTweet({
    author,
    firstname,
    content,
  });

  if (!newTweet) {
    return Promise.resolve({
      id: -1,
      author,
      firstname,
      content,
      createTime: now,
      updateTime: now,
      isDeleted: false,
    });
  }

  return Promise.resolve(newTweet);
}

export function onAddNewTweetMutationSuccess(newTweet: Tweet) {
  timeLineQuery.setQueryData<InfiniteData<ReadNonDeleteTweetResponse>>('timeline', (oldData: InfiniteData<ReadNonDeleteTweetResponse> | undefined) => {
    const nextData: InfiniteData<ReadNonDeleteTweetResponse> = {
      pages: [],
      pageParams: [],
    };

    if (oldData) {
      nextData.pages = [ ...oldData.pages ];
      nextData.pageParams = [ ...oldData.pageParams ];
    }

    if (newTweet) {
      nextData.pages.unshift({
        data: [ newTweet ],
      });
      nextData.pageParams.unshift(undefined);
    }

    return nextData;
  });
}
