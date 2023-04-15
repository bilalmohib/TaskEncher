import { useEffect } from "react"
import { Chart } from "chart.js";
const Doughnut = () => {
    useEffect(() => {
        // @ts-ignore
        var ctx = document.getElementById('myDoughnutChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Accepted", "Pending", "Rejected"],
                datasets: [{
                    data: [70, 10, 6],
                    borderColor: [
                        "rgb(75, 192, 192)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    backgroundColor: [
                        "rgb(75, 192, 192 )",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    borderWidth: 2,
                }]
            },
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