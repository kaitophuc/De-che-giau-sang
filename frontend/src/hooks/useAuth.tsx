import { useEffect, useContext } from 'react';
import { useUser, User } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, setUser, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    const verifyUser = async () => {
      const savedUser = getItem('user');
      if (savedUser && savedUser !== JSON.stringify(user)) {
        await fetch('/api/auth/verify-token', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(savedUser).authToken}`,
            'Access-Control-Allow-Origin': "*",
          }
        }).then((response) => {
          return response.json();
        }).then((data) => {
          if (data.success === true) {
            addUser(JSON.parse(savedUser));
          } else {
            removeUser();
          }
        })
      }
    }

    verifyUser();
    setLoading(false);
  }, [addUser]);

  const login = async (user: User): Promise<{ success: boolean }> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const userData: User = { authToken: data.token };
    await addUser(userData);
    return { success: true };
  };

  const register = async (user: User): Promise<{ success: boolean}> => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      return {"success": true};
    }

    throw new Error('Register failed');
  }

  const logout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (response.ok) {
      removeUser();
      return {"success": true};
    } else {
      throw new Error ('Logout failed');
    }
  };

  return { user, setUser, login, logout, register };
};