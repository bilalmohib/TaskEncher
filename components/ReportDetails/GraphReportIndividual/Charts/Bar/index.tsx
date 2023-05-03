import { useEffect } from "react"
import { Chart } from "chart.js";

interface BarChartProps {
    reportData: any
}

const Bar: React.FC<BarChartProps> = ({
    reportData
}) => {
    useEffect(() => {
        //@ts-ignore
        let ctx = document.getElementById('myBarChart').getContext('2d');
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
                    <canvas id="myBarChart"></canvas>
                </div>
            </div>
        </div>
    )
}

export default Bar;