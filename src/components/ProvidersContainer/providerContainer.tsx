"use client"
import CartContextProvider from '@/contexts/cartContext';
import React,{ ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './../../redux/store';
import { SessionProvider } from 'next-auth/react';

export default function ProviderContainer({
    children,
}
    :{
        children: ReactNode
    }) {
  return (
    <div>
      <SessionProvider>
      <Provider store={store}>
      <CartContextProvider>
      {children}
      </CartContextProvider>
      </Provider>
      </SessionProvider>
      </div>
  )
}
