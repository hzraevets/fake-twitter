import { User, Tweet } from './';

export interface UserStorage {
  [username: string]: User;
}
