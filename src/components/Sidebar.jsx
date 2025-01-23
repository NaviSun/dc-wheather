import { Building2 } from 'lucide-react'
import { useState } from "react"

const Sidebar = ({citys, search}) => {
    const [list, setList] = useState("");

    return (
<div className="sr-only  p-5 w-1/4 sm:not-sr-only border-r  sm:w-2/4">
            <h2 className="text-3xl">Ваши города:</h2>
            <div className='mt-5'>
                    <p>Поиск по Городам</p>
                    <input
                        className='cursor-pointer mt-7 bg-blue hover:shadow-2xl hover:ease-in hover:duration-30 rounded-xl border p-3 focus:border-dark-blue active:border-dark-blue focus-visible:border focus-visible:border-dark-blue placeholder:text-slate-50 '
                        type="text"
                        placeholder='Поиск ...'
                        onChange={(event) => { setList(event.target.value) }}
                    />
                </div>
              {<ul className="flex flex-col items-start mt-5">
                    {citys && citys.length > 0 && citys !== undefined ? citys.filter((city) => {
                        if (list === "") {
                            return city
                        } else if (city.toLowerCase().includes(list.toLowerCase())) {
                            return city
                        }}).map((city, index) => (
                        <li key={index} className='flex gap-3 text-center mt-2'>
                            <Building2 /><a className="cursor-pointer hover:underline" onClick={() => search(city)}>{city[0].toUpperCase() + city.slice(1, city.length)}</a>
                            
                        </li>
                    )) : "Нет сохраненных городов"
                    }
                </ul>}
          </div>
    )
}

export default Sidebar