"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import countryList from "react-select-country-list"

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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitContactUsForm } from "../server"

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  country: z.string().nonempty({
    message: "Please select a country.",
  }),
  telephone: z.string().min(10, {
    message: "Telephone must be at least 10 characters.",
  }),
  query: z.string().min(5, {
    message: "Query must be at least 5 characters.",
  }),
})

export function ContactUsForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      telephone: "",
      query: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    
    const { fullName, email, country, query, telephone } = data;
    try {
      const res = await submitContactUsForm(fullName, email, country, telephone, query);
      if (!res) throw new Error();
      form.reset();
      toast({
        title: "Your form has been submitted!"
      });
    } catch (err) {
      toast({
        title: "Your form couldn't be submitted",
        variant: 'destructive'
      });
    }
  }

  const countries = countryList().getData()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="contact-us" className="h-full flex flex-col gap-2 sm:grid sm:grid-cols-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Your Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map(({label, value}, i) => (
                    <SelectItem key={i} value={label}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telephone</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Query</FormLabel>
              <FormControl>
                <Textarea placeholder="Your query..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2">
          <Button type="submit" className="bg-primary-yellow hover:bg-red-500">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
