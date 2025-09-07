import React from "react";

// import React from "react";
export const Head = React.memo(({ label }) => {
  return <div className="font-bold pt-6 text-4xl">{label}</div>;
});
