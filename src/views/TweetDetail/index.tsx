import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Avatar, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import formatDistance from 'date-fns/formatDistance';
import fromUnixTime from 'date-fns/fromUnixTime'

import { TweetContext } from 'effects/Tweet';
import { IdentityContext } from 'effects/Identity';
import { Page404 } from 'views/Page404';
import { ThemeToggler } from 'components/ThemeToggler';
import { EditTweet } from './EditTweet';

const { Meta } = Card;

export function TweetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ openDeleteConfirm, setOpenDeleteConfirm ] = useState(false);
  const [ deleteConfirmLoading, setDeleteConfirmLoading ] = useState(false);

  const [ openEditModal, setOpenEditModal ] = useState(false);

  const { allTweets, deleteTweet } = useContext(TweetContext);
  const { loginUser, identity } = useContext(IdentityContext);

  const tweet = allTweets.hashMap[Number(id)];

  if (!loginUser || !id || tweet === undefined) {
    return <Page404/>
  }

  const author = identity[tweet.author];
  const now = new Date();

  const isLoginUserAuthor = loginUser === author.username;
  const isTweetUpdated = tweet.updateTime !== tweet.createTime;

  const showDeleteConfirm = () => setOpenDeleteConfirm(true);
  const handleCancel = () => setOpenDeleteConfirm(false);
  const handleOK = () => {
    setDeleteConfirmLoading(true);
    deleteTweet(Number(id));

    setTimeout(() => {
      setOpenDeleteConfirm(false);
      setDeleteConfirmLoading(false);
      navigate(`/${loginUser}`);
    }, 100);
  };

  return (
    <div className="tweet-detail-container flex h-full">
      <div className="tweet-detail relative w-96 mx-auto h-fit pt-10">
        <EditTweet openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
        <Card
          className="pt-6"
          actions={isLoginUserAuthor ? [
            <span
              key="edit"
              className="hover:text-blue-600 select-none inline-block w-full"
              onClick={() => setOpenEditModal(true)}
            >Edit</span>,
            <Popconfirm
              title="Delete confirmation"
              description="Are you sure you want to delete this tweet?"
              open={openDeleteConfirm}
              onConfirm={handleOK}
              okButtonProps={{ loading: deleteConfirmLoading, danger: true }}
              onCancel={handleCancel}
            >
              <span
                key="delete"
                className="hover:text-red-600 select-none inline-block w-full"
                onClick={showDeleteConfirm}
              >Delete</span>
            </Popconfirm>,
          ] : []}
        >
          <Link to={`/${loginUser}`} className="absolute top-1 left-2 cursor-pointer select-none">
            <span className="text-2xl"><ArrowLeftOutlined/></span>
          </Link>
          <ThemeToggler />
          <Meta
            avatar={<Avatar size="large" className="bg-slate-500" icon={<UserOutlined/>}/>}
            title={<>
              <span className="text-sm font-bold leading-none select-none">{author.firstname}</span>
              <span className="text-xs text-slate-500 float-right select-none mt-1">
                created {formatDistance(fromUnixTime(tweet.createTime), now, { addSuffix: true })}
              </span>
            </>}
            description={<>
              <p className="m-0 break-words text-sm">{tweet.content}</p>
              <div className="extra-info mt-4">
                <span className="tweet-id text-xs text-slate-600 font-bold select-none">Tweet id: {tweet.id}</span>
                {isTweetUpdated && (
                  <span className="update-time text-xs text-slate-500 float-right select-none">
                    edited {formatDistance(fromUnixTime(tweet.updateTime), now, { addSuffix: true })}
                  </span>
                )}
              </div>
            </>}
          />
        </Card>
      </div>
    </div>
  );
}
