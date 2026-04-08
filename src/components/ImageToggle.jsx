import { useState } from "react";

export function ImageToggle({ image1, image2, onClick }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="w-full h-full absolute inset-0 cursor-pointer"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={onClick}
    >
      <img
        src={image1}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={image2}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}