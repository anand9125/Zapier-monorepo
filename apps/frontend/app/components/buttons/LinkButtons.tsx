import { ReactNode } from "react";

export const LinkButton =({children,onClick}:{children:ReactNode,onClick:()=>void})=>{
    return <div className="px-2 py-1 cursor-pointer font-normal text-base hover:bg-slate-100 rounded-full" onClick={onClick}>
        {children}
    </div>

}