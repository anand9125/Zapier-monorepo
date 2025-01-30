"use client"
import { LinkButton } from "./buttons/LinkButtons"
import { useRouter } from "next/navigation"
import { PrimayButton } from "./buttons/PrimaryButton"

export const Appbar = ()=>{
    const router =  useRouter()
    return <div className="flex border-b justify-between items-center p-4 ">
        <div className=" pl-4 text-2xl flex items-center">
            <div className="font-bold">
            <a href="/" className="cursor-pointer"> Zapier</a>
            </div>
            
        </div>
        <div className="flex items-center gap-x-3">
        <LinkButton onClick={()=>{}}>Contact Sales</LinkButton>
        <LinkButton onClick={()=>{
            router.push("/login")
        }}>Login</LinkButton>
        <PrimayButton onClick={()=>{
            router.push("/signup")
        }}>Signup</PrimayButton>
        </div>

    </div>
    
}