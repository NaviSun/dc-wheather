import { Cloud } from "lucide-react"

const Header = () => {

    return (
        <header>
            <div className="pb-5 border-b flex justify-between sm:p-5 sm:justify-around text-6xl  bold items-center">
               <div className="bg-gradient-to-b from-red-50 rounded-full p-5 border text-red-600">
               <Cloud size={90} />
               </div>
               <div>
                Погода
               </div>
            </div>
        </header>
    )
}

export default Header