import { User, UserStorage } from 'models';
import { md5 } from 'utils/md5';

export const testUser: User = {
  username: 'testUser',
  firstname: 'Test',
  password: 'abcde',
}

export const liBai: User = {
  username: 'liBai',
  firstname: 'Li',
  password: '12345',
};

export const storage: UserStorage = {
  testUser: { ...testUser, password: md5(testUser.password) },
  liBai: { ...liBai, password: md5(liBai.password) },
}
