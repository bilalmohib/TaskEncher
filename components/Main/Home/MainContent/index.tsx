import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
// Importing Components
import Home from '@app/components/Main/Home';
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';
import Inbox from '@app/components/Main/Inbox';

// Importing Material UI Components
import {
    Box
} from '@mui/material';

import styles from "../../../../styles/Home.module.css";

interface MainContentProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentMenuItem: number;
    setCurrentMenuItem: (value: number) => void;
    signedInUserData: { email: string };
}

const MainContent: React.FC<MainContentProps> = ({ isOpen, setIsOpen, currentMenuItem, setCurrentMenuItem, signedInUserData }) => {
    return (
        <main className={styles.main}>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="d-flex">
                <Sidebar currentMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem} isOpen={isOpen} setIsOpen={setIsOpen} />

                <div style={{ marginTop: 70 }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                    {/* Home Page */}
                    <section className={currentMenuItem === 1 ? '' : 'd-none'}>
                        <Home />
                    </section>

                    {/* My Tasks Page */}
                    <section className={currentMenuItem === 2 ? '' : 'd-none'}>
                        <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>My Tasks</h3>
                    </section>

                    {/* Inbox Page */}
                    <section className={currentMenuItem === 3 ? '' : 'd-none'}>
                        <Inbox email={signedInUserData.email} />
                    </section>

                    {/* Reporting Page */}
                    <section className={currentMenuItem === 4 ? '' : 'd-none'}>
                        <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>Reporting</h3>
                    </section>

                    {/* Portfolios Page */}
                    <section className={currentMenuItem === 5 ? '' : 'd-none'}>
                        <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>Portfolios</h3>
                    </section>

                    {/* Goals Page */}
                    <section className={currentMenuItem === 6 ? '' : 'd-none'}>
                        <br />
                        <h3 style={{ marginLeft: 30, marginTop: 5, color: 'black', fontWeight: 'lighter' }}>Goals</h3>
                    </section>
                </div>
            </div>
        </main>
    );
};
export default MainContent;