import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthService } from '../services/authService';
import { setUser, setLoading } from '../store/slices/authSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set loading true khi bắt đầu check auth
    dispatch(setLoading(true));

    // Listen auth state changes
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      // Dispatch user to Redux (null nếu logout)
      dispatch(setUser(user));
    });

    // Cleanup function - hủy listener khi component unmount
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;