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
    email: string,
    projectID?: any,
}

const HeaderMyTasks: React.FC<IProps> = ({
    photoURL,
    selectedTabItemValue,
    setSelectedTabItemValue,
    email,
    projectID,
}) => {

    const router = useRouter();

    const tabItems = [
        {
            id: 1,
            name: "List"
        },
        {
            id: 2,
            name: "Board"
        },
        {
            id: 3,
            name: "Calender"
        },
        {
            id: 4,
            name: "Messages"
        },
        {
            id: 5,
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
                    setFirestoreData(localObj);
                    break;
                }
            }
            // @ts-ignore
            // setProjectTitle(localObj?.ProjectName);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECT TITLE

    return (
        <nav className={styles.container}>
            <div className={styles.leftSide}>
                <div className='d-flex'>
                    <Box sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        backgroundColor: firestoreData?.color_code,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "black",
                        fontSize: 18,
                        letterSpacing: 1,
                        fontWeight: "lighter",
                        // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
                    }}>
                        {email?.charAt(0).toUpperCase() + email?.charAt(email?.length - 1).toUpperCase()}
                    </Box>
                    <div className='flex mt-[-11px]'>
                        <h3 className={styles.headingProject}>
                            My Tasks
                        </h3>
                        <div>
                            <div>
                                <a data-mdb-toggle="dropdown" aria-expanded="false" className={styles.RiArrowDropDownLine} style={{ alignItems: "center", display: "flex", justifyContent: "center", boxShadow: "none", paddingTop: 2, cursor: "pointer" }}>
                                    <RiArrowDropDownLine size={60} color='black' />
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Sync to calender...</a></li>
                                    <li><a className="dropdown-item" href="#">Add Tasks via Email ...</a></li>
                                    <li><a className="dropdown-item" href="#">Export CSV</a></li>
                                    <li><a className="dropdown-item" href="#">Print</a></li>
                                </ul>
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
                    </div>
                </div>
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
export default HeaderMyTasks;