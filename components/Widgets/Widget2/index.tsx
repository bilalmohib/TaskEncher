import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./widget2.module.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface IProps {
    item: Number;
    currentFullLengthItem: Number;
    setCurrentFullLengthItem: Function;
    email: String;
}

interface MyTasksProps {
    task: string;
    date: string;
    project: string;
}

const MyTasksII: React.FC<MyTasksProps> = ({
    task,
    date,
    project
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
                <p className={styles.timeTask}>{date}</p>
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

    const MyTasksList = [
        {
            task: "Get up Early",
            date: "Today",
            project: "FYP",
        },
        {
            task: "Plan the day",
            date: "Tomorrow",
            project: "Final Year Project",
        },
        {
            task: "Work on FYP research",
            date: "Today",
            project: "Software Engineering",
        },
        {
            task: "Complete a section of FYP report",
            date: "Tomorrow",
            project: "Civil Engineering",
        },
        {
            task: "Attend project group meeting",
            date: "Tomorrow",
            project: "Meeting",
        },
        {
            task: "Review and update project timeline",
            date: "Tomorrow",
            project: "Cement",
        },
        // {
        //     task: "Prepare for presentation",
        //     date: "Tomorrow",
        //     project: "FYP",
        // },
        // {
        //     task: "Submit FYP report draft",
        //     date: "This week",
        //     project: "FYP",
        // },
        // {
        //     task: "Revise based on feedback",
        //     date: "Next week",
        //     project: "FYP",
        // },
        // {
        //     task: "Finalize and submit FYP report",
        //     date: "In two weeks",
        //     project: "FYP",
        // }
    ];

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
                    <section>
                        {MyTasksList.map((item, index) => {
                            return (
                                <MyTasksII
                                    key={index}
                                    task={item.task}
                                    date={item.date}
                                    project={item.project}
                                />
                            )
                        })}
                    </section>
                </div>
            </div>
        </div>
    );
};
export default Widget2;
