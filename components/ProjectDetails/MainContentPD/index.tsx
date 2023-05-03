import React, { useEffect } from 'react';
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

    projectName: any;
    projectID: any;

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
        projectName,
        projectID,

        // Add Task Model Open
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,

        // Invited Members Modal
        isInvitedMembersModalOpen,
        setIsInvitedMembersModalOpen
    }) => {

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    // let q = query(collection(db, "Data", "Projects", signedInUserData.email));
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

            const localProjectMembers: any = localObj
                .map((project: any) => project?.ProjectMembers) // extract ProjectMembers array from each project
                .reduce((acc: any, val: any) => acc.concat(val), []); // concatenate all ProjectMembers arrays into a single array

            // Loop over the projects array and where the project id matches the project id in the project members array, extract the project sections
            const localProjectSections: any = localObj
                .filter((project: any) => project?.id === projectID)
                .map((project: any) => project?.ProjectStages) // extract ProjectSections array from each project
                .reduce((acc: any, val: any) => acc.concat(val), []); // concatenate all ProjectSections arrays into a single array

            // Extract all the project members from the projects array
            setProjects(arrProjects);

            // Set the project members in the state
            setProjectMembers(localProjectMembers);

            // Set the project sections in the state
            setProjectSections(localProjectSections);

            // console.clear();
            console.log("Projects ==> ", snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log("Projects Local ==> ", localObj);
            console.log("Project Members ==> ", projectMembers);
            console.log("Project Sections ==> ", projectSections);
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

                        // Optional Add Task Model Open
                        setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                    />
                </div>

                <div style={{ position: "relative", marginTop: "49.4px", zIndex: "0.1 !important" }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
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
                </div>
            </div>
        </main>
    );
};
export default MainContentPD;