import React, { useState, useEffect, useRef } from 'react';
import {
    Autocomplete,
    TextField,
} from '@mui/material';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Link from 'next/link';

import MultiSelectChipDropDown from './MultiSelectChipDropDown';

import styles from './style.module.css';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// const currentDate = new Date();
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// import {DateTimePickerProps, InputProps } from '@mui/lab';

import dayjs, { Dayjs } from 'dayjs';

interface ListProps {
    email?: any
    projectName?: any
    projectID?: any,
}

import { useRouter } from 'next/router';

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

import {
    onAuthStateChanged,
} from "firebase/auth";

import { db, auth } from "../../../firebase";
import ListHeader from './ListHeader';

const List: React.FC<ListProps> = ({
    email,
    projectName,
    projectID
}) => {

    const router = useRouter();

    const { uid } = router.query;

    const taskRef: any = useRef();

    const [status, setStatus] = useState<Boolean>(false);
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);
      const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30')); 

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
                        }
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
    let q = query(collection(db, "Data", "Projects", e));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // GETTINGS Project Details
    const [projectDetails, setProjectDetails] = useState<any>(null)
    // const [loading, setLoading] = useState(true); 

    const [projects, setProjects] = useState<any>([]);

    const [projectStages, setProjectStages] = useState<any>([]);

    const [projectTasks, setProjectTasks] = useState<any>([]);

    const [selectedTabItemValue, setSelectedTabItemValue] = useState<Number>(1);

    const [currentEditedTaskValue, setCurrentEditedTaskValue] = useState(null);

    // for checking if edit task is clicked or not
    const [editTask, setEditTask] = useState<any>(null);

    const [currentEditSelected, setCurrentEditSelected] = useState<any>(null);

    const [expandDetailsTable, setExpandDetailsTable] = useState<any>(null);

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading && snapshot && email) {
            let localObj;
            // if (snapshot.docs.length !== projects.length) {
            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));
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

            // setLoading(false);
            // console.clear();
            console.log("Projects ==> ", snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log("Project Details ==> ", localObj);
            // @ts-ignore
            console.log("Project Stages ==> ", localObj?.ProjectStages);
            // @ts-ignore
            console.log("Project Tasks ==> ", localObj?.ProjectTasks);
            // }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    const handleEditTask = (event: any, taskIndex: number) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setCurrentEditedTaskValue(event.target.innerText);
            alert("Task Updated Successfully" + event.target.innerText + taskIndex.toString());
            updateTaskName(taskIndex, event.target.innerText);
            setCurrentEditSelected(taskIndex);
        }
    };

    const updateTaskName = async (taskId: number, newTaskName: string) => {
        const db = getFirestore();
        const projectRef = doc(db, 'Data', 'Projects', e, projectID);

        // const updatedTask = {
        //     [`ProjectTasks.${taskId}.taskName`]: newTaskName
        // };

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectID.toString()) {
                projects[i].ProjectTasks[taskId].taskName = newTaskName;
                const updatedProject = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    alert("Task Updated Successfully");
                    console.log('Task name updated successfully');
                } catch (error) {
                    console.error('Error updating task name:', error);
                }
                break;
            }
        }
    };

    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

    return (
        <div className={styles.Contaienr}>
            <div className={styles.Header}>
                <ListHeader
                    ProjectName={((!loading) &&
                        (projectDetails !== null && projects.length !== 0) ?
                        (projectDetails.ProjectName) :
                        ("... Loading Please wait"))}
                />
            </div>
            <div className={styles.Body}>
                {(!loading) ? (
                    <>
                        {(projects.length == 0 && !loading) ? (
                            <div>
                                <br /><br />
                                <h1 className="mt-3 text-info text-center">Please Create any project first to see its details</h1>
                                <br /><br />
                                <p className="btn btn-link btn-block border"><Link href="/createProject">Create New Project</Link></p>
                            </div>
                        ) : (
                            <div>
                                {(!loading && (projectDetails !== null && projects.length !== 0)) ? (
                                    <div>
                                        <div>
                                            <div title={`This is a sample preview of your project dear ${signedInUserData.name}`}>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered" style={{ marginLeft: "1%", width: "98%", borderLeft: "1px solid white" }}>
                                                        <thead className={styles.projectDetailsTableHeader}>
                                                            <tr>
                                                                <th style={{ paddingLeft: 0 }} scope="col">Task name</th>
                                                                <th scope="col">Assignee</th>
                                                                <th scope="col">Due date</th>
                                                                <th scope="col">Priority</th>
                                                                <th scope="col">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <>
                                                            {/* This matters */}
                                                            {projectStages.map((s: any, i: any) => {
                                                                return <tbody className={styles.projectDetailsBody} key={i}>
                                                                    <tr>
                                                                        <th className={`${(projects.CurrentStage == s) ? (`text-danger`) : (``)} ${styles.stageHeading}`} scope="row" colSpan={5}>
                                                                            <h5 className='d-flex'>
                                                                                <div
                                                                                    role={"button"}
                                                                                    onClick={() => {
                                                                                        if (expandDetailsTable !== i) {
                                                                                            setExpandDetailsTable(i)
                                                                                        } else {
                                                                                            setExpandDetailsTable(null)
                                                                                        }
                                                                                    }}
                                                                                    className={`${styles.IconTasksOfTable}`}>
                                                                                    {/* Icon */}
                                                                                    <i
                                                                                        style={{ paddingTop: 3 }}
                                                                                        className={`fas ${(expandDetailsTable == i) ? ('fa-caret-right') : ('fa-caret-down')} mr-3`}>
                                                                                    </i>
                                                                                </div>
                                                                                {/* Icon */}
                                                                                &nbsp;
                                                                                <div style={{ paddingTop: 1 }}>
                                                                                    {s}
                                                                                </div>
                                                                                &nbsp;
                                                                                &nbsp;
                                                                                <div className={styles.IconTasksOfTable}>
                                                                                    <i style={{ fontSize: 15 }} className="fas fa-plus"></i>
                                                                                </div>
                                                                            </h5>
                                                                        </th>
                                                                    </tr>
                                                                    {(projectTasks.length == 0) ? (
                                                                        <tr>
                                                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                                                            <td>&nbsp;&nbsp;</td>
                                                                            <td>&nbsp;&nbsp;</td>
                                                                            <td>&nbsp;&nbsp;</td>
                                                                            <td>&nbsp;&nbsp;</td>
                                                                        </tr>
                                                                    ) : (
                                                                        projectTasks.map((v: any, j: any) => {
                                                                            function dayjs(arg0: string): any {
                                                                                throw new Error('Function not implemented.');
                                                                            }

                                                                            return <tr className={`${(projects.CurrentStageCurrentTask == v.taskName) && (`text-danger`)} ${(expandDetailsTable == i) && (styles.hideDetails)}`} key={j}>
                                                                                {(v.taskSection == s) ? (
                                                                                    <>
                                                                                        <th onClick={() => {
                                                                                            setEditTask(j);
                                                                                            setCurrentEditSelected(null);
                                                                                        }}
                                                                                            className={`${(editTask == j) ? (styles.editTaskStyle) : ('')} ${(currentEditSelected == j) ? (styles.editTaskStyleCurrent) : ('')} ${styles.headingTask}`}
                                                                                            scope="row"
                                                                                        >
                                                                                            <i role={"button"} className={`far fa-check-circle fa-lg ${styles.taskTick}`}></i>&nbsp;&nbsp;
                                                                                            <span
                                                                                                onKeyDown={(event) => handleEditTask(event, j)}
                                                                                                onClick={() => setCurrentEditSelected(i)}
                                                                                                className={styles.headingTaskText}
                                                                                                contentEditable={true}
                                                                                                onBlur={(event: any) => setCurrentEditedTaskValue(event.target.innerText)}
                                                                                                ref={taskRef}
                                                                                                style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2 }}
                                                                                            >
                                                                                                {v.taskName}

                                                                                            </span>
                                                                                        </th>
                                                                                        {(v.taskAssignee == "") ? (
                                                                                            <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                                                                        ) : (
                                                                                            <td>
                                                                                                {/* {v.taskAssignee} */}
                                                                                                <MultiSelectChipDropDown
                                                                                                    // optionsArray={projectDetails.ProjectMembers}
                                                                                                    // taskAssignee={v.taskAssignee}
                                                                                                    placeholder=""
                                                                                                    options={projectDetails.ProjectMembers}
                                                                                                    selectedArrayList={selectedMembers}
                                                                                                    setSelectedArrayList={setSelectedMembers}
                                                                                                    styles={styles.input}
                                                                                                    dropDownStyles={styles.dropDownStyles}
                                                                                                />
                                                                                            </td>
                                                                                        )}
                                                                                        <td>     
                                                                                               {/* <DateTimePicker
          label="Uncontrolled picker"
          defaultValue={value}
        /> */}
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DateTimePicker', 'DateTimePicker']}> */}
        {/* <DateTimePicker
          label="Uncontrolled picker"
          defaultValue={dayjs('2022-04-17T15:30')}
        /> */}
        <DateTimePicker
        
          label=""
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      {/* </DemoContainer> */}
    </LocalizationProvider>
</td>
                                                                                        {/* <td> */}
                                                                                            {/* <DateTimePicker
                                                                                              label="Uncontrolled picker"
                                                                                              defaultValue={dayjs('2022-04-17T15:30')}
                                                                                                // label="Controlled picker"
                                                                                                // value={value}
                                                                                                // onChange={(newValue) => setValue(newValue)}
                                                                                            /> */}
                                                                                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                                {/* <DemoContainer components={['DateTimePicker', 'DateTimePicker']}> */}
                                                                                                    {/* <DateTimePicker */}
                                                                                                        {/* // label="Uncontrolled picker" */}
                                                                                                        {/* // defaultValue={dayjs('2022-04-17T15:30')} */}
                                                                                                    {/* // /> */}
                                                                                                    {/* <DateTimePicker */}
                                                                                                        {/* // label="Controlled picker" */}
                                                                                                        {/* // value={value} */}
                                                                                                        {/* // onChange={(newValue) => setValue(newValue)} */}
                                                                                                    {/* // /> */}
                                                                                                {/* </DemoContainer> */}
                                                                                            {/* </LocalizationProvider> */}
                                                                                        {/* </td> */}
                                                                                        {(v.taskPriority == "High") ? (
                                                                                            <td style={{ paddingTop: -20 }}><button type="button" className="btn btn-danger btn-rounded btn-sm">{v.taskPriority}</button></td>
                                                                                        ) : (v.taskPriority == "Medium") ? (
                                                                                            <td><button type="button" className="btn btn-warning btn-rounded btn-sm">{v.taskPriority}</button></td>
                                                                                        ) : (v.taskPriority == "Low") ? (
                                                                                            <td><button type="button" className="btn btn-info btn-rounded btn-sm">{v.taskPriority}</button></td>
                                                                                        ) : (
                                                                                            <td></td>
                                                                                        )}
                                                                                        <td><h6>{v.taskSection}</h6></td>
                                                                                    </>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                            </tr>
                                                                        })
                                                                    )}

                                                                </tbody>
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
        </div>
    )
}

export default List;