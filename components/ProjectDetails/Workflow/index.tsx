import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.css';

// Importing Icons
import { AiOutlinePlus } from "react-icons/ai";
import { BsTriangle } from "react-icons/bs";
import { TbListDetails, TbSquareRotated } from "react-icons/tb";
import { SlLink } from "react-icons/sl";

import DatePicker from 'react-date-picker/dist/entry.nostyle';

const currentDate = new Date();

interface WorkflowProps {
    photoURL?: any
}

const Workflow: React.FC<WorkflowProps> = ({
    photoURL
}) => {

    return (
        <div className={styles.Contaienr}>
            <div className={styles.Header}>
                <h1>Workflow Header</h1>
            </div>
            <div className={styles.Body}>
                <h3>Workflow Body</h3>
                <br />
                <br />
            </div>
        </div>
    )
}
export default Workflow;