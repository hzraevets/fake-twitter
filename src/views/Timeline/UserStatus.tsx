import React, { useContext } from 'react';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

// @ts-ignore
import logo from './logo.svg';
import { IdentityContext } from 'effects/Identity';
import { ThemeToggler } from 'components/ThemeToggler';

const { Meta } = Card;

export function UserStatus() {
  const { username } = useParams();
  const { identity, loginUser, logout } = useContext(IdentityContext);

  const firstName = loginUser ? identity[loginUser]?.firstname : '';

  return (
    <Card
      className="w-80 break-inside-avoid-column mb-4"
      cover={ <img className="bg-slate-500 !hidden md:!block" alt="timeline-user-bg" src={logo}/> }
      actions={[
        <span
          key="logout"
          onClick={logout}
          className="hover:text-red-600 select-none inline-block w-full"
        >Logout</span>
      ]}
    >
      <ThemeToggler />
      <Meta
        avatar={<Avatar size="large" className="bg-slate-500" icon={<UserOutlined/>} />}
        title={<>
          <div className="text-2xl font-bold leading-none">{firstName}</div>
          <div className="text-xs font-medium text-slate-500">@{username}</div>
        </>}
        description=""
      />
    </Card>
  );
}
