import moment from 'moment';

const getWeekday = date => moment(date).format('dddd').substring(0, 3);

const getUpcomingDaysForecast = data => 
   data.slice(1).map(days => ({
        imgUrl: days.weather_state_abbr,
        temperature: Math.round(days.max_temp),
        weekday: getWeekday(days.applicable_date),
    }));
export default getUpcomingDaysForecast;
