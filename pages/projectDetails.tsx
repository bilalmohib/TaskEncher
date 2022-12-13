import React, { useState, useEffect } from "react";
import firebasie from '../firebase/index';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import Router from 'next/router'
import { useRouter } from 'next/router';
import Navbar from "../components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import CustomLoader from "../components/CustomLoader";
// const Logo = require("../resources/staffLogo.png");

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

const currentDate = new Date();
const ProjectDetails = () => {
    const router = useRouter();

    const [firestoreData, setFirestoreData] = useState<any>([]);
    const [status, setStatus] = useState<Boolean>(false);
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

    useEffect(() => {

        // console.log("Current Path : ", window.location.pathname);
        // console.log("activeJobs ==>", activeJobs);

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

    // For Loading
    // const [user] = useAuthState(auth);

    // `Data/Projects/${signedInUserData.email}`

    // console.log("Email ==> ", email.toString());
    // "Jobs", `${uid}`, "data")
    // const e = email;
    let q = query(collection(db, "Data", "Projects", ``));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // GETTINGS Active Jobs
    const [projects, setProjects] = useState<any>([])
    // const [loading, setLoading] = useState(true); 

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading) {
            // if (snapshot.docs.length !== projects.length) {
            setProjects(snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            // setLoading(false);
            // console.clear();
            console.log("Projects ==> ", projects);
            // }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    return (
        <>
            {(status) ? (
                <div className="container">

                    {(firestoreData.length == 0) ? (
                        <div>
                            <br /><br />
                            <h1 className="mt-3 text-info text-center">Please Create any project first to see its details</h1>
                            <br /><br />
                            <p className="btn btn-link btn-block border"><Link href="/new">Create New Project</Link></p>
                        </div>
                    ) : (
                        <div>
                            {(loading) ? (
                                <>
                                    <div title="Create New Project" className="newProjectBtn" onClick={() => Router.push('/new')}><i className="fas fa-4x fa-plus-circle"></i></div>
                                    <div>
                                        <h1 className="text-center"><span className="text-danger"><b>Project Name:-</b></span> {firestoreData[props.currentKey].ProjectName}</h1>
                                        <p className="text-center text-info">All the project details can be customized and updated according to your choices.</p>
                                        <p className="text-center"> <b>Note:- </b>Project Stage and Task having <span className="text-danger">Red color</span> are the one that are active and current tasks. </p>
                                    </div>
                                    <div title={`This is a sample preview of your project dear ${signedInUserData.name}`}>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={5}>
                                                            <h2><i className="fas fa-list-alt fa-lg mr-3" style={{ color: "#48dafd" }}></i>&nbsp;&nbsp; {firestoreData[0].ProjectName}</h2>
                                                            <h4><span className="text-success">{JSON.stringify(firestoreData[0].ProjectStartingDate)}</span> <i className="fas fa-1x text-primary fa-arrow-right"></i> <span className="text-danger">{JSON.stringify(firestoreData[0].ProjectEndingDate)}</span></h4>
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
                                                    {/* This matters */}
                                                    {firestoreData[props.currentKey].ProjectStages.map((s, i) => {
                                                        return <tbody key={i}>
                                                            <tr>
                                                                <th className={(firestoreData[props.currentKey].CurrentStage == s) ? (`text-danger`) : (``)} scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {s}</h5></th>
                                                            </tr>
                                                            {(firestoreData[props.currentKey].ProjectTasks.length == 0) ? (
                                                                <tr>
                                                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                </tr>
                                                            ) : (
                                                                firestoreData[props.currentKey].ProjectTasks.map((v, i) => {
                                                                    return <tr className={(firestoreData[props.currentKey].CurrentStageCurrentTask == v.taskName) ? (`text-danger`) : (``)} key={i}>
                                                                        {(v.taskSection == s) ? (
                                                                            <>
                                                                                <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;{v.taskName}</th>
                                                                                {(v.taskAssignee == "") ? (
                                                                                    <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                                                                ) : (
                                                                                    <td>{v.taskAssignee}</td>
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
                                                </>
                                            </table>
                                        </div>
                                    </div>
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
                    )}
                </div>
            ) : (
                <>
                    <CustomLoader />
                </>
            )
            }
        </>
    )
}
export default ProjectDetails;