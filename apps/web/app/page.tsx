'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { i18n } from '@repo/ui';
import styles from '../styles/splash.module.css';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to browse page after 2.5 seconds
    const timer = setTimeout(() => {
      router.push('/browse');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/moviebuff-logo.svg"
          alt={i18n.app.title}
          width={200}
          height={200}
          priority
          className={styles.logo}
        />
        <h1 className={styles.title}>{i18n.app.title}</h1>
        <p className={styles.subtitle}>{i18n.app.subtitle}</p>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}
