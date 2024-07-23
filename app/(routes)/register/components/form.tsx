"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Required } from "@/components/ui/required"
import { registerUser } from "./server"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  homeAddress: z.string().optional(),
  telephone: z.string().min(10, { message: "Telephone must be at least 10 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }),
  subscribeToNewsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      homeAddress: "",
      telephone: "",
      password: "",
      confirmPassword: "",
      subscribeToNewsletter: false,
    },
  });
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { fullName, confirmPassword, email, telephone, homeAddress, subscribeToNewsletter } = data;
    registerUser(fullName, email, telephone, confirmPassword, subscribeToNewsletter as boolean, homeAddress)
    .then(res => {
      if (res) {
        toast({
          title: "Thanks for registering"
        });
        signIn('credentials', { email, password: confirmPassword, redirect: false });
        router.push('/');
      } else {
        toast({
          title: "Registration failed! User already exists",
          variant: 'destructive'
        });
      }
    })
    .catch(err => {
      toast({
        title: "Sorry! Sign up failed",
        description: "We apologize for inconvenience !"
      });
    });
  }

  return (
    <div className="max-w-lg w-full mx-auto p-4 md:p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <Required /></FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address <Required /></FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone <Required /></FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password <Required /></FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password <Required /></FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subscribeToNewsletter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="subscribeToNewsletter" />
                    <FormLabel htmlFor="subscribeToNewsletter" className="ml-2">
                      Subscribe to Newsletter
                    </FormLabel>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600">
            Register
          </Button>
        </form>
      </Form>
    </div>
  )
}
