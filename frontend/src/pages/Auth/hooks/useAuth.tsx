import { useEffect } from 'react';
import { useUser, User } from './useUser';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { user, setUser, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const savedUser = getItem('user');
    console.log('Saved user:', savedUser);
    console.log('User:', user);
    if (savedUser && savedUser !== JSON.stringify(user)) {
      console.log('Actually update');
      addUser(JSON.parse(savedUser));
    }
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

  const logout = () => {
    removeUser();
  };

  return { user, setUser, login, logout, register };
};