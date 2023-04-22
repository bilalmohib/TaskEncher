// File Relative Path: pages/_app.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Script from 'next/script';
//////////////////////////////////////////////////

// Importing firebase
import { db, auth } from "../firebase";
import {
  onAuthStateChanged
} from "firebase/auth";
// Importing firebase

//Importing Containers CSS Files
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import '../styles/globals.css';
import '../styles/CreateProject/1.css'

function MyApp({ Component, pageProps }: AppProps & { Component: React.ComponentType<any> }) {

  // Hide splash screen when we are server side 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);

  const [isOpen, setIsOpen] = useState<Boolean>(true);

  const [currentMenuItem, setCurrentMenuItem] = useState<Number>(1);

  //_________________ For Getting SignedInUser Data _____________________
  const [signedInUserData, setSignedInUserData] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [Loading, setloading] = useState(true);
  //_________________ For Getting SignedInUser Data _____________________

  const [windowSize, setWindowSize] = useState([
    typeof window !== 'undefined' ? window.innerWidth : 0,
    typeof window !== 'undefined' ? window.innerHeight : 0,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // If width is less than 1460px then set isOpen to false
  useEffect(() => {
    if (windowSize[0] < 1460) {
      setIsOpen(false);
    }
  }, [windowSize]);

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

  return (
    <>
      {/* {(!loading) && (
        <section>
          {(!isSignedIn && !loading) ? (
            <Landing />
          ) : (
            <Component
              {...pageProps}

              // Is Side Bar Open
              isOpen={isOpen}
              setIsOpen={setIsOpen}

              // Current Menu Item
              currentMenuItem={currentMenuItem}
              setCurrentMenuItem={setCurrentMenuItem}
            />
          )}
        </section>
      )} */}

      <Component
        {...pageProps}

        // Is Side Bar Open
        isOpen={isOpen}
        setIsOpen={setIsOpen}

        // Current Menu Item
        currentMenuItem={currentMenuItem}
        setCurrentMenuItem={setCurrentMenuItem}

        // Current Height and Width of Window
        width={windowSize[0]}
        height={windowSize[1]}
      />

      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.5.0/mdb.min.js"
      ></Script>
    </>
  )
}
export default MyApp;