import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

// Importing Material UI Components
import {
    Box
} from '@mui/material';

// Importing Icons
import { CiTimer } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    where,
    getFirestore,
    updateDoc,
} from "firebase/firestore";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { differenceInDays } from "date-fns";
import Link from "next/link";

import {
    Tooltip,
    Button,
    IconButton
} from "@mui/material";

import { useCollection } from "react-firebase-hooks/firestore";

import { db, auth } from "../../../../firebase";

// Importing Components
import CustomLoader from '@app/components/CustomLoader';

import styles from './style.module.css';
import colors from '@app/lib/colors';

interface ProfileCompProps {
    isSignedIn: boolean;
    signedInUserData: any;
    projectMembers: string[];
    email: string;
}

const ProfileComp: React.FC<ProfileCompProps> = ({
    isSignedIn,
    signedInUserData,
    projectMembers,
    email,
}) => {
    const router = useRouter();

    const taskRef: any = useRef();

    let temp: any = formatDate(new Date().toISOString());

    function formatDate(dateString: string | undefined) {
        // @ts-ignore
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const getDateTimeInDayjs = (date: any) => {
        return dayjs(date);
    };

    // @ts-ignore
    const e = email;
    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    // let q = query(collection(db, "Data", "Projects", e));
    let q = query(collection(db, "Projects"))

    const [snapshot, loading, error] = useCollection(q, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

    // GETTINGS Project Details
    const [projectDetails, setProjectDetails] = useState<any>(null);
    // const [loading, setLoading] = useState(true);

    const [projects, setProjects] = useState<any>([]);

    const [projectStages, setProjectStages] = useState<any>([
        "Recently Assigned",
        "In Progress",
        "Completed",
    ]);

    const [projectTasks, setProjectTasks] = useState<any>([]);

    const [currentEditedTaskValue, setCurrentEditedTaskValue] = useState(null);

    const [currentSectionValue, setCurrentSectionValue] = useState<any>(null);

    // for checking if edit task is clicked or not
    const [editTask, setEditTask] = useState<any>(null);

    // Is Editable
    const [isEditable, setIsEditable] = useState(false);

    const [currentEditSelected, setCurrentEditSelected] = useState<any>(null);

    const [expandDetailsTable, setExpandDetailsTable] = useState<any>(null);

    useEffect(() => {
        if (!loading && snapshot && email) {
            let myTasks = [];

            let localObj: any;

            let arrProjectsLocal = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            localObj = arrProjectsLocal;

            // Now only i need projects that are created by me means email is equal to signedInUserData.email
            // or that are shared with me means project members array contains signedInUserData.email

            // Filter the projects array and extract only those projects that are created by me
            // localObj = localObj.filter((project: any) => );

            // Filter the projects array and extract only those projects that are shared with me
            localObj = localObj.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

            let arrProjects: any = localObj;

            // Extract tasks with assignee equal to signedInUserData.email and update their taskSection
            for (let project of arrProjects) {
                for (let task of project.ProjectTasks) {
                    if (task.taskAssignee.includes(signedInUserData.email)) {
                        const currentDate = new Date();
                        const taskDueDate = new Date(task.taskDue);
                        const daysDifference = differenceInDays(taskDueDate, currentDate);

                        if (task.taskStatus === "completed") {
                            task.taskSection = "Completed";
                        } else if (daysDifference <= 3) {
                            task.taskSection = "Recently Assigned";
                        } else {
                            task.taskSection = "In Progress";
                        }

                        myTasks.push(task);
                    }
                }
            }

            setProjects(arrProjects);
            setProjectTasks(myTasks);

            console.log("My Tasks ==> ", projectTasks);
            console.log("Projects ==> ", projects);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot, signedInUserData]);

    // FOR GETTING PROJECTS

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////

    return (
        <div className={styles.container}>
            {(isSignedIn && !loading) ? (
                <div>
                    <div className={styles.profileContainerTop}>
                        <div className='d-flex'>
                            <div className={styles.profileImageContainer}>
                                <Image
                                    className={styles.profileImage}
                                    width={120}
                                    height={120}
                                    src={signedInUserData.photoURL}
                                    alt={signedInUserData.displayName}
                                    title={signedInUserData.displayName}
                                    loading='eager'
                                />
                            </div>
                            <div className={styles.profileRightContainer}>
                                <h4 className={styles.profileName}>{signedInUserData.displayName}</h4>
                                <p className={styles.profileInfoContainer}>
                                    <p>
                                        <CiTimer />
                                        {/* 10:19am  */}
                                        &nbsp;
                                        {new Date().toLocaleTimeString()}
                                        &nbsp;
                                        local time
                                    </p>
                                    <p style={{ marginLeft: 10 }}><AiOutlineMail />  <span className={styles.email}>{signedInUserData?.email}</span></p>
                                </p>
                            </div>
                        </div>
                        <div>
                            <button
                                className={`btn btn-primary ${styles.signOutBtn}`}
                                onClick={() => {
                                    auth.signOut();
                                    router.push("/login");
                                }}>
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Profile Container */}
                    <div className={styles.profileContainerMain}>
                        <div className={styles.myTasksMainContainer}>
                            <div>
                                <header className={styles.headerMyTasks}>
                                    <div>
                                        My tasks
                                    </div>
                                    <div className={styles.myTasksHeaderRight}>
                                        <button className={`btn ${styles.viewAllTasksBtn}`} onClick={() => {
                                            router.push(`/dashboard/${signedInUserData.email}`);
                                            setTimeout(() => {
                                                router.reload();
                                            }, 5000);
                                        }}>View all tasks</button>
                                    </div>
                                </header>
                                <section className={styles.bodymyTasksContainer}>
                                    {
                                        projectTasks.map((item: any, index: any) => {
                                            return (
                                                <div key={index} className={styles.myTasksList}>
                                                    <div className={styles.myTasksListLeft}>
                                                        <p className={styles.taskCompleteIcon}>
                                                            {/* <BsCheckCircle /> */}
                                                            {(item.taskStatus === "inProgress") ? (
                                                                <Tooltip title="Mark As Complete">
                                                                    <CheckCircleOutlineIcon
                                                                        sx={{
                                                                            display: "inline",
                                                                            fontSize: 30,
                                                                            color: "#858686",
                                                                            '&:hover': {
                                                                                color: "#00ff00",
                                                                                cursor: "pointer"
                                                                            }
                                                                        }}
                                                                    // onClick={() => {
                                                                    //   updateTask(
                                                                    //     j,
                                                                    //     "completed",
                                                                    //     "taskStatus",
                                                                    //     e,
                                                                    //     projectID.toString(),
                                                                    //     projects
                                                                    //   )
                                                                    // }}
                                                                    />
                                                                </Tooltip>
                                                            ) : (item.taskStatus === "completed") ? (
                                                                <Tooltip title="Mark As InProgress">
                                                                    <CheckCircleIcon
                                                                        sx={{
                                                                            display: "inline",
                                                                            fontSize: 30,
                                                                            color: "#58a182",
                                                                            '&:hover': {
                                                                                color: "#368e6a",
                                                                                cursor: "pointer"
                                                                            }
                                                                        }}
                                                                    // onClick={() => {
                                                                    //   updateTask(
                                                                    //     j,
                                                                    //     "inProgress",
                                                                    //     "taskStatus",
                                                                    //     e,
                                                                    //     projectID.toString(),
                                                                    //     projects
                                                                    //   )
                                                                    // }}
                                                                    />
                                                                </Tooltip>
                                                            ) : (<Tooltip title="Mark As Complete">
                                                                <CheckCircleOutlineIcon
                                                                    sx={{
                                                                        display: "inline",
                                                                        fontSize: 30,
                                                                        color: "#858686",
                                                                        '&:hover': {
                                                                            color: "#00ff00",
                                                                            cursor: "pointer"
                                                                        }
                                                                    }}
                                                                // onClick={() => {
                                                                //   updateTask(
                                                                //     j,
                                                                //     "completed",
                                                                //     "taskStatus",
                                                                //     e,
                                                                //     projectID.toString(),
                                                                //     projects
                                                                //   )
                                                                // }}
                                                                />
                                                            </Tooltip>)
                                                            }
                                                            &nbsp;&nbsp;
                                                        </p>
                                                        <p className={styles.pnmyTask}>{item.taskName}</p>
                                                    </div>
                                                    <div className={`${styles.myTasksListRight} d-flex`}>
                                                        <div className='mr-4'
                                                            style={{
                                                                width: "auto",
                                                                height: "30px",
                                                                paddingTop: "2px",
                                                                paddingLeft: "5px",
                                                                paddingRight: "5px",
                                                                borderRadius: "5px",
                                                                color: "white",
                                                                // border: "1px solid white",
                                                                backgroundColor:
                                                                    item.taskPriority === "Low" ? "#0fbe58" :
                                                                        item.taskPriority === "Medium" ? "#e0ab0a" :
                                                                            item.taskPriority === "High" ? "#e91414" : "transparent",
                                                            }}
                                                        >
                                                            {item.taskPriority}
                                                        </div>
                                                        <div>
                                                            {/* <DatePicker
                                                            onChange={setTaskDue}
                                                            value={new Date(item.ProjectEndingDate)}
                                                        /> */}
                                                            {new Date(item.taskDue).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                            </div>
                        </div>

                        <div className={styles.rightSideMainContainer}>
                            <div className={styles.aboutMeContainer}>
                                <h1 className=''>About me</h1>
                                <p>Use this space to tell people about yourself.</p>
                            </div>
                            <div className={styles.frequentCollaborators}>
                                <h1 className={styles.fcHeading}>Frequent collaborators</h1>
                                <div className={styles.outsideContainerFCL}>
                                    {
                                        projectMembers.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={styles.frequentCollaboratorsList}
                                                >
                                                    <div className={`${styles.lifcl} d-flex`}>
                                                        <div className={styles.frequentCollaboratorsImageContainer}>
                                                            {/* <Image
                                                                className={styles.frequentCollaboratorsImage}
                                                                width={48}
                                                                height={48}
                                                                src={(item.photoURL !== null)
                                                                    ? item.photoURL
                                                                    : "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAEdFTp7zFuG2WiiEzzreDfzI4170bnvEDdD_l1Hlly7K%3Ds96-c&w=256&q=75"
                                                                }
                                                                alt={item.name}
                                                                title={item.name}
                                                            /> */}
                                                            <Tooltip title={item}>
                                                                <Box
                                                                    sx={{
                                                                        width: 48,
                                                                        height: 48,
                                                                        borderRadius: "50%",
                                                                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        fontSize: 16,
                                                                        fontWeight: "lighter",
                                                                        color: "#fff",
                                                                        mt: "5px"
                                                                    }}
                                                                >
                                                                    {
                                                                        // Extract the first and last letter of the members name i.e v
                                                                        item?.charAt(0).toUpperCase() + item?.charAt(item?.length - 1).toUpperCase()
                                                                    }
                                                                </Box>
                                                            </Tooltip>
                                                        </div>
                                                        <div className={styles.frequentCollaboratorsNameContainer}>
                                                            <p className={styles.emailfcnc}>{item}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {/* <br /> */}
                            </div>
                        </div>
                    </div>


                    {/* MAIN Profile Container */}
                    <div className={styles.profileContainerMain}>
                        <div className={styles.myTasksMainContainer}>
                            <div>
                                <header className={styles.headerMyTasks}>
                                    <div>
                                        My recent projects
                                    </div>
                                </header>
                                <section className={styles.bodymyTasksContainer}>
                                    {
                                        projects.map((item: any, index: any) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={styles.myTasksList}
                                                    onClick={() => {
                                                        router.push(`/projectDetails/${signedInUserData.email}/${item.ProjectName}/${item.id}`)
                                                    }}
                                                >
                                                    <div className={styles.myTasksListLeft}>
                                                        <p
                                                            className={styles.projectIcon}
                                                            style={{
                                                                backgroundColor: item.color_code
                                                            }}
                                                        ></p>
                                                        <p className={styles.pnmyTask}>{item.ProjectName}</p>
                                                    </div>
                                                    <div className={styles.myTasksListRight}>
                                                        {/* <DatePicker
                                                            onChange={setTaskDue}
                                                            value={new Date(item.ProjectEndingDate)}
                                                        /> */}
                                                        {item.ProjectEndingDate}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                            </div>
                        </div>

                        <div className={styles.rightSideMainContainer}>
                            {/*  */}
                        </div>
                    </div>
                    <br /><br />
                    {/* MAIN Profile Container */}
                </div>
            ) : (
                <CustomLoader />
            )}
        </div>
    )
}

export default ProfileComp;
