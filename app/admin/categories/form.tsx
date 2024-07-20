"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { imageToBase64 } from "@/app/utils/imageToBase64";
import { addCategory, editCategory } from "./server";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { base64ToFile } from "@/app/utils/base64ToImage";

const CategorySchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    image: z.string().nonempty({ message: 'Image is required.' }),
});

type InputFormProps = {
    id?: string;
    title?: string;
    image?: string;
};

export function InputForm({ id='', title = '', image = '' }: InputFormProps) {

    const router = useRouter();

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            title,
            image,
        },
    });

    async function onSubmit(data: z.infer<typeof CategorySchema>) {
        try {
            if (id) { // Means editing
                await editCategory(id, data.title, data.image);
                toast({
                    title: 'Category updated successfully!',
                });
            } else {
                await addCategory(data.title, data.image);
                toast({
                    title: 'Category uploaded successfully!',
                });
            }
            router.refresh();
        } catch (err) {
            toast({
                title: "Couldn't upload category !",
                variant: "destructive"
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Category title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Category image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose asChild>
                    <Button type="submit">Save</Button>
                </DialogClose>
            </form>
        </Form>
    );
}


export function DialogAddButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <InputForm />
            </DialogContent>
        </Dialog>
    )
}
