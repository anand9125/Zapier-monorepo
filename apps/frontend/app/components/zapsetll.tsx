export const ZapCell= ({
    name,
    index,
    onClick
}:{
    name : string,
    index: number,
    onClick: () => void,
 
})=>{
    return  <div onClick={onClick} className="border border-black py-4 px-4 flex  w-[300px] justify-center">
           <div className="flex text-xl">
           <div className="font-bold ">
              {index}
           </div>
           <div>
              {name}
 
           </div>
           </div>
         </div>
}