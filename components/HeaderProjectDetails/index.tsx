import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RiArrowDropDownLine } from 'react-icons/ri';
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
}

const HeaderProjectDetails: React.FC<IProps> = ({
    // setIsOpen,
    // isOpen
}) => {

    const router = useRouter();

    return (
        <nav className={styles.container}>
            <div className={styles.leftSide}>
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
                        Set status <RiArrowDropDownLine size={30} />
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
            <div className={styles.rightSide}>
                Right Side
            </div>
        </nav>
    )
}
export default HeaderProjectDetails;