import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Button, Space, message } from 'antd';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { IdentityContext } from 'effects/Identity';
import { ThemeToggler } from 'components/ThemeToggler';
import {
  FormFieldType,
  shouldDisableSubmit,
  getErrorMessage,
  usernameEmptyMessage,
  usernameAlreadyInUseMessage,
  firstnameEmptyMessage,
  passwordEmptyMessage,
  rePasswordEmptyMessage,
  rePasswordMismatchMessage,
} from './form';
import { User } from 'models';

export function Register() {
  const { identity, setIdentity, register } = useContext(IdentityContext);
  const [ messageApi, contextHolder ] = message.useMessage();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormFieldType>({
    defaultValues: {
      username: '',
      firstname: '',
      password: '',
      rePassword: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    delete data.rePassword;
    const newStorage = register(data as User);

    messageApi.open({
      type: 'success',
      content: 'Create new account success! Will jump to login page in 2 seconds.',
      duration: 0,
    });

    setTimeout(() => {
      messageApi.destroy();
      navigate('/login');
      setIdentity(newStorage);
    }, 2000);
  }

  return (
    <>
      {contextHolder}
      <div className="register-container h-full flex">
        <div className="register m-auto">
          <Card className="h-full">
            <ThemeToggler/>

            <h1 className="text-2xl font-bold mt-0 mb-5">
              Create New Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Space direction="vertical" size="large" className="w-72 md:w-96">
                <Space direction="vertical" size="middle" className="w-full">
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: usernameEmptyMessage,
                      validate: {
                        checkUniq: v => identity[v] === undefined || usernameAlreadyInUseMessage,
                      },
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
                    name="firstname"
                    control={control}
                    rules={{ required: firstnameEmptyMessage }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="first name"
                        status={errors.firstname && 'error'}
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: passwordEmptyMessage }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="password"
                        type="password"
                        status={errors.password && 'error'}
                      />
                    )}
                  />

                  <Controller
                    name="rePassword"
                    control={control}
                    rules={{
                      required: rePasswordEmptyMessage,
                      validate: {
                        checkSame: v => v === getValues('password') || rePasswordMismatchMessage,
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="re-enter password"
                        type="password"
                        status={errors.rePassword && 'error'}
                      />
                    )}
                  />
                </Space>

                {shouldDisableSubmit(errors) && (
                  <p className="m-0 text-red-600">{getErrorMessage(errors)}</p>
                )}

                <Space size="large" className="float-right">
                  <Link to="/login">
                    Already have an account?
                  </Link>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={shouldDisableSubmit(errors)}
                  >
                    Register
                  </Button>
                </Space>
              </Space>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
