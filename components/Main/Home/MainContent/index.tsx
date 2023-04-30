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
import Notifications from '@app/components/notifications';

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

    // Project Members
    projectMembers: string[];
    setProjectMembers: (value: string[]) => void;

    // Projects
    projects: any;
    setProjects: (value: any) => void;

    // Customized Modal
    isModalOpenCustomized: boolean;
    setIsModalOpenCustomized: (value: boolean) => void;

    //Widgets
    widgetsList: any;
    setWidgetsList: (value: any) => void;

    // Add Task Model Open
    isAddTaskModalOpen: boolean;
    setIsAddTaskModalOpen: (value: boolean) => void;
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
        setIsModalOpen,

        // Project Members
        projectMembers,
        setProjectMembers,

        // Projects
        projects,
        setProjects,

        // Customized Modal
        isModalOpenCustomized,
        setIsModalOpenCustomized,

        //Widgets
        widgetsList,
        setWidgetsList,

        // Add Task Model Open
        isAddTaskModalOpen,
        setIsAddTaskModalOpen
    }) => {

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    let q = query(collection(db, "Data", "Projects", email));

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
        <main className="main">
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

                <div style={{ marginTop: "49px" }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                    {/* Home Page */}
                    <section className={currentMenuItem === 1 ? '' : 'd-none'}>
                        <Home
                            projectList={projects}
                            projectMembers={projectMembers}
                            isModalOpenCustomized={isModalOpenCustomized}
                            setIsModalOpenCustomized={setIsModalOpenCustomized}
                            widgetsList={widgetsList}
                            setWidgetsList={setWidgetsList}
                        />
                    </section>

                    {/* My Tasks Page */}
                    <section className={currentMenuItem === 2 ? '' : 'd-none'}>
                        <MyTasks
                            // Add Task Model
                            isAddTaskModalOpen={isAddTaskModalOpen}
                            setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                        />
                    </section>

                    {/* Inbox Page */}
                    <section className={currentMenuItem === 3 ? '' : 'd-none'}>
                        <Inbox email={email} />
                    </section>

                    {/* Reporting Page */}
                    <section className={currentMenuItem === 4 ? '' : 'd-none'}>
                        <Reporting email={email} />
                    </section>

                    {/* Portfolios Page */}
                    {/* <section className={currentMenuItem === 5 ? '' : 'd-none'}>
                        <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>Portfolios</h3>
                    </section> */}

                    {/* Goals Page */}
                    <section className={currentMenuItem === 6 ? '' : 'd-none'}>
                        {/* <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>Notifications</h3> */}
                        <Notifications />
                    </section>
                </div>
            </div>
        </main>
    );
};
export default MainContent;