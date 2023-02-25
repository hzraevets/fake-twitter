import React, { useContext, useState } from 'react';
import { Card, Input, Button, Space } from 'antd';
import { useMutation } from 'react-query';

import { IdentityContext } from 'effects/Identity';
import { TweetContext } from 'effects/Tweet';
import {
  addNewTweetMutation,
  onAddNewTweetMutationSuccess,
} from 'query/TimeLine';

const { TextArea } = Input;

export function NewTweet() {
  const { loginUser, identity } = useContext(IdentityContext);
  const { addNewTweet } = useContext(TweetContext);
  const [ content, updateContent ] = useState('');
  const mutation = useMutation(addNewTweetMutation, { onSuccess: onAddNewTweetMutationSuccess });

  const handleTweet: React.MouseEventHandler = (event) => {
    event.preventDefault();

    const author = loginUser || 'UNKNOWN_AUTHOR';
    const firstname = loginUser ? identity[loginUser].firstname : 'Unknown';

    mutation.mutate({ author, firstname, content, addNewTweet });
    updateContent(''); // reset textarea
  }

  return (
    <Card className="w-80 break-inside-avoid-column mb-4">
      <Space direction="vertical" size="middle" className="w-full">
        <TextArea
          rows={3}
          className="max-h-32"
          placeholder="What's happening?"
          value={content}
          onChange={e => updateContent(e.target.value)}
        />
        <Button
          type="primary"
          className="float-right"
          disabled={content === '' || mutation.isLoading}
          onClick={handleTweet}
        >Tweet</Button>
      </Space>
    </Card>
  );
}
