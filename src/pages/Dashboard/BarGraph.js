import React from "react";
import Chart from 'react-apexcharts';

const BarGraph = ({ totalUsers,jobready,signupform,fullstack,hirefromus, collaborationlandingform,industryReadyFrom,contactus,todayUsers,vTiger,userTable,login,zoomData,techFitApplication,zoomwebinartechfit,sendInBlue,industryReadyProForm,homePagePopUp,signup}) => {
  const courseData = [
    { label: 'Total Users', value: totalUsers },
    { label: 'Today Users', value: todayUsers },
    { label: 'vTiger', value: vTiger },
    { label: 'userTable', value: userTable },
    { label: 'zoomData', value: zoomData },
    { label: 'techFitApplication', value: techFitApplication },
    { label: 'zoomwebinartechfit', value: zoomwebinartechfit },
    { label: 'sendInBlue', value: sendInBlue },
    { label: 'industryReadyProForm', value: industryReadyProForm },
    { label: 'homePagePopUp', value: homePagePopUp },
    { label: 'signup', value: signup },
    { label: 'login', value: login },
    { label: 'hirefromus', value: hirefromus },
    { label: 'contactus', value: contactus },
    { label: 'jobready', value: jobready },
    { label: 'fullstack', value: fullstack },
    { label: 'signupform', value: signupform },
    { label: 'collaborationlandingform', value: collaborationlandingform },
    { label: 'industryReadyFrom', value: industryReadyFrom },
  ];

  try {
    if (!courseData.some(course => course.value === undefined)) {
      return (
        <div className="bar-graph">
          <Chart
            type="bar"
            height="auto"
            series={[
              { name: 'Users', data: [totalUsers, login,hirefromus,jobready,contactus,todayUsers,vTiger,userTable,zoomData,techFitApplication,collaborationlandingform,industryReadyFrom,zoomwebinartechfit,sendInBlue,fullstack,signupform,industryReadyProForm,homePagePopUp,signup] },
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
