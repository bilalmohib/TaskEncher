import React, { useState, useEffect } from "react";

import {
    Box,
    Button,
    IconButton
} from "@mui/material";
import Image from 'next/image';
import Router from "next/router";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Importing Icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineBars } from 'react-icons/ai';
// Importing Styles
import styles from './widget3.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function,
    email: String,
    projectMembers: any,
}

const Widget1: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem,
    email,
    projectMembers
}) => {

    const [startX, setStartX] = useState(0);

    const [localProjectMembers, setLocalProjectMembers] = useState<any>([]);

    useEffect(() => {
        let localArray = [];

        let colors = [
            "navy",
            "midnightblue",
            "darkslateblue",
            "indigo",
            "purple",
            "darkmagenta",
            "darkviolet",
            "mediumblue",
            "steelblue",
            "royalblue",
            "cornflowerblue",
            "deepskyblue",
            "teal",
            "darkturquoise",
            "cadetblue",
            "slategray",
            "darkolivegreen",
            "forestgreen",
            "darkgreen",
            "mediumseagreen",
            "seagreen",
            "olivedrab",
            "darkgoldenrod",
            "goldenrod",
            "saddlebrown",
            "maroon",
            "firebrick",
            "crimson",
            "indianred",
            "brown",
            "darkred"
        ];

        for (let i = 0; i < projectMembers.length; i++) {

            let extractedName = projectMembers[i].split("@")[0];
            // Put spaces between words and capitalize first letter of first word
            extractedName = extractedName.replace(/([A-Z])/g, ' $1').replace(/^./, function (str: string) { return str.toUpperCase(); });

            localArray.push({
                id: Math.random(),
                email: projectMembers[i],
                name: extractedName,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                collaboratingTasks: Math.floor(Math.random() * 10)
            });
        }

        setLocalProjectMembers(localArray);
    }, [projectMembers]);

    // const peoplesList = [
    //     {
    //         id: 1,
    //         email: "bilalmohib7896@gmail.com",
    //         name: "Bilal Mohib",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 3
    //     },
    //     {
    //         id: 2,
    //         email: "mbilals9922@gmail.com",
    //         name: "Ammar Mohib",
    //         backgroundColor: "#b36bd4",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 3,
    //         email: "2019cs682@student.uet.edu.pk",
    //         name: "Edward Elric",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 4,
    //         email: "user2@email.com",
    //         name: "Ulquiorra Cifer",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 5,
    //         email: "bilalmohib7896@gmail.com",
    //         name: "Fawad Ahmed",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 3
    //     },
    //     {
    //         id: 6,
    //         email: "mbilals9922@gmail.com",
    //         name: "Ishfaq Ahmed",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 7,
    //         email: "2019cs682@student.uet.edu.pk",
    //         name: "Yasir Ayaz",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 8,
    //         email: "user2@email.com",
    //         name: "Ehsan Ali",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 9,
    //         email: "bilalmohib7896@gmail.com",
    //         name: "Waqas Ahmed",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 3
    //     },
    //     {
    //         id: 10,
    //         email: "mbilals9922@gmail.com",
    //         name: "Qasim Iqbal",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 11,
    //         email: "2019cs682@student.uet.edu.pk",
    //         name: "Omer Hayaat",
    //         backgroundColor: "#4573d2",
    //         collaboratingTasks: 0
    //     },
    //     {
    //         id: 12,
    //         email: "user2@email.com",
    //         name: "Ehsan Ali",
    //         backgroundColor: "#f44336",
    //         collaboratingTasks: 0
    //     }
    // ];


    return (
        <div className={styles.container}>
            <div className="d-flex">
                <h1>People</h1>
                {/* Secondary */}
                <div className="btn-group" style={{ fontSize: 12, height: 28, boxShadow: "none", marginTop: "-10px", marginLeft: 20 }}>
                    <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                        Top collaborators <IoMdArrowDropdown style={{ marginTop: -2 }} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Frequent collaborators</a></li>
                        <li><a className="dropdown-item" href="#">Recent collaborators</a></li>
                        <li><a className="dropdown-item" href="#">Favorite collaborators</a></li>
                    </ul>
                </div>
            </div>

            <section className={`${styles.peopleContainer} ${((item == currentFullLengthItem) && (styles.fullWidthWidget))}`}>
                <Box className={styles.peopleSliderContainer}>
                    <IconButton
                        sx={{
                            // Hide button when scroll is at left end
                            display: (
                                (document.querySelector(`.${styles.subContainer}`)?.scrollLeft == -900) ? "none" : "flex"
                            )
                        }}
                        aria-label="back"
                        color="success"
                        className={styles.leftPeopleSliderButton}
                        // onClick move scroll to left
                        onClick={() => {
                            const peopleSlider = document.querySelector(`.${styles.subContainer}`);
                            peopleSlider?.scrollBy(-900, 0);
                        }}
                    >
                        <ArrowBackIosIcon sx={{ textAlign: "center", marginLeft: 1 }} />
                    </IconButton>

                    <Box className={styles.subContainer}>
                        {
                            localProjectMembers.map((people: any, index: number) => {
                                return (
                                    <Box
                                        key={index}
                                        className={styles.peopleSlider}
                                        onClick={() => {
                                            Router.push(`/profile/${people.id}`);
                                        }}
                                    >
                                        <Box
                                            className={styles.peopleSliderItem}
                                        >
                                            <Box
                                                className={styles.peopleSliderItemImg}
                                                sx={{
                                                    backgroundColor: `${people.backgroundColor}`,
                                                    textTransform:"uppercase"
                                                }}
                                            >
                                                {people.name.charAt(0)}{people.name.charAt(people.name.indexOf(" ") + 1)}
                                                {/* {people.name} */}
                                            </Box>
                                            <Box className={styles.peopleSliderItemContent}>
                                                <h4 className="mt-4 pl-4 pr-0">{people.email}</h4>
                                            </Box>
                                            <p className={styles.infoContainer}>
                                                {(people.collaboratingTasks > 0) ? (
                                                    <>
                                                        Collaborating with me on {people.collaboratingTasks} of their tasks
                                                    </>
                                                ) : (
                                                    <>
                                                        Assign a task to start collaborating
                                                    </>
                                                )}
                                            </p>

                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: "#ffffff",
                                                    color: "#000000",
                                                    fontSize: 12,
                                                    fontWeight: 300,
                                                    textTransform: "none",
                                                    // borderRadius: 0,
                                                    // padding: "5px 10px",
                                                    border: "0.3px solid darkgrey",
                                                    marginTop: 1,
                                                    "&:hover": {
                                                        backgroundColor: "#f9f8f8",
                                                        border: "0.3px solid black"
                                                    }
                                                }}
                                                size="small"
                                            >
                                                {(people.collaboratingTasks > 0) ? (
                                                    <>
                                                        View profile
                                                    </>
                                                ) : (
                                                    <>
                                                        Assign task
                                                    </>
                                                )}
                                            </Button>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <IconButton
                        aria-label="forward"
                        color="success"
                        sx={{
                            // Hide button when scroll is at left end
                            display: (
                                (document.querySelector(`.${styles.subContainer}`)?.scrollLeft === 900) ? "none" : "flex"
                            )
                        }}
                        className={styles.rightPeopleSliderButton}
                        // onClick move scroll to right
                        onClick={() => {
                            const peopleSlider = document.querySelector(`.${styles.subContainer}`);
                            peopleSlider?.scrollBy(900, 0);
                        }}
                    >
                        <ArrowForwardIosIcon sx={{ textAlign: "center", marginLeft: 0.5 }} />
                    </IconButton>
                </Box>
            </section>
        </div>
    )
}
export default Widget1;