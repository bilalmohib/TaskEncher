import { useEffect } from "react"
import { Chart } from "chart.js";

interface DoughnutChartProps {
    reportData: any
}

const Doughnut: React.FC<DoughnutChartProps> = ({
    reportData
}) => {
    useEffect(() => {
        // @ts-ignore
        var ctx = document.getElementById('myDoughnutChart').getContext('2d');
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
                    <canvas id="myDoughnutChart"></canvas>
                </div>
            </div>
        </div>
    )
}

export default Doughnut;