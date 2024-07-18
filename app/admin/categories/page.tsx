import { Button } from "@/components/ui/button"
import { Category, columns } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link"
import { DialogAddButton } from "./form"
import { dbConnect } from "@/lib/dbConnect"
import { CategoryModel } from "@/app/models/category"

async function getData(): Promise<Category[]> {
  await dbConnect();
  return await CategoryModel.find();
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex gap-4 justify-between items-center">
        <h1 className="text-xl font-semibold">Categories</h1>
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
