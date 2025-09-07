import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
export const TodoComponent = React.memo(({ placeholder ,onClick,onChange,value}) => {
  return (
    <div className="flex focus:outline-black-2 justify-center pt-4">
      <input type="text"  placeholder={placeholder} onChange={onChange} value={value} />
     
      <IoIosAddCircleOutline size={26} onClick={onClick}/>
      

    </div>
  );
});
