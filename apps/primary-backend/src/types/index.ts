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
  