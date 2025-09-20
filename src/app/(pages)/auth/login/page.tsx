"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {signIn} from  'next-auth/react'
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"



const formSchema = z.object({
  email: z.string(),
 password: z.string(),
})
type FormValues = z.infer<typeof formSchema>
export default function ProfileForm() {
const form=useForm();
const router=useRouter()
const searchParams=useSearchParams()
const callbackURL=searchParams.get('callbackUrl')||'/products'
const[isSigningIn,setIsSigningIn]=useState(false)

async function onSubmit(values:FormValues){
  setIsSigningIn(true)
console.log(values)
try{
  const response=await signIn('credentials',{
    email:values.email,
    password:values.password,
    redirect:false
  })
  console.log(response)
  if(response?.ok){
    router.push(callbackURL)
  }
}
catch(e){console.log(e)}
setIsSigningIn(false)
}

  return (
    <div className="max-w-2xl mx-auto my-12">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isSigningIn} type="submit">{isSigningIn&&<Loader2 className="animate-spin"/>}Submit</Button>
      </form>
    </Form>
    </div>
  )
}