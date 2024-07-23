// "use client";

// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"
// import { imageToBase64 } from "@/app/utils/imageToBase64";
// import { addProduct, editProduct } from "./server";
// import { DialogClose } from "@radix-ui/react-dialog";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { base64ToFile } from "@/app/utils/base64ToImage";
// import { getAllCategoriesLabels } from "../categories/server";
// import { Category } from "../categories/columns";
// import { Textarea } from "@/components/ui/textarea";

// const productSchema = z.object({
//     title: z.string().min(2, {
//         message: 'Title must be at least 2 characters.',
//     }),
//     description: z.string().nonempty({
//         message: 'Description is required.',
//     }),
//     price: z.coerce.number().nonnegative({
//         message: 'Price must be a positive number.',
//     }),
//     images: z.array(z.string().nonempty({
//         message: 'Each image must be a non-empty string.',
//     })).nonempty({
//         message: 'At least one image is required.',
//     }),
//     stock: z.coerce.number().nonnegative({
//         message: 'Stock must be a non-negative number.',
//     }),
//     category: z.string()
// });

// type InputFormProps = {
//     id?: string;
//     title?: string;
//     description?: string;
//     price?: number;
//     images?: string[];
//     stock?: number;
//     category?: string;
// };

// export function InputForm({ id='', title = '', description = '', price = 0, images = [], stock = 0, category = '' }: InputFormProps) {

//     const router = useRouter();
//     const [categories, setCategories] = useState<Category[]>([]);

//     useEffect(() => {
//         getAllCategoriesLabels()
//         .then(res => {
//             const cats = JSON.parse(res as string);
//             setCategories(cats);
//         })
//     }, []);

//     const form = useForm<z.infer<typeof productSchema>>({
//         resolver: zodResolver(productSchema),
//         defaultValues: {
//             title,
//             description,
//             price,
//             images,
//             stock,
//             category
//         },
//     });

//     async function onSubmit(data: z.infer<typeof productSchema>) {
//         console.log(data);
//         try {
//             if (id) { // Means editing
//                 await editProduct(id, data.title, data.description, data.images, data.price, data.stock, data.category.toString());
//                 toast({
//                     title: 'Product updated successfully!',
//                 });
//             } else {
//                 await addProduct(data.title, data.description, data.images, data.price, data.stock, data.category.toString());
//                 toast({
//                     title: 'Product uploaded successfully!',
//                 });
//             }
//             router.refresh();
//         } catch (err) {
//             toast({
//                 title: "Couldn't upload product !",
//                 variant: "destructive"
//             });
//         }
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                 <FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Title</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Product title" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Description</FormLabel>
//                             <FormControl>
//                                 <Textarea placeholder="Product description" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="category"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Category</FormLabel>
//                             <FormControl>
//                             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Category" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {categories && categories.map(({_id, title}, i) => (
//                                         <SelectItem key={i} value={_id} defaultChecked={category == _id}>{title}</SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Price in USD</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Product price" type="number" {...field}  />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="stock"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Stock</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Product stock" type="number" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="images"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Images</FormLabel>
//                             <FormControl>
//                                 <Textarea
//                                     placeholder="Product Images seperated by lines"
//                                     {...field}
//                                     value={field.value.join("\n")}
//                                     onChange={e => {
//                                         const { value } = e.target;
//                                         field.onChange(value.split('\n'));
//                                         console.log(field.value);
//                                     }}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 {/* <DialogClose asChild> */}
//                     <Button type="submit">Save</Button>
//                 {/* </DialogClose> */}
//             </form>
//         </Form>
//     );
// }


// export function DialogAddButton() {
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="outline">Add</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Add Product</DialogTitle>
//                 </DialogHeader>
//                 <InputForm />
//             </DialogContent>
//         </Dialog>
//     )
// }
