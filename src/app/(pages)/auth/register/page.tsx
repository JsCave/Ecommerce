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
import { apiServices } from "@/services/api"

const formSchema = z.object({
  name:z.string().max(15,"the max length is 15 char"),
  email:z.email(),
  password:z.string()
  .nonempty('Password is required')
  .regex(/^[A-Za-z0-9]{6,20}$/, 'Password must be 6–20 characters and contain only letters and numbers'),
  rePassword:z.string(),
  phone:z.string().regex(/^01[0125][0-9]{8}$/,"the phone is not valid")
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
});;
//<Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} label="UserName" placeholder="UserName" type="name" variant="bordered" {...register('name')}/>

type LoginFormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    mode:"onBlur"
  })


  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callbackUrl") || "/products"
  const [isSigningIn, setIsSigningIn] = useState(false)
  const[errors,setErrors]=useState<string>(""); 

  async function onSubmit(values: LoginFormValues) {
    setErrors('')
    setIsSigningIn(true)
    try {
      const response = await apiServices.register(
       values.name,
        values.email,
        values.password,
        values.rePassword,
        values.phone
      )
console.log(response)
//success
if(response.message=='success'){
  const loginResponse = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
  });

  if (loginResponse?.ok) {
    router.push('/products'); // redirect after successful login
  } else {
    setErrors("we facing issue now we working on fix it");
  }
}
//end success
else {
  setErrors(response.message || "Registration failed");
}
    } catch (e) {
      setErrors('we facing issue now we working on fix it')
    }finally {
      setIsSigningIn(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-12">
{errors && <div className="bg-red-400 text-red-700">{errors}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input placeholder="Enter your Name" {...field} />
      </FormControl>
      {form.formState.errors.name && (
        <p className="text-red-600 mt-1">{form.formState.errors.name.message}</p>
      )}
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="Enter your email" {...field} />
      </FormControl>
      {form.formState.errors.email && (
        <p className="text-red-600 mt-1">{form.formState.errors.email.message}</p>
      )}
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
        <Input placeholder="Enter your Password" {...field} />
      </FormControl>
      {form.formState.errors.password && (
        <p className="text-red-600 mt-1">{form.formState.errors.password.message}</p>
      )}
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="rePassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Retype Password</FormLabel>
      <FormControl>
        <Input placeholder="Retype Password" {...field} />
      </FormControl>
      {form.formState.errors.rePassword && (
        <p className="text-red-600 mt-1">{form.formState.errors.rePassword.message}</p>
      )}
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone</FormLabel>
      <FormControl>
        <Input placeholder="Enter your phone" {...field} />
      </FormControl>
      {form.formState.errors.phone && (
        <p className="text-red-600 mt-1">{form.formState.errors.phone.message}</p>
      )}
    </FormItem>
  )}
/>

<div><Link href='/auth/login'>Have Account? Login</Link></div>
<div><Link href='/forget-password'>Forget Password?</Link></div>
          <Button disabled={isSigningIn} type="submit" className="w-full">
            {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </form>
      </Form>
      
    </div>
  )
}
