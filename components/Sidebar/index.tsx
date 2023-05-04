import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
//Importing icons
import { AiOutlinePlus } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BiStats } from "react-icons/bi";
import { HiChartSquareBar } from "react-icons/hi";
import { GiStairsGoal } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoTriangleDown } from "react-icons/go";
import { CgShapeSquare } from "react-icons/cg";
import { FcInvite } from "react-icons/fc";
import { useRouter } from 'next/router';

import {
    Box,
    Tooltip
} from "@mui/material";
import colors from '@app/lib/colors';

interface IProps {
    setIsOpen: any,
    isOpen: Boolean,
    currentMenuItem: Number,
    setCurrentMenuItem: any,
    projectMembers: string[],
    email: any,
    projectList: any,
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;

    // Optional Add Task Modal
    setIsAddTaskModalOpen?: (value: boolean) => void;
}

const Sidebar: React.FC<IProps> = ({
    setIsOpen,
    isOpen,
    currentMenuItem,
    setCurrentMenuItem,
    projectMembers,
    email,
    projectList,
    isModalOpen,
    setIsModalOpen,
    // Optional Add Task Modal
    setIsAddTaskModalOpen
}) => {
    const router = useRouter();

    const movingUrl = `/dashboard/${email}`;

    // Store div in a variable

    return (
        <section className={`${styles.sidebar} ${(isOpen) ? ("") : (styles.hideSidebar)}`}>
            <div className={styles.sidebarItemsContainer}>
                <div className="btn-group shadow-0 mb-2 dropend">
                    <button type="button" className={`btn ${styles.btn_createSidebar} text-light`} data-mdb-toggle="dropdown" aria-expanded="false">
                        <AiOutlinePlus size={19} />
                        &nbsp; Create
                    </button>
                    <ul className="dropdown-menu" style={{ position: "relative", zIndex: "2000 !important", background: "#ffffff" }}>
                        {(router.pathname === '/projectDetails/[email]/[projectName]/[projectID]') && (
                            <li
                                onClick={
                                    () => {
                                        //@ts-ignore
                                        setIsAddTaskModalOpen(true);
                                    }}
                            >
                                <a
                                    className="dropdown-item"
                                    href="#"
                                >
                                    Task
                                </a>
                            </li>
                        )}
                        <li onClick={() => router.push('/createProject')}><a className="dropdown-item" href="#">Project</a></li>
                        <li><a className="dropdown-item" href="#">Message</a></li>
                        <li
                            onClick={
                                () => {
                                    setIsModalOpen(true);
                                }
                            }
                        ><a className="dropdown-item" href="#">Invite</a></li>
                    </ul>
                </div>
                <ul className={styles.SidebarMenuList}>
                    <li className={(currentMenuItem === 1) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(1)
                            router.push(movingUrl);
                        }}
                    >
                        <div className='d-flex'>
                            <p> <IoHomeOutline size={22} /> </p> <p className={styles.itemMenuListText}>Home</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 2) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(2)
                            router.push(movingUrl);
                        }}
                    >
                        <div className='d-flex'>
                            <p> <BsCheckCircle size={22} /> </p> <p className={styles.itemMenuListText}>My Tasks</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 3) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(3)
                            router.push(movingUrl);
                        }}
                    >
                        <div className='d-flex'>
                            <p> <BsBell size={22} /> </p> <p className={styles.itemMenuListText}>Inbox</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 4) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(4)
                            router.push(movingUrl);
                        }}
                    >
                        <div className='d-flex'>
                            <p> <BiStats size={22} /> </p> <p className={styles.itemMenuListText}>Reporting</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 5) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(5)
                            // router.push(movingUrl);
                            router.push(`/profile/${email}`)
                        }}
                    >
                        <div className='d-flex'>
                            <p> <HiChartSquareBar size={22} /> </p> <p className={styles.itemMenuListText}>
                                {/* Portfolios */}
                                Profile
                            </p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 6) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(6)
                            router.push(movingUrl);
                        }}
                    >
                        <div className='d-flex'>
                            <p> <BsBell size={19} /> </p> <p className={styles.itemMenuListText}>Notifications</p>
                        </div>
                    </li>
                </ul>
                {/* Workspace Section */}
                <section className={styles.workSpaceBlock}>
                    <div className={`${styles.worspace_text_block} d-flex justify-content-between`} style={{ paddingRight: 20 }}>
                        <p style={{ fontSize: 15, letterSpacing: 1, paddingLeft: 20, paddingTop: 5, fontWeight: "350" }}>My Workspace</p>
                        <p
                            style={{ marginTop: 5, paddingRight: 10 }}
                            onClick={
                                () => router.push('/createProject')
                            }
                        >
                            <FiPlus size={17} />
                        </p>
                    </div>

                    {/* Project Members */}
                    <section>
                        <ul className={styles.projectMembersBlock}>
                            {(email !== null) && (
                                <>
                                    {projectMembers.map((v: any, i: number) => {
                                        return (
                                            <li key={i}>
                                                <Tooltip title={v}>
                                                    <Box
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                            borderRadius: "50%",
                                                            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            fontSize: 12,
                                                            fontWeight: "lighter",
                                                            color: "#fff"
                                                        }}
                                                    >
                                                        {
                                                            // Extract the first and last letter of the members name i.e v
                                                            v?.charAt(0).toUpperCase() + v?.charAt(v?.length - 1).toUpperCase()
                                                        }
                                                    </Box>
                                                </Tooltip>
                                            </li>
                                        )
                                    })}
                                </>
                            )}
                        </ul>
                    </section>
                    {/* Project Members */}

                    {/* Projects Block */}
                    <section className="mt-8">
                        <ul className={styles.projectListCoverContainer}>
                            {(email !== null) && (
                                <>
                                    {projectList.map((v: any, i: number) => {
                                        return (
                                            <li key={i}
                                                onClick={() => {
                                                    router.push(`/projectDetails/${email}/${v.ProjectName}/${v.id}`)
                                                    setTimeout(() => {
                                                        router.reload();
                                                    }, 1000);
                                                }}
                                            >
                                                <div className={`${styles.projectListContainer} d-flex justify-content-between`}>
                                                    <p className={styles.projectName}><CgShapeSquare style={{ marginTop: -1.5 }} color={"#9ee7e3"} size={10} /> &nbsp; {v.ProjectName}</p>
                                                    <p style={{ marginTop: 2.5 }}><GoTriangleDown fontWeight={300} size={12} color='white' /></p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </>
                            )}
                        </ul>
                    </section>
                    {/* Projects Block */}
                </section>
                {/* Workspace Section */}

                {/* Invite Members Section */}
                <div className={styles.sidebarFooter}>
                    <div className={styles.sidebarFooterContainer}>
                        <p><FcInvite size={25} style={{ marginTop: 2 }} /></p>
                        <p style={{ marginTop: 1, marginLeft: 10 }} className={styles.inviteMember} onClick={() => setIsModalOpen(true)}>Invite Members</p>
                    </div>
                </div>
                {/* Invite Members Section */}
            </div>
        </section>
    )
}
export default Sidebar;