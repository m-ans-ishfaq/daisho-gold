import { PARTS_DATA } from "@/app/assets/parts"
import Link from "next/link";

export function CategoriesByParts()
{
    const categories = PARTS_DATA;

    return (
        <section className="flex justify-center p-4">
            <div className="container px-0 space-y-4">
                <h2 className="text-2xl font-bold">Bike Parts</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {categories.map(({label, img}, i) => (
                        <Link href={`/products?part=${encodeURIComponent(label)}`} key={i} className="border rounded-md hover:shadow-lg hover:border-neutral-800 cursor-pointer pr-4 flex items-center gap-4">
                            <img className="w-16 h-full object-cover" src={img} alt={label} />
                            <span className="font-semibold">{label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}