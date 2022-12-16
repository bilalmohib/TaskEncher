import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GiCircle, GiPlainCircle } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import styles from './style.module.css';

import ProjectIcon from '../ProjectIcon';

import {
    CircularProgress,
    Box,
    Typography,
    Link,
} from "@mui/material";

interface IProps {
    // setIsOpen?: any,
    // isOpen?: Boolean
    photoURL: any,
}

const HeaderProjectDetails: React.FC<IProps> = ({
    // setIsOpen,
    // isOpen
    photoURL
}) => {

    const router = useRouter();

    const tabItems = [
        {
            id:1,
            name:"OverView"
        },
        {
            id:2,
            name:"List"
        },
        
    ]

    const [selectedTabItem, setSelectedTabItem] = useState<Number>(1);

    return (
        <nav className={styles.container}>
            <div className={styles.leftSide}>
                <div className='d-flex'>
                    <ProjectIcon
                        h={48}
                        w={48}
                        IconSize={35}
                        Color="white"
                    />
                    <h3 className={styles.headingProject}>
                        Software Development
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
                    <li className={(selectedTabItem == 1) ? (styles.selectedTabItem) : ("")} onClick={() => setSelectedTabItem(1)}>
                        OverView
                    </li>
                    <li>
                        List
                    </li>
                    <li>
                        Board
                    </li>
                    <li>
                        Timeline
                    </li>
                    <li>
                        Calender
                    </li>
                    <li>
                        Workflow
                    </li>
                    <li>
                        Dashboard
                    </li>
                    <li>
                        Messages
                    </li>
                    <li>
                        Files
                    </li>
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
                    <BsPeopleFill size={16} style={{ marginTop: 2 }} />
                    &nbsp;
                    Share
                </button>
            </div>
        </nav>
    )
}
export default HeaderProjectDetails;