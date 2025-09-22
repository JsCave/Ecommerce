"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callbackUrl") || "/products"
  const [isSigningIn, setIsSigningIn] = useState(false)
  const[errors,setErrors]=useState<string>(""); 

  async function onSubmit(values: LoginFormValues) {
    setIsSigningIn(true)
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (response?.ok) {
        router.push(callbackURL)
      }else{
        setErrors('email or password wrong')
      }
    } catch (e) {
      setErrors('we facing issue now we working on fix it')
    }
    setIsSigningIn(false)
  }

  return (
    <div className="max-w-2xl mx-auto my-12">
{errors && <div className="bg-red-400 text-red-700">{errors}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
<Link href='/forget-password'>Forget Password?</Link>
          <Button disabled={isSigningIn} type="submit" className="w-full">
            {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
      
    </div>
  )
}
