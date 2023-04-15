import React from 'react';

import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

interface GraphReportIndividualProps {
    reportTitle: string;
    reportData: any;
    graphType: string;
    reportColor: string;
    reportDescription: string;
}

const GraphReportIndividual: React.FC<GraphReportIndividualProps> = ({
    reportTitle,
    reportData,
    graphType,
    reportColor,
    reportDescription
}) => {
    return (
        <Card
            sx={{
                height: "auto",
                borderRadius: 1,
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                backgroundColor: "#fff",
                padding: "20px 0px",
            }}
        >
            <CardContent
                sx={{
                    border: "1px solid red",
                }}
            >
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
                        fontSize: 14,
                        fontWeight: 400,
                        color: reportColor,
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                >
                    {reportDescription}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default GraphReportIndividual;