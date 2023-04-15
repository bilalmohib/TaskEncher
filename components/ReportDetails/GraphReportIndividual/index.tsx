import React from 'react';

import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

// importing Chart components
import Line from '@app/components/ReportDetails/GraphReportIndividual/Charts/Line';
import Bar from '@app/components/ReportDetails/GraphReportIndividual/Charts/Bar';

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
                borderRadius: "10px",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                backgroundColor: "#fff",
                padding: "20px 0px",
                maxHeight: "500px",
                overflow: "auto",
                minHeight: "500px"
            }}
        >
            <CardContent
            // sx={{
            //     border: "1px solid red",
            // }}
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

                {(graphType === "line") ? (
                    <Line />
                ) :
                    (graphType === "bar") ? (
                        <Bar />
                    ) :
                        (graphType === "pie") ? (
                            <div>
                                <p>Pie Graph</p>
                            </div>
                        ) :
                            (graphType === "radar") ? (
                                <div>
                                    <p>Radar Graph</p>
                                </div>
                            ) :
                                (graphType === "polarArea") ? (
                                    <div>
                                        <p>Polar Area Graph</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Graph Type Not Found</p>
                                    </div>
                                )}
            </CardContent>
        </Card>
    );
};

export default GraphReportIndividual;