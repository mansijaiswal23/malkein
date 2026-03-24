import { Search, Menu } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3 px-6 mt-4">

      <Menu size={24} className="text-gray-500"/>

      <div className="flex items-center justify-between w-full bg-gray-200 rounded-full px-4 py-3">

        <input
          type="text"
          placeholder="Search for sunscreen"
          className="bg-transparent outline-none w-full text-gray-600"
        />

        <Search className="text-gray-500" size={20}/>

      </div>

    </div>
  );
}