import React from "react";
export const Button = React.memo(({ label, onClick }) => {
  return (
    <div className="text-center font-medium justify-center py-2">
      <button
        onClick={onClick}
        className="text-white-300 bg-blue-500 rounded-2xl w-30 cursor-pointer hover:bg-sky-600 p-1 text-white"
      >
        {label}
      </button>
    </div>
  );
});
