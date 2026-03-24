// ViewAllButton.jsx
import { useNavigate } from "react-router-dom";
import { RiArrowRightCircleFill } from '@remixicon/react';

export default function ViewAllButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center my-4 mx-4 ">
      <button
        onClick={() => navigate("/view-all")}
        className="
          flex items-center gap-2
          bg-[#D9D9D9] text-black text-xs font-medium
          pl-1 pr-4 py-1 rounded-[7.08px]
          shadow-md whitespace-nowrap
          transition-all duration-200
          hover:bg-[#DB0000] hover:text-white hover:shadow-lg hover:scale-105 cursor-pointer
          active:scale-95
        "
      >
        {/* Circle arrow icon */}
        <span className="
          w-6 h-6 rounded-full
          group-hover:bg-red-300
          flex items-center justify-center
          text-black group-hover:text-white
          transition-colors duration-200
          text-sm font-bold
        ">
          <RiArrowRightCircleFill />
        </span>

        <div>View All</div>
      </button>
    </div>
  );
}