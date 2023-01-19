import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

const AuthContext = createContext();
console.log('AuthContext====================================');
console.log(AuthContext);
console.log(AuthContext.Provider);

export function AuthProvider({ children }) {
  console.log('====================================');
  console.log('children:' + children);
  console.log('====================================');
  const auth = useProviderAuth();
  console.log('====================================');
  console.log('auth_provider:' + auth);
  console.log('====================================');
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  console.log('useAuth====================================');
  console.log(AuthContext);
  console.log('====================================');
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout,
  };
}
