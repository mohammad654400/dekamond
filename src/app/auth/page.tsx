'use client';

import React from 'react';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import AuthForm from './AuthForm';
import styles from './auth.module.scss';

export default function AuthPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <ThemeToggle />
        <h1 className={styles.title}>ورود به حساب کاربری</h1>
        <AuthForm />
      </div>
    </div>
  );
}
