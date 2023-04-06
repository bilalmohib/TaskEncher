// File Relative Path: pages/_app.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Script from 'next/script';
//////////////////////////////////////////////////
import Head from 'next/head';
// Importing Components
import Landing from '../components/Landing';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Home from '../components/Main/Home';
import Inbox from '../components/Main/Inbox';
import { ProfileComp } from './profile/[uuid]';
import { ProjectDetailsComp } from './projectDetails/[projectName]/[projectID]';

// Importing firebase
import { db, auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
// Importing firebase

// Importing Material UI Components
import Box from '@mui/material/Box';

//Importing Containers CSS Files
import styles from '../styles/Home.module.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { uuid } = router.query;

  // Hide splash screen shen we are server side 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);

  const [hideExtra, setHideExtra] = useState<Number>(1);
  const [loading, setLoading] = useState<Boolean>(true);

  const [isOpen, setIsOpen] = useState<Boolean>(true);

  const [currentMenuItem, setCurrentMenuItem] = useState<Number>(1);

  //_________________ For Getting SignedInUser Data _____________________
  const [signedInUserData, setSignedInUserData] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [Loading, setloading] = useState(true);
  //_________________ For Getting SignedInUser Data _____________________

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (signedInUserData === null) {
          setIsSignedIn(true);
          if (user.isAnonymous === true) {
            let tempUser = {
              displayName: "Anonymous",
              email: `anonymous${user.uid}@guest.com`,
              photoURL: user.photoURL,
            }
            console.log(tempUser);
            setSignedInUserData(tempUser);
            setloading(false);
          } else {
            console.log(user);
            setSignedInUserData(user);
            setloading(false);
          }
          // ...
        }
      } else {
        // User is signed out
        console.log("User is signed out");
        // ...
      }
    });
  }, [signedInUserData, Loading]);

  useEffect(() => {
    console.clear();
    console.log('routeChangeStart', router.pathname);
    if (router.pathname === "/login" ||
      router.pathname === "/signup" ||
      router.pathname === "/forgot-password" ||
      router.pathname === "/reset-password" ||
      router.pathname === "/verify-email" ||
      router.pathname === "/createProject"
    ) {
      setHideExtra(0);
    }
    else if (
      router.pathname == `/profile/[uuid]`
      || router.pathname === '/profile'
      || router.pathname === '/projectDetails/[projectName]/[projectID]'
      || router.pathname === '/projectDetails'
    ) {
      setHideExtra(2);
    }
    else {
      setHideExtra(1);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <>
      {(!loading) && (
        <section>
          {(!isSignedIn && !loading) ? (
            <Landing />
          ) : (
            <Box>
              {
                ((hideExtra == 1) && !loading) ? (
                  <div className={styles.container}>
                    <main className={styles.main}>
                      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                      <div className='d-flex'>
                        <Sidebar currentMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem} isOpen={isOpen} setIsOpen={setIsOpen} />

                        <div style={{ marginTop: 70 }} className={`${styles.rightSideContainer} ${(isOpen) ? (styles.shrinkContainer) : (styles.expandContainer)}`}>
                          {/* Home Page */}
                          <section className={(currentMenuItem === 1) ? ("") : ("d-none")}>
                            <Home />
                          </section>

                          {/* My Tasks Page */}
                          <section className={(currentMenuItem === 2) ? ("") : ("d-none")}>
                            <br />
                            <h3 style={{ marginLeft: 30, marginTop: 5, color: "black", fontWeight: "lighter" }}>My Tasks</h3>
                          </section>

                          {/* Inbox Page */}
                          <section className={(currentMenuItem === 3) ? ("") : ("d-none")}>
                            <Inbox
                              email={signedInUserData.email}
                            />
                          </section>

                          {/* Reporting Page */}
                          <section className={(currentMenuItem === 4) ? ("") : ("d-none")}>
                            <br />
                            <h3 style={{ marginLeft: 30, marginTop: 5, color: "black", fontWeight: "lighter" }}>Reporting</h3>
                          </section>

                          {/* Portfolios Page */}
                          <section className={(currentMenuItem === 5) ? ("") : ("d-none")}>
                            <br />
                            <h3 style={{ marginLeft: 30, marginTop: 5, color: "black", fontWeight: "lighter" }}>Portfolios</h3>
                          </section>

                          {/* Goals Page */}
                          <section className={(currentMenuItem === 6) ? ("") : ("d-none")}>
                            <br />
                            <h3 style={{ marginLeft: 30, marginTop: 5, color: "black", fontWeight: "lighter" }}>Goals</h3>
                          </section>
                        </div>
                      </div>
                    </main>
                  </div>
                ) : (hideExtra == 2 && !loading) && (
                  <div className={styles.container}>
                    <main className={styles.main}>
                      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                      <div className='d-flex'>
                        <Sidebar currentMenuItem={0} setCurrentMenuItem={setCurrentMenuItem} isOpen={isOpen} setIsOpen={setIsOpen} />

                        <main style={{ marginTop: 70 }} className={`${styles.rightSideContainer} ${(isOpen) ? (styles.shrinkContainer) : (styles.expandContainer)}`}>
                          {(router.pathname == `/profile/[uuid]` || router.pathname == '/profile') ? (
                            <ProfileComp />
                          ) : (router.pathname == '/projectDetails/[projectName]/[projectID]') ? (
                            <ProjectDetailsComp />
                          ) : (
                            <></>
                          )}
                        </main>
                      </div>
                    </main>
                  </div>
                )}
            </Box>
          )}
        </section>
      )}
      <Component {...pageProps} />
      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.5.0/mdb.min.js"
      ></Script>
    </>
  )
}
export default MyApp;