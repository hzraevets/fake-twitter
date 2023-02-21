import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="page404-container h-full flex">
      <Result
        className="m-auto select-none"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={(
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        )}
      />
    </div>
  );
}
