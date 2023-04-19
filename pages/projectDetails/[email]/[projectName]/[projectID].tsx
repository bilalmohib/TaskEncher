import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import {
    onAuthStateChanged,
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../../../firebase";
import CustomModal from '@app/components/CustomModal';
import CustomLoader from '@app/components/CustomLoader';
import MainContentPD from '@app/components/ProjectDetails/MainContentPD';

interface MainContentProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    currentMenuItem: number;
    setCurrentMenuItem: (currentMenuItem: number) => void;
    width: number;
    height: number;
}

const ProjectDetails: React.FC<MainContentProps> = (
    {
        setIsOpen,
        isOpen,
        currentMenuItem,
        setCurrentMenuItem,
        width,
        height
    }) => {
    const router = useRouter();
    const { email, projectName, projectID } = router.query;

    const [loading, setLoading] = useState<boolean>(true);

    //_________________ For Getting SignedInUser Data _____________________
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    //_________________ For Getting SignedInUser Data _____________________

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if (signedInUserData === null) {
                    setIsSignedIn(true);
                    if (user.isAnonymous === true) {
                        let tempUser = {
                            displayName: "Anonymous",
                            email: `anonymous${user.uid}@guest.com`,
                            photoURL: user.photoURL
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                        setLoading(false);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                        setLoading(false);
                    }
                    // ...
                }
            } else {
                // User is signed out
                console.log("User is signed out");
                setLoading(false);
                setSignedInUserData(null);
                setIsSignedIn(false);
                router.push("/");
                // ...
            }
        });
    }, [router, signedInUserData]);

    const [projects, setProjects] = useState<any>([]);

    const [projectMembers, setProjectMembers] = useState<string[]>([]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////

    return (
        <div>
            <Head>
                <title>Project Details - TaskEncher (Supercharge Your Workflow and Amplify Task Management) </title>
                <meta charSet="utf-8" lang='en' />
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>

            {(!loading && isSignedIn) && (
                <>
                    <MainContentPD
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        currentMenuItem={currentMenuItem}
                        setCurrentMenuItem={setCurrentMenuItem}
                        signedInUserData={signedInUserData}
                        isSignedIn={isSignedIn}
                        width={width}
                        height={height}
                        email={signedInUserData.email}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        // Project Members
                        projectMembers={projectMembers}
                        setProjectMembers={setProjectMembers}
                        // Projects
                        projects={projects}
                        setProjects={setProjects}

                        projectName={projectName}
                        projectID={projectID}
                    />
                </>
            )}

            <CustomModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                modalType='inviteMembers'
                title='Invite Members'
                projects={projects}
                projectMembers={projectMembers}
            />

        </div>
    )
}

export default ProjectDetails;
