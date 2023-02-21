import React, { useContext, useState } from 'react';
import { Card, Input, Button, Space } from 'antd';

import { IdentityContext } from 'effects/Identity';
import { TweetContext } from 'effects/Tweet';
import { clearThenReFetch } from 'query/TimeLine';

const { TextArea } = Input;

export function NewTweet() {
  const { loginUser, identity } = useContext(IdentityContext);
  const { addNewTweet, readTimeline } = useContext(TweetContext);
  const [ content, updateContent ] = useState('');

  const handleTweet = () => {
    addNewTweet({
      author: loginUser || 'UNKNOWN_AUTHOR',
      firstname: loginUser ? identity[loginUser].firstname : 'Unknown',
      content,
    });

    updateContent(''); // reset textarea

    clearThenReFetch(readTimeline);
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
          disabled={content === ''}
          onClick={handleTweet}
        >Tweet</Button>
      </Space>
    </Card>
  );
}
