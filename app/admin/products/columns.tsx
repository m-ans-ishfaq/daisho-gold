// "use client"

// import { Button } from "@/components/ui/button";
// import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
// import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { ColumnDef } from "@tanstack/react-table"
// import { InputForm } from "./form";
// import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
// import { deleteProduct } from "./server";
// import { toast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { useEffect, useState } from "react";
// import { getAllCategoriesLabels } from "../categories/server";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// export type Product = {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   images: string[];
//   stock: number;
//   category?: string;
// }

// export const columns: ColumnDef<Product>[] = [
//   {
//     accessorKey: "images",
//     header: "Images",
//     cell: ({ row }) => {
//       const responsive = {
//         superLargeDesktop: {
//           breakpoint: { max: 4000, min: 1024 },
//           items: 1
//         },
//         desktop: {
//           breakpoint: { max: 1024, min: 768 },
//           items: 1
//         },
//         tablet: {
//           breakpoint: { max: 768, min: 464 },
//           items: 1
//         },
//         mobile: {
//           breakpoint: { max: 464, min: 0 },
//           items: 1
//         }
//       };

//       const images = row.original.images;

//       return (
//         <div className="w-20">
//           <Carousel
//             responsive={responsive}
//             arrows={true}
//             customLeftArrow={
//               <FaChevronLeft
//                 size={12}
//                 className="absolute top-1/2 left-0 max-w-4 cursor-pointer text-primary-400"
//               />
//             }
//             customRightArrow={
//               <FaChevronRight
//                 size={12}
//                 className="absolute top-1/2 right-0 max-w-4 cursor-pointer text-primary-400"
//               />
//             }
//             swipeable draggable infinite
//           >
//               {images.map((pic, index) => (
//                   <div key={index}>
//                       <img src={pic} alt={`Banner ${index + 1}`} className="w-full object-contain" />
//                   </div>
//               ))}
//           </Carousel>
//         </div>
//       )
//     }
//   },
//   {
//     accessorKey: "title",
//     header: "Title",
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//     cell: ({ row }) => {

//       const [category, setCategory] = useState("Loading...");

//       useEffect(() => {
//         getAllCategoriesLabels()
//         .then(res => {
//           const cats = JSON.parse(res as string);
//           const cat = cats.find((cat:any) => cat._id == row.original.category);
//           if (cat) setCategory(cat.title);
//         })
//       }, [])

//       return category;
//     }
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//     cell: ({ row }) => "$" + row.original.price
//   },
//   {
//     accessorKey: "stock",
//     header: "Stock",
//   },
//   {
//     accessorKey: "Action",
//     header: () => <div className="text-right">Action</div>,
//     cell: ({ row }) => {

//       const router = useRouter();

//       const handleDelete = async () => {
//         console.log(row);
//         const id = row.original._id;
//         console.log(id);
//         try {
//           await deleteProduct(id);
//           toast({
//             title: 'Product deleted successfully!',
//           });
//           router.refresh();
//         } catch(err) {
//           console.error(err);
//           toast({
//             title: "Product couldn't be deleted !",
//             variant: 'destructive'
//         });
//         }
//       }

//       return (
//         <div className="text-right font-medium">
//           <Dialog>
//             <DialogTrigger asChild>
//                 <Button size={'icon'} variant="outline">
//                   <Pencil1Icon />
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Edit Product</DialogTitle>
//                 </DialogHeader>
//                 <InputForm
//                   id={row.original._id}
//                   title={row.original.title}
//                   description={row.original.description}
//                   images={row.original.images}
//                   price={row.original.price}
//                   stock={row.original.stock}
//                   category={row.original.category}
//                 />
//             </DialogContent>
//           </Dialog>
//           <Dialog>
//             <DialogTrigger asChild>
//                 <Button size={'icon'} variant="outline">
//                   <TrashIcon />
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Delete Product</DialogTitle>
//                 </DialogHeader>
//                 <DialogDescription>Are you sure you want to delete <b>{row.getValue("title")}</b> product ? This action can{"'"}t be undone</DialogDescription>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button onClick={() => handleDelete()} variant="destructive">Delete</Button>
//                   </DialogClose>
//                 </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       );
//     }
//   }
// ]
