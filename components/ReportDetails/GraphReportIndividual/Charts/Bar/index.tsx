import { useEffect } from "react"
import { Chart } from "chart.js";

interface BarChartProps {
                        reportID: string;
    reportData: any
}

const Bar: React.FC<BarChartProps> = ({
    reportID,
    reportData
}) => {
    useEffect(() => {
        //@ts-ignore
        let ctx = document.getElementById(reportID).getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: reportData,
        });
    }, [])


    return (
        <div className="mt-10">
            {/* Bar chart */}
            <div className="w-auto flex mx-auto my-auto">
                <div className="pt-0 rounded-xl w-full h-fit my-auto">
                    <canvas id={reportID}></canvas>
                </div>
            </div>
        </div>
    )
}

export default Bar;