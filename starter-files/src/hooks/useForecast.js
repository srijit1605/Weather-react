import { useState, useCallback } from 'react';
import axios from 'axios';
import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';


const base_url = 'https://www.metaweather.com/api/location'
//const cross_domain = 'https://the-ultimate-api-challange.herokuapp.com'   //to be used in case ofcross browser issues req_url to be changed to ${cross_domain}/${req_url}
const req_url = `${base_url}`

const useForecast = () => {
    const [isError,setError]=useState(false);
    const [isLoading,setLoading]=useState(false);
    const [forecast,setforecast]=useState(null);
  
    const getWoeId = async(location) => {
      //get woeid
      const {data} = await axios(`${req_url}/search`, {params: {query: location}})
      
      //error
      if(!data || data.length===0) {
        setError('No such location.');
        setLoading(false);
        return;
      }
      return data[0];
    }
  
    const getForecastData = async(woeid) => {
      //get forecast data
      const {data} = await axios(`${req_url}/${woeid}`)
      console.log({data});
       //error
       if(!data || data.length===0) {
        setError('Oops! something went Wrong.');
        setLoading(false);
        return;
      }
      return data;
    }
  
    const gatherForecastData = useCallback((data) => {
      const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title, data.time);
      const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
      const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

      setforecast({currentDay, currentDayDetails, upcomingDays});
      setLoading(false);
    },[]);
    //api call
    const submitRequest = async location =>{
    setLoading(true);
    setError(false);
    const response = await getWoeId (location)
    if (!response?.woeid) return;

    const data = await getForecastData(response.woeid)
    if(!data) return;

    gatherForecastData(data);
    
  };

  return {
    isError,
    isLoading,
    forecast,
    submitRequest
  }
}

export default useForecast
