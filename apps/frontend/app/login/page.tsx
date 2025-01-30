"use client"
import {CheakFeatures} from "../components/CkeackFeaturs"
import { Appbar } from "../components/Appbar"
import { Input } from "../components/Input"
import {PrimayButton} from "../components/buttons/PrimaryButton"
export default function (){
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
               <Input label={"Email"} type="text" placeholder="Your Email" onChange={()=>{

            }} />
            <Input  label={"Password"} type="text" placeholder="Password"  onChange={()=>{

            }}/>
            <div className="pt-5">
            <PrimayButton size="big" onClick={()=>{}}>Get started </PrimayButton>
            </div>
             
         </div>
        
    </div>

    </div>
    </div>

}