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

    // Project Sections
    projectSections: string[];
    setProjectSections: (value: string[]) => void;

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

        // Project Sections
        projectSections,
        setProjectSections,

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
    // let q = query(collection(db, "Data", "Projects", email));
    let q = query(collection(db, "Projects"));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading && snapshot && email) {
            let localObj: any;

            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            localObj = arrProjects;

            // Now only i need projects that are created by me means email is equal to signedInUserData.email
            // or that are shared with me means project members array contains signedInUserData.email

            // Filter the projects array and extract only those projects that are created by me
            // localObj = localObj.filter((project: any) => project?.createdBy === email);

            // Filter the projects array and extract only those projects that are shared with me
            localObj = localObj.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

            let totalCompletedTasks = 0;

            for (let i = 0; i < localObj.length; i++) {
                for (let j = 0; j < localObj[i]?.ProjectTasks?.length; j++) {
                    if (localObj[i]?.ProjectTasks[j]?.taskStatus === "completed") {
                        totalCompletedTasks++;
                    }
                }
            }

            // EXTRACT PROJECT MEMBERS
            const projectMembers: any = localObj
                .map((project: any) => project?.ProjectMembers) // extract ProjectMembers array from each project
                .reduce((acc: any, val: any) => acc.concat(val), []); // concatenate all ProjectMembers arrays into a single array

            // Loop through the project localObj and extract the project sections from each project
            const localProjectSections: any = localObj
                .filter((project: any) => project?.id === "projectID")
                .map((project: any) => project?.ProjectStages) // extract ProjectSections array from each project
                .reduce((acc: any, val: any) => acc.concat(val), []); // concatenate all ProjectSections arrays into a single array

            // Extract all the project members from the projects array
            setProjects(localObj);

            // Set the project members in the state
            setProjectMembers(projectMembers);

            // Set the project sections in the state
            setProjectSections(localProjectSections);

            // Set the total completed tasks in the state
            setTotalCompletedTasks(totalCompletedTasks);

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
                        setIsAddTaskModalOpen={setIsAddTaskModalOpen}
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
                            totalCompletedTasks={totalCompletedTasks}
                        />
                    </section>

                    {/* My Tasks Page */}
                    <section className={currentMenuItem === 2 ? '' : 'd-none'}>
                        <MyTasks
                            // Add Task Model
                            isAddTaskModalOpen={isAddTaskModalOpen}
                            setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                            projectMembers={projectMembers}
                            signedInUserData={signedInUserData}
                            isSignedIn={signedInUserData !== null}
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