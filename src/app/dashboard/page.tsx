'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { RandomUser } from "@/types/randomUser";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<RandomUser | null>(null);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth");
      return;
    }

    const parsedUser: RandomUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Typing effect
    let index = 0;
    const message = `سلام ${parsedUser.name.first}! 👋 به دکاموند خوش آمدی!`;
    const interval = setInterval(() => {
      setTypedText(message.slice(0, index));
      index++;
      if (index > message.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [router]);

  if (!user) return null;

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.card}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <motion.img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className={styles.avatar}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.2 }}
        />

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {typedText}
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          ایمیل: {user.email}
        </motion.p>
        <motion.p
          className={styles.subtitle}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          سن: {user.dob.age} سال
        </motion.p>
        <motion.p
          className={styles.subtitle}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          شماره تلفن: {user.phone}
        </motion.p>

        <motion.button
          className={styles.logoutBtn}
          whileHover={{ scale: 1.05, backgroundColor: "#ff4d4f" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/auth");
          }}
        >
          خروج
        </motion.button>
      </motion.div>

      <motion.div
        className={styles.backgroundAnimation}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
    </motion.div>
  );
}
