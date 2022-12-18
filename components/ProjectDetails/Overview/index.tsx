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

interface OverviewProps {
    photoURL: any
}

const Overview: React.FC<OverviewProps> = ({
    photoURL
}) => {

    const [taskDue, setTaskDue] = useState<any>(currentDate);

    const [descriptionText, setDescriptionText] = useState<string>(`
        Welcome your team and set the tone for how you’ll work together in Asana. Add
        meeting details, communication channels, and any other information that will help.
    `);

    return (
        <div className={styles.OverviewContainer}>
            <div>
                <h3 contentEditable={true} className={styles.headingCollaborate}>
                    How we&apos;ll collaborate
                </h3>
                <div
                    contentEditable={true}
                    className={styles.descriptionHowCollaborate}
                    onMouseOut={
                        () => setDescriptionText(
                            `Welcome your team and set the tone for how you’ll work together in Asana. Add
                                        meeting details, communication channels, and any other information that will help.`
                        )
                    }
                    onClick={
                        () => setDescriptionText(
                            (
                                descriptionText ===
                                `Welcome your team and set the tone for how you’ll work together in Asana. Add
                                                    meeting details, communication channels, and any other information that will 
                                                    help.`) ?
                                ("") :
                                (descriptionText)
                        )
                    }
                    onChange={(e: any) => setDescriptionText(e)}
                >
                    {descriptionText}
                </div>

                {/* Project Roles */}
                <h3 className={styles.headingOverView}>
                    Project roles
                </h3>
                <div>
                    <div className={styles.projectRolesContainer}>
                        {
                            [
                                {
                                    id: 1,
                                    projectRole: "Project Owner",
                                    name: "Muhammad Bilal",
                                    photoURL: photoURL
                                },
                                {
                                    id: 2,
                                    projectRole: "Project Owner",
                                    name: "Muhammad Bilal",
                                    photoURL: photoURL
                                },
                                {
                                    id: 3,
                                    projectRole: "+ Add Role",
                                    name: "Muhammad Bilal",
                                    photoURL: photoURL
                                },
                                {
                                    id: 4,
                                    projectRole: "+ Add Role",
                                    name: "Muhammad Bilal",
                                    photoURL: photoURL
                                },
                                {
                                    id: 5,
                                    projectRole: "+ Add Role",
                                    name: "Muhammad Bilal",
                                    photoURL: photoURL
                                },
                                {
                                    id: 6,
                                    projectRole: "+ Add Role",
                                    name: "Muhammad Bilal",
                                    photoURL: photoURL
                                }
                            ].map((value: any, index: any) => (
                                <div key={index}>
                                    {(index == 0) ? (
                                        <div className={styles.individualProjectRolesContainer}>
                                            <div className={styles.imageAddNewRole}>
                                                <AiOutlinePlus color='black' />
                                            </div>
                                            <h3 className={styles.addMemberText}>Add member</h3>
                                        </div>
                                    ) : (
                                        <div className={styles.individualProjectRolesContainerSeparate}>
                                            <div className={styles.imageRoleMember}>
                                                <Image
                                                    src={photoURL}
                                                    alt={value.projectRole}
                                                    width={36}
                                                    height={36}
                                                    loading="eager"
                                                    title={value.projectRole}
                                                    style={{ borderRadius: "50%" }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className={styles.memberText}>{value.name}</h3>
                                                <h3 className={styles.projectRoleText}>{value.projectRole}</h3>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Connected Goals */}
                <h3 className={styles.headingOverView}>
                    Connected Goals
                </h3>
                <div className={styles.goalsContainer}>
                    <div className={styles.leftContainerGoals}>
                        <Image
                            src={"/shooting_target.svg"}
                            alt="Goal"
                            width={96}
                            height={96}
                            loading="eager"
                            title="Goal"
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                    <div className={styles.rightContainerGoals}>
                        <p>
                            Connect or create a goal to link this project to a <br /> larger purpose.
                        </p>
                        <button type="button" className="btn btn-outline-primary d-flex" data-mdb-ripple-color="dark"> <div style={{ marginTop: -2, marginRight: 5 }}><BsTriangle /></div> Add Goal </button>
                    </div>
                </div>

                {/* Key resources */}
                <h3 className={styles.headingOverView}>
                    Key resources
                </h3>
                <div className={styles.krContainer}>
                    <div className={styles.leftContainerkr}>
                        <Image
                            src={"/key_resources.svg"}
                            alt="key resources"
                            width={160}
                            height={160}
                            loading="eager"
                            title="key resources"
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                    <div className={styles.rightContainerkr}>
                        <p>
                            Align your team around a shared vision with a <br /> project brief and supporting resources.
                        </p>
                        <div className="d-flex" style={{ marginLeft: "15%" }}>
                            <button type="button" className="btn btn-outline-primary d-flex" data-mdb-ripple-color="dark"> <div style={{ marginTop: -2, marginRight: 5 }}><TbListDetails /></div> Create Project Brief </button>
                            <button type="button" style={{ marginLeft: "4%" }} className="btn btn-outline-primary d-flex" data-mdb-ripple-color="dark"> <div style={{ marginTop: -2, marginRight: 5 }}><SlLink /></div> Add links & files </button>
                        </div>
                    </div>
                </div>

                {/* Key resources */}
                <h3 className={`d-flex ${styles.headingOverView}`}>
                    Milestones <p> &nbsp;+</p>
                </h3>
                <div className={styles.milestonesContainer}>
                    {
                        [
                            {
                                id: 1,
                                name: "To Start the Development",
                                dueDate: "3 Jun 2022"
                            },
                            {
                                id: 2,
                                name: "Complete the project",
                                dueDate: "3 March 2020"
                            },
                            {
                                id: 3,
                                name: "Complete the Whole Project",
                                dueDate: "16 Sep 2018"
                            }
                        ].map((value: any, index: any) => {
                            return (
                                <div className={styles.individualMileStonesContainer} key={index}>
                                    <div className="d-flex">
                                        <TbSquareRotated size={20} style={{ marginTop: 2 }} color='#58a182' />
                                        <p style={{ marginLeft: 5 }}>{value.name}</p>
                                    </div>
                                    <div >
                                        <DatePicker
                                            onChange={setTaskDue}
                                            value={new Date(value.dueDate)}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <br />
            </div>
        </div>
    )
}
export default Overview;