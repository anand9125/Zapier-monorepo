"use client"

import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { DarkButton } from "../components/buttons/Darkbutton";
import axios from "axios";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { LinkButton } from "../components/buttons/LinkButtons";
import { useRouter } from "next/navigation";


function useZap() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zaps`,{
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error("Error fetching zaps:", error);
                setLoading(false); // Ensure loading is set to false even if there's an error
            });
    }, []);

    return { loading, zaps };
}




export default function(){
    const router = useRouter();
    const{loading,zaps} = useZap()

    return <div>
       <Appbar></Appbar>
       <div className="flex justify-center">

       
       <div className="pt-8 max-w-screen-lg w-full">
         <div className="flex justify-between pr-5">
            <div className="text-2xl font-bold">My Zaps </div>
            <DarkButton onClick={()=>{
                router.push("/zap/create")
            }}>Create</DarkButton>
         </div>
       </div>
    </div>
    {loading ?"Loading...": <div className="flex justify-center w-full"><ZapTable zaps={zaps}></ZapTable> </div>}
    
</div>
}
function ZapTable({ zaps }: {zaps:any}) {
    const router = useRouter();

    return <div className="p-8 max-w-screen-lg w-full">
        <div className="flex">
                <div className="flex-1">Name</div>
                <div className="flex-1">ID</div>
                <div className="flex-1">Created at</div>
                <div className="flex-1">Webhook URL</div>
                <div className="flex-1">Go</div>
        </div>
      
        {zaps.map(z => <div className="flex border-b border-t py-4">
            
            <div className="flex-1 flex"><img src={z.trigger.type.image} className="w-[30px] h-[30px]" /> {z.actions.map(x => <img src={x.type.image} className="w-[30px] h-[30px]" />)}</div>
            <div className="flex-1">{z.id}</div>
            <div className="flex-1">Nov 13, 2023</div>
            <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
            <div className="flex-1"><LinkButton onClick={() => {
                    router.push("/zap/" + z.id)
                }}>Go</LinkButton></div>
        </div>)}
    </div>
}