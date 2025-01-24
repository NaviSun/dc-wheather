import humidity_icon from "../../assets/icon/humidity.png"
import wind_icon from "../../assets/icon/wind.png"

const Weather = ({
  weatherData,
  humidity,
  wind,
  feels,
  sunrise,
}) => {



  return (

    
    <>
      {weatherData && weatherData.message ? (
        <div className='mt-40 w-3/4 flex justify-center text-center align-middle text-3xl text-slate-50'>
          Город не найден
        </div>
      ) : (
        <div className="container">
          <div className='flex flex-col items-center'>
            <img className='w-16' src={weatherData.icon} alt="Солнечно, без Облачно" />
            <p className='text-xl mt-7'>{weatherData.description.toUpperCase()}</p>
            <p className='text-6xl mt-7'>{weatherData.temperature} ℃</p>
            <p className={feels ? "mt-7" : 'hidden'}>Ощущается как: {weatherData.feels_like} ℃</p>
            <p className={sunrise ? "mt-2" : 'hidden'}>Рассвет в: {weatherData.sunrise}</p>
            <p className='text-4xl mt-7'>{weatherData.location}</p>
          </div>
          <div className="flex gap-9 justify-center p-7">
            <div className={humidity ? 'flex flex-col items-center' : "hidden"}>
              <img className='w-10 block' src={humidity_icon} alt="Влажносит" />
              <div className='flex flex-col items-center mt-4'>
                <p className='text-2xl'>{weatherData.humidity}%</p>
                <span className=''>Влажность</span>
              </div>
            </div>
            <div className={wind ? 'flex flex-col items-center' : 'hidden'}>
              <img className="w-10 block" src={wind_icon} alt="Скорость ветра" />
              <div className='flex flex-col items-center mt-4'>
                <p className='text-2xl'>{weatherData.windSpeed} М/С</p>
                <span>Скорость ветра</span>
              </div>
            </div>
          </div>
        </div>)}
    </>
  )
}

export default Weather