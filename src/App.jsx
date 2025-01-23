import React from 'react';
import Wheather from './components/wheather/Weather'
import { useEffect, useRef, useState } from 'react'
import clear_icon from "./assets/icon/clear.png"
import cloud_icon from "./assets/icon/cloud.png"
import drizzle_icon from "./assets/icon/drizzle.png"
import rain_icon from "./assets/icon/rain.png"
import snow_icon from "./assets/icon/snow.png"
import { useGeolocated } from "react-geolocated";
import axios from 'axios'
import Drawer from './components/Drawer'
import Header from './components/Header'
import SearchBlock from './components/SearchBlock'
import Footer from './components/Footer'

const App = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)
  const [openMoadl, setOpenModal] = useState(false)
  const [citys, setCitys] = useState([])
  const [wind, setWind] = useState(false)
  const [humidity, setHumidity] = useState(false)
  const [feels, setFeels] = useState(false)
  const [sunrise, setSunrise] = useState(false)

  // Объект иконок для сопоставления на ответ openweather
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }
  // Геолокация
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    watchLocationPermissionChange: true,
  });

  //Поиск погоды по городам методом fetch
  const search = async (city) => {
    if (city === '') {
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${import.meta.env.VITE_WEATHER_TOKEN}`
      const response = await fetch(url)
      const data = await response.json();
      if (data.cod == "404") {
        return (
          setWeatherData({
            message: true,
          })
        )
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon
      if (!response.ok) {
        return
      }
      setWeatherData({
        humidity: data.main.humidity,
        feels_like: Math.floor(data.main.feels_like),
        sunrise: new Date(data.sys.sunrise).toUTCString().slice(-11, -4),
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description: data.weather[0].description
      })
    } catch (error) {
      setWeatherData(false)
      console.error('Ошибка получения данных', error)
    }
  }

  //Погода по геолакации
  const getWeather = async () => {
    try {
      if (isGeolocationAvailable && isGeolocationEnabled) {
        if (coords) {
          const lon = String(coords.longitude).slice(0, 5)
          const lat = String(coords.latitude).slice(0, 5)
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${import.meta.env.VITE_WEATHER_TOKEN}`)
          const icon = allIcons[response.data.weather[0].icon] || clear_icon
          setWeatherData({
            humidity: response.data.main.humidity,
            feels_like: Math.floor(response.data.main.feels_like),
            sunrise: new Date(response.data.sys.sunrise).toUTCString().slice(-11, -4),
            windSpeed: response.data.wind.speed,
            temperature: Math.floor(response.data.main.temp),
            location: response.data.name,
            icon: icon,
            description: response.data.weather[0].description
          })
        }
      }
    } catch (error) {
      setWeatherData(false)
      console.error('Ошибка получения данных', error)
    }
  }

  //Запуск приложения
  useEffect(() => {

    getWeather()

  }, [isGeolocationAvailable, isGeolocationEnabled, coords])

  //Сораняем города в localStorage
  useEffect(() => {
    if (citys.length > 0) {
      window.localStorage.setItem('citys', JSON.stringify(citys))
    }
  }, [citys])

  // Загружаем города и настройки из localStorage
  useEffect(() => {

    const data = window.localStorage.getItem("citys")
    if (data) {
      setCitys(JSON.parse(data))
    }
    const dataWind = window.localStorage.getItem("wind")
    if (dataWind) {
      setWind(JSON.parse(dataWind))
    }
    const dataHumidity = window.localStorage.getItem("humidity")
    if (dataHumidity) {
      setHumidity(JSON.parse(dataHumidity))
    }

    const dataFeels = window.localStorage.getItem("feels")
    if (dataFeels) {
      setFeels(JSON.parse(dataFeels))
    }

    const dataSunrise = window.localStorage.getItem("sunrise")
    if (dataSunrise) {
      setSunrise(JSON.parse(dataSunrise))
    }
  }, [])

  //Управление Drawer меню
  const drawerHandler = () => {
    setOpenModal((current) => !current)
  }
  // Сохранить город в список
  const saveCity = (city) => {
    if (!city) {
      return
    }
    if (!citys.includes(city.toLowerCase())) {
      setCitys(prevCity => [...prevCity, city.toLowerCase()])
    }
  }
  // Удалить город из списка
  const deleteCity = (city) => {
    const arr = citys.filter((element) => element !== city)
    window.localStorage.setItem('citys', JSON.stringify(arr))
    setCitys(arr)
  }
  // Настройка отображения ветра
  const handleChangeWind = () => {
    setWind(current => !current);
    window.localStorage.setItem("wind", JSON.stringify(!wind))
  }
  // Настрока отображения влажности
  const handleChangeHumidity = () => {
    setHumidity(current => !current);
    window.localStorage.setItem("humidity", JSON.stringify(!humidity))
  }
  // Настройка отображения температуры
  const handleChangeFeels = () => {
    setFeels(current => !current);
    window.localStorage.setItem("feels", JSON.stringify(!feels))
  }
  // Настройка отображения врем восхода
  const handleChangeSunrise = () => {
    setSunrise(current => !current);
    window.localStorage.setItem("sunrise", JSON.stringify(!sunrise))
  }

  // Поиск по нажатию кнопки enter
  const enterSearch = (e) => {
    if (e.keyCode === 13) {
      search(inputRef.current.value)
    }
  }

  return (
    <>
      <div className="container max-w-6xl flex flex-col h-screen  text-slate-50 px-5 pt-5">
        <Header />
        <SearchBlock
          inputRef={inputRef}
          drawerHandler={drawerHandler}
          search={search}
          saveCity={saveCity}
          enterSearch={enterSearch}
        />
        { !weatherData ? (
           <div className='container  flex justify-center mb-auto mt-40 align-middle text-center text-3xl text-slate-50 '>
              Геолокация не доступна, Введите в поиск нужный город
           </div>
           ) : (
        <Wheather
          weatherData={weatherData}
          humidity={humidity}
          wind={wind}
          feels={feels}
          sunrise={sunrise}
          citys={citys}
          search={search}
        />
          )}
        <Drawer
          openMoadl={openMoadl}
          drawerHandler={drawerHandler}
          citys={citys}
          search={search}
          deleteCity={deleteCity}
          wind={wind}
          handleChangeWind={handleChangeWind}
          handleChangeHumidity={handleChangeHumidity}
          humidity={humidity}
          feels={feels}
          sunrise={sunrise}
          handleChangeFeels={handleChangeFeels}
          handleChangeSunrise={handleChangeSunrise}
        />
      </div>
      <Footer />

    </>
  )
}

export default App