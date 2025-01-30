import z from "zod"

export const SigupScheme =z.object({
    name :z.string(),
    email:z.string().email(),
    password :z.string().min(8).max(20),
})


export const SigninScheme = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(20),
  })

export const ZapCreateScheme = z.object({
    availableTriggersId:z.string(),
    triggerMetadata:z.any().optional(), //along with trigger we have to giave some metadata and shape of data can be anything
    actions:z.array(z.object({
        AvailableActionId  :z.string(),
        actionMetadata:z.any().optional(), //along with action we have to giave some metadata like who do you want to sent email to emais like this ...
    }))
})

  