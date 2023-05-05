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
import { useRouter } from 'next/router';

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

        // Add Task Model Open
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,

        // Invited Members Modal
        isInvitedMembersModalOpen,
        setIsInvitedMembersModalOpen
    }) => {
    const router = useRouter();
    const { reportName, reportID } = router.query;

    return (
        <main className={styles.main}>
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
        </main>
    );
};
export default MainContentRD;