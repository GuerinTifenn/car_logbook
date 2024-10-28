"use client";

import React, { useEffect } from 'react';
import { checkAuthStatus } from '../../store/authSlice';
import  { useAppDispatch } from "../app/hook";

const AuthChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthChecker;
