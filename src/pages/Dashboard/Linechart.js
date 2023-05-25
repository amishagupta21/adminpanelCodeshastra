import React from "react";

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import{
    Chart as ChartJs,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { options } from "toastr";

ChartJs.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)



// const data = [
//     { name:"1", react: 10, bootstrap:37, vue:60  },
//     { name:"4", react: 30, bootstrap:40, vue:40  },
//     { name:"7", react: 12, bootstrap:97, vue:30  },
//     { name:"10", react: 40, bootstrap:40, vue:68  },  
//     { name:"13", react: 16, bootstrap:10, vue:60  },
//     { name:"16", react: 40, bootstrap:80, vue:60  },
//     { name:"19", react: 18, bootstrap:80, vue:60  },
//     { name:"22", react: 30, bootstrap:80, vue:60  },
//     { name:"25", react: 20, bootstrap:80, vue:60  },
//     { name:"28", react: 30, bootstrap:80, vue:60  },
//     { name:"31", react: 30, bootstrap:80, vue:60  },
// ];
const data = {
    labels: ['1','4','7','10','13','16','19','22','25','28','31'],
    datasets : [
        {
            label:"Weekdays",
            data: [0,20,40,30,50,31],
            borderColor:'#6F83E9',
            tension:0.4
        }
    ]
};

const Linechart = () =>
{
    return(
        <div>
            {/* <LineChart width={480} height={400} data={data}>
                <Line type="monotone" dataKey="react" stroke="#8884d8" strokeWidth={2} />
                <CartesianGrid stroke="#F8F9FA" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart> */}
            <Line data={data} options={options} width={400} height={400}></Line>
        </div>
    )
}

export default Linechart;