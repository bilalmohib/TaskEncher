import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from './style.module.css';

// Importing Icons
import { CiTimer } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";

import DatePicker from 'react-date-picker/dist/entry.nostyle';

import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    where
} from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

import {
    onAuthStateChanged,
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../../firebase";
import CustomLoader from '../../../components/CustomLoader';
import HeaderProjectDetails from '../../../components/HeaderProjectDetails';

const currentDate = new Date();

const ProjectDetails: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Profile - Project Management Software</title>
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
        </div>
    )
}

const ProjectDetailsComp = () => {

    const [taskDue, setTaskDue] = useState<any>(currentDate);

    const frequentCollaboratorsList = [
        {
            name: "Bilal Mohib",
            email: "bilalmohib7896@gmail.com",
            photoURL: null
        },
        {
            name: "Arif Alvi",
            email: "arifalvi@gmail.com",
            photoURL: null
        },
        {
            name: "Imran Khan",
            email: "imrankhan@gmail.com",
            photoURL: null
        },
        {
            name: "Nawaz Sharif",
            email: "nawazsharif@gmail.com",
            photoURL: null
        },
        {
            name: "Asif Ali Zardari",
            email: "asifalizardari@gmail.com",
            photoURL: null
        }
    ]

    const router = useRouter();

    const { uuid } = router.query;

    const [firestoreData, setFirestoreData] = useState<any>([]);
    const [status, setStatus] = useState<Boolean>(false);
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

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
                            displayName: "Anonymous Guest",
                            email: "anonymous@guest.com",
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

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    let q = query(collection(db, "Data", "Projects", `${uuid}`));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // GETTINGS Active Jobs
    const [projects, setProjects] = useState<any>([])
    // const [loading, setLoading] = useState(true); 

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading) {
            // if (snapshot.docs.length !== projects.length) {
            setProjects(snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            // setLoading(false);
            // console.clear();
            console.log("Projects ==> ", projects);
            // }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    // useEffect(() => {
    //     if (projects.length !== 0) {
    //         setTaskDue(projects.map((project: any) => project.taskDue));

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////

    return (
        <div className={styles.container}>
            {(isSignedIn && !loading) ? (
                <div className={styles.container}>
                    <HeaderProjectDetails photoURL={signedInUserData.photoURL} />
                    <h1>Project Details</h1>
                </div>
            ) : (
                <CustomLoader />
            )}
        </div>
    )
}

export {
    ProjectDetails as default,
    ProjectDetailsComp
}
