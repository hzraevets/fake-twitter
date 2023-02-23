import { FieldErrors } from 'react-hook-form';

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

const noneErrorState: FieldErrors<FormFieldType> = {};

const usernameEmptyErrorState: FieldErrors<FormFieldType> = {
  username: {
    type: 'required',
    message: usernameEmptyMessage,
  },
};

const firstnameEmptyErrorState: FieldErrors<FormFieldType> = {
  firstname: {
    type: 'required',
    message: firstnameEmptyMessage,
  },
}

const passwordEmptyErrorState: FieldErrors<FormFieldType> = {
  password: {
    type: 'required',
    message: passwordEmptyMessage,
  },
}

const rePasswordEmptyErrorState: FieldErrors<FormFieldType> = {
  rePassword: {
    type: 'required',
    message: rePasswordEmptyMessage,
  },
}

const allEmptyErrorState: FieldErrors<FormFieldType> = {
  ...usernameEmptyErrorState,
  ...firstnameEmptyErrorState,
  ...passwordEmptyErrorState,
  ...rePasswordEmptyErrorState,
};

const usernameAlreadyInUseErrorState: FieldErrors<FormFieldType> = {
  username: {
    type: 'checkUniq',
    message: usernameAlreadyInUseMessage,
  },
};

const rePasswordMismatchErrorState: FieldErrors<FormFieldType> = {
  rePassword: {
    type: 'checkSame',
    message: rePasswordMismatchMessage,
  },
};

describe('shouldDisableSubmit', () => {
  it('return false for non error state', () => {
    expect(shouldDisableSubmit(noneErrorState)).toBeFalsy();
  });

  it('return true for other situation', () => {
    expect(shouldDisableSubmit(allEmptyErrorState)).toBeTruthy();
    expect(shouldDisableSubmit(usernameEmptyErrorState)).toBeTruthy();
    expect(shouldDisableSubmit(firstnameEmptyErrorState)).toBeTruthy();
    expect(shouldDisableSubmit(passwordEmptyErrorState)).toBeTruthy();
    expect(shouldDisableSubmit(rePasswordEmptyErrorState)).toBeTruthy();
    expect(shouldDisableSubmit(usernameAlreadyInUseErrorState)).toBeTruthy();
    expect(shouldDisableSubmit(rePasswordMismatchErrorState)).toBeTruthy();
  });
});

describe('getErrorMessage', () => {
  it('return expected error message', () => {
    expect(getErrorMessage(allEmptyErrorState)).toBe(usernameEmptyMessage);
    expect(getErrorMessage(usernameEmptyErrorState)).toBe(usernameEmptyMessage);
    expect(getErrorMessage(firstnameEmptyErrorState)).toBe(firstnameEmptyMessage);
    expect(getErrorMessage(passwordEmptyErrorState)).toBe(passwordEmptyMessage);
    expect(getErrorMessage(rePasswordEmptyErrorState)).toBe(rePasswordEmptyMessage);
    expect(getErrorMessage(usernameAlreadyInUseErrorState)).toBe(usernameAlreadyInUseMessage);
    expect(getErrorMessage(rePasswordMismatchErrorState)).toBe(rePasswordMismatchMessage);
  });
});
