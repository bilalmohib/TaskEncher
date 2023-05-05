import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
// Importing Components
import ProfileComp from '@app/components/Pages/Profile/ProfileComp';

import Home from '@app/components/Main/Home';
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';
import Inbox from '@app/components/Main/Inbox';
import Reporting from '@app/components/Main/Reporting';
import MyTasks from '@app/components/Main/MyTasks';

// Importing Material UI Components
import {
    Box
} from '@mui/material';

import { db, auth } from "../../../../firebase";
// Importing firebase

import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    where,
    getFirestore,
    updateDoc
} from "firebase/firestore";

import { useCollection } from 'react-firebase-hooks/firestore';

import styles from "./style.module.css";

interface MainContentProfileProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentMenuItem: number;
    setCurrentMenuItem: (value: number) => void;
    signedInUserData: { email: string };
    width: number;
    height: number;
    email: string;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    // Project Members
    projectMembers: string[];
    setProjectMembers: (value: string[]) => void;
    // Projects
    projects: any;
    setProjects: (value: any) => void;
}

const MainContentProfile: React.FC<MainContentProfileProps> = (
    {
        isOpen,
        setIsOpen,
        currentMenuItem,
        setCurrentMenuItem,
        signedInUserData,
        width,
        height,
        email,
        isModalOpen,
        setIsModalOpen,

        // Project Members
        projectMembers,
        setProjectMembers,

        // Projects
        projects,
        setProjects
    }) => {

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    // let q = query(collection(db, "Data", "Projects", email));
    let q = query(collection(db, "Projects"));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading && snapshot && email) {
            let localObj: any;
            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            localObj = arrProjects;

            // Now only i need projects that are created by me means email is equal to signedInUserData.email
            // or that are shared with me means project members array contains signedInUserData.email

            // Filter the projects array and extract only those projects that are created by me
            // localObj = localObj.filter((project: any) => );

            // Filter the projects array and extract only those projects that are shared with me
            localObj = localObj.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

            const projectMembers: any = localObj
                .map((project: any) => project?.ProjectMembers) // extract ProjectMembers array from each project
                .reduce((acc: any, val: any) => acc.concat(val), []); // concatenate all ProjectMembers arrays into a single array

            // Extract all the project members from the projects array
            setProjects(arrProjects);

            // Set the project members in the state
            setProjectMembers(projectMembers);

            // console.clear();
            console.log("Projects ==> ", snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log("Projects Local ==> ", localObj);
            console.log("Project Members ==> ", projectMembers);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    return (
        <main className={styles.main}>
            <ProfileComp
                isSignedIn={signedInUserData !== null}
                signedInUserData={signedInUserData}
                projectMembers={projectMembers}
                email={email}
            />
        </main>
    );
};
export default MainContentProfile;