import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GiCircle, GiPlainCircle } from 'react-icons/gi';
import { IoIosArrowDown } from 'react-icons/io';
import { BsPeopleFill, BsPencil } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

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
    Typography
} from "@mui/material";

import styles from './style.module.css';

interface IProps {
    reportID: any,
    email: string,
    reportName: any,
    photoURL: string,
}

const HeaderReportDetails: React.FC<IProps> = ({
    photoURL,
    reportName,
    email,
    reportID
}) => {

    const router = useRouter();

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

    // FOR GETTING REPORT TITLE
    useEffect(() => {

        if (!loading && snapshot && email) {
            let localObj;
            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            for (let i = 0; i < arrProjects.length; i++) {
                if (arrProjects[i].id === reportID.toString()) {
                    localObj = arrProjects[i];
                }
            }
            setFirestoreData(localObj);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING REPORT TITLE

    return (
        <nav className={styles.container}>
            <div className={styles.leftSide}>
                <div className='d-flex'>
                    <ProjectIcon
                        h={48}
                        w={48}
                        IconSize={35}
                        Color="white"
                        // BGC={firestoreData?.color_code}
                        BGC={"#4573d2"}
                    />
                    <div className="ml-5">
                        <p
                            onClick={() => router.back()}
                            className='cursor-pointer text-'
                            style={{
                                fontSize: 15,
                                lineHeight: 1
                            }}
                        >
                            Reporting &gt;
                        </p>
                        <h3 className={`${styles.headingProject}`}>
                            {reportName}
                        </h3>
                    </div>
                    <div>
                        <div>
                            <a data-mdb-toggle="dropdown" aria-expanded="false" style={{ alignItems: "center", display: "flex", justifyContent: "center", boxShadow: "none", paddingTop: 2, cursor: "pointer" }}>
                                <IoIosArrowDown
                                    className={styles.arrowIcon}
                                />
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item flex h-10" href="#"><p className='w-5 h-5 mt-[2px]'><BsPencil style={{ fontSize: 18 }} /></p> <p className='mt-[1px] ml-2'>Edit dashboard details</p></a></li>
                                <li><a className="dropdown-item flex h-10" href="#"> <p className='w-5 h-5 mt-[2px] bg-[#4573d2]'></p> <p className='mt-[1px] ml-3'>Set Color & icon</p> </a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#" onClick={() => alert("Delete Dashboard")}><span className='text-red-600'>Delete dashboard</span></a></li>
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
export default HeaderReportDetails;