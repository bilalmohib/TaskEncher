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

import DatePicker from 'react-date-picker/dist/entry.nostyle';

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
import CustomLoader from '../../../components/CustomLoader';
import HeaderProjectDetails from '../../../components/HeaderProjectDetails';

const currentDate = new Date();

const ProjectDetails: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Profile - Project Management Software</title>
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
        </div>
    )
}

const ProjectDetailsComp = () => {

    const [taskDue, setTaskDue] = useState<any>(currentDate);

    const frequentCollaboratorsList = [
        {
            name: "Bilal Mohib",
            email: "bilalmohib7896@gmail.com",
            photoURL: null
        },
        {
            name: "Arif Alvi",
            email: "arifalvi@gmail.com",
            photoURL: null
        },
        {
            name: "Imran Khan",
            email: "imrankhan@gmail.com",
            photoURL: null
        },
        {
            name: "Nawaz Sharif",
            email: "nawazsharif@gmail.com",
            photoURL: null
        },
        {
            name: "Asif Ali Zardari",
            email: "asifalizardari@gmail.com",
            photoURL: null
        }
    ]

    const router = useRouter();

    const { uuid } = router.query;

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

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    let q = query(collection(db, "Data", "Projects", `${uuid}`));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // GETTINGS Active Jobs
    const [projects, setProjects] = useState<any>([])
    // const [loading, setLoading] = useState(true); 

    const [selectedTabItemValue, setSelectedTabItemValue] = useState<Number>(1);

    const [descriptionText, setDescriptionText] = useState<string>(`
        Welcome your team and set the tone for how you’ll work together in Asana. Add
        meeting details, communication channels, and any other information that will help.
    `);

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

    // useEffect(() => {
    //     if (projects.length !== 0) {
    //         setTaskDue(projects.map((project: any) => project.taskDue));

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////

    return (
        <div className={styles.container}>
            {(isSignedIn && !loading) ? (
                <div className={styles.container}>
                    <header className={`fixed-top ${styles.header}`}>
                        <HeaderProjectDetails photoURL={signedInUserData.photoURL} selectedTabItemValue={selectedTabItemValue} setSelectedTabItemValue={setSelectedTabItemValue} />
                    </header>

                    <div className={styles.mainContainer}>
                        {(selectedTabItemValue === 1) ? (
                            <div>
                                <div>
                                    <h3 contentEditable={true} className={styles.headingCollaborate}>
                                        How we&apos;ll collaborate
                                    </h3>
                                    <div
                                        contentEditable={true}
                                        className={styles.descriptionHowCollaborate}
                                        onMouseOut={
                                            () => setDescriptionText(
                                                `Welcome your team and set the tone for how you’ll work together in Asana. Add
                                        meeting details, communication channels, and any other information that will help.`
                                            )
                                        }
                                        onClick={
                                            () => setDescriptionText(
                                                (
                                                    descriptionText ===
                                                    `Welcome your team and set the tone for how you’ll work together in Asana. Add
                                                    meeting details, communication channels, and any other information that will 
                                                    help.`) ?
                                                    ("") :
                                                    (descriptionText)
                                            )
                                        }
                                        onChange={(e: any) => setDescriptionText(e)}
                                    >
                                        {descriptionText}
                                    </div>

                                    {/* Project Roles */}
                                    <h3 className={styles.headingOverView}>
                                        Project roles
                                    </h3>
                                    <div>
                                        <div className={styles.projectRolesContainer}>
                                            {
                                                [
                                                    {
                                                        id: 1,
                                                        projectRole: "Project Owner",
                                                        name: "Muhammad Bilal",
                                                        photoURL: signedInUserData.photoURL
                                                    },
                                                    {
                                                        id: 2,
                                                        projectRole: "Project Owner",
                                                        name: "Muhammad Bilal",
                                                        photoURL: signedInUserData.photoURL
                                                    },
                                                    {
                                                        id: 3,
                                                        projectRole: "+ Add Role",
                                                        name: "Muhammad Bilal",
                                                        photoURL: signedInUserData.photoURL
                                                    },
                                                    {
                                                        id: 4,
                                                        projectRole: "+ Add Role",
                                                        name: "Muhammad Bilal",
                                                        photoURL: signedInUserData.photoURL
                                                    },
                                                    {
                                                        id: 5,
                                                        projectRole: "+ Add Role",
                                                        name: "Muhammad Bilal",
                                                        photoURL: signedInUserData.photoURL
                                                    },
                                                    {
                                                        id: 6,
                                                        projectRole: "+ Add Role",
                                                        name: "Muhammad Bilal",
                                                        photoURL: signedInUserData.photoURL
                                                    }
                                                ].map((value: any, index: any) => (
                                                    <div key={index}>
                                                        {(index == 0) ? (
                                                            <div className={styles.individualProjectRolesContainer}>
                                                                <div className={styles.imageAddNewRole}>
                                                                    <AiOutlinePlus color='black' />
                                                                </div>
                                                                <h3 className={styles.addMemberText}>Add member</h3>
                                                            </div>
                                                        ) : (
                                                            <div className={styles.individualProjectRolesContainerSeparate}>
                                                                <div className={styles.imageRoleMember}>
                                                                    <Image
                                                                        src={signedInUserData.photoURL}
                                                                        alt={value.projectRole}
                                                                        width={36}
                                                                        height={36}
                                                                        loading="eager"
                                                                        title={value.projectRole}
                                                                        style={{ borderRadius: "50%" }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h3 className={styles.memberText}>{value.name}</h3>
                                                                    <h3 className={styles.projectRoleText}>{value.projectRole}</h3>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* Connected Goals */}
                                    <h3 className={styles.headingOverView}>
                                        Connected Goals
                                    </h3>
                                    <div className={styles.goalsContainer}>
                                        <div className={styles.leftContainerGoals}>
                                            <Image
                                                src={"/shooting_target.svg"}
                                                alt="Goal"
                                                width={96}
                                                height={96}
                                                loading="eager"
                                                title="Goal"
                                                style={{ borderRadius: "50%" }}
                                            />
                                        </div>
                                        <div className={styles.rightContainerGoals}>
                                            <p>
                                                Connect or create a goal to link this project to a <br /> larger purpose.
                                            </p>
                                            <button type="button" className="btn btn-outline-primary d-flex" data-mdb-ripple-color="dark"> <div style={{ marginTop: -2, marginRight: 5 }}><BsTriangle /></div> Add Goal </button>
                                        </div>
                                    </div>

                                    {/* Key resources */}
                                    <h3 className={styles.headingOverView}>
                                        Key resources
                                    </h3>
                                    <div className={styles.krContainer}>
                                        <div className={styles.leftContainerkr}>
                                            <Image
                                                src={"/key_resources.svg"}
                                                alt="key resources"
                                                width={160}
                                                height={160}
                                                loading="eager"
                                                title="key resources"
                                                style={{ borderRadius: "50%" }}
                                            />
                                        </div>
                                        <div className={styles.rightContainerkr}>
                                            <p>
                                                Align your team around a shared vision with a <br /> project brief and supporting resources.
                                            </p>
                                            <div className="d-flex" style={{ marginLeft: "15%" }}>
                                                <button type="button" className="btn btn-outline-primary d-flex" data-mdb-ripple-color="dark"> <div style={{ marginTop: -2, marginRight: 5 }}><TbListDetails /></div> Create Project Brief </button>
                                                <button type="button" style={{ marginLeft: "4%" }} className="btn btn-outline-primary d-flex" data-mdb-ripple-color="dark"> <div style={{ marginTop: -2, marginRight: 5 }}><SlLink /></div> Add links & files </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Key resources */}
                                    <h3 className={`d-flex ${styles.headingOverView}`}>
                                        Milestones <p> &nbsp;+</p>
                                    </h3>
                                    <div className={styles.milestonesContainer}>
                                        {
                                            [
                                                {
                                                    id: 1,
                                                    name: "To Start the Development",
                                                    dueDate: "3 Jun 2022"
                                                },
                                                {
                                                    id: 2,
                                                    name: "Complete the project",
                                                    dueDate: "3 March 2020"
                                                },
                                                {
                                                    id: 3,
                                                    name: "Complete the Whole Project",
                                                    dueDate: "16 Sep 2018"
                                                }
                                            ].map((value: any, index: any) => {
                                                return (
                                                    <div className={styles.individualMileStonesContainer} key={index}>
                                                        <div className="d-flex">
                                                            <TbSquareRotated size={20} style={{ marginTop: 2 }} color='#58a182' />
                                                            <p style={{ marginLeft: 5 }}>{value.name}</p>
                                                        </div>
                                                        <div >
                                                            <DatePicker
                                                                onChange={setTaskDue}
                                                                value={new Date(value.dueDate)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        ) : (selectedTabItemValue === 2) ? (
                            <div>
                                <h1>List</h1>
                            </div>
                        ) : (selectedTabItemValue === 3) ? (
                            <div>
                                <h1>Board</h1>
                            </div>
                        ) : (selectedTabItemValue === 4) ? (
                            <div>
                                <h1>Timeline</h1>
                            </div>
                        ) : (selectedTabItemValue === 5) ? (
                            <div>
                                <h1>Calender</h1>
                            </div>
                        ) : (selectedTabItemValue === 6) ? (
                            <div>
                                <h1>Workflow</h1>
                            </div>
                        ) : (selectedTabItemValue === 7) ? (
                            <div>
                                <h1>Dashboard</h1>
                            </div>
                        ) : (selectedTabItemValue === 8) ? (
                            <div>
                                <h1>Messages</h1>
                            </div>
                        ) : (selectedTabItemValue === 9) ? (
                            <div>
                                <h1>Files</h1>
                            </div>
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

export {
    ProjectDetails as default,
    ProjectDetailsComp
}
