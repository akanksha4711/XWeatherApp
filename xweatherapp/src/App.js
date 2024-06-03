import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function Card ({title, content}) {
  return <div style={{
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: "20px 50px",
    borderRadius: "5px"
  }} className='weather-card'>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
}

function App() {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const fetchCity = async ( ) => {
    try{
      const res = await fetch('https://api.weatherapi.com/v1/current.json?key=0e851e3e69c64c2d86780913243003&q='+city);
      const data = await res.json();
      if(!!data) setInfo(data.current);
      if(!!data) setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if(!info) alert("Failed to fetch weather data")
  }, [info])
    console.log(info);
    return (
    <div className="App">
      <div>
        <input value={city} onChange={(e) => {
          setCity(e.target.value);
        }}/>
        <button onClick={() => {
          setIsLoading(true);
          fetchCity();
        }}>Search</button>
      </div>
      {isLoading ? <p>Loading data...</p> 
      : 
      (info && Object.keys(info).length !== 0 ? <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',flexDirection:'row', margin: "50px 300px"}} className='weather-cards'>
        <Card title={'Temperature'} content={info.temp_c}/>
        <Card title={'Humidity'} content={info.humidity}/>
        <Card title={'Condition'} content={info.condition.text}/>
        <Card title={'Wind Speed'} content={info.wind_kph}/>
      </div> : <p>Loading data...</p>)}
    </div>
  );
}

export default App;
