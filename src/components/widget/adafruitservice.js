// src/adafruitService.js
import axios from 'axios';

const AIO_USERNAME = "quangvinh03";
const AIO_KEY = "aio_efTR84Fy2FscnuSmxJNPaUiiKgIg";
const AIO_FEEDS = ["temperature", "airhumid", "soilhumid", "sunlight"];

const getData = async (feed) => {
  try {
    const response = await axios.get(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feed}/data/last`, {
      headers: {
        'X-AIO-Key': AIO_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Adafruit IO", error);
    return null;
  }
};

const adafruitService = {
  getTemperature: () => getData(AIO_FEEDS[0]),
  getAirHumidity: () => getData(AIO_FEEDS[1]),
  getSoilHumidity: () => getData(AIO_FEEDS[2]),
  getSunLight: () => getData(AIO_FEEDS[3])
};

export default adafruitService;
