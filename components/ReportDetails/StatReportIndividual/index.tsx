import React from 'react';

import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

interface StatReportIndividualProps {
    reportTitle: string;
    reportValue: string;
    reportIcon: string;
    reportColor: string;
}

const StatReportIndividual: React.FC<StatReportIndividualProps> = ({
    reportTitle,
    reportValue,
    reportIcon,
    reportColor
}) => {
    return (
        <Card
            sx={{
                height: "80%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 0px",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: reportColor,
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                >
                    {reportIcon}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "25px",
                        fontWeight: 400,
                        color: "#000",
                        textAlign: "center",
                        marginBottom: "10px",
                        // Apply the fontfamily =  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
                    }}
                >

                    {reportTitle}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 48,
                        fontWeight: 400,
                        color: "black",
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                >
                    {reportValue}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatReportIndividual;