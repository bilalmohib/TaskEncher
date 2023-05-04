import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
//Importing icons
import { AiOutlinePlus } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { BsCheckCircle, BsFillPeopleFill } from "react-icons/bs";
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

// MenuItem.ts
interface MenuItem {
    id: number;
    label: string;
    icon: any;
    path?: string;
    onClick?: () => void;
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

    useEffect(() => {
        if (router.pathname === '/profile/[email]') {
            setCurrentMenuItem(6);
        }
    }, [router.pathname]);

    // Store div in a variable

    const menuItems: MenuItem[] = [
        { id: 1, label: 'Home', icon: <IoHomeOutline size={22} /> },
        { id: 2, label: 'My Tasks', icon: <BsCheckCircle size={22} /> },
        { id: 3, label: 'Team', icon: <BsFillPeopleFill size={19} /> },
        { id: 4, label: 'Inbox', icon: <BsBell size={22} /> },
        { id: 5, label: 'Reporting', icon: <BiStats size={22} /> },
        { id: 6, label: 'Profile', icon: <HiChartSquareBar size={22} />, path: `/profile/${email}` },
        { id: 7, label: 'Notifications', icon: <BsBell size={19} /> },
    ];

    // Change menu Item Function
    const handleChangeMenuItem = (item: MenuItem) => {
        // if (item.path) {
        //     router.push(item.path);
        // } else if (item.onClick) {
        //     setCurrentMenuItem(item.id);
        // }

        if (router.pathname === '/projectDetails/[email]/[projectName]/[projectID]') {
            router.push(`/dashboard/${email}`);
            setCurrentMenuItem(item.id);
        };

        // For Report Details Page
        if (router.pathname === '/reportDetails/[reportName]/[reportID]') {
            router.push(`/dashboard/${email}`);
            setCurrentMenuItem(item.id);
        };

        if (router.pathname === '/dashboard/[email]') {
            if (item.id === 6) {
                router.push(`/profile/${email}`);
            }
            setCurrentMenuItem(item.id);
        };

        if (router.pathname === '/profile/[email]' && item.id !== 6) {
            router.push(`/dashboard/${email}`);
            setCurrentMenuItem(item.id);
        };
    };

    return (
        <section className={`${styles.sidebar} ${(isOpen) ? ("") : (styles.hideSidebar)}`}>
            <div className={styles.sidebarItemsContainer}>
                <div className="btn-group shadow-0 mb-2 dropend">
                    <button type="button" className={`btn ${styles.btn_createSidebar} text-light`} data-mdb-toggle="dropdown" aria-expanded="false">
                        <Tooltip title="Create a New Project">
                            <div>
                                <AiOutlinePlus size={19} />
                                &nbsp; Create
                            </div>
                        </Tooltip>
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

                {/* Menu Items */}
                <ul className={styles.SidebarMenuList}>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={currentMenuItem === item.id ? styles.selected_Menu_Item : ''}
                            onClick={() => handleChangeMenuItem(item)}
                        >
                            <Tooltip title={item.label}>
                                <div className="d-flex">
                                    <p>
                                        {item.icon}
                                    </p>
                                    <p className={styles.itemMenuListText}>{item.label}</p>
                                </div>
                            </Tooltip>
                        </li>
                    ))}
                </ul>

                {/* Workspace Section */}
                <section className={styles.workSpaceBlock}>
                    <div className={`${styles.worspace_text_block} d-flex justify-content-between`} style={{ paddingRight: 20 }}
                        onClick={
                            () => router.push('/createProject')
                        }
                    >
                        <p style={{ fontSize: 15, letterSpacing: 1, paddingLeft: 20, paddingTop: 5, fontWeight: "350" }}>My Workspace</p>
                        <Tooltip
                            title="Create Project Now By Clicking This Button"
                            sx={{
                                cursor: "pointer"
                            }}
                        >
                            <p
                                style={{ marginTop: 5, paddingRight: 10 }}
                            >
                                <FiPlus size={17} />
                            </p>
                        </Tooltip>
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
                                                <Tooltip
                                                    title={`Click to Open Project Details for Project: ${v.ProjectName}`}
                                                    sx={{
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <div className={`${styles.projectListContainer} d-flex justify-content-between`}>
                                                        <p className={styles.projectName}><CgShapeSquare style={{ marginTop: -1.5 }} color={"#9ee7e3"} size={10} /> &nbsp; {v.ProjectName}</p>
                                                        <p style={{ marginTop: 2.5 }}><GoTriangleDown fontWeight={300} size={12} color='white' /></p>
                                                    </div>
                                                </Tooltip>
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
                    <Tooltip title="Invite Members to Start Collaboration With Them. Press this button to invite Members to your projects.">
                        <div className={styles.sidebarFooterContainer}>
                            <p>
                                {/* <FcInvite size={25} style={{ marginTop: 2 }} /> */}
                                <Image
                                    src="/images/Sidebar/inviteUser.png"
                                    width={25}
                                    height={25}
                                    alt="Invite Members"
                                    loading='eager'
                                />
                            </p>
                            <p style={{ marginTop: 1, marginLeft: 10 }} className={styles.inviteMember} onClick={() => setIsModalOpen(true)}>Invite Members</p>
                        </div>
                    </Tooltip>
                </div>
                {/* Invite Members Section */}
            </div >
        </section >
    )
}
export default Sidebar;