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
import { apiServices } from "@/services/api"

const formSchema = z.object({
  email: z.email("Invalid email address"),
})

type LoginFormValues = z.infer<typeof formSchema>

export default function ForgetPassword() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
  })

  const router = useRouter()
 

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)
    try {
      const response = await apiServices.forgetPassword(values.email)

      console.log(response)
      if (response?.statusMsg=='success') {
        router.push('verify')
      }
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
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


          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
