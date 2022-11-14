import React, { useState, useEffect } from 'react';
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

interface IProps {
    setIsOpen: any,
    isOpen: Boolean
}

const Sidebar: React.FC<IProps> = ({
    setIsOpen,
    isOpen
}) => {
    const [currentMenuItem, setCurrentMenuItem] = useState<Number>(1);

    return (
        <section className={`${styles.sidebar} ${(isOpen) ? ("") : (styles.hideSidebar)}`}>
            <div className={styles.sidebarItemsContainer}>
                <div className="btn-group shadow-0 mb-2 dropend">
                    <button type="button" className={`btn ${styles.btn_createSidebar} text-light`} data-mdb-toggle="dropdown" aria-expanded="false">
                        <AiOutlinePlus size={19} />
                        &nbsp; Create
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Task</a></li>
                        <li><a className="dropdown-item" href="#">Project</a></li>
                        <li><a className="dropdown-item" href="#">Message</a></li>
                        <li><a className="dropdown-item" href="#">Invite</a></li>
                    </ul>
                </div>
                <ul className={styles.SidebarMenuList}>
                    <li className={(currentMenuItem === 1) ? (styles.selected_Menu_Item) : ("")} onClick={() => setCurrentMenuItem(1)}>
                        <div className='d-flex'>
                            <p> <IoHomeOutline size={19} /> </p> <p className={styles.itemMenuListText}>Home</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 2) ? (styles.selected_Menu_Item) : ("")} onClick={() => setCurrentMenuItem(2)}>
                        <div className='d-flex'>
                            <p> <BsCheckCircle size={19} /> </p> <p className={styles.itemMenuListText}>My Tasks</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 3) ? (styles.selected_Menu_Item) : ("")} onClick={() => setCurrentMenuItem(3)}>
                        <div className='d-flex'>
                            <p> <BsBell size={19} /> </p> <p className={styles.itemMenuListText}>Inbox</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 4) ? (styles.selected_Menu_Item) : ("")} onClick={() => setCurrentMenuItem(4)}>
                        <div className='d-flex'>
                            <p> <BiStats size={19} /> </p> <p className={styles.itemMenuListText}>Reporting</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 5) ? (styles.selected_Menu_Item) : ("")} onClick={() => setCurrentMenuItem(5)}>
                        <div className='d-flex'>
                            <p> <HiChartSquareBar size={19} /> </p> <p className={styles.itemMenuListText}>Portfolios</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 6) ? (styles.selected_Menu_Item) : ("")} onClick={() => setCurrentMenuItem(6)}>
                        <div className='d-flex'>
                            <p> <GiStairsGoal size={19} /> </p> <p className={styles.itemMenuListText}>Goals</p>
                        </div>
                    </li>
                </ul>
                {/* Workspace Section */}
                <section className={styles.workSpaceBlock}>
                    <div className={`${styles.worspace_text_block} d-flex justify-content-between`} style={{paddingRight:20}}>
                        <p style={{fontSize:15 ,letterSpacing:1,paddingLeft:20,paddingTop:5,fontWeight:"350"}}>My Workspace</p>
                        <p style={{marginTop:5,paddingRight:10}}><FiPlus size={17} /></p>
                    </div>
                </section>
                {/* Workspace Section */}
            </div>

        </section>
    )
}
export default Sidebar;