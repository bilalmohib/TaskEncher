import { useEffect } from "react"
import { Chart } from "chart.js";

interface DoughnutChartProps {
                        reportID: string;
    reportData: any
}

const Doughnut: React.FC<DoughnutChartProps> = ({
    reportID,
    reportData
}) => {
    useEffect(() => {
        // @ts-ignore
        var ctx = document.getElementById(reportID).getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: reportData,
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },

        });
    }, [])


    return (
        <div className="mt-10">
            {/* Doughnut Chart */}
            <div className="w-auto flex mx-auto my-auto">
                <div className="pt-0 rounded-xl w-full h-fit my-auto">
                    <canvas id={reportID}></canvas>
                </div>
            </div>
        </div>
    )
}

export default Doughnut;