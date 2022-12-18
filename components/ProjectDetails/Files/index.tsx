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

interface FilesProps {
    photoURL?: any
}

const Files: React.FC<FilesProps> = ({
    photoURL
}) => {

    return (
        <div className={styles.Contaienr}>
            <div className={styles.Header}>
                <h1>Files Header</h1>
            </div>
            <div className={styles.Body}>
                <h3>Files Body</h3>
                <br />
                <br />
            </div>
        </div>
    )
}
export default Files;