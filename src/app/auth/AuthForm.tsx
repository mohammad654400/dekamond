'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import PasswordField from './PasswordField';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/Button/Button';
import styles from './auth.module.scss';
import { RandomUser, RandomUserResponse } from '@/types/randomUser';

// Schema اعتبارسنجی فرم
const schema = z.object({
  phone: z.string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .min(11, "شماره باید 11 رقم باشد")
    .max(11, "شماره باید 11 رقم باشد"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

type FormData = z.infer<typeof schema>;

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const password = watch("password") || "";
  const phone = watch("phone");

  const conditions = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(conditions).every(Boolean) && /^09\d{9}$/.test(phone);

  // تابع ارسال فرم
  const onSubmit = async (data: FormData) => {
    if (!allValid) return;
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const json: RandomUserResponse = await res.json();

      const user: RandomUser = json.results[0];
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard"); // ریدایرکت امن
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* شماره موبایل */}
      <Input
        label="شماره موبایل"
        type="text"
        {...register("phone")}
        error={errors.phone?.message}
      />

      {/* پسورد */}
      <PasswordField
        {...register("password")}
        error={errors.password?.message}
        conditions={conditions}
      />

      {/* دکمه ورود */}
      <Button type="submit" disabled={!allValid || loading}>
        {loading ? "در حال ورود..." : "ورود"}
      </Button>

      {/* Divider */}
      <div className={styles.divider}><span>یا ورود با</span></div>

      {/* ورود با گوگل */}
      <Button type="button" className={styles.googleBtn} disabled>
        ورود با گوگل
      </Button>
    </form>
  );
}