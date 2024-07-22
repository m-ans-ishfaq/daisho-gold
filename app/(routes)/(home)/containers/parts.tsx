import { dbConnect } from "@/lib/dbConnect";
import { CategoryModel } from "@/app/models/category";

export async function CategoriesByParts()
{
    await dbConnect();
    const categories = await CategoryModel.find();

    return (
        <section className="flex justify-center p-4">
            <div className="container px-0 space-y-4">
                <h2 className="text-2xl font-bold">Bike Parts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map(({_id, title, image}) => (
                        <div key={_id as string} className="border rounded-md hover:shadow-lg hover:border-neutral-800 cursor-pointer w-full flex items-center gap-4">
                            <img src={image as string} alt={title as string} className={"w-20 h-20"} />
                            <span className="font-semibold">{title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}