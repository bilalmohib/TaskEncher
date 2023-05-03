import React, { useEffect } from 'react';
// Importing Components
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';
import ReportDetailsInsideContent from '../ReportDetailsInsideContent';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

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

interface MainContentRDProps {
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
    // Project Sections
    projectSections: string[];
    setProjectSections: (value: string[]) => void;

    reportName: any;
    reportID: any;

    // Add Task Model Open
    isAddTaskModalOpen: boolean;
    setIsAddTaskModalOpen: (value: boolean) => void;

    // Invited Members Modal
    isInvitedMembersModalOpen: boolean;
    setIsInvitedMembersModalOpen: (value: boolean) => void;
}

const MainContentRD: React.FC<MainContentRDProps> = (
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

        // Project Sections
        projectSections,
        setProjectSections,

        // Project Details
        reportName,
        reportID,

        // Add Task Model Open
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,

        // Invited Members Modal
        isInvitedMembersModalOpen,
        setIsInvitedMembersModalOpen
    }) => {

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

                        // Optional Add Task Model Open
                        setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                    />
                </div>

                <div style={{ position: "relative", marginTop: "49.4px", zIndex: "0.1 !important" }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                    <ReportDetailsInsideContent
                        reportID={reportID}
                        reportName={reportName}
                        isSignedIn={isSignedIn}
                        signedInUserData={signedInUserData}

                        // Add Task Model Open
                        isAddTaskModalOpen={isAddTaskModalOpen}
                        setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                        projectMembers={projectMembers}

                        // Invited Members Modal
                        isInvitedMembersModalOpen={isInvitedMembersModalOpen}
                        setIsInvitedMembersModalOpen={setIsInvitedMembersModalOpen}

                        // Is Open
                        isOpen={isOpen}
                        // Show Header
                        showHeader={true}

                        // Projects
                        projects={projects}
                        setProjects={setProjects}
                    />
                    <SnackbarProvider />
                </div>
            </div>
        </main>
    );
};
export default MainContentRD;