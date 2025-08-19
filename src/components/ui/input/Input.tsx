'use client';
import React, { forwardRef } from 'react';
import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input ref={ref}   className={styles.inputField} {...props} aria-invalid={!!error} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;