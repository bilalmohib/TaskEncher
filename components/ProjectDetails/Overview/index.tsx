import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.css';

// Importing Icons
import { AiOutlinePlus } from "react-icons/ai";
import { BsTriangle } from "react-icons/bs";
import { TbListDetails, TbSquareRotated } from "react-icons/tb";
import { SlLink } from "react-icons/sl";
import updateProject from '@app/lib/updateProject';

// import DatePicker from 'react-date-picker/dist';

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

import { useCollection } from "react-firebase-hooks/firestore";

import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../../firebase";
import colors from '@app/lib/colors';
import { useRouter } from 'next/router';

const currentDate = new Date();

interface OverviewProps {
    photoURL: any;
    email: any;
    projectName: any;
    projectMembers: any;

    // Just Single Project Members
    projectMembersList: any;
    setProjectMembersList: (value: any) => void;

    // Invited Members Modal
    isInvitedMembersModalOpen: boolean;
    setIsInvitedMembersModalOpen: (value: boolean) => void;
}

const Overview: React.FC<OverviewProps> = ({
    photoURL,
    email,
    projectName,
    // All Project Members
    projectMembers,

    // Just Single Project Members
    projectMembersList,
    setProjectMembersList,

    // Invited Members Modal
    isInvitedMembersModalOpen,
    setIsInvitedMembersModalOpen
}) => {

    const router = useRouter();
    const { projectID } = router.query;

    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

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

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    // let q = query(collection(db, "Data", "Projects", e));
    let q = query(collection(db, "Projects"));

    const [snapshot, loading, error] = useCollection(q, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    // GETTINGS Project Details
    const [projectDetails, setProjectDetails] = useState<any>(null);
    // const [loading, setLoading] = useState(true);

    const [projects, setProjects] = useState<any>([]);

    const [projectStages, setProjectStages] = useState<any>([]);

    const [projectTasks, setProjectTasks] = useState<any>([]);

    // FOR GETTING PROJECTS
    useEffect(() => {
        if (!loading && snapshot) {
            let localObj;
            let localObjP: any;

            let arrProjectsLocal = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            localObjP = arrProjectsLocal;

            // Now only i need projects that are created by me means email is equal to signedInUserData.email
            // or that are shared with me means project members array contains signedInUserData.email

            // Filter the projects array and extract only those projects that are created by me
            // localObj = localObj.filter((project: any) => );

            // Filter the projects array and extract only those projects that are shared with me
            localObjP = localObjP.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

            let arrProjects = localObjP;
            for (let i = 0; i < arrProjects.length; i++) {
                // @ts-ignore
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

            // @ts-ignore
            setProjectMembersList(localObj?.ProjectMembers);

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

    // Title project description
    const [descriptionTextTitle, setDescriptionTextTitle] = useState<string>(`How we'll collaborate`);

    const handleEditDescriptionTitle = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            let dt = event.target.innerText;
            // alert(dt)
            // @ts-ignore
            updateProject(dt, "updateDescriptionTitle", email, projectID.toString(), projects);
        }
    };

    // Description Project
    const [descriptionText, setDescriptionText] = useState<string>(`
        Welcome your team and set the tone for how you’ll work together in Asana. Add
        meeting details, communication channels, and any other information that will help.
    `);

    const handleEditDescription = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            let d = event.target.innerText;
            // alert(d)
            // @ts-ignore
            updateProject(d, "updateDescription", email, projectID.toString(), projects);
        }
    };

    useEffect(() => {
        if (!loading) {
            setDescriptionText(projectDetails?.description);
            setDescriptionTextTitle(projectDetails?.descriptionTitle);
        }
    }, [loading, projectDetails, router.query]);

    return (
        <div className={styles.OverviewContainer}>
            <div>
                <h3
                    contentEditable={true}
                    className={styles.headingCollaborate}
                    onKeyDown={(e) => handleEditDescriptionTitle(e)}
                    // onClick={
                    //     () => setDescriptionText(
                    //         (
                    //             descriptionTextTitle ===
                    //             `How we'll collaborate`) ?
                    //             ("") :
                    //             (descriptionTextTitle)
                    //     )
                    // }
                    onChange={(e: any) => setDescriptionTextTitle(e)}
                >
                    {(!loading) ? (projectDetails?.descriptionTitle) : ("")}
                </h3>
                <div
                    onKeyDown={(e) => handleEditDescription(e)}
                    contentEditable={true}
                    className={styles.descriptionHowCollaborate}
                    // onClick={
                    //     () => setDescriptionText(
                    //         (
                    //             descriptionText ===
                    //             `Welcome your team and set the tone for how you’ll work together in Asana. Add
                    //                                 meeting details, communication channels, and any other information that will 
                    //                                 help.`) ?
                    //             ("Enter Your Team Goals or Project Description Or Tasks here") :
                    //             (descriptionText)
                    //     )
                    // }
                    onChange={(e: any) => setDescriptionText(e)}
                >
                    {(!loading) ? (projectDetails?.description) : ("")}
                </div>

                {/* Project Roles */}
                <h3 className={styles.headingOverView}>
                    Project roles
                </h3>
                <div>
                    <div className={styles.projectRolesContainer}>
                        {
                            [{}, ...projectMembersList]
                                .map((value: any, index: any) => (
                                    <div key={index}>
                                        {(index == 0) ? (
                                            <div className={styles.individualProjectRolesContainer}
                                                role='button'
                                                onClick={() => {
                                                    setIsInvitedMembersModalOpen(true);
                                                }}
                                            >
                                                <div className={styles.imageAddNewRole}>
                                                    <AiOutlinePlus color='black' />
                                                </div>
                                                <h3 className={styles.addMemberText}>Add member</h3>
                                            </div>
                                        ) : (
                                            <div className={styles.individualProjectRolesContainerSeparate}>
                                                <div className={styles.imageRoleMember}>
                                                    <div
                                                        style={{
                                                            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                                            borderRadius: "50%",
                                                            width: "36px",
                                                            height: "36px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "white",
                                                            fontSize: "16px",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        {/* Extract the first letters of the name and display them means every word first letter */}
                                                        {/* {value.split(" ").map((item: any) => item[0]).join("")} */}
                                                        {
                                                            // Extract the first and last letter of the members name i.e v
                                                            value?.charAt(0).toUpperCase() + value?.charAt(value?.length - 1).toUpperCase()
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className={styles.memberText}>{value}</h3>
                                                    <h3 className={styles.projectRoleText}>{
                                                        (value === email) ? ("Project Owner") : ("Project Member")
                                                    }</h3>
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
                                    <div>
                                        {/* <DatePicker
                                            onChange={setTaskDue}
                                            value={new Date(value.dueDate)}
                                        /> */}
                                        <p style={{ color: "#58a182" }}>{value.dueDate}</p>
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
    )
}
export default Overview;
