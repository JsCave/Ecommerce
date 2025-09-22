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
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof formSchema>

export default function ResetPassword() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callbackUrl") || "/products"
  const [isSigningIn, setIsSigningIn] = useState(false)

  async function onSubmit(values: LoginFormValues) {
    setIsSigningIn(true)
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.newPassword,
        redirect: false,
      })
      if (response?.ok) {
        router.push(callbackURL)
      }
    } catch (e) {
      console.error(e)
    }
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
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
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
          <Button disabled={isSigningIn} type="submit" className="w-full">
            {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
        </form>
      </Form>
      
    </div>
  )
}
