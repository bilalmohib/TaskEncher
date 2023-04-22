import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.css';

// Importing Icons
import { AiOutlinePlus } from "react-icons/ai";
import { BsTriangle } from "react-icons/bs";
import { TbListDetails, TbSquareRotated } from "react-icons/tb";
import { SlLink } from "react-icons/sl";

// import DatePicker from 'react-date-picker/dist/entry.nostyle';

const currentDate = new Date();

interface TimelineProps {
    photoURL?: any
}

const Timeline: React.FC<TimelineProps> = ({
    photoURL
}) => {

    return (
        <div className={styles.Contaienr}>
            <div className={styles.Header}>
                <h1>Timeline Header</h1>
            </div>
            <div className={styles.Body}>
                <h3>Timeline Body</h3>
                <br />
                <br />
            </div>
        </div>
    )
}
export default Timeline;