import React from "react";
import Chart from 'react-apexcharts';

const  DoughnutChart = () =>{
    return(
        <div>
            <Chart
                type="donut"
                height='auto'
                series={[45,67,89,34,43]}
                options={{
                    labels:[
                        'Full Stack developer',
                        'Software developer program',
                        'Software pro developer program',
                        'Java Full Stack developer',
                        'Python Full Stack developer',
                    ],
                    colors:[
                        '#556EE6',
                        '#34C38F',
                        '#F1B44C',
                        '#F46A6A',
                        '#74788D'
                    ],
                    plotOptions:{
                        pie:{
                            expandOnClick:false,
                            donut:{
                                size:'50px',
                                labels:{
                                    show:true,
                                    total:{
                                        show:true,
                                        fontSize:16,
                                        color:'#000',
                                    },
                                    name:{
                                        show:false
                                    }
                                }
                            }
                        }
                    }
                }}
             ></Chart>
        </div>
    )
}

export default DoughnutChart;