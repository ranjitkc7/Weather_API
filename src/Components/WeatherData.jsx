import React, { useEffect, useRef, useState } from "react";

const WeatherData = () => { 
  const [dataW, setDataW] = useState(false);
  const inputRef = useRef(); 
  const seachCity = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${import.meta.env.VITE_APP_API}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setDataW({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0]?.icon,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  seachCity("Pokhara");
  }, []);
  return (
    <div className="flex items-start pt-[2rem] justify-center h-[100vh]">
      <div
        className="h-[25rem] w-[25rem] border-2 rounded-lg border-slate-500 
        shadow-lg bg-gradient-to-b from-[#03045e] to-[#f72585] text-white"
      >
        <div className="flex gap-[1rem] mx-[2rem] mt-[1rem]">
          <input
            className="h-[2rem] w-[18rem] text-black  pl-[1.2rem] text-[1.2rem]
         rounded-md" placeholder="Enter the City"
            type="text"
            ref = {inputRef}
          />
          <button className="h-[2rem] w-[2rem]">
            <img className=" rounded-[50%]" src="p12.jpg" alt="NOT Found"
            onClick={() => seachCity(inputRef.current.value)} />
          </button>
        </div>
        <div className="flex items-center justify-center pt-[2rem] flex-col">
          <img className="h-[8rem] w-[8rem]" 
           src={
            dataW && dataW.icon
              ? `http://openweathermap.org/img/wn/${dataW.icon}@2x.png`
              : "default.png"
          }
          alt="Weather Icon" 
          />
          <h1 className="text-[4rem] mt-[-2rem]">{dataW.temperature}°C</h1>
          <h1 className="text-[2rem] mt-[-1.2rem]">{dataW.location}</h1>
        </div>

        <div className="px-[1rem] pt-[1.9rem] flex justify-between">
          <div className=" flex gap-2">
            <img
              className="h-[3rem] w-[3rem] text-white mt-1"
              src="hu12.png"
              alt=""
            />
            <div className="text-[1.1rem]  font-[700]">
              <p>{dataW.humidity} %</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className=" flex gap-3">
            <img
              className="h-[4rem] w-[4rem] text-white"
              src="wind123.png"
              alt=""
            />
            <div className="text-[1.1rem] pt-[2px] font-[700]">
              <p>{dataW.windSpeed} Km/hr</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
