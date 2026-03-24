// ViewAllButton.jsx
import { useNavigate } from "react-router-dom";
import { RiArrowRightCircleFill } from '@remixicon/react';

export default function ViewAllButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center my-4 ">
      <button
        onClick={() => navigate("/view-all")}
        className="
          group
          flex items-center gap-2   
          bg-[#D9D9D9] hover:bg-red-700
          text-black hover:text-white
          text-base sm:text-lg      
          font-medium 
          px-1 sm:px-4 py-2.5 rounded-lg cursor-pointer
          shadow transition-all duration-200 hover:shadow-lg active:scale-95
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