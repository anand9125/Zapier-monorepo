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
               <Input  label={"Name"} type="text" placeholder="Your name" onChange={()=>{

             }} />
               <Input label={"Email"} type="text" placeholder="Your Email" onChange={()=>{

            }} />
            <Input  label={"Password"} type="text" placeholder="Password"  onChange={()=>{

            }}/>
            <div className="pt-5">
            <PrimayButton size="big" onClick={()=>{}}>Get started free</PrimayButton>
            </div>
             
         </div>
        
    </div>

    </div>
    </div>

}