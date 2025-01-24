import { Cloud } from "lucide-react"

const Header = () => {

    return (
        <header>
            <div className="pb-2 text-4xl border-b flex justify-between sm:p-5 sm:justify-around sm:text-6xl  bold items-center">
               <div className="bg-gradient-to-b from-red-50 rounded-full p-5 border text-red-600">
                    <Cloud className="w-10 h-10" />
               </div>
               <div>
                Погода
               </div>
            </div>
        </header>
    )
}

export default Header