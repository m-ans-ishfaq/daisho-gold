
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { BIKES } from "@/app/assets/bikes";
import { useState } from "react";

const FilterSchema = z.object({
    bike: z.string().optional(),
    part: z.string().optional(),
    query: z.string().optional(),
    gtprice: z.coerce.number().optional(),
    ltprice: z.coerce.number().optional(),
    available: z.boolean().optional(),
});

export default function FilterForm({ children }: any) {
    const router = useRouter();
    const [showFilter, setShowFilter] = useState(true);
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof FilterSchema>>({
        resolver: zodResolver(FilterSchema),
        defaultValues: {
            bike: searchParams.get('bike') || '',
            part: searchParams.get('part') || '',
            query: searchParams.get('query') || '',
            gtprice: searchParams.get('gtprice') ? parseInt(searchParams.get('gtprice')!) : 0,
            ltprice: searchParams.get('ltprice') ? parseInt(searchParams.get('ltprice')!) : 100000,
            available: searchParams.get('available') === 'true',
        },
    });

    function onSubmit(data: z.infer<typeof FilterSchema>) {
        const params = new URLSearchParams();
        console.log(data);
        if (data.bike && data.bike !== "NULL") params.append('bike', data.bike);
        if (data.part && data.part !== "NULL") params.append('part', data.part);
        if (data.query) params.append('query', data.query);
        if (data.gtprice) {
            // Converting price to PKR
            
            params.append('gtprice', data.gtprice.toString());
        }
        if (data.ltprice && data.ltprice !== 100000) params.append('ltprice', data.ltprice.toString());
        if (data.available) params.append('available', data.available.toString());

        router.push(`/products?${params.toString()}`);
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-10 md:grid-cols-4 gap-4">
                    <div className="md:space-y-3 col-span-1 sm:col-span-4 md:col-span-1">
                        {showFilter ? <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="bike"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>Filter By Bike</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="Filter By Bike" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="NULL">All Bikes</SelectItem>
                                                {BIKES.map(({ label }, i) => (
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
                                name="part"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>Filter By Part</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="Filter By Part" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="NULL">All Parts</SelectItem>
                                                <SelectItem value="Air">Air</SelectItem>
                                                <SelectItem value="Clutch">Clutch</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2 col-span-2">
                                <FormLabel>PKR Price Range</FormLabel>
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name="gtprice"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {" - "}
                                    <FormField
                                        control={form.control}
                                        name="ltprice"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Input type="number" placeholder="100000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem className="mb-4 col-span-2 flex justify-end">
                                        <FormControl>
                                            <div className="flex items-center">
                                                <Checkbox className="data-[state=checked]:bg-primary-yellow data-[state=checked]:border-primary-yellow" checked={field.value} onCheckedChange={field.onChange} id="available" />
                                                <FormLabel htmlFor="available" className="ml-2">
                                                    Available
                                                </FormLabel>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div> : <></>}
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            <Button type="button" onClick={() => setShowFilter(!showFilter)} className={`sm:hidden w-full ${showFilter ? 'bg-primary-red' : 'bg-primary-yellow'} text-white p-2 rounded-md`}>
                                {showFilter ? 'Hide Filters' : 'Show Filters'}
                            </Button>
                            {showFilter && <Button type="submit" className="w-full bg-primary-yellow text-white p-2 rounded-md shadow">
                                Filter
                            </Button>}
                        </div>
                    </div>
                    <div className="col-span-1 sm:col-span-6 md:col-span-3">

                        <div className="flex items-end gap-2">
                            <FormField
                                control={form.control}
                                name="query"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Search</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Air Filter..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow hover:bg-yellow-600">
                                Search
                            </Button>
                        </div>
                        
                        <div className="mt-4">
                            {children}
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
