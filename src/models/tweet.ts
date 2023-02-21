export interface Tweet {
  id: number;
  author: string;
  firstname: string;
  content: string;
  createTime: number; // unix timestamp
  updateTime: number; // unix timestamp
  isDeleted: boolean;
}

export interface TweetStorage {
  hashMap: { [id: number]: Tweet };
  order: number[]; // desc for tweet according to create time
}

export type CreateNewTweetParams = Omit<
  Tweet,
  'id' | 'createTime' | 'updateTime' | 'isDeleted'
>;

export interface ReadNonDeleteTweetParams {
  start: number;
  offset?: number;
}

export interface ReadNonDeleteTweetResponse {
  data: Tweet[];
  nextCursor?: number | null;
}

export type UpdateTweetParams = Omit<
  Tweet,
  'firstname' | 'createTime' | 'updateTime' | 'isDeleted'
>;

export type DeleteTweetParams = Omit<
  Tweet,
  'content' | 'firstname' | 'createTime' | 'updateTime' | 'isDeleted'
>;
