import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
// Importing Components
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';
import ProjectDetailsInside from './ProjectDetailsInside';
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

interface MainContentPDProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentMenuItem: number;
    setCurrentMenuItem: (value: number) => void;
    signedInUserData: any;
    isSignedIn: boolean;
    width: number;
    height: number;
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
    const { email, projectName, projectID } = router.query;

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    // let q = query(collection(db, "Data", "Projects", signedInUserData.email));
    let q = query(collection(db, "Projects"));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const fetchProjectData = (email: string, snapshot: any) => {
        if (!snapshot || !email) return;

        let arrProjects = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

        let localObj = arrProjects.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

        const localProjectMembers = localObj
            .map((project: any) => project?.ProjectMembers)
            .reduce((acc: any, val: any) => acc.concat(val), []);

        const localProjectSections = localObj
            .filter((project: any) => project?.id === projectID)
            .map((project: any) => project?.ProjectStages)
            .reduce((acc: any, val: any) => acc.concat(val), []);

        setProjects(arrProjects);
        setProjectMembers(localProjectMembers);
        setProjectSections(localProjectSections);
    };

    // FOR GETTING PROJECTS
    useEffect(() => {
        // @ts-ignore
        fetchProjectData(signedInUserData.email, snapshot);
    }, [loading, snapshot, router.query]);
    // FOR GETTING PROJECTS

    return (
        <main className={styles.container}>
            <ProjectDetailsInside
                projectID={projectID}
                projectName={projectName}
                isSignedIn={isSignedIn}
                signedInUserData={signedInUserData}

                // Add Task Model Open
                isAddTaskModalOpen={isAddTaskModalOpen}
                setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                projectMembers={projectMembers}

                // Invited Members Modal
                isInvitedMembersModalOpen={isInvitedMembersModalOpen}
                setIsInvitedMembersModalOpen={setIsInvitedMembersModalOpen}
            />
            <SnackbarProvider />
        </main>
    );
};
export default MainContentPD;