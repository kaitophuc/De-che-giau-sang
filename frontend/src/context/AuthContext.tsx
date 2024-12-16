import { createContext, useState, useMemo } from 'react';
import { User } from '../hooks/useUser';

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
});
