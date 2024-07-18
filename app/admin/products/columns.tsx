"use client"

import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table"
import { InputForm } from "./form";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { deleteCategory } from "./server";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  stock: number;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="w-40">
          <img className="h-40 object-contain" src={row.getValue("image")} alt={row.getValue("title")} />
        </div>
      )
    }
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "Action",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {

      const router = useRouter();

      const handleDelete = async () => {
        console.log(row);
        const id = row.original._id;
        console.log(id);
        try {
          await deleteCategory(id);
          toast({
            title: 'Category deleted successfully!',
          });
          router.refresh();
        } catch(err) {
          console.error(err);
          toast({
            title: "Category couldn't be deleted !",
            variant: 'destructive'
        });
        }
      }

      return (
        <div className="text-right font-medium">
          <Dialog>
            <DialogTrigger asChild>
                <Button size={'icon'} variant="outline">
                  <Pencil1Icon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <InputForm id={row.original._id} title={row.getValue("title")} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
                <Button size={'icon'} variant="outline">
                  <TrashIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                </DialogHeader>
                <DialogDescription>Are you sure you want to delete "{row.getValue("title")}" Category ? This action can't be undone</DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => handleDelete()} variant="destructive">Delete</Button>
                  </DialogClose>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }
]
