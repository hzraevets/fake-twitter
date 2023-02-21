import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Card, Input, Button, Space } from 'antd';
import { useForm, FieldValues, Controller } from 'react-hook-form';

import { LoginField } from 'models';
import { IdentityContext } from 'effects/Identity';
import { TweetContext } from 'effects/Tweet';
import { md5 } from 'utils/md5';
import { ThemeToggler } from 'components/ThemeToggler';
import { clearThenReFetch } from 'query/TimeLine';

export function Login() {
  const { identity, setLoginUser } = useContext(IdentityContext);
  const { readTimeline } = useContext(TweetContext);

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<LoginField>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    setLoginUser(getValues('username'));
    clearThenReFetch(readTimeline);
  }

  function shouldDisableSubmit() {
    return Boolean(errors.username || errors.password);
  }

  function getErrorMessage() {
    if (errors.username) {
      return errors.username.message;
    }

    if (errors.password) {
      return errors.password.message;
    }

    return 'Unknown error, please check again'
  }

  return (
    <div className="home-container h-full flex">
      <div className="home m-auto">
        <Card className="h-full">
          <ThemeToggler />

          <h1 className="text-2xl font-bold mt-0 mb-5">
            Welcome to Fake Twitter!
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Space direction="vertical" size="large" className="w-72 md:w-96">
              <Space direction="vertical" size="middle" className="w-full">
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: 'Please enter username',
                    validate: {
                      checkExist: v => identity[v] !== undefined
                        || 'This user name doesn\'t exist, please check again or create a new account'
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="username"
                      status={errors.username && 'error'}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Please enter password',
                    validate: {
                      checkValid: v => {
                        const username = getValues('username');

                        if (identity[username] === undefined) {
                          return true;
                        }

                        return md5(v) === identity[username].password
                          || 'Password not correct';
                      }
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="password"
                      type="password"
                      status={errors.password && 'error'}
                    />
                  )}
                />
              </Space>

              {shouldDisableSubmit() && (
                <p className="m-0 text-red-600">{getErrorMessage()}</p>
              )}

              <Space size="large" className="float-right">
                <Link to="/register">
                  Create new account
                </Link>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={shouldDisableSubmit()}
                >
                  Login
                </Button>
              </Space>
            </Space>
          </form>
        </Card>
      </div>
    </div>
  );
}
