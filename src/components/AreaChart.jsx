import React from 'react'
import Chart from "react-apexcharts"
import { useEffect, useState } from "react"
import { fetchDailyData } from '../api'

const AreaChart = ({country}) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(()=>{
    const fetchCountryDailyData = async () =>{
      const data = await fetchDailyData(country);
      setDailyData(data);
    };

    fetchCountryDailyData();
  },[country]);


  return (
    <div id= "chart">
      <Chart
      options={{chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories:dailyData.map(item =>item.Date)
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy'
        },
      },}}
      series={[{
        name:"Vaka",
        data: dailyData.map(item=> item.Confirmed)
        },
        {
          name:"İyileşen",
          data: dailyData.map(item=> item.Recovered)
        },
        {
          name:"Ölüm",
          data: dailyData.map(item=> item.Deaths)
        }
      ]}
      style={{
        marginTop: 20,
      }}

      height={700}
      
      />
    </div>
  )
}

export default AreaChart

