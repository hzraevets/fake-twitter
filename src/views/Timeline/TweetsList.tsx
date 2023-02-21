import React, { useContext, useRef, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Card, Spin, Skeleton, Divider, List, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserOutlined } from '@ant-design/icons';
import formatDistance from 'date-fns/formatDistance';
import fromUnixTime from 'date-fns/fromUnixTime';
import { Link } from 'react-router-dom';

import { TweetContext } from 'effects/Tweet';
import { ReadNonDeleteTweetResponse } from 'models';
import { generateFetchTimeline } from 'query/TimeLine';
import './tweets-list.css';

export function TweetsList() {
  const elementRef = useRef<HTMLDivElement>(null);
  const { readTimeline } = useContext(TweetContext);
  const fetchTimeline = generateFetchTimeline(readTimeline);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<ReadNonDeleteTweetResponse>('timeline', fetchTimeline, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  const dataLength = data ? data.pages.reduce((prev: number, cur: ReadNonDeleteTweetResponse) => {
    return prev + cur.data.length;
  }, 0) : 0;

  useEffect(() => {
    // https://stackoverflow.com/questions/7668636/check-with-jquery-if-div-has-overflowing-elements/7668692#7668692
    const cardElement = elementRef.current;

    const offsetTop = cardElement?.offsetTop || 0;
    const offsetHeight = cardElement?.offsetHeight || 0;
    const windowHeight = window.innerHeight;

    if (hasNextPage && (offsetTop + offsetHeight < windowHeight)) {
      fetchNextPage();
    }
  });

  const now = new Date();

  return (
    <Card className="w-80 overflow-auto break-inside-avoid-column mb-10" ref={elementRef}>
      {status === 'loading' && <div className="w-full flex"><Spin className="m-auto"/></div>}
      {status === 'error' && <p>Error</p>}
      {status !== 'loading' && status !== 'error' && (
        <InfiniteScroll
          dataLength={dataLength}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain className="select-none">It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          {dataLength > 0 ? (data?.pages || []).map((group: ReadNonDeleteTweetResponse, index) => (
            <List
              key={index}
              dataSource={group.data}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Link to={`/tweet/${item.id}`} className="w-full">
                    <List.Item.Meta
                      avatar={<Avatar size="large" className="bg-slate-500" icon={<UserOutlined/>} />}
                      title={(
                        <div className="select-none">
                          <span className="first-name text-sm mr-1">{item.firstname}</span>
                          {(item.updateTime !== item.createTime) && (
                            <span className="text-xs text-slate-400">edited</span>
                          )}
                          <span className="text-xs text-slate-500 float-right">
                            {formatDistance(fromUnixTime(item.createTime), now, { addSuffix: true })}
                          </span>
                        </div>
                      )}
                      description={(
                        <p className="m-0 break-words text-sm">{item.content}</p>
                      )}
                    />
                  </Link>
                </List.Item>
              )}
            />
          )) : null}
        </InfiniteScroll>
      )}
    </Card>
  );
}
