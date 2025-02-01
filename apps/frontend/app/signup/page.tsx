"use client"
import {CheakFeatures} from "../components/CkeackFeaturs"
import { Appbar } from "../components/Appbar"
import { Input } from "../components/Input"
import {PrimayButton} from "../components/buttons/PrimaryButton"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useRouter } from "next/navigation"
export default function (){
    const router = useRouter()
    const[name,setName]= useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")


    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
         <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl px-4 pb-4">
                Join millions who automate their work using Zapier
            </div>
            <div className="pt-4 pb-6">
            <CheakFeatures label={"Easy setup ,no coding reuired"}></CheakFeatures>
            </div>
             <div className="pb-6">
             <CheakFeatures label={"Free forever for core features"}></CheakFeatures>
             </div>
           
            <CheakFeatures label={"14-days trail of premium features & apps"}></CheakFeatures>
           </div>
            <div className="flex-1 pt-6  pb-12 px-4 mt-6 border rounded">
               <Input  label={"Name"} type="text" placeholder="Your name" onChange={(e)=>{
                setName(e.target.value)
             }} />
               <Input label={"Email"} type="text" placeholder="Your Email" onChange={(e)=>{
                setEmail(e.target.value)
            }} />
            <Input  label={"Password"} type="text" placeholder="Password"  onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <div className="pt-5">
            <PrimayButton size="big" onClick={async()=>{
              const res=   await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                    name,
                    email,
                    password
                 });
                 console.log(res)
                router.push("/login")
            }}>Get started free</PrimayButton>
            </div>
             
         </div>
        
    </div>

    </div>
    </div>

}