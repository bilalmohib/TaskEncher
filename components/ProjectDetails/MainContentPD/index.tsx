import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
// Importing Components
import Home from '@app/components/Main/Home';
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';
import Inbox from '@app/components/Main/Inbox';
import Reporting from '@app/components/Main/Reporting';
import ProjectDetailsInside from './ProjectDetailsInside';
import MyTasks from '@app/components/Main/MyTasks';

// Importing Material UI Components
import {
    Box
} from '@mui/material';

import { db, auth } from "../../../firebase";
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

interface MainContentPDProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentMenuItem: number;
    setCurrentMenuItem: (value: number) => void;
    signedInUserData: any;
    isSignedIn: boolean;
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

    projectName: any;
    projectID: any;
}

const MainContentPD: React.FC<MainContentPDProps> = (
    {
        isOpen,
        setIsOpen,
        currentMenuItem,
        setCurrentMenuItem,
        signedInUserData,
        isSignedIn,
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
        setProjects,

        projectName,
        projectID
    }) => {

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    let q = query(collection(db, "Data", "Projects", signedInUserData.email));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading && snapshot && email) {
            let localObj;

            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            localObj = arrProjects;

            const projectMembers = localObj
                .map((project: any) => project?.ProjectMembers) // extract ProjectMembers array from each project
                .reduce((acc, val) => acc.concat(val), []); // concatenate all ProjectMembers arrays into a single array

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
        <main className='main'>
            <div style={{ position: "relative", zIndex: "100 !important" }}>
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="d-flex">
                <div style={{ position: "relative", zIndex: "1000 !important" }}>
                    <Sidebar
                        currentMenuItem={currentMenuItem}
                        setCurrentMenuItem={setCurrentMenuItem}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        projectMembers={projectMembers}
                        email={email}
                        projectList={projects}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>

                <div style={{ position: "relative", marginTop: "50px", zIndex: "0.1 !important" }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                    <ProjectDetailsInside
                        projectID={projectID}
                        projectName={projectName}
                        isSignedIn={isSignedIn}
                        signedInUserData={signedInUserData}
                    />
                </div>
            </div>
        </main>
    );
};
export default MainContentPD;