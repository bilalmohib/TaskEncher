import { useEffect } from "react"
import { Chart } from "chart.js";

interface RadarChartProps {
    reportData: any
}

const Radar: React.FC<RadarChartProps> = ({
    reportData
}) => {
    useEffect(() => {
        // @ts-ignore
        var ctx = document.getElementById('myRadarChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'radar',
            data: reportData,
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                }
            },
        });
    }, [])
    return (
        <div className="mt-10">
            {/* Radar Chart */}
            <div className="w-auto flex mx-auto my-auto">
                <div className="pt-0 rounded-xl w-full h-fit my-auto">
                    <canvas id="myRadarChart"></canvas>
                </div>
            </div>
        </div>
    )
}
export default Radar;