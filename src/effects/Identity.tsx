import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  createContext,
  useState,
  ReactNode,
} from 'react';

import { UserStorage, User } from 'models';
import { md5 } from 'utils/md5';

export interface IdentityContextInterface {
  identity: UserStorage;
  setIdentity: Dispatch<SetStateAction<UserStorage>>;
  loginUser: string | null;
  setLoginUser: Dispatch<SetStateAction<string | null>>;
  logout: () => void;
  register: (newUser: User) => UserStorage;
}

const IdentityContext = createContext<IdentityContextInterface>({
  identity: {},
  setIdentity: () => null,
  loginUser: null,
  setLoginUser: () => null,
  logout: () => null,
  register: () => ({}),
});

const getIdentity = (): UserStorage => {
  const identity = localStorage.getItem('identity');
  if (!identity) {
    localStorage.setItem('identity', '{}');
    return {};
  }

  return JSON.parse(identity);
};

const getLoginUser = (): string | null => {
  const loginUser = localStorage.getItem('loginUser');
  if (!loginUser) {
    return null;
  }

  return loginUser;
};

const IdentityProvider = ({ children }: { children: ReactNode }) => {
  const [ identity, setIdentity ] = useState(getIdentity);
  const [ loginUser, setLoginUser ] = useState(getLoginUser);

  function logout() {
    if (loginUser) {
      setLoginUser(null);
      localStorage.removeItem('loginUser');
    }
  }

  function register(newUser: User) {
    const newStorage: UserStorage = {
      ...identity,
      [newUser.username]: {
        ...newUser,
        password: md5(newUser.password),
      },
    };

    localStorage.setItem('identity', JSON.stringify(newStorage));
    return newStorage;
  }

  useEffect(() => {
    const updateIdentity = () => {
      localStorage.setItem('identity', JSON.stringify(identity));
    };

    updateIdentity();
  }, [identity]);

  useEffect(() => {
    const executeLogin = () => {
      if (loginUser) {
        localStorage.setItem('loginUser', loginUser);
      }
    };

    executeLogin();
  }, [loginUser]);

  return (
    <IdentityContext.Provider
      value={{
        identity,
        setIdentity,
        loginUser,
        setLoginUser,
        logout,
        register,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityProvider };
