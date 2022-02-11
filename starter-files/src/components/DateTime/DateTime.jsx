import React,{useState, useEffect} from 'react'


const DateTime = () => {
    const [time, setTime] = useState(' ');

useEffect(() => {
  const interval = setInterval(() => setTime(), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);
  return time;
}

export default DateTime;