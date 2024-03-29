import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from './style.module.css';

// Importing Icons
import { CiTimer } from "react-icons/ci";
import { AiOutlineMail, AiOutlinePlus } from "react-icons/ai";
import { BsCheckCircle, BsTriangle } from "react-icons/bs";
import { TbListDetails, TbSquareRotated } from "react-icons/tb";
import { SlLink } from "react-icons/sl";

// import DatePicker from 'react-date-picker/dist/entry.nostyle';

import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    where
} from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

import {
    onAuthStateChanged,
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../../firebase";
import CustomLoader from '@app/components/CustomLoader';
import Overview from '@app/components/ProjectDetails/Overview';
import HeaderMyTasks from '@app/components/HeaderMyTasks';
import List from '@app/components/ProjectDetails/List';
import Board from '@app/components/ProjectDetails/Board';
import Timeline from '@app/components/ProjectDetails/Timeline';
import Calender from '@app/components/ProjectDetails/Calender';
import Workflow from '@app/components/ProjectDetails/Workflow';
import Dashboard from '@app/components/ProjectDetails/Dashboard';
import Messages from '@app/components/ProjectDetails/Messages';
import Files from '@app/components/ProjectDetails/Files';
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';
import ListMT from '@app/components/MyTasks/ListMT';

interface MyTasksProps {
    // Add Task Model Open
    isAddTaskModalOpen: boolean;
    setIsAddTaskModalOpen: (value: boolean) => void;
    projectMembers: string[];
    signedInUserData: any,
    isSignedIn: boolean
}

const MyTasks: NextPage<MyTasksProps> = (
    {
        // Add Task Model Open
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,
        projectMembers,
        signedInUserData,
        isSignedIn
    }
) => {
    const projectID = "60ey7xJel4dLrhBpKwIh";
    const [selectedTabItemValue, setSelectedTabItemValue] = useState<Number>(1);

    return (
        <div className={styles.container}>
            {(isSignedIn) ? (
                <div className={styles.mainSectionContainer}>
                    <header className={`fixed-top ${styles.header}`} style={{ position: "relative", zIndex: "1000 !imoprtant" }}>
                        <HeaderMyTasks
                            projectID={projectID}
                            email={signedInUserData.email}
                            photoURL={signedInUserData.photoURL}
                            selectedTabItemValue={selectedTabItemValue}
                            setSelectedTabItemValue={setSelectedTabItemValue} />
                    </header>

                    <div>
                        {(selectedTabItemValue === 1) ? (
                            <ListMT
                                email={signedInUserData.email}
                                // projectName={projectName}
                                // projectID={projectID}

                                // Add Task Model Open
                                isAddTaskModalOpen={isAddTaskModalOpen}
                                setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                                projectMembers={projectMembers}
                            />
                            // ) : (selectedTabItemValue === 2) ? (
                            //     <Board />
                        ) : (selectedTabItemValue === 2) ? (
                            <Calender />
                        ) : (selectedTabItemValue === 3) ? (
                            <Messages />
                        ) : (selectedTabItemValue === 4) ? (
                            <Files />
                        ) : (
                            <>Please Select the correct tab</>
                        )}
                    </div>
                </div>
            ) : (
                <CustomLoader />
            )}
        </div>
    )
}
export default MyTasks;