//https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page/58182678?sfb=2#58182678
import React, { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router';
import Head from "next/head";

/// Importing Firebase
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInAnonymously,
    GithubAuthProvider
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../firebase";
import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    Timestamp
} from "firebase/firestore";

import MultiSelectDropDown from "@app/components/MultiSelectDropDown";

/// Importing Firebase
import Navbar from "../components/Navbar";
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
import DatePicker from 'react-date-picker';

// import Calendar from 'react-calendar';

import { NextPage } from "next";
import CustomLoader from "../components/CustomLoader";

const currentDate = new Date();

const CreateProject: NextPage = () => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // For Loading
    const [user, loading, error] = useAuthState(auth);

    const router = useRouter();

    const [isOpen, setIsOpen] = useState<Boolean>(true);

    const [firestoreData, setFirestoreData] = useState<any>([]);
    const [stage, setStage] = useState<any>(1);
    const [projectPlan, setProjectPlan] = useState<string>("");
    const [task, setTask] = useState<any>("");
    const [teamMate, setTeamMate] = useState<string>("");
    //Drop Down Selected content
    // const [assignee, setAssignee] = useState<string>("");
    const [assigneesList, setAssigneesList] = useState<string[]>([]);
    const [taskSection, setTaskSection] = useState<string>("");
    const [currentStage, setCurrentStage] = useState<string>("");
    const [currentStageCurrentTasksArray, setCurrentStageCurrentTasksArray] = useState<any>([]);
    const [currentStageCurrentTask, setCurrentStageCurrentTask] = useState<string>("");
    //Drop Down Selected content
    /////////////////////////////
    const [taskDue, setTaskDue] = useState<any>(currentDate);
    //Project Starting Date
    const [projectStartingDate, setProjectStartingDate] = useState<any>(currentDate);
    //Project Ending Date
    const [projectEndingDate, setProjectEndingDate] = useState<any>(currentDate);
    //////////////////////////////
    const [taskPriority, setTaskPriority] = useState<string>("");
    const [stageName, setStageName] = useState<string>("");
    const [allStageArray, setAllStageArray] = useState<any>([]);
    const [allTaskArray, setAllTaskArray] = useState<any>([]);
    // String Array for Multi Select Drop Down
    const [teamMatesArray, setTeamMatesArray] = useState<string[]>([]);

    // States for status of login users
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    // For Checking if the user is signed in or not
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // If user is signed in Navigate to Home Page
                // navigate('/');
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // When the user state is known, we set the state isSignedIn to true
                if (signedInUserData === null) {
                    // window.location.href = "/";
                    // router.push("/");
                    setSignedInUserData(user);
                    console.log("Signed In User Data ==> ", user);
                    setIsSignedIn(true);
                }
            } else {
                // User is signed out
                console.log("User is Not Signed In Yet");
                // When the user state is known, we set the state isSignedIn to false
                setIsSignedIn(false);
                // ...
            }
            // When the user state is known, we set the loading state to false
        });
    });
    // For Checking if the user is signed in or not

    const addtasks = () => {
        //let tasksArray = [];

        // let dateObj = new Date();
        // let month = dateObj.getUTCMonth() + 1; //months from 1-12
        // let day = dateObj.getUTCDate();
        // let year = dateObj.getUTCFullYear();

        // let newdate = year + "/" + month + "/" + day;

        console.log("Assignees List ==> ", assigneesList);

        let taskobj = {
            taskName: task,
            taskAssignee: assigneesList,
            taskDue: taskDue.toLocaleDateString(),
            taskPriority: taskPriority,
            taskSection: taskSection,
        }
        // tasksArray.push(taskobj);
        setAllTaskArray([...allTaskArray, taskobj])
        setTask("");
        setAssigneesList([]);
        setTaskDue(currentDate);
        setTaskPriority("");
        setTaskSection("");
    }

    const addTeamMateInArray = () => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (teamMate.match(mailformat)) {
            //alert("Valid email address!");
            setTeamMatesArray([...teamMatesArray, teamMate]);
            setTeamMate("");
        }
        else {
            alert("You have entered an invalid email address!");
            return;
        }
    }

    const addTaskStageInArray = () => {
        if (stageName != "") {
            //alert("Valid stage name to be added!");
            setAllStageArray([...allStageArray, stageName]);
            setStageName("");
        }
        else {
            alert("Please enter a section name to add it!");
            return;
        }
    }

    // const setTaskAssignedTo = (e: any) => {
    //     let assignedTo = e.target.value
    //     alert(`${assignedTo} is the assignee you selected`);
    //     // setCategory(selectCategory);
    //     setAssignee(assignedTo);
    // }

    const setCurrentStageTo = (e: any) => {
        setCurrentStage(e);
        let cstage = e;
        var currentStageTasksArray = [];
        for (let i = 0; i < allTaskArray.length; i++) {
            console.log("Idhar aik important discovery hai shaid dekho ghour se==> " + allTaskArray.length + " " + allTaskArray[i].taskSection)
            if (allTaskArray[i].taskSection == cstage) {
                currentStageTasksArray.push(allTaskArray[i].taskName);
            }
        }
        setCurrentStageCurrentTasksArray(currentStageTasksArray);
        console.log("Categorized Tasks are", currentStageTasksArray);
    }

    const addData = () => {
        // if (isSignedIn == false) {
        //     const { pathname } = Router
        //     if (pathname == '/createProject') {
        //         alert("Not Signed In Redirecting to Login Page")
        //         Router.push('/login');
        //     }
        // }
        // else {
        //     console.log("Right.Correct")
        // }

        // const ref = db.collection(`Data`).doc();
        // const id = ref.id;

        if (user && !loading && !error) {

            // Make a random color code in rgba format
            let color_code = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;

            ////////////////////////////// For New Version of Firebase(V9) //////////////////////////////
            // ADD JOB TO FIRESTORE
            const project = {
                uid: signedInUserData.uid,
                userEmail: signedInUserData.email,
                ProjectName: projectPlan,
                ProjectMembers: teamMatesArray,
                ProjectStages: allStageArray,
                ProjectTasks: allTaskArray,
                ProjectStartingDate: projectStartingDate.toLocaleDateString(),
                ProjectEndingDate: projectEndingDate.toLocaleDateString(),
                CurrentStage: currentStage,
                CurrentStageCurrentTask: currentStageCurrentTask,
                createAt: JSON.stringify(currentDate),
                createdBy: signedInUserData.displayName,
                color_code: color_code,
                // UniqueID: id
            }
            addDoc(collection(db, `Data/Projects/${signedInUserData.email}`), project)
                .then(() => {
                    console.log("Data sent");
                    const { pathname } = Router;
                    if (pathname == '/createProject') {
                        alert("Your Project is initialized Successfully.Redirecting you to your projects page.");
                        Router.push(`/dashboard/${signedInUserData.uid}`);
                    }
                })
                .catch(err => {
                    console.warn(err);
                    alert(`Error creating Job: ${err.message}`);
                });
            //
            ////////////////////////////// For New Version of Firebase(V9) //////////////////////////////

            //Now sending the data for notifications
        }
        else {
            alert("Please sign in to save project to cloud.")
        }
    }

    return (
        <>
            <Head>
                <title>Create Project | Taskencher</title>
                <meta name="viewport" content="width=1200" />
            </Head>
            {(user && !loading && !error && signedInUserData) ? (
                <section>
                    <div className="container">
                        <div className="fixed-top">
                            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className="container">
                        <div className="row">
                            {(stage == 1) ? (
                                <div className="col-md-4">
                                    <h2 className="fontWeight-light" style={{ color: "black" }}>Let&#39;s set up your first project</h2>
                                    <br />
                                    <h5>What&#39;s something you and your team are currently working on? <span className="text-danger">*</span> </h5>
                                    <br />
                                    <input type="text" placeholder="Project Title" defaultValue={projectPlan} onChange={(e) => setProjectPlan(e.target.value)} className="form-control" />
                                    <br />
                                    {
                                        (projectPlan == "")
                                            ? (
                                                <>
                                                    <span className="text-danger">Please enter the project title to continue</span><br />
                                                    <button className="btn btn-secondary btn-continue" disabled={true} onClick={() => setStage(stage + 1)}>Continue</button>
                                                </>
                                            ) : (
                                                <button className="btn btn-secondary btn-continue" onClick={() => setStage(stage + 1)}>Continue</button>
                                            )
                                    }
                                    {/* <ol>
                            {firestoreData.map((v, i) => {
                                return <li key={i}>
                                    <h5>{v.name}<br /> {v.UniqueID}</h5>
                                </li>
                            })}
                        </ol>
                        <button className="btn btn-primary" onClick={addData}>Add data</button> */}
                                </div>
                            ) :
                                (stage == 2) ? (
                                    <div className="col-md-4">
                                        {/* <h2 className="fontWeight-light">Let's set up your first project</h2> */}
                                        <br />
                                        <h5><i className="fas fa-arrow-left fa-lg mr-3" onClick={() => setStage(stage - 1)}></i> &nbsp;&nbsp;Who&#39;s working on this project with you? <span className="text-danger">*</span> </h5>
                                        <br />
                                        <p>Email address</p>
                                        <input type="email" required value={teamMate} aria-hidden="true" placeholder="eg : Teammate's email i.e bilalmohib7896@gmail.com" onChange={(e) => setTeamMate(e.target.value)} className="form-control" />

                                        <br />
                                        <button className="btn btn-info" onClick={addTeamMateInArray}>Add TeamMate</button>
                                        <br />
                                        <hr />
                                        <ol>
                                            {
                                                teamMatesArray.map((v: any, i: any) => {
                                                    return <li key={i}>
                                                        {v}
                                                    </li>
                                                })
                                            }
                                        </ol>

                                        {
                                            (teamMatesArray.length == 0)
                                                ? (
                                                    <>
                                                        <span className="text-danger">Please add atleast one project member&#39;s email to continue</span><br />
                                                        <button className="btn btn-secondary btn-continue" disabled={true} onClick={() => setStage(stage + 1)}>Continue</button>
                                                    </>
                                                ) : (
                                                    <button className="btn btn-secondary btn-continue" onClick={() => setStage(stage + 1)}>Continue</button>
                                                )
                                        }
                                    </div>
                                ) :
                                    (stage == 3) ? (
                                        <div className="col-md-4">
                                            {/* <h2 className="fontWeight-light">Let's set up your first project</h2> */}
                                            <br />
                                            <h5><i className="fas fa-arrow-left fa-lg mr-3" onClick={() => setStage(stage - 1)}></i>&nbsp;&nbsp;How would you group these tasks into sections or stages? What are a few tasks that you have to do for &#39;<b>{projectPlan}</b>&#39; ?</h5>

                                            {/* Bas dekh */}
                                            <br />
                                            <input type="text" value={stageName} placeholder="eg : To do" onChange={(e) => setStageName(e.target.value)} className="form-control" />
                                            <br />
                                            <button className="btn btn-info" onClick={addTaskStageInArray}>Add Section or Stage</button>
                                            <br />
                                            <hr />
                                            <ol>
                                                {
                                                    allStageArray.map((v: any, i: any) => {
                                                        return <li key={i}>
                                                            {v}
                                                        </li>
                                                    })
                                                }
                                            </ol>

                                            {
                                                (allStageArray.length == 0)
                                                    ? (
                                                        <>
                                                            <span className="text-danger">Please add atleast one Stage or Section to Continue</span><br />
                                                            <button className="btn btn-secondary btn-continue" disabled={true} onClick={() => setStage(stage + 1)}>Continue</button>
                                                        </>
                                                    ) : (
                                                        <button className="btn btn-secondary btn-continue" onClick={() => setStage(stage + 1)}>Continue</button>
                                                    )
                                            }
                                        </div>
                                    ) :
                                        (stage == 4) ? (
                                            <>
                                                <div className="col-md-4">
                                                    <h5><i className="fas fa-arrow-left fa-lg mr-2" onClick={() => setStage(stage - 1)}></i>&nbsp;&nbsp;What are a few tasks that you have to do for &#39;<b>{projectPlan}</b>&#39; ?</h5>
                                                    <br />
                                                    <h6>Task name :<span className="text-danger">*</span></h6>
                                                    <input type="text" defaultValue={task} placeholder="eg : Determine project goal add as many as you want you can edit later on" onChange={(e) => setTask(e.target.value)} className="form-control" />
                                                    <br />

                                                    <h6>Task Assigned to :<span className="text-danger">*</span></h6>
                                                    {/* <div className="input-group input-group-md category_select">
                                                        <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                        <select style={{ fontSize: "15px", width: "200px" }} value={assignee}
                                                            onChange={(e) => setTaskAssignedTo(e)} className="form-control">
                                                            {["--default--", ...teamMatesArray].map((v, i) => {
                                                                return <option value={v} key={i}>
                                                                    {v}
                                                                </option>
                                                            })}
                                                        </select>
                                                    </div> */}
                                                    {/* <MultiSelectCustomDropDown
                                                        options={["teamMatesArray"]}
                                                        value={assignee}
                                                        onChange={setTaskAssignedTo}
                                                        placeholder="Select Teammates"
                                                    /> */}
                                                    <MultiSelectDropDown
                                                        placeholder="Select Teammates"
                                                        options={teamMatesArray}
                                                        selectedArrayList={assigneesList}
                                                        setSelectedArrayList={setAssigneesList}
                                                        styles={{ width: 300, mt: 3 }}
                                                    />
                                                    <br />

                                                    <div>
                                                        <h6>Due Date for the Task : <span className="text-red">*</span></h6>
                                                        <DatePicker
                                                            onChange={setTaskDue}
                                                            value={taskDue}
                                                        />
                                                    </div>

                                                    <br />

                                                    <h6>Task Priority :<span className="text-danger">*</span></h6>
                                                    <div className="input-group input-group-md category_select">
                                                        <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                        <select style={{ fontSize: "15px", width: "200px" }} value={taskPriority}
                                                            onChange={(e) => setTaskPriority(e.target.value)} className="form-control">
                                                            <option disabled={true} value="default">--default--</option>
                                                            <option value="High">High</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>
                                                        </select>
                                                    </div>
                                                    <br />

                                                    <h6>Task Section :<span className="text-danger">*</span></h6>
                                                    <div className="input-group input-group-md category_select">
                                                        <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                        <select style={{ fontSize: "15px", width: "200px" }} value={taskSection}
                                                            onChange={(e) => setTaskSection(e.target.value)} className="form-control">
                                                            {["--default--", ...allStageArray].map((v, i) => {
                                                                return <option value={v} key={i}>
                                                                    {v}
                                                                </option>
                                                            })}
                                                        </select>
                                                    </div>
                                                    <br />

                                                    {(task == "" || assigneesList.length === 0 || taskDue == currentDate || taskPriority == "" || taskSection == "") ? (
                                                        <>
                                                            <span className="text-danger">Please enter all the fields with <span className="text-danger">*</span> to continue</span><br />
                                                            <button className="btn btn-info" disabled={true} onClick={addtasks}>Add task</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className="btn btn-info" onClick={addtasks}>Add task</button>
                                                        </>
                                                    )}

                                                    <br />
                                                    <hr />
                                                    {
                                                        (allTaskArray.length == 0)
                                                            ? (
                                                                <>
                                                                    <span className="text-danger">Please add atleast one Task to Continue</span><br />
                                                                    <button className="btn btn-secondary btn-continue" disabled={true} onClick={() => setStage(stage + 1)}>Continue</button>
                                                                </>
                                                            ) : (
                                                                <button className="btn btn-secondary btn-continue" onClick={() => setStage(stage + 1)}>Continue</button>
                                                            )
                                                    }
                                                </div>
                                            </>
                                        ) :
                                            (stage == 5) ? (
                                                <div className="col-md-4">
                                                    {/* <h2 className="fontWeight-light">Let's set up your first project </h2> */}
                                                    <br />
                                                    <h4 style={{ color: "grey" }}><i className="fas fa-arrow-left fa-lg mr-2" onClick={() => setStage(stage - 1)}></i>  Congratulations, you&#39;ve created your first project in Staff Manager!</h4>
                                                    <br />
                                                    {/* <h2 className="fontWeight-light">Let's set up your first project</h2> */}
                                                    <br />
                                                    <h5>What is the timeline for the project(Starting Date,Ending Date,Current Stage,Current task) ?</h5>
                                                    {/* Bas dekh */}
                                                    <br />
                                                    <div>
                                                        <h6>Starting Date of the Project : <span className="text-red">*</span></h6>
                                                        <DatePicker
                                                            onChange={setProjectStartingDate}
                                                            value={projectStartingDate}
                                                        />
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <h6>Ending Date of the Project(Estimated) : <span className="text-red">*</span></h6>
                                                        <DatePicker
                                                            onChange={setProjectEndingDate}
                                                            value={projectEndingDate}
                                                        />
                                                    </div>

                                                    <br />

                                                    <h6>Current Stage :<span className="text-danger">*</span></h6>
                                                    <div className="input-group input-group-md category_select">
                                                        <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                        <select style={{ fontSize: "15px", width: "200px" }} value={currentStage}
                                                            onChange={(e) => setCurrentStageTo(e.target.value)} className="form-control">
                                                            {["--default--", ...allStageArray].map((v, i) => {
                                                                return <option value={v} key={i}>
                                                                    {v}
                                                                </option>
                                                            })}
                                                        </select>
                                                    </div>

                                                    <br />

                                                    <h6>Current Stage Current Task:<span className="text-danger">*</span></h6>
                                                    <div className="input-group input-group-md category_select">
                                                        <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                        <select style={{ fontSize: "15px", width: "200px" }} value={currentStageCurrentTask}
                                                            onChange={(e) => setCurrentStageCurrentTask(e.target.value)} className="form-control">
                                                            {["--default--", ...currentStageCurrentTasksArray].map((v, i) => {
                                                                return <option value={v} key={i}>
                                                                    {v}
                                                                </option>
                                                            })}
                                                        </select>
                                                    </div>

                                                    <br />
                                                    <br />
                                                    {
                                                        (projectPlan == "" || teamMatesArray.length == 0 || allStageArray.length == 0 || allTaskArray.length == 0 || projectStartingDate == currentDate || projectEndingDate == currentDate || currentStage == "" || currentStageCurrentTask == "")
                                                            ? (
                                                                <>

                                                                    <span className="text-danger">Please Enter the starting and ending Date to Continue</span><br />
                                                                    <button className="btn btn-secondary btn-continue" disabled={true} onClick={addData}>Take me to my project</button>
                                                                </>
                                                            ) : (
                                                                <button className="btn btn-secondary btn-continue" onClick={addData}>Take me to my project</button>
                                                            )
                                                    }

                                                    {/* <ol>
                                {firestoreData.map((v, i) => {
                                    return <li key={i}>
                                        <h5>{v.name}<br /> {v.UniqueID}</h5>
                                    </li>
                                })}
                            </ol>
                            <button className="btn btn-primary" onClick={addData}>Add data</button> */}
                                                </div>
                                            ) : (
                                                <span></span>
                                            )}

                            <div className="col-md-8" title={`This is a sample preview of your project dear ${signedInUserData.displayName}`}>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th colSpan={5}>
                                                    <h2><i className="fas fa-list-alt fa-lg mr-3" style={{ color: "#48dafd" }}></i>&nbsp;&nbsp; {projectPlan}</h2>
                                                    <h4>
                                                        <span className="text-success">
                                                            {/* {JSON.stringify(new Date(projectStartingDate).toLocaleString('en-US', { timeZone: 'Asia/Karachi' }) + ", " +new Date(projectStartingDate).toLocaleString('en-US', { timeZone: 'Asia/Karachi' }) + " " + new Date(projectStartingDate).toLocaleString('en-US', { timeZone: 'Asia/Karachi' }))} */}
                                                            {JSON.stringify(new Date(projectStartingDate).toLocaleString('en-US', { timeZone: 'Asia/Karachi' }))}
                                                        </span>
                                                        &nbsp; <i className="fas fa-1x text-primary fa-arrow-right"></i>
                                                        &nbsp; <span className="text-danger">
                                                            {/* {JSON.stringify(new Date(projectEndingDate).getDay() + ", " + monthNames[new Date(projectEndingDate).getMonth()] + " " + new Date(projectEndingDate).getFullYear())} */}
                                                            {JSON.stringify(new Date(projectEndingDate).toLocaleString('en-US', { timeZone: 'Asia/Karachi' }))}
                                                        </span></h4>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th scope="col">Task name</th>
                                                <th scope="col">Assignee</th>
                                                <th scope="col">Due date</th>
                                                <th scope="col">Priority</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <>
                                            {/* {(stage)?(
                                ):(
                                )} */}


                                            {/* This matters */}
                                            {allStageArray.map((s: any, i: any) => {
                                                return <tbody key={i}>
                                                    <tr>
                                                        <th className={(currentStage == s) ? (`text-danger`) : (``)} scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {s}</h5></th>
                                                    </tr>
                                                    {(allTaskArray.length == 0) ? (
                                                        <tr>
                                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                                            <td>&nbsp;&nbsp;</td>
                                                            <td>&nbsp;&nbsp;</td>
                                                            <td>&nbsp;&nbsp;</td>
                                                            <td>&nbsp;&nbsp;</td>
                                                        </tr>
                                                    ) : (
                                                        allTaskArray.map((v: any, i: any) => {
                                                            return <tr className={(currentStageCurrentTask == v.taskName) ? (`text-danger`) : (``)} key={i}>
                                                                {(v.taskSection == s) ? (
                                                                    <>
                                                                        <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;{v.taskName}</th>
                                                                        {(v.taskAssignee.length === 0) ? (
                                                                            <td>
                                                                                <i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                                                        ) : (
                                                                            <td>
                                                                                {v.taskAssignee.map((
                                                                                    v: any, i: any) => (
                                                                                    <span key={i}>{v}</span>
                                                                                ))}
                                                                            </td>
                                                                        )}

                                                                        <td>{v.taskDue}</td>
                                                                        {(v.taskPriority == "High") ? (
                                                                            <td><button type="button" className="btn btn-danger btn-rounded">{v.taskPriority}</button></td>
                                                                        ) : (v.taskPriority == "Medium") ? (
                                                                            <td><button type="button" className="btn btn-warning btn-rounded">{v.taskPriority}</button></td>
                                                                        ) : (v.taskPriority == "Low") ? (
                                                                            <td><button type="button" className="btn btn-info btn-rounded">{v.taskPriority}</button></td>
                                                                        ) : (
                                                                            <td></td>
                                                                        )}
                                                                        <td><h5>{v.taskSection}</h5></td>
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


                                            {/* This is commented for now for map to work */}
                                            {/* <tr>
                                    <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {stageName}</h5></th>
                                </tr> */}


                                            {/* {(allTaskArray.length == 0) ? (
                                    <>
                                        <tr>
                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                        </tr>
                                    </>
                                ) : (
                                    allTaskArray.map((v, i) => {
                                        return <tr key={i}>
                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;{v.taskName}</th>
                                            {(v.taskAssignee.length == "") ? (
                                                <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                            ) : (
                                                <td>{v.taskAssignee}</td>
                                            )}
                                            <td>{v.taskDue}</td>
                                            <td><button type="button" className="btn btn-info btn-rounded">{v.taskPriority}</button></td>
                                            <td><button type="button" className="btn btn-info btn-rounded">{v.taskSection}</button></td>
                                        </tr>
                                    })
                                )} */}
                                            {/* This is commented for now for map to work */}

                                            {/* <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;Determine project goal</th>
                                    <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                    <td>Today-Jun 9</td>
                                    <td><button type="button" className="btn btn-info btn-rounded">Low</button></td>
                                    <td><button type="button" className="btn btn-info btn-rounded">On track</button></td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;Schedule meeting with client</th>
                                    <td><i className="fas fa-user-circle fa-2x t text-danger"></i></td>
                                    <td>Jun 8 - 10</td>
                                    <td><button type="button" className="btn btn-warning btn-rounded">Medium</button></td>
                                    <td><button type="button" className="btn btn-warning btn-rounded">At risk</button></td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;Set final deadline</th>
                                    <td><i className="fas fa-user-circle fa-2x t text-danger"></i></td>
                                    <td>Jun 9 - 11</td>
                                    <td><button type="button" className="btn btn-secondary btn-rounded">High</button></td>
                                    <td><button type="button" className="btn btn-danger btn-rounded">On track</button></td>
                                </tr> */}

                                            {/* This is commented for now */}
                                            {/* <tr>
                                    <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {stageName}</h5></th>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {stageName}</h5></th>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr> */}
                                            {/* This is commented for now */}
                                        </>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                </section>
            ) : (
                <CustomLoader />
            )
            }
        </>
    )
}
export default CreateProject;