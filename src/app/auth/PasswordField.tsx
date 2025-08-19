'use client';
import React, { useState, forwardRef } from 'react';
import styles from './auth.module.scss';
import IconEye from "@/assets/icons/auth/IconEye";
import IconEyeOff from "@/assets/icons/auth/IconEyeOff";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  conditions: {
    length: boolean;
    upper: boolean;
    lower: boolean;
    number: boolean;
    special: boolean;
  };
}

const PasswordField = forwardRef<HTMLInputElement, Props>(({ label = 'رمز عبور', error, conditions, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.field}>
      {label && <label>{label}</label>}
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          {...props}
          aria-invalid={!!error}
          placeholder={label}
        />
        <button
          type="button"
          className={styles.eyeBtn}
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
      {error && <span className={styles.error}>{error}</span>}

      <ul className={styles.passwordConditions}>
        <li className={conditions.length ? styles.valid : ""}>حداقل 8 کاراکتر</li>
        <li className={conditions.upper ? styles.valid : ""}>حرف بزرگ</li>
        <li className={conditions.lower ? styles.valid : ""}>حرف کوچک</li>
        <li className={conditions.number ? styles.valid : ""}>عدد</li>
        <li className={conditions.special ? styles.valid : ""}>کاراکتر خاص</li>
      </ul>
    </div>
  );
});

PasswordField.displayName = 'PasswordField';
export default PasswordField;