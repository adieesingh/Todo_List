import React from "react";
import { Link } from "react-router-dom";

export const BottomWarming = React.memo(({ label, to, buttonText }) => {
  return (
    <div className="py-2 justify-center text-sm flex">
      <div>{label}</div>
      <Link className="underline cursor-pointer pl-1 " to={to}>
        {buttonText}
      </Link>
    </div>
  );
});
