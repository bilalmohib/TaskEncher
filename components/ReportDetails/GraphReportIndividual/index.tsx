import React from 'react';

import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

// importing Chart components
import Line from '@app/components/ReportDetails/GraphReportIndividual/Charts/Line';
import Bar from '@app/components/ReportDetails/GraphReportIndividual/Charts/Bar';
import Doughnut from './Charts/Doughnut';
import Radar from './Charts/Radar';

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
                padding: "10px 0px",
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
                        fontSize: "20px",
                        fontWeight: 400,
                        color: "#000",
                        textAlign: "left",
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
                        // color: reportColor,
                        color: "#000",
                        textAlign: "left",
                        marginBottom: "10px",
                    }}
                >
                    {reportDescription}
                </Typography>

                {(graphType === "line") ? (
                    <Line
                        reportData={reportData}
                    />
                ) :
                    (graphType === "bar") ? (
                        <Bar
                            reportData={reportData}
                        />
                    ) :
                        (graphType === "pie") ? (
                            <div>
                                <p>Pie Graph</p>
                            </div>
                        ) :
                            (graphType === "radar") ? (
                                <Radar
                                    reportData={reportData}
                                />
                            ) :
                                (graphType === "doughnut") ? (
                                    <Doughnut
                                        reportData={reportData}
                                    />
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
