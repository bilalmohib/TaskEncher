import React from 'react';

import ReportDetailsInsideContent from '@app/components/ReportDetails/ReportDetailsInsideContent';

import { Button } from '@mui/material';

import { AiOutlinePlus } from 'react-icons/ai';

import styles from './style.module.css';

interface DashboardProps {
    photoURL?: any
}

const Dashboard: React.FC<DashboardProps> = ({
    photoURL
}) => {

    return (
        <div className={styles.Contaienr}>
            <div className='-z-20 pl-5 border-t-[1px] border-[#edebea] border-b-[1px] border-solid w-[100%]'>
                <Button
                    variant="contained"
                    className="mt-3 mb-3"
                    style={{
                        backgroundColor: "#4573d2",
                        color: "#ffffff",
                        fontWeight: 400,
                        fontSize: 14,
                        textTransform: "none",
                        borderRadius: 5,
                        padding: "10px 20px",
                        boxShadow: "none",
                        height: "35px",
                        position:"relative",
                        zIndex: "-100 !important",
                    }}
                >
                    <AiOutlinePlus className="mr-2" />
                    Add Chart
                </Button>
            </div>
            <ReportDetailsInsideContent
                isOpen={true}
                showHeader={false}
                reportID={"reportID"}
                reportName={"reportName"}
            />
        </div>
    )
}
export default Dashboard;