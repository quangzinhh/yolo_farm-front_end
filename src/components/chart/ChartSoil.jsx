import React, { useState, useEffect } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const ChartSoil = ({ aspect, title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi fetchData() lần đầu khi component được render
    fetchData();
    
    // Thiết lập interval để gọi fetchData() mỗi phút
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // 60000 milliseconds = 1 phút
    
    // Clear interval khi component bị unmount để tránh memory leak
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get_data_chart/");
      const formattedData = response.data.map(item => {
        // Parse the timestamp string into a JavaScript Date object
        const timestamp = new Date(item.timestamp);
        
        // Get hours and minutes from the timestamp
        const hours = timestamp.getHours();
        const minutes = timestamp.getMinutes();
        
        // Format hours and minutes into HH:MM format
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
        return {
          name: formattedTime, // Use the formatted time as the name
          Total: parseFloat(item.soil_humid) // Assuming 'temperature' is your actual temperature/light value
        };
      });      
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSoil;
