import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

// Importing Components
import MainContent from '@app/components/Main/Home/MainContent';

// Importing firebase
import { auth } from "../../firebase";
import {
    onAuthStateChanged
} from "firebase/auth";
// Importing firebase

import styles from '../../styles/Home.module.css';

interface GlobalProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    currentMenuItem: number;
    setCurrentMenuItem: (currentMenuItem: number) => void;
    width: number;
    height: number;
}

const Dashboard: NextPage<GlobalProps> = (
    {
        setIsOpen,
        isOpen,
        currentMenuItem,
        setCurrentMenuItem,
        width,
        height
    }
) => {

    const router = useRouter();
    const { uid } = router.query;

    // Hide splash screen when we are server side 
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader)
                loader.style.display = 'none';
        }
    }, []);

    const [loading, setLoading] = useState<boolean>(true);

    //_________________ For Getting SignedInUser Data _____________________
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
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
                            photoURL: user.photoURL
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                        setLoading(false);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                        setLoading(false);
                    }
                    // ...
                }
            } else {
                // User is signed out
                console.log("User is signed out");
                setLoading(false);
                setSignedInUserData(null);
                setIsSignedIn(false);
                router.push("/");
                // ...
            }
        });
    }, [signedInUserData]);

    // Store div in a variable

    return (
        <div className={styles.container}>
            <Head>
                <meta charSet="utf-8" lang="en" />
                <link rel="icon" href="/logocopy.ico" />
                <meta name="description" content="A project management app built with Next JS, MUI,mdbootstrap and firebase" />
                <meta name="author" content="Muhammad-Bilal-7896" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <title>
                    {(loading) ? "TaskEncher: Supercharge Your Workflow and Amplify Task Management" : (isSignedIn) ? `${signedInUserData.displayName}'s Dashboard` : "TaskEncher: Supercharge Your Workflow and Amplify Task Management"}
                </title>
            </Head>

            {(!loading && isSignedIn) && (
                <MainContent
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    currentMenuItem={currentMenuItem}
                    setCurrentMenuItem={setCurrentMenuItem}
                    signedInUserData={signedInUserData}
                    width={width}
                    height={height}
                />
            )}
        </div>
    )
}
export default Dashboard;