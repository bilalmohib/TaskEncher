// Importing Icons
import { IoIosArrowDropdown } from 'react-icons/io';

import styles from './style.module.css';
import { handleClientScriptLoad } from 'next/script';
import { formatDate } from '@app/lib/dateFormats';
import addTask from '@app/lib/addTask';
import addProjectSection from '@app/lib/addProjectSection';
import { enqueueSnackbar } from 'notistack';

interface IProps {
    ProjectName: string;
    email: string;
    projectID: string;
    projects: any;
    setProjects: (value: any) => void;

    // Add Task Model Open
    isAddTaskModalOpen: boolean;
    setIsAddTaskModalOpen: (value: boolean) => void;
}

const ListHeader: React.FC<IProps> = ({
    ProjectName,
    email,
    projectID,
    projects,
    setProjects,

    // Add Task Model Open
    isAddTaskModalOpen,
    setIsAddTaskModalOpen
}) => {

    const handleAddSection = () => {
        console.log("Add Section");

        let date = new Date().toISOString();

        let formattedDate = formatDate(date);

        let newSection: string | null = prompt("Enter Section Name e.g. To Do, In Progress, Done etc.");

        let taskOBJ = {
            "taskName": "",
            "taskPriority": [],
            "taskAssignee": [],
            "taskSection": newSection,
            "taskDue": formattedDate,
            "taskStatus": "inProgress",
            "taskDescription": `A new task has been added to ${newSection} section`,
        };

        addProjectSection(
            taskOBJ,
            email,
            projectID,
            projects,
            newSection
        );
    }

    const handleProjectFilter = (filter: string) => {
        if (filter === "inProgress") {
            let tempProjects = projects;

            for (let i = 0; i < tempProjects.length; i++) {
                if (tempProjects[i].id === projectID) {

                    let tempProjectTasks = tempProjects[i].ProjectTasks;

                    for (let j = 0; j < tempProjectTasks.length; j++) {
                        if (tempProjects[i].ProjectTasks[j].taskStatus === "inProgress") {
                            tempProjects[i].ProjectTasks.splice(j, 1);
                        }
                    }
                }
                break;
            }

            let message: string = "Successfully filtered inProgress tasks";
            enqueueSnackbar(
                message,
                {
                    variant: 'success',
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                },
            )
            console.log(message);

            console.log("Temp Projects After InProgress : ", tempProjects.ProjectTasks);

            setProjects(tempProjects);
        }
        if (filter === "completed") {
            let tempProjects = projects;

            for (let i = 0; i < tempProjects.length; i++) {
                if (tempProjects[i].id === projectID) {

                    let tempProjectTasks = tempProjects[i].ProjectTasks;

                    for (let j = 0; j < tempProjectTasks.length; j++) {
                        if (tempProjects[i].ProjectTasks[j].taskStatus === "completed") {
                            tempProjects[i].ProjectTasks.splice(j, 1);
                        }
                    }
                }
                break;
            }

            let message: string = "Successfully filtered completed tasks";
            enqueueSnackbar(
                message,
                {
                    variant: 'success',
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                },
            )
            console.log(message);

            console.log("Temp Projects After Completed : ", tempProjects.ProjectTasks);

            setProjects(tempProjects);
        }
        if (filter === "all") {
            setProjects(projects);

            console.log("Temp Projects all : ", projects);

            let message: string = "Successfully filtered all tasks";
            enqueueSnackbar(
                message,
                {
                    variant: 'success',
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                },
            )
            console.log(message);
        }
    }

    return (
        <div className={styles.container}>
            <div style={{
                marginLeft: 10,
                marginTop: 3
            }}>
                <div className="btn-group">
                    <button
                        className={`btn btn-primary btn-sm ${styles.btn_add_task}`}
                        type="button"
                        onClick={() => setIsAddTaskModalOpen(!isAddTaskModalOpen)}
                    >
                        + Add task
                    </button>
                    <button type="button"
                        className={`btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split ${styles.btn_add_task}`} data-mdb-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        <li
                            onClick={() => {
                                handleAddSection();
                            }}
                        >
                            <a className="dropdown-item" href="#">Add section</a>
                        </li>
                        {/* <li><a className="dropdown-item" href="#">Add milestone</a></li> */}
                    </ul>
                </div>
            </div>

            {/* Incomplete tasks */}
            {/* <div className="btn-group" style={{ fontSize: 16, height: 28, boxShadow: "none", position: 'absolute', right: '80px' }}>
                <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                    <IoIosArrowDropdown style={{ marginTop: -2 }} /> Incomplete tasks
                </button>
                <ul className="dropdown-menu">
                    <li
                        onClick={() => {
                            handleProjectFilter("inProgress");
                        }}
                    >
                        <a
                            className="dropdown-item"
                            href="#"
                        >
                            Incomplete tasks
                        </a>
                    </li>
                    <li
                        onClick={() => {
                            handleProjectFilter("completed");
                        }}
                    >
                        <a
                            className="dropdown-item"
                            href="#"
                        >
                            Complete tasks
                        </a>
                    </li>
                    <li
                        onClick={() => {
                            handleProjectFilter("all");
                        }}
                    >
                        <a
                            className="dropdown-item"
                            href="#"
                        >
                            All tasks
                        </a>
                    </li>
                </ul>
            </div> */}

            {/* Sort */}
            {/* <div className="btn-group" style={{ fontSize: 16, height: 28, boxShadow: "none", position: 'absolute', right: '5px' }}>
                <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                    <IoIosArrowDropdown style={{ marginTop: -2 }} /> Sort
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Start Date</a></li>
                    <li><a className="dropdown-item" href="#">Due Date</a></li>
                    <li><a className="dropdown-item" href="#">Assignee</a></li>
                    <li><a className="dropdown-item" href="#">Created by</a></li>
                    <li><a className="dropdown-item" href="#">Created on</a></li>
                    <li><a className="dropdown-item" href="#">Last modified on</a></li>
                    <li><a className="dropdown-item" href="#">Likes</a></li>
                    <li><a className="dropdown-item" href="#">Alphabetical</a></li>
                    <li><a className="dropdown-item" href="#">Priority</a></li>
                    <li><a className="dropdown-item" href="#">Status</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sort within sections</a></li>
                </ul>
            </div> */}
        </div>
    )
}
export default ListHeader;