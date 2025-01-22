

const Header = ({ citys, search }) => {

    return (
        <header>
            <div className="p-5">
                {citys && citys.length > 0 && citys !== undefined ?
                    (<ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center items-center gap-1 text-slate-50 text-xl md:text-2xl ">
                        {citys.map((city, index) => (
                            <li className="inline-block text-center" key={index}>
                                <a className="cursor-pointer hover:underline" onClick={() => search(city)}>{city[0].toUpperCase() + city.slice(1, city.length)}</a>
                            </li>
                        ))
                        }
                    </ul>) : (<><div className="flex justify-center items-center text-xl"> Нет сохраненных городов</div></>)}



            </div>
        </header>
    )
}

export default Header