import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { parseISO, differenceInDays } from 'date-fns';
import { useRouter } from "next/router";
import Link from "next/link";

// Firebase Imports
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

import {
    Tooltip,
    Button,
    IconButton,
    CircularProgress
} from "@mui/material";

import { useCollection } from "react-firebase-hooks/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../../firebase";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Styles
import styles from "./widget2.module.css";

interface IProps {
    email: string;
    item: any;
    currentFullLengthItem: any;
    setCurrentFullLengthItem: (value: any) => void;
}

interface MyTasksProps {
    task: string;
    date: string;
    project: string;
    email: string;
}

const MyTasksII: React.FC<MyTasksProps> = ({
    task,
    date,
    project,
    email,
}) => {

    let colors = [
        "navy",
        "midnightblue",
        "darkslateblue",
        "indigo",
        "purple",
        "darkmagenta",
        "darkviolet",
        "mediumblue",
        "steelblue",
        "royalblue",
        "cornflowerblue",
        "deepskyblue",
        "teal",
        "darkturquoise",
        "cadetblue",
        "slategray",
        "darkolivegreen",
        "forestgreen",
        "darkgreen",
        "mediumseagreen",
        "seagreen",
        "olivedrab",
        "darkgoldenrod",
        "goldenrod",
        "saddlebrown",
        "maroon",
        "firebrick",
        "crimson",
        "indianred",
        "brown",
        "darkred"
    ];

    return (
        <div className={styles.individualItem}>
            <div className="d-flex pt-[3px]">
                <div>
                    <i
                        role={"button"}
                        className={`far fa-check-circle fa-lg taskTick`}
                    ></i>
                </div>
                <p className={`ml-2 ${styles.taskText}`}>{task}</p>
            </div>
            <div className="d-flex">
                <div
                    className={styles.projectStyle}
                    style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                >
                    {project}
                </div>
                <p className={styles.timeTask}>{new Date(date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

const Widget2: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem,
    email,
}) => {
    const [currentPriority, setCurrentPriority] = useState<Number>(1);

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    // let q = query(collection(db, "Data", "Projects", email));
    let q = query(collection(db, "Projects"));

    const [snapshot, loading, error] = useCollection(q, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const [projects, setProjects] = useState<any>([]);
    const [projectTasks, setProjectTasks] = useState<any>([]);

    useEffect(() => {
        if (!loading && snapshot && email) {
            let myTasks = [];

            let localObj: any;

            let arrProjectsLocal = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            localObj = arrProjectsLocal;

            // Filter the projects array and extract only those projects that are created by me
            // or that are shared with me
            localObj = localObj.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

            let arrProjects: any = localObj;

            // Extract tasks with assignee equal to signedInUserData.email and update their taskSection
            for (let project of arrProjects) {
                for (let task of project.ProjectTasks) {
                    if (task.taskAssignee.includes(email)) {
                        const currentDate = new Date();
                        const taskDueDate = parseISO(task.taskDue); // Use parseISO to parse the date string
                        const daysDifference = differenceInDays(taskDueDate, currentDate);

                        if (task.taskStatus === "completed") {
                            task.taskSection = "Completed";
                        } else if (daysDifference <= 3) {
                            task.taskSection = "Recently Assigned";
                        } else {
                            task.taskSection = "In Progress";
                        }

                        // Add taskOverDue property
                        task.taskOverDue = taskDueDate < currentDate;

                        task.ProjectName = project.ProjectName;

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
    }, [loading, snapshot, email]);

    return (
        <div className={styles.container}>
            <header className={styles.style_header}>
                <div className={styles.left_Container_Header}>
                    <AccountCircleIcon
                        sx={{
                            fontSize: 50,
                            color: "#e0e6e8",
                        }}
                        className={styles.user_image}
                    />
                </div>
                <div className={styles.right_Container_Header}>
                    <h4 className="text-white">My Tasks</h4>
                    <div>
                        <ul className={styles.bottomRightList}>
                            <li
                                className={currentPriority === 1 ? styles.selected_li : ""}
                                onClick={() => setCurrentPriority(1)}
                            >
                                Upcoming
                            </li>
                            <li
                                className={currentPriority === 2 ? styles.selected_li : ""}
                                onClick={() => setCurrentPriority(2)}
                            >
                                Overdue (1)
                            </li>
                            <li
                                className={currentPriority === 3 ? styles.selected_li : ""}
                                onClick={() => setCurrentPriority(3)}
                            >
                                Completed
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div>
                <div className={styles.style_body}>
                    {(!loading && snapshot && email) ? (
                        <section>
                            {projectTasks.map((item: any, index: number) => {
                                return (
                                    <MyTasksII
                                        key={index}
                                        task={item.taskName}
                                        date={item.taskDue}
                                        project={item.ProjectName}
                                        email={email}
                                    />
                                )
                            })}
                        </section>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Widget2;
