import "./widget.scss";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LandscapeIcon from '@mui/icons-material/Landscape';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Widget = ({ type }) => {
  const [temperature, setTemperature] = useState(null);
const [airHumidity, setAirHumidity] = useState(null);
const [sunLight, setSunLight] = useState(null);
const [soilHumidity, setSoilHumidity] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/get_data/');
        if (response.data) {
            console.log(response.data)
            setTemperature(response.data.temperature);
            setAirHumidity(response.data.airhumid);
            setSunLight(response.data.sunlight);
            setSoilHumidity(response.data.soilhumid);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

  const interval = setInterval(fetchData, 3000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const fetchData = async () => {
  await axios.get('http://127.0.0.1:8000/get_env/');
}
  const interval = setInterval(fetchData, 12000);
  return () => clearInterval(interval);
}, []);


  let data;

  switch (type) {
    case "user":
      data = {
        title: "TEMPERATURE",
        value: temperature,
        unit: "C",
        link: "See all users",
        icon: (
          <DeviceThermostatIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "AIR-HUMID",
        value: airHumidity,
        unit: "%",
        link: "View all orders",
        icon: (
          <CloudQueueIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 0, 255, 0.5)",
              color: "white",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "SOIL-HUMID",
        value: soilHumidity,
        unit: "%",
        link: "View net earnings",
        icon: (
          <LandscapeIcon
            className="icon"
            style={{backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",}}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "SUN LIGHT",
        value: sunLight,
        unit: "%",
        link: "See details",
        icon: (
          <WbSunnyIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.value} {data.unit}
        </span>
        <span></span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
