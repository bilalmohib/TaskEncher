import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

// Importing Components
import Landing from '@app/components/Landing';

// Importing Material UI Components
import {
  Box
} from '@mui/material';

import styles from '../styles/Home.module.css';

const HomePage: NextPage = () => {
  const router = useRouter();

  // Hide splash screen when we are server side 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);

  // Store div in a variable

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" lang='en' />
        <link rel="icon" href="/logocopy.ico" />
        <meta name="description" content="A project management app built with Next JS, MUI,mdbootstrap and firebase" />
        <meta name="author" content="Muhammad-Bilal-7896" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="viewport" content="width=1200" />
        <meta name="theme-color" content="#000000" />
        <title> TaskEncher: Supercharge Your Workflow and Amplify Task Management</title>
      </Head>

      <Landing />
    </div>
  )
}
export default HomePage;
