import React, { useContext, useState, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Input } from 'antd';

import { TweetContext } from 'effects/Tweet';
import { IdentityContext } from 'effects/Identity';
import { Page404 } from 'views/Page404';

const { TextArea } = Input;

export function EditTweet({ openEditModal, setOpenEditModal }: {
  openEditModal: boolean,
  setOpenEditModal: Dispatch<SetStateAction<boolean>>,
}) {
  const { id } = useParams();
  const { allTweets, editTweet } = useContext(TweetContext);
  const { loginUser } = useContext(IdentityContext);

  let isValid = true;
  const tweet = allTweets.hashMap[Number(id)];

  const [ modalText, setModalText ] = useState(tweet?.content || '');
  const [ confirmLoading, setConfirmLoading ] = useState(false);

  if (!loginUser || !id || tweet === undefined || tweet.author !== loginUser) {
    isValid = false;
  }

  const handleCancel = () => setOpenEditModal(false);
  const handleOK = () => {
    setConfirmLoading(true);
    editTweet(Number(id), modalText);

    setTimeout(() => {
      setConfirmLoading(false);
      handleCancel();
    }, 100);
  };

  return (
    <Modal
      title="Edit your tweet"
      open={openEditModal}
      onCancel={handleCancel}
      onOk={handleOK}
      confirmLoading={confirmLoading}
    >
      {isValid ?<TextArea
        rows={8}
        className="!max-h-96"
        onChange={e => setModalText(e.target.value)}
        value={modalText}
      /> : <Page404/>}
    </Modal>
  );
}
