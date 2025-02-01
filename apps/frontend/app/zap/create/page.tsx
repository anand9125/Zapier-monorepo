"use client"
import { Appbar } from "@/app/components/Appbar";
import { useEffect, useState } from "react";
import { ZapCell } from "@/app/components/zapsetll";
import { LinkButton } from "@/app/components/buttons/LinkButtons";
import { PrimayButton } from "@/app/components/buttons/PrimaryButton";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useRouter } from "next/navigation";


function useAvailableActionAndTrigger(){

  const [availableActions, setAvailableActions] = useState([])
  const [availableTriggers, setAvailableTriggers] = useState([])
  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
    .then(x=>setAvailableTriggers(x.data.availableTriggers))
    axios.get(`${BACKEND_URL}/api/v1/action/available`)
    .then(x=>setAvailableActions(x.data.availableActions))
    console.log("get")

  },[])

  return {availableActions, availableTriggers}
}

export default function (){
  const router = useRouter()
  const{availableActions, availableTriggers}=useAvailableActionAndTrigger()
  console.log(availableActions,availableTriggers) 
  const [selectedTrigger,setSelectedTrigger] = useState< {
       id:string,
    name:string}>()
    const [selectedAction,setSelectedAction] = useState<{
      index: number
      availableActionName: string;
      availableActionId: string;
      
    }[]>([])
    const [selectedModelIndex,setSelectedModelIndex] = useState<null|number>(null)

    return <div>
          <Appbar></Appbar>
          <div className="flex justify-end">
          <PrimayButton onClick={async()=>{
            if(!selectedTrigger?.id){
              return
            }
           const response = await axios.post(`http://localhost:4000/api/v1/zaps`,{
            "availableTriggersId": selectedTrigger.id,
            "triggerMetadata":[],
            "actions":selectedAction.map(a=>({
              'AvailableActionId':a.availableActionId,
              "actionMetadata":{}
            }))
          },{
            headers:{
              Authorization: localStorage.getItem("token"),
            }
          })
          router.push("/dashboard")
          }}>Publish</PrimayButton>
          </div>
           <div className="w-full min-h-screen bg-slate-200  flex flex-col justify-center">
            <div className="flex justify-center w-full">
           <ZapCell onClick={()=>{
              setSelectedModelIndex(1)
            }}
             name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1  } />
           </div>
            <div className="pt-2 pb-2 w-full" >
              {selectedAction.map((action,index)=><div className="pt-2 flex justify-center"><ZapCell onClick={()=>{
              setSelectedModelIndex(action.index)
            }} 
              name ={action.availableActionName?action.availableActionName:"Action"} index={action.index}/></div>)}
          <div className="flex justify-center">
           <div>
              <PrimayButton onClick={()=>{
               setSelectedAction(a=>[...a,{
                 index: a.length+2,
                 availableActionName: "",
                 availableActionId: "",
               }])
              }}><div className="text-2xl">+</div></PrimayButton>
            </div>
           </div>
           </div>
         </div>
        {selectedModelIndex && <Model availableItems={selectedModelIndex == 1 ? availableTriggers :availableActions}
         onSelect={(props:null|{name:string;id:string})=>{
          if(props==null){
            setSelectedModelIndex(null)
            return
          }
          if(selectedModelIndex==1){
            setSelectedTrigger({
              id: props.id,
              name: props.name,
            })
          }
          else{
            setSelectedAction(a =>{
              let newAction=[...a];
              newAction[selectedModelIndex-2]={
                index: selectedModelIndex,
                availableActionName: props.name,
                availableActionId: props.id,
              }
              return newAction;
            })
          
          }
          setSelectedModelIndex(null)
        }}
         index ={selectedModelIndex}/>}
       </div>
}

function Model({index,onSelect,availableItems}:{index:number,onSelect:(props:null| 
  {name:string;id:string})=>void,
   availableItems:{name:string;id:string,image:string}[]}){
  return  <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
  <div className="relative p-4 w-full max-w-2xl max-h-full">
      <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <div className="text-xl">
                  Select {index === 1 ? "Trigger" : "Action"}
              </div>
              <button onClick={() => {
                  onSelect(null);
              }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
              </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                {
                  availableItems.map(({id, name,image})=>{
                    return <div onClick={()=>{
                      onSelect({id, name})
                    }} 
                    className="flex  border p-4 cursor-pointer hover:bg-slate-100">
                      <img src={image} width={30} className="rounded-full" />
                      <div className="flex flex-col justify-center">{name}</div>

                    </div>
                  })
                }
              </div>
              </div>
            </div>
          </div>

  

}