
import { ReactNode } from "react"
export const SecondaryButton=({children,onClick,size="small"}:{
    children:ReactNode,onClick:()=>void
    size?:"big"| "small"},
    )=>{
    return <div onClick={onClick} className={`${size=="small" ?"text-sm":"text-xl"} ${size=="small"?"px-4 py-2" : "px-6 py-4"} cursor-pointer hover:shadow-md  rounded-full border-2 border-gray-700 focus:border-pink-600 `}>
        {children}

    </div>
}