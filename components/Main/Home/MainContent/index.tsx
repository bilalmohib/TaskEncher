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

interface MainContentProps {
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
}

const MainContent: React.FC<MainContentProps> = (
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
        setIsModalOpen
    }) => {

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    let q = query(collection(db, "Data", "Projects", email));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const [projects, setProjects] = useState<any>([]);

    const [projectMembers, setProjectMembers] = useState<any>([]);

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
            // }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    return (
        <main className={styles.main}>
            <div
                style={{
                    zIndex: 1,
                    position: "relative"
                }}
            >
                <Navbar
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
            <div className="d-flex">
                <Sidebar
                    currentMenuItem={currentMenuItem}
                    setCurrentMenuItem={setCurrentMenuItem}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    projectMembers={projectMembers}
                    signedInUserData={signedInUserData}
                    projectList={projects}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />

                <div style={{ marginTop: "3.9%" }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                    {/* Home Page */}
                    <section className={currentMenuItem === 1 ? '' : 'd-none'}>
                        <Home />
                    </section>

                    {/* My Tasks Page */}
                    <section className={currentMenuItem === 2 ? '' : 'd-none'}>
                        <MyTasks />
                    </section>

                    {/* Inbox Page */}
                    <section className={currentMenuItem === 3 ? '' : 'd-none'}>
                        <Inbox email={signedInUserData.email} />
                    </section>

                    {/* Reporting Page */}
                    <section className={currentMenuItem === 4 ? '' : 'd-none'}>
                        <Reporting email={signedInUserData.email} />
                    </section>

                    {/* Portfolios Page */}
                    <section className={currentMenuItem === 5 ? '' : 'd-none'}>
                        <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>Portfolios</h3>
                    </section>

                    {/* Goals Page */}
                    <section className={currentMenuItem === 6 ? '' : 'd-none'}>
                        <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>Goals</h3>
                    </section>
                </div>
            </div>
        </main>
    );
};
export default MainContent;