import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GiCircle, GiPlainCircle } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

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

import { db } from "../../firebase";

import ProjectIcon from '../ProjectIcon';

import {
    CircularProgress,
    Box,
    Typography,
    Link,
} from "@mui/material";

import styles from './style.module.css';

interface IProps {
    photoURL: any,
    selectedTabItemValue: any,
    setSelectedTabItemValue: any,
    projectTitle: string,
    email: string,
    projectID?: any,
    setProjectTitle?: any,
}

const HeaderProjectDetails: React.FC<IProps> = ({
    photoURL,
    selectedTabItemValue,
    setSelectedTabItemValue,
    projectTitle,
    email,
    projectID,
    setProjectTitle
}) => {

    const router = useRouter();

    const tabItems = [
        {
            id: 1,
            name: "OverView"
        },
        {
            id: 2,
            name: "List"
        },
        {
            id: 3,
            name: "Board"
        },
        {
            id: 4,
            name: "Timeline"
        },
        {
            id: 5,
            name: "Calender"
        },
        {
            id: 6,
            name: "Workflow"
        },
        {
            id: 7,
            name: "Dashboard"
        },
        {
            id: 8,
            name: "Messages"
        },
        {
            id: 9,
            name: "Files"
        }
    ];

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    const [firestoreData, setFirestoreData] = useState<any>([]);
    const [status, setStatus] = useState<Boolean>(false);
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

    let q = query(collection(db, "Data", "Projects", `${email}`));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // FOR GETTING PROJECT TITLE
    useEffect(() => {

        if (!loading && snapshot && email) {
            let localObj;
            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            for (let i = 0; i < arrProjects.length; i++) {
                if (arrProjects[i].id === projectID.toString()) {
                    localObj = arrProjects[i];
                }
            }
            // @ts-ignore
            setProjectTitle(localObj?.ProjectName);
            setFirestoreData(localObj);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECT TITLE

    return (
        <nav className={styles.container}>
            <div className={styles.leftSide}>
                <div className='d-flex'>
                    <ProjectIcon
                        h={48}
                        w={48}
                        IconSize={35}
                        Color="white"
                        BGC={firestoreData?.color_code}
                    />
                    <h3 className={styles.headingProject}>
                        {projectTitle}
                    </h3>
                    <div>
                        <div>
                            <a data-mdb-toggle="dropdown" aria-expanded="false" style={{ alignItems: "center", display: "flex", justifyContent: "center", boxShadow: "none", paddingTop: 2, cursor: "pointer" }}>
                                <RiArrowDropDownLine size={45} />
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Separated link</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <a data-mdb-toggle="dropdown" aria-expanded="false" className={styles.statusBtn}>
                            <GiCircle /> &nbsp; Set status <RiArrowDropDownLine size={30} />
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item mt-2" href="#"><GiPlainCircle style={{ marginTop: -4 }} color='#58a182' /> &nbsp; On track</a></li>
                            <li><a className="dropdown-item" href="#"><GiPlainCircle style={{ marginTop: -4 }} color='#f1bd6c' /> &nbsp; At risk</a></li>
                            <li><a className="dropdown-item" href="#"><GiPlainCircle style={{ marginTop: -4 }} color='#de5f73' /> &nbsp; Off track</a></li>
                            <li><a className="dropdown-item" href="#"><GiPlainCircle style={{ marginTop: -4 }} color='#3f6ac4' /> &nbsp; On hold</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item mb-2" href="#"><FaCheckCircle style={{ marginTop: -4 }} color='#58a182' /> &nbsp; Complete</a></li>
                        </ul>
                    </div>
                </div>
                <ul className={styles.downLeftTabsList}>
                    {(tabItems.length > 0) && tabItems.map((item, index) => {
                        return (
                            <li key={index} className={(selectedTabItemValue === (index + 1)) ? (styles.selectedTabItem) : ("")} onClick={() => setSelectedTabItemValue(item.id)}>
                                {item.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.profileImageRightSide}>
                    <Image
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%" }}
                        src={photoURL}
                        alt="Picture of the author"
                        loading="lazy"
                    />
                </div>
                <button className={`btn btn-primary ${styles.btn_share}`}>
                    <BsPeopleFill size={16} style={{ marginTop: 3 }} />
                    &nbsp;
                    Share
                </button>
            </div>
        </nav>
    )
}
export default HeaderProjectDetails;