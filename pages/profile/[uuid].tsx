import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

// Importing Material UI Components
import {
    Box
} from '@mui/material';

import {
    onAuthStateChanged,
} from "firebase/auth";

import { db, auth } from "../../firebase";

// Importing Components
import ProfileComp from '@app/components/Pages/Profile/ProfileComp';
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';

import styles from './style.module.css';

interface GlobalProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    currentMenuItem: number;
    setCurrentMenuItem: (currentMenuItem: number) => void;
}

const Profile: NextPage<GlobalProps> = (
    {
        setIsOpen,
        isOpen,
        currentMenuItem,
        setCurrentMenuItem
    }
) => {
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    useEffect(() => {

        // console.log("Current Path : ", window.location.pathname);
        // console.log("activeJobs ==>", activeJobs);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if (signedInUserData === null) {
                    if (user.isAnonymous === true) {
                        let tempUser = {
                            displayName: "Anonymous",
                            email: `anonymous${user.uid}@guest.com`,
                            photoURL: user.photoURL,
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                        setIsSignedIn(true);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                        setIsSignedIn(true);
                    }
                    // ...
                }
            } else {
                // User is signed out
                console.log("User is signed out");
                // alert("Please sign in to continue");
                // navigate("/login");
                // ...
            }
        });
    }, [signedInUserData, isSignedIn]);

    return (
        <div className={styles.container}>
            <Head>
                <meta charSet="utf-8" lang='en' />
                <link rel="icon" href="/logocopy.ico" />
                <meta name="description" content="A project management app built with Next JS, MUI,mdbootstrap and firebase" />
                <meta name="author" content="Muhammad-Bilal-7896" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <title> Profile - TaskEncher</title>
            </Head>

            {(signedInUserData !== null) && (
                <>
                    <main className={styles.main}>
                        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                        <div className='d-flex'>
                            <Sidebar currentMenuItem={0} setCurrentMenuItem={setCurrentMenuItem} isOpen={isOpen} setIsOpen={setIsOpen} />

                            <main style={{ marginTop: 70 }} className={`${styles.rightSideContainer} ${(isOpen) ? (styles.shrinkContainer) : (styles.expandContainer)}`}>
                                <ProfileComp
                                    isSignedIn={isSignedIn}
                                    signedInUserData={signedInUserData}
                                />
                            </main>
                        </div>
                    </main>
                </>
            )}
        </div>
    )
}
export default Profile;
