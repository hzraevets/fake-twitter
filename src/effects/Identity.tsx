import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  createContext,
  useState,
  ReactNode,
} from 'react';

import { UserStorage } from 'models';

interface IdentityContextInterface {
  identity: UserStorage;
  setIdentity: Dispatch<SetStateAction<UserStorage>>;
  loginUser: string | null;
  setLoginUser: Dispatch<SetStateAction<string | null>>;
  logout: () => void;
  saveIdentity: (identity: UserStorage) => void;
}

const IdentityContext = createContext<IdentityContextInterface>({
  identity: {},
  setIdentity: () => null,
  loginUser: null,
  setLoginUser: () => null,
  logout: () => null,
  saveIdentity: () => null,
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

  function saveIdentity(newIdentity: UserStorage) {
    localStorage.setItem('identity', JSON.stringify(newIdentity));
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
        saveIdentity,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityProvider };
