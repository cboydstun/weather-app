import React from "react";

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "b2dd32ee92060ae3bb9e523370c35987";

class App extends React.Component {
  
  getWeather = async (e) => {
    
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    try {
      const data = await postData('https://samples.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}', { answer: 42 });
      console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
    } catch (error) {
      console.error(error);
    }
    
    async function postData(url = 'https://samples.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
  }

  render(){
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather />
      </div>
    );
  }
}

export default App