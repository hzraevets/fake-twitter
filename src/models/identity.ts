export interface RegisterField {
  username: string;
  firstname: string;
  password: string;
}

export type LoginField = Omit<RegisterField, 'firstname'>

export type User = RegisterField;
