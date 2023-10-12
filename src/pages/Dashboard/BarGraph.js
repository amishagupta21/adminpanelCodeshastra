import React from "react";
import Chart from 'react-apexcharts';

const BarGraph = ({ totalUsers, todayUsers }) => {
 console.log("totalUsers",totalUsers)
  const courseData = [
    { label: 'Total Users', value: totalUsers },
    { label: 'Today Users', value: todayUsers },
  ];

  try {
    if (!courseData.some(course => course.value === undefined)) {
      return (
        <div className="bar-graph">
          <Chart
            type="bar"
            height="auto"
            series={[
              { name: 'Users', data: [totalUsers, todayUsers] },
            ]}
            options={{
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded',
                },
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val;
                },
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
              },
              xaxis: {
                categories: courseData.map(course => course.label),
              },
              colors: ['#2ecc71', '#3498db'], 
              fill: {
                opacity: 1,
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val;
                  }
                }
              }
            }}
          />
        </div>
      );
    } else {
      console.error("Some required properties are undefined.");
      return <div>Error loading chart</div>;
    }
  } catch (error) {
    console.error("Error rendering chart:", error);
    return <div>Error loading chart</div>;
  }
};

export default BarGraph;
