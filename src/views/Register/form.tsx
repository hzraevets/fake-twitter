import { FieldErrors } from 'react-hook-form';

import { RegisterField } from 'models';

export type FormFieldType = RegisterField & { rePassword: string };

export function shouldDisableSubmit(errors: FieldErrors<FormFieldType>) {
  return Boolean(errors.username || errors.firstname || errors.password || errors.rePassword);
}

export function getErrorMessage(errors: FieldErrors<FormFieldType>) {
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
