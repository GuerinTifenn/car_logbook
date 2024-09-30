'use client'; // Assurez-vous d'inclure ceci pour activer les hooks React dans la structure `app`

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
