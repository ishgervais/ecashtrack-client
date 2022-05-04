import { Search } from "react-feather";

export default function SearchInput() {

    return (
        <div className="flex justify-center">
            <div className="w-full md:w-2/5 text-black-500 mt-10">
                <div className="flex rounded bg-white">
                    <button className="flex items-center justify-center px-4 border-r">
                   <Search size={20} strokeWidth={0.5} className="w-6 h-6 text-gray-400"/>
                    </button>
                    <input type="text" className="px-4 py-2 w-full border-none focus:outline-none" placeholder="How can I help you?" />
                </div>
            </div>
        </div>
    )
}