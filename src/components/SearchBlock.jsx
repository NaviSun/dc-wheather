import { Search, Settings, Save } from 'lucide-react';

const SearchBlock = ({
    inputRef,
    drawerHandler,
    search,
    saveCity,
    enterSearch
}) => {

    return (
        <div className="container flex justify-between gap-3 items-center mt-12">
            <input className='w-full cursor-pointer hover:shadow-2xl hover:ease-in hover:duration-300 bg-blue rounded-xl border p-3 focus:border-dark-blue active:border-dark-blue focus-visible:border focus-visible:border-dark-blue placeholder:text-slate-50 ' ref={inputRef} onKeyDown={(e) => enterSearch(e) } type="text" placeholder='Поиск ...' />
            <div className="cursor-pointer rounded-xl w-[49px] h-[49px] border bg-blue hover:shadow-2xl hover:ease-in hover:duration-300">
                <Search size={44} onClick={() => search(inputRef.current.value)} />
            </div>
            <div className='cursor-pointer rounded-xl w-[49px] h-[49px] border bg-blue hover:shadow-2xl hover:ease-in hover:duration-300'>
                <Settings size={44} onClick={drawerHandler} />
            </div>
            <div className='cursor-pointer rounded-xl w-[49px] h-[49px] border bg-blue hover:shadow-2xl hover:ease-in hover:duration-300'>
                <Save size={44} onClick={() => saveCity(inputRef.current.value)} />
            </div>
        </div>
    )
}

export default SearchBlock