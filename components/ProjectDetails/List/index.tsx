import React, { useState, useEffect, useRef } from "react";
import MultiSelectChipDropDown from "./MultiSelectChipDropDown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
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
  IconButton
} from "@mui/material";

import { useCollection } from "react-firebase-hooks/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../../firebase";
import ListHeader from "./ListHeader";
import updateTask from "@app/lib/updateTask";
import SelectChipDropDown from "./SelectChipDropDown";
import updateProject from "@app/lib/updateProject";

// MUI Icons Import 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

// Styles 
import styles from "./style.module.css";
import deleteTask from "@app/lib/deleteTask";

interface ListProps {
  email?: any;
  projectName?: any;
  projectID?: any;

  // Add Task Model Open
  isAddTaskModalOpen: boolean;
  setIsAddTaskModalOpen: (value: boolean) => void;

  // Project Members
  projectMembers: any;
}

const List: React.FC<ListProps> = (
  {
    email,
    projectName,
    projectID,

    // Add Task Model Open
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,

    // Project Members
    projectMembers,
  }
) => {
  const router = useRouter();

  const { uid } = router.query;

  const taskRef: any = useRef();

  const [signedInUserData, setSignedInUserData] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

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

  useEffect(() => {
    // console.log("Current Path : ", window.location.pathname);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (signedInUserData === null) {
          if (user.isAnonymous === true) {
            let tempUser = {
              displayName: "Anonymous Guest",
              email: "anonymous@guest.com",
              photoURL: user.photoURL,
            };
            console.log(tempUser);
            setSignedInUserData(tempUser);
            setIsSignedIn(true);
          } else {
            console.log(user);
            setSignedInUserData(user);
            setIsSignedIn(true);
          }
          // ...
        }
      } else {
        // User is signed out
        console.log("User is signed out");
        // alert("Please sign in to continue");
        // navigate("/login");
        // ...
      }
    });
  }, [signedInUserData, isSignedIn]);

  const e = email;
  /////////////////////////////////////// Database Part ////////////////////////////////////////////////
  // let q = query(collection(db, "Data", "Projects", e));
  let q = query(collection(db, "Projects"));

  const [snapshot, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

  // GETTINGS Project Details
  const [projectDetails, setProjectDetails] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<any>([]);

  const [projectStages, setProjectStages] = useState<any>([]);

  const [projectTasks, setProjectTasks] = useState<any>([]);

  const [currentEditedTaskValue, setCurrentEditedTaskValue] = useState(null);

  const [currentSectionValue, setCurrentSectionValue] = useState<any>(null);

  // for checking if edit task is clicked or not
  const [editTask, setEditTask] = useState<any>(null);

  // Is Editable
  const [isEditable, setIsEditable] = useState(false);

  const [currentEditSelected, setCurrentEditSelected] = useState<any>(null);

  const [expandDetailsTable, setExpandDetailsTable] = useState<any>(null);

  // FOR GETTING PROJECTS
  useEffect(() => {
    if (!loading && snapshot) {
      let localObjP: any;
      let localObj: any;
      let arrProjectsLocal = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      localObjP = arrProjectsLocal;

      // Now only i need projects that are created by me means email is equal to signedInUserData.email
      // or that are shared with me means project members array contains signedInUserData.email

      // Filter the projects array and extract only those projects that are created by me
      // localObj = localObj.filter((project: any) => );

      // Filter the projects array and extract only those projects that are shared with me
      localObjP = localObjP.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

      // if (snapshot.docs.length !== projects.length) {
      let arrProjects = localObjP;
      for (let i = 0; i < arrProjects.length; i++) {
        if (arrProjects[i].id === projectID.toString()) {
          localObj = arrProjects[i];
          setProjectDetails(localObj);
          break;
        }
      }
      setProjects(arrProjects);
      // @ts-ignore
      setProjectStages(localObj?.ProjectStages);
      // @ts-ignore
      setProjectTasks(localObj?.ProjectTasks);

      // Set the selected members for the project to project tasks assignee
      let tempSelectedMembers: string[] = [];
      // @ts-ignore
      for (let i = 0; i < localObj?.ProjectTasks.length; i++) {
        // @ts-ignore
        if (localObj?.ProjectTasks[i]?.taskAssignee !== null)
          // @ts-ignore
          tempSelectedMembers = localObj?.ProjectTasks[i]?.taskAssignee;
      }
      setSelectedMembers(tempSelectedMembers);

      // setLoading(false);
      // console.clear();
      console.log(
        "Projects ==> ",
        arrProjects
      );
      console.log("Project Details ==> ", localObj);
      // @ts-ignore
      console.log("Project Stages ==> ", localObj?.ProjectStages);
      // @ts-ignore
      console.log("Project Tasks ==> ", localObj?.ProjectTasks);
      // }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, snapshot, router.query]);
  // FOR GETTING PROJECTS

  const handleEditTask = (event: any, taskIndex: number) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setCurrentEditedTaskValue(event.target.innerText);
      updateTask(taskIndex, event.target.innerText, "taskName", e, projectID.toString(), projects);
      setIsEditable(false);
    }
  };

  const handleEditSection = (event: any, sectionIndex: number, previousSection: string) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setCurrentSectionValue(event.target.innerText);

      let localProjectStages = projectStages;

      // Loop through all the Project stages and if sectionIndex matches the one in change and update the section name
      for (let i = 0; i < localProjectStages.length; i++) {
        if (sectionIndex === i) {
          localProjectStages[i] = event.target.innerText;
        }
      }

      let localProjectTasksList = projectTasks;

      for (let i = 0; i < localProjectTasksList.length; i++) {
        if (previousSection === localProjectTasksList[i].taskSection) {
          localProjectTasksList[i].taskSection = event.target.innerText;
        }
      }

      let updateThing = {
        ProjectStages: localProjectStages,
        ProjectTasks: localProjectTasksList
      }

      updateProject(
        updateThing,
        "updateSection",
        email,
        projectID.toString(),
        projects
      )
    }
  };

  return (
    <div className={styles.Contaienr}>
      <div className={styles.Header}>
        <ListHeader
          ProjectName={
            !loading && projectDetails !== null && projects.length !== 0
              ? projectDetails.ProjectName
              : "... Loading Please wait"
          }

          email={email}
          projectID={projectID.toString()}
          projects={projects}
          setProjects={setProjects}

          // Add Task Model Open
          isAddTaskModalOpen={isAddTaskModalOpen}
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
        />
      </div>
      <div className={styles.Body}>
        {!loading ? (
          <>
            {projects.length == 0 && !loading ? (
              <div>
                <br />
                <br />
                <h1 className="mt-3 text-info text-center">
                  Please Create any project first to see its details
                </h1>
                <br />
                <br />
                <p className="btn btn-link btn-block border">
                  <Link href="/createProject">Create New Project</Link>
                </p>
              </div>
            ) : (
              <div>
                {!loading &&
                  projectDetails !== null &&
                  projects.length !== 0 ? (
                  <div>
                    <div>
                      <div>
                        <div className="table-responsive">
                          <table
                            className="table table-bordered"
                            style={{
                              marginLeft: "1%",
                              width: "98%",
                              borderLeft: "1px solid white",
                            }}
                          >
                            <thead className={styles.projectDetailsTableHeader}>
                              <tr>
                                <th style={{ paddingLeft: 0 }} scope="col">
                                  Task name
                                </th>
                                <th scope="col">Assignee</th>
                                <th scope="col">Due date</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Section</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <>
                              {/* This matters */}
                              {projectStages.map((s: any, i: any) => {
                                return (
                                  <tbody
                                    className={styles.projectDetailsBody}
                                    key={i}
                                  >
                                    <tr>
                                      <th
                                        className={`${projects.CurrentStage == s
                                          ? `text-danger`
                                          : ``
                                          } ${styles.stageHeading}`}
                                        scope="row"
                                        colSpan={7}
                                      >
                                        <h5 className="d-flex">
                                          <div
                                            role={"button"}
                                            onClick={() => {
                                              if (expandDetailsTable !== i) {
                                                setExpandDetailsTable(i);
                                              } else {
                                                setExpandDetailsTable(null);
                                              }
                                            }}
                                            className={`${styles.IconTasksOfTable}`}
                                          >
                                            {/* Icon */}
                                            <i
                                              style={{ paddingTop: 3 }}
                                              className={`fas ${expandDetailsTable == i
                                                ? "fa-caret-right"
                                                : "fa-caret-down"
                                                } mr-3`}
                                            ></i>
                                          </div>
                                          {/* Icon */}
                                          &nbsp;
                                          <div
                                            style={{
                                              paddingTop: 1,
                                              borderRadius: 5
                                            }}
                                            onChange={
                                              (event: any) => setCurrentSectionValue(event.target.innerText)
                                            }
                                            contentEditable={true}
                                            suppressContentEditableWarning={false}
                                            onKeyDown={(event) => {
                                              handleEditSection(
                                                event,
                                                i,
                                                s
                                              );
                                            }}
                                            className="editDiv"
                                          >
                                            {s}
                                          </div>
                                          &nbsp; &nbsp;
                                          <div
                                            className={styles.IconTasksOfTable}
                                            onClick={() => {
                                              setIsAddTaskModalOpen(true);
                                            }}
                                          >
                                            <i
                                              style={{ fontSize: 15 }}
                                              className="fas fa-plus"
                                            ></i>
                                          </div>
                                        </h5>
                                      </th>
                                    </tr>
                                    {
                                      projectTasks.length == 0 ? (
                                        <tr>
                                          <th scope="row">
                                            <i className="far fa-check-circle fa-lg"></i>
                                            &nbsp;&nbsp;
                                          </th>
                                          <td>&nbsp;&nbsp;</td>
                                          <td>&nbsp;&nbsp;</td>
                                          <td>&nbsp;&nbsp;</td>
                                          <td>&nbsp;&nbsp;</td>
                                          <td>&nbsp;&nbsp;</td>
                                          <td>&nbsp;&nbsp;</td>
                                        </tr>
                                      ) : (
                                        projectTasks.map((v: any, j: any) => {
                                          return (
                                            <tr
                                              className={`${projects.CurrentStageCurrentTask == v.taskName && `text-danger`} 
                                                ${expandDetailsTable == i &&
                                                styles.hideDetails
                                                }
                                                ${currentEditSelected == j &&
                                                styles.editTaskStyleCurrent}
                                                `}
                                              key={j}
                                            >
                                              {v.taskSection == s ? (
                                                <>
                                                  {/*** Task Name ***/}
                                                  <th
                                                    className={`editDiv ${editTask == j
                                                      ? styles.editTaskStyle
                                                      : ""
                                                      } ${currentEditSelected == j
                                                        ? styles.editTaskStyleCurrent
                                                        : ""
                                                      } ${styles.headingTask}`}
                                                    scope="row"
                                                    contentEditable={isEditable}
                                                    onKeyDown={(event) => handleEditTask(event, j)}
                                                    onClick={() => {
                                                      setCurrentEditSelected(j);
                                                    }}
                                                    onChange={(event: any) =>
                                                      setCurrentEditedTaskValue(event.target.innerText)
                                                    }
                                                    suppressContentEditableWarning={false}
                                                  >
                                                    {(v.taskStatus === "inProgress") ? (
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
                                                          onClick={() => {
                                                            updateTask(
                                                              j,
                                                              "completed",
                                                              "taskStatus",
                                                              e,
                                                              projectID.toString(),
                                                              projects
                                                            )
                                                          }}
                                                        />
                                                      </Tooltip>
                                                    ) : (v.taskStatus === "completed") ? (
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
                                                          onClick={() => {
                                                            updateTask(
                                                              j,
                                                              "inProgress",
                                                              "taskStatus",
                                                              e,
                                                              projectID.toString(),
                                                              projects
                                                            )
                                                          }}
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
                                                        onClick={() => {
                                                          updateTask(
                                                            j,
                                                            "completed",
                                                            "taskStatus",
                                                            e,
                                                            projectID.toString(),
                                                            projects
                                                          )
                                                        }}
                                                      />
                                                    </Tooltip>)
                                                    }
                                                    &nbsp;&nbsp;
                                                    <span
                                                      onClick={() => {
                                                        setIsEditable(true);
                                                      }}
                                                      className={`${styles.headingTaskText}`}
                                                      ref={taskRef}
                                                      style={{
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        paddingTop: 2,
                                                        paddingBottom: 2,
                                                        cursor: (
                                                          isEditable
                                                        ) ? 'text' : 'pointer',
                                                      }}
                                                    >
                                                      {v.taskName}
                                                    </span>
                                                  </th>

                                                  {/*** TASK Assignee ***/}
                                                  <td
                                                    className={styles.assigneeTd}
                                                  >
                                                    <MultiSelectChipDropDown
                                                      placeholder="Please select assignee"
                                                      options={[...projectMembers, signedInUserData.email]}
                                                      selectedArrayList={v.taskAssignee}
                                                      projects={projects}
                                                      projectID={projectID.toString()}
                                                      email={e}
                                                      taskId={j}
                                                      type={"taskAssignee"}
                                                      styles={styles.multiselect}
                                                      dropDownStyles={styles.dropDownStyles}
                                                    />
                                                  </td>

                                                  {/*** TASK Due date ***/}
                                                  <td className={styles.dueDateTd}>
                                                    <LocalizationProvider
                                                      dateAdapter={AdapterDayjs}
                                                    >
                                                      <DateTimePicker
                                                        sx={{
                                                          '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#E5E5E5',
                                                            borderWidth: '0px',
                                                          },
                                                          '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#E5E5E5',
                                                            borderWidth: '0px',
                                                          },
                                                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            // Give the default border color of material ui input
                                                            borderWidth: '0px',
                                                          }
                                                        }}
                                                        label=""
                                                        value={getDateTimeInDayjs(v.taskDue)}
                                                        onChange={(newValue) => {
                                                          let tempDate: string = formatDate(newValue?.toString());
                                                          updateTask(j, tempDate, "taskDue", e, projectID.toString(), projects);
                                                          console.log(
                                                            formatDate(newValue?.toString())
                                                          )
                                                        }}
                                                      />
                                                    </LocalizationProvider>
                                                  </td>

                                                  {/*** TASK Priority ***/}
                                                  <td className={styles.priorityTd}>
                                                    <SelectChipDropDown
                                                      placeholder="Select a priority"
                                                      options={
                                                        [
                                                          'High',
                                                          'Medium',
                                                          'Low'
                                                        ]
                                                      }
                                                      selectedArrayList={
                                                        [v.taskPriority]
                                                      }
                                                      projects={projects}
                                                      projectID={projectID.toString()}
                                                      email={e}
                                                      taskId={j}
                                                      type={"taskPriority"}
                                                      styles={styles.multiselect}
                                                      dropDownStyles={
                                                        styles.dropDownStyles
                                                      }
                                                    />
                                                  </td>
                                                  <td className={styles.priorityTd}>
                                                    <Tooltip title="Move Between Sections">
                                                      <SelectChipDropDown
                                                        placeholder="Move Between Sections"
                                                        options={projectStages}
                                                        selectedArrayList={
                                                          [v.taskSection]
                                                        }
                                                        projects={projects}
                                                        projectID={projectID.toString()}
                                                        email={e}
                                                        taskId={j}
                                                        type={"taskSection"}
                                                        styles={styles.multiselect}
                                                        dropDownStyles={
                                                          styles.dropDownStyles
                                                        }
                                                      />
                                                    </Tooltip>
                                                  </td>
                                                  <td style={{ paddingTop: '25.5px' }}>
                                                    <h6>{v.taskStatus}</h6>
                                                  </td>
                                                  <td style={{ paddingTop: '22.5px' }}>
                                                    <div className="d-flex mb-[20px]">
                                                      <Tooltip
                                                        title="Delete Task"
                                                      >
                                                        <IconButton
                                                          onClick={() => {
                                                            deleteTask(
                                                              j,
                                                              e,
                                                              projectID.toString(),
                                                              projects
                                                            );
                                                          }}
                                                          aria-label="delete"
                                                          color="error"
                                                        >
                                                          <DeleteIcon />
                                                        </IconButton>
                                                      </Tooltip>
                                                    </div>
                                                  </td>
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </tr>
                                          );
                                        })
                                      )
                                    }
                                  </tbody>
                                );
                              })}
                              {/* This matters */}
                            </>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <div id="loader"></div>
                    </div>
                    <br />
                    <div className="animate-bottom text-center">
                      <h2>Loading Your Projects ...</h2>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center">
              <div id="loader"></div>
            </div>
            <br />
            <div className="animate-bottom text-center">
              <h2>Loading Your Projects ...</h2>
            </div>
          </>
        )}
      </div>
    </div >
  );
};

export default List;
