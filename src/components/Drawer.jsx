import { SquareX } from 'lucide-react';
import { useState } from 'react';

const Drawer = ({ 
    openMoadl,
    drawerHandler, 
    citys, 
    search, 
    deleteCity, 
    wind, 
    handleChangeWind, 
    handleChangeHumidity, 
    humidity,
    feels,
    sunrise,
    handleChangeFeels,
    handleChangeSunrise
     
    }) => {
        const [list, setList] = useState("");


    return (
        <div
            className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg
        transition-transform transform ${openMoadl ? "translate-x-0" :
                    "translate-x-full"}`}
        >
            <div className="p-4 text-black">
                <h2 className="text-xl text-black font-semibold mb-4">Настройки</h2>
                <div className=''>
                    <p>Поиск по Городам</p>
                    <input
                        className='w-full cursor-pointer mt-7 hover:shadow-2xl hover:ease-in hover:duration-300 bg-slate-50 rounded-xl border p-3 focus:border-dark-blue active:border-dark-blue focus-visible:border focus-visible:border-dark-blue placeholder:text-slate-50 '
                        type="text"
                        placeholder='Поиск ...'
                        onChange={(event) => { setList(event.target.value) }}
                    />
                </div>
                {<ul className="mt-7">
                    {citys && citys.length > 0 && citys !== undefined ? citys.filter((city) => {
                        if (list === "") {
                            return city
                        } else if (city.toLowerCase().includes(list.toLowerCase())) {
                            return city
                        }}).map((city, index) => (
                        <li key={index} className='flex justify-between'>
                            <a className="cursor-pointer text-dark-blue hover:underline" onClick={() => search(city)}>{city[0].toUpperCase() + city.slice(1, city.length)}</a>
                            <SquareX onClick={() => deleteCity(city)} size={20} color='red' className='hover:cursor-pointer' />
                        </li>
                    )) : "Нет сохраненных городов"
                    }
                </ul>}
            </div>
            <div className='p-4 text-black'>
                <h2 className='text-xl font-semibold mb-4'>Параметры отображения</h2>
                <div>
                    <input type="checkbox" name="wind" id="wind" value={wind} onChange={handleChangeWind} checked={wind} />
                    <label className='ml-3 cursor-pointer' htmlFor="wind">Скорость Ветра</label>
                </div>
                <div>
                    <input type="checkbox" name="humidity" id="humidity" value={humidity} onChange={handleChangeHumidity} checked={humidity} />
                    <label className='ml-3 cursor-pointer' htmlFor="humidity">Влажность</label>
                </div>
                <div>
                    <input type="checkbox" name="feels" id="feels" value={feels} onChange={handleChangeFeels} checked={feels} />
                    <label className='ml-3 cursor-pointer' htmlFor="feels">Чуствуется как</label>
                </div>
                <div>
                    <input type="checkbox" name="sunrise" id="sunrise" value={sunrise} onChange={handleChangeSunrise} checked={sunrise} />
                    <label className='ml-3 cursor-pointer' htmlFor="sunrise">Рассвет</label>
                </div>
            </div>
            <button
                onClick={drawerHandler}
                className="absolute top-4 right-4 text-gray-600"
            >
                Закрыть
            </button>
        </div>
    )
}

export default Drawer