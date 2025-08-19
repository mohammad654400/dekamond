'use client';

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.scss';
import IconMoon from '@/assets/icons/theme/IconMoon';
import IconSun from '@/assets/icons/theme/IconSun';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle Theme"
      className={styles.toggleButton}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <IconSun /> : <IconMoon />}
    </button>
  );
};

export default ThemeToggle;
