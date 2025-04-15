import React from "react";

const ButtonEDU = ({ actionType, onClick, children }) => {
  const getButtonStyles = () => {
    switch (actionType) {
      case "add":
        return "bg-[#0100fa] bg-smart text-xs text-white w-28 h-9 rounded-md border border-[#0100fa] transition-all duration-300 hover:bg-[#0100fa]/80 hover:text-white";
      case "update":
        return "bg-[#0100fa] text-white w-28 h-9 rounded-md border border-[#0100fa] transition-all duration-300 hover:bg-[#0100fa]/80 hover:text-white";
      case "save":
        return "bg-[#0100fa] text-white w-28 h-9 rounded-md border border-[#0100fa] transition-all duration-300 hover:bg-[#0100fa]/80 hover:text-white";
      case "edit":
        return "bg-[#0100fa] text-white w-28 h-9 rounded-md border border-[#0100fa] transition-all duration-300 hover:bg-[#0100fa]/80 hover:text-white";
      case "delete":
        return "bg-red-600 text-white w-28 h-9 rounded-md border border-red-600 transition-all duration-300 hover:bg-transparent hover:text-red-600";
      case "cancel":
        return "bg-gray-300 text-black w-28 h-9 rounded-md border border-gray-400 transition-all duration-300 hover:bg-transparent hover:text-gray-600";
      default:
        return "bg-[#0100fa] text-white w-28 h-9 rounded-md border border-[#0100fa] transition-all duration-300 hover:bg-[#0100fa]/80 hover:text-white";
    }
  };

  return (
    <button
      className={`${getButtonStyles()} flex items-center justify-center font-semibold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonEDU;
