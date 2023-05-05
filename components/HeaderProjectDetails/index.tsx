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
    Tooltip
} from "@mui/material";

import styles from './style.module.css';
import colors from '@app/lib/colors';

interface IProps {
    photoURL: any,
    selectedTabItemValue: any,
    setSelectedTabItemValue: any,
    projectTitle: string,
    setProjectTitle: any,
    email: string,
    projectMembers: any,
    setProjectMembers: any
}

const HeaderProjectDetails: React.FC<IProps> = ({
    photoURL,
    selectedTabItemValue,
    setSelectedTabItemValue,
    projectTitle,
    setProjectTitle,
    email,
    projectMembers,
    setProjectMembers
}) => {

    const router = useRouter();
    const { projectID } = router.query;

    // For POPOVER
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedMember, setSelectedMember] = React.useState(null);

    const handleMouseEnter = (event: any, member: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedMember(member);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setSelectedMember(null);
    };
    // For POPOVER

    const tabItems = [
        {
            id: 1,
            name: "OverView"
        },
        {
            id: 2,
            name: "List"
        },
        // {
        //     id: 3,
        //     name: "Board"
        // },
        // {
        //     id: 4,
        //     name: "Timeline"
        // },
        {
            id: 3,
            name: "Calender"
        },
        // {
        //     id: 6,
        //     name: "Workflow"
        // },
        {
            id: 4,
            name: "Dashboard"
        },
        {
            id: 5,
            name: "Messages"
        },
        {
            id: 6,
            name: "Files"
        }
    ];

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////
    const [firestoreData, setFirestoreData] = useState<any>([]);
    const [status, setStatus] = useState<Boolean>(false);

    // let q = query(collection(db, "Data", "Projects", `${email}`));
    let q = query(collection(db, "Projects"));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // FOR GETTING PROJECT TITLE
    useEffect(() => {

        if (!loading && snapshot) {
            let localObj1: any;
            let localObj: any;

            let arrProjectsLocal = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            localObj1 = arrProjectsLocal;

            // Now only i need projects that are created by me means email is equal to signedInUserData.email
            // or that are shared with me means project members array contains signedInUserData.email

            // Filter the projects array and extract only those projects that are created by me
            // localObj = localObj.filter((project: any) => );

            // Filter the projects array and extract only those projects that are shared with me
            localObj1 = localObj1.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

            // Extract all the project members from the projects array

            let arrProjects = localObj1;
            for (let i = 0; i < arrProjects.length; i++) {
                // @ts-ignore
                if (arrProjects[i].id === projectID.toString()) {
                    localObj = arrProjects[i];
                    setFirestoreData(localObj);
                    setProjectTitle(localObj?.ProjectName);
                    setProjectMembers(localObj?.ProjectMembers);
                    break;
                }
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot, router.query]);
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
                    {projectMembers.map((member: any, index: number) => (
                        <Box key={index}>
                            <Tooltip title={member} arrow>
                                <Box
                                    sx={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        marginLeft: '-10px',
                                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                    }}
                                >
                                    {
                                        // Extracting the first letter and last letter of the name
                                        member.split(' ').map((item: any, index: number) => {
                                            if (index === 0 || index === member.split(' ').length - 1) {
                                                return item[0] + item[item.length - 1];
                                            }
                                            return null;
                                        })
                                    }
                                </Box>
                            </Tooltip>
                        </Box>
                    ))}
                    {/* projectMembers */}
                </div>
                <button className={`btn btn-primary ${styles.btn_share}`}>
                    <BsPeopleFill size={16} style={{ marginTop: 3 }} />
                    &nbsp;
                    Share
                </button>
            </div>
        </nav >
    )
}
export default HeaderProjectDetails;