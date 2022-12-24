import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase/index';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from "../../../components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import CustomLoader from "../../../components/CustomLoader";

// Importing Icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineBars } from 'react-icons/ai';
// Importing Styles
import styles from './widget1.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function,
    email: String
}

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
import { db, auth } from "../../../firebase";
import { Router } from 'next/router';

const Widget1: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem,
    email
}) => {
    const router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list, setList] = useState(
        [
            {
                title: "Create Project",
                info: "",
                className: styles.icon1,
            },
            {
                title: "Software Development",
                due_tasks: "",
                className: styles.icon2,
            },
            {
                title: "FYP",
                info: "2 tasks due soon",
                className: styles.icon3,
            }
        ]);


    // States for status of login users
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

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

    console.log("Email ==> ", email.toString());
    // "Jobs", `${uid}`, "data")
    const e = email;
    let q = query(collection(db, "Data", "Projects", `${e}`));

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

            let newProjects = [];
            let tempProjectsObj = snapshot?.docs.map((doc, i) => ({ ...doc.data(), id: doc.id }));

            setProjects(tempProjectsObj);
            // setLoading(false);
            // console.clear();
            console.log("Projects ==> ", projects);
            // }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    return (
        <div className={styles.container}>
            <div className="d-flex">
                <h1>Projects</h1>
                {/* Secondary */}
                <div className="btn-group" style={{ fontSize: 12, height: 28, boxShadow: "none", marginTop: "-10px", marginLeft: 20 }}>
                    <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                        Recents <IoMdArrowDropdown style={{ marginTop: -2 }} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Recents</a></li>
                        <li><a className="dropdown-item" href="#">Favorites</a></li>
                    </ul>
                </div>
            </div>
            <section className={`${styles.projectsContainer} ${((item == currentFullLengthItem) && (styles.fullWidthWidget))}`}>
                {list &&
                    [{
                        ProjectName: "Create Project",
                        ProjectStartingDate: "",
                        moveTo: "/createProject",
                    }, ...projects].map((item, index) => (
                        <div key={index} onClick={() => router.push((index == 0) ? (item.moveTo) : (`/projectDetails/${item.ProjectName}/${item.id}`))}>
                            <div className={styles.individualProject}>
                                <div className={`${styles.icon_style}`} style={{
                                    backgroundColor: item.color_code
                                }}>
                                    <AiOutlineBars style={{ fontSize: 30, color: "white" }} />
                                </div>
                                <div className={styles.containerRightProject}>
                                    <h4 className={`${styles.projectTitle} ${(index == 0) && (styles.marginTopTitle)}`}>{item.ProjectName}</h4>
                                    {(index !== 0) && (
                                        <p className={styles.infoText}>{item.ProjectStartingDate}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </div>
    )
}
export default Widget1;