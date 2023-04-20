import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Importing Icons
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';

import StatReportIndividual from '@app/components/ReportDetails/StatReportIndividual';
import GraphReportIndividual from '@app/components/ReportDetails/GraphReportIndividual';
import ReportDetailsInsideContent from '@app/components/ReportDetails/ReportDetailsInsideContent';

// Importing Styles
import styles from './style.module.css';

interface ReportDetailsProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentMenuItem: number;
    setCurrentMenuItem: (value: number) => void;
    signedInUserData: { email: string };
    width: number;
    height: number;
}

const ReportDetails: React.FC<ReportDetailsProps> = (
    {
        isOpen,
        setIsOpen,
        currentMenuItem,
        setCurrentMenuItem,
        signedInUserData,
        width,
        height
    }) => {
    const router = useRouter();
    const { reportName, reportID } = router.query;

    return (
        <div>
            <Head>
                <title>Reporting - TaskEncher (Supercharge Your Workflow and Amplify Task Management) </title>
                <meta charSet="utf-8" lang='en' />
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="d-flex">
                    {/* <Sidebar
                        currentMenuItem={currentMenuItem}
                        setCurrentMenuItem={setCurrentMenuItem}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    /> */}

                    <div style={{ marginTop: 70 }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                        <ReportDetailsInsideContent
                            isOpen={isOpen}
                            showHeader={true}
                            reportID={reportID}
                            reportName={reportName}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
export default ReportDetails;
