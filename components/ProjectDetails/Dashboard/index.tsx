import React, { useState, useEffect, useRef } from "react";

import ReportDetailsInsideContent from "@app/components/ReportDetails/ReportDetailsInsideContent";

// Styles
import styles from './style.module.css';
import ReportDetailsInside2 from "./ReportDetailsInside2";
interface DashboardProps {
    email: any,
}

const Dashboard: React.FC<DashboardProps> = ({
    email
}) => {

    return (
        <div className={styles.Contaienr}>
            {/* <div className='-z-20 pl-5 border-t-[1px] border-[#edebea] border-b-[1px] border-solid w-[100%]'>
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
            </div> */}
            <ReportDetailsInside2
                isOpen={true}
                showHeader={false}
                reportID={"reportID"}
                reportName={"reportName"}
                email={email.toString()}
            />
        </div>
    )
}
export default Dashboard;