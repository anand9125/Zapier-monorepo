"use client"
import {CheakFeatures} from "../components/CkeackFeaturs"
import { Appbar } from "../components/Appbar"
import { Input } from "../components/Input"
import {PrimayButton} from "../components/buttons/PrimaryButton"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"
export default function (){
    const router = useRouter()
    const[email,setEmail] =useState("")
    const [password,setPassword] = useState("")
   
   
   
   return <div> 
        <Appbar></Appbar>
        <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
         <div className="flex-1 pt-40 px-4">
            <div className="font-semibold text-3xl pb-4">
              Automate across your teams
            </div>
             <div>
             Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.
             </div>
           </div>
            <div className="flex-1 pt-12  pb-12 px-4 mt-6 border rounded">
               <Input label={"Email"} type="text" placeholder="Your Email" onChange={(e)=>{
                setEmail(e.target.value);

            }} />
            <Input  label={"Password"} type="text" placeholder="Password"  onChange={(e)=>{
                setPassword(e.target.value);

            }}/>
            <div className="pt-5">
            <PrimayButton size="big" onClick={async()=>{
               const res= await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                    email,
                    password
                });
               localStorage.setItem("token",res.data.token)
               router.push("/dashboard")
            }}>Get started </PrimayButton>
            </div>
             
         </div>
        
    </div>

    </div>
    </div>

}