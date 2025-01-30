import { ReactNode } from "react"

export const PrimayButton=({children,onClick,size="small"}:{
    children:ReactNode,onClick:()=>void
    size?:"big"| "small"},
    )=>{
    return <div onClick={onClick} className={`${size=="small" ?"text-sm   ":"text-xl "} ${size=="small"?"px-4 py-2 " : "px-8 py-4  "} cursor-pointer hover:shadow-md  rounded-full bg-amber-700 text-white text-center`}>
        {children}

    </div>
}