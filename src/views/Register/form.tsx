import { FieldErrors } from 'react-hook-form';

import { RegisterField } from 'models';

export type FormFieldType = RegisterField & { rePassword: string };

export const usernameEmptyMessage = 'Username should not be empty';
export const usernameAlreadyInUseMessage = 'This username already registered, please login or choose another one.';

export const firstnameEmptyMessage = 'First name should not be empty';

export const passwordEmptyMessage = 'Password should not be empty';

export const rePasswordEmptyMessage = 'You must re-enter the password!';
export const rePasswordMismatchMessage = 'Password re-enter confirmation mismatched';

export function shouldDisableSubmit(errors: FieldErrors<FormFieldType>) {
  return Boolean(errors.username || errors.firstname || errors.password || errors.rePassword);
}

export function getErrorMessage(errors: FieldErrors<FormFieldType>) {
  if (!shouldDisableSubmit(errors)) {
    return '';
  }

  if (errors.username) {
    return errors.username.message;
  }

  if (errors.firstname) {
    return errors.firstname.message;
  }

  if (errors.password) {
    return errors.password.message;
  }

  if (errors.rePassword) {
    return errors.rePassword.message;
  }

  return 'Unknown error, please check again'
}
