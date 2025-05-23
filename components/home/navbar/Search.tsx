import { IoMdSearch } from "react-icons/io";

export default function Search() {
  return (
    <div className="flex items-center justify-end relative">
      <input
        type="text"
        // value={input}
        // onChange={handleSearch}
        className="w-32 h-9 border border-black rounded-full bg-[#EDEDED] p-2 hover:border-gray-400 transition-all ease-in-out"
      />
      <IoMdSearch className="w-7 h-7 absolute right-1.5 cursor-pointer hover:text-green-900/60" />
    </div>
  );
}
