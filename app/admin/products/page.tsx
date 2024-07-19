import { Button } from "@/components/ui/button"
import { Product, columns } from "./columns"
import Link from "next/link"
import { DialogAddButton } from "./form"
import { dbConnect } from "@/lib/dbConnect"
import { DataTable } from "@/components/ui/data-table"
import { ProductModel } from "@/app/models/product"

export const dynamic = 'force-dynamic'

async function getData(): Promise<Product[]> {
  await dbConnect();
  return await ProductModel.find();
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex gap-4 justify-between items-center">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex gap-2">
          <DialogAddButton />
          <Link href="/admin">
            <Button variant={"destructive"}>Go Back</Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
