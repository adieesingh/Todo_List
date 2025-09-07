import React from "react"

export const SubHeading = React.memo(({label})=>{
        return <div className="px-4 text-md text-slate-400 text-2xl pb-4">
                {label}
        </div>
});