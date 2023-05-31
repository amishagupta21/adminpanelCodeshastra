import React from "react";

// import{
//     Chart as ChartJs,
//     LineElement,
//     PointElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { options } from "toastr";

// ChartJs.register(
//     LineElement,
//     PointElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend
// )

// const data = {
//     labels: ['1','4','7','10','13','16','19','22','25','28','31'],
//     datasets : [
//         {
//             label:"Weekdays",
//             data: [0,20,40,30,50,31],
//             borderColor:'#6F83E9',
//             tension:0.4
//         }
//     ]
// };
import Chart from 'react-apexcharts';

const Linechart = () =>
{
    return(
        <div>
            {/* <Line data={data} options={options} width={400} height={400}></Line> */}
            <Chart type="line"
            height='auto'
                series={[
                    {
                        name:"Product",
                        data:[234,45,67,987,345,400,500,87,34,45,65]
                    }
                ]}
                options={{
                    // title:{ text:"Product sell in 202" },
                    xaxis:{ 
                        // title:{ text:"Product sell in 202" },
                        categories:[ '1','4','7','10','13','16','19','22','25','28','31' ],
                     },
                     yaxis:{
                        // title:{ text:"Product sell in 202" },
                     }
                }}
            > </Chart>
        </div>
    )
}

export default Linechart;