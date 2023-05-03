import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

// Importing Components
import MainContent from '@app/components/Main/Home/MainContent';
import CustomModal from '@app/components/CustomModal';

import { Button } from '@mui/material';

// Importing firebase
import {
    onAuthStateChanged
} from "firebase/auth";
import { db, auth } from "../../firebase";
// Importing firebase

import styles from '../../styles/Home.module.css';

interface GlobalProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    currentMenuItem: number;
    setCurrentMenuItem: (currentMenuItem: number) => void;
    width: number;
    height: number;
}

const Dashboard: NextPage<GlobalProps> = (
    {
        setIsOpen,
        isOpen,
        currentMenuItem,
        setCurrentMenuItem,
        width,
        height
    }
) => {

    const router = useRouter();
    const { email } = router.query;

    // Hide splash screen when we are server side 
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader)
                loader.style.display = 'none';
        }
    }, []);

    const [loading, setLoading] = useState<boolean>(true);

    const [widgetsList, setWidgetsList] = useState({
        backgroundImages: [
            "https://images.pexels.com/photos/36767/tree-natur-nightsky-cloud.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/427900/pexels-photo-427900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/67563/plane-aircraft-jet-airbase-67563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/326081/pexels-photo-326081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/716834/pexels-photo-716834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        widgets: [{
            id: 1,
            src: <audio id='hoverSoundClip'>
                <source src="audio/1.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "Projects",
            isVisible: true
        },
        {
            id: 2,
            src: <audio id='hoverSoundClip'>
                <source src="audio/2.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "My Tasks",
            isVisible: true
        },
        {
            id: 3,
            src: <audio id='hoverSoundClip'>
                <source src="audio/3.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "People",
            isVisible: true
        },
            // {
            //     id: 4,
            //     src: <audio id='hoverSoundClip'>
            //         <source src="audio/4.mp3" />
            //         Your browser is not invited for super fun audio time.
            //     </audio>,
            //     name: "Tasks I've Assigned",
            //     isVisible: false
            // },
            // {
            //     id: 5,
            //     src: <audio id='hoverSoundClip'>
            //         <source src="audio/5.mp3" />
            //         Your browser is not invited for super fun audio time.
            //     </audio>,
            //     name: "My goals",
            //     isVisible: false
            // },
            // {
            //     id: 6,
            //     src: <audio id='hoverSoundClip'>
            //         <source src="audio/6.mp3" />
            //         Your browser is not invited for super fun audio time.
            //     </audio>,
            //     name: "Manager Tasks",
            //     isVisible: false
            // }
        ]
    });

    const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(
        "https://www.pixelstalk.net/wp-content/uploads/2016/05/New-Wallpaper-Full-HD-1920x1080.jpg"
    );

    useEffect(() => {
        document.documentElement.style.setProperty("--selected-bg-image", `url(${selectedBackgroundImage})`);
    }, [selectedBackgroundImage]);


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

    // Store div in a variable

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Customizing Modal
    const [isModalOpenCustomized, setIsModalOpenCustomized] = React.useState(false);

    // Projects
    const [projects, setProjects] = useState<any>([]);
    // Project Sections
    const [projectSections, setProjectSections] = useState<any>([]);
    // Project Members
    const [projectMembers, setProjectMembers] = useState<any>([]);

    // Add Task Model
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false);

    return (
        <div className={styles.container}>
            <Head>
                <meta charSet="utf-8" lang="en" />
                <link rel="icon" href="/logocopy.ico" />
                <meta name="description" content="A project management app built with Next JS, MUI,mdbootstrap and firebase" />
                <meta name="author" content="Muhammad-Bilal-7896" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <meta name="viewport" content="width=1500" /> */}
                <meta name="theme-color" content="#000000" />
                <title>
                    {(loading) ? "TaskEncher: Supercharge Your Workflow and Amplify Task Management" : (isSignedIn) ? `${signedInUserData.displayName}'s Dashboard` : "TaskEncher: Supercharge Your Workflow and Amplify Task Management"}
                </title>
            </Head>

            {(!loading && isSignedIn) && (
                <div>
                    <MainContent
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        currentMenuItem={currentMenuItem}
                        setCurrentMenuItem={setCurrentMenuItem}
                        signedInUserData={signedInUserData}
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
                        // Project Sections
                        projectSections={projectSections}
                        setProjectSections={setProjectSections}
                        // Customizing Modal
                        isModalOpenCustomized={isModalOpenCustomized}
                        setIsModalOpenCustomized={setIsModalOpenCustomized}

                        // Widgets
                        widgetsList={widgetsList}
                        setWidgetsList={setWidgetsList}

                        // Add Task Model
                        isAddTaskModalOpen={isAddTaskModalOpen}
                        setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                    />
                </div>
            )}
            <CustomModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                modalType="inviteMembers"
                title='Add people to TaskEncher Software'
                projects={projects}
                projectMembers={projectMembers}
            />

            <CustomModal
                open={isModalOpenCustomized}
                setOpen={setIsModalOpenCustomized}
                modalType="customize"
                title='Customize'
                projects={projects}
                projectMembers={projectMembers}

                // Widgets
                widgetsList={widgetsList}
                setWidgetsList={setWidgetsList}

                // Background Image
                selectedBackgroundImage={selectedBackgroundImage}
                setSelectedBackgroundImage={setSelectedBackgroundImage}
            />

            <CustomModal
                open={isAddTaskModalOpen}
                setOpen={setIsAddTaskModalOpen}
                modalType="addTasks"
                title='Add Task'
                projects={projects}
                projectMembers={projectMembers}
            />
        </div>
    )
}
export default Dashboard;