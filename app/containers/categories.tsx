import Link from "next/link";
import { Category } from "../lib/category";

export function Categories()
{
    const categories = Category.getCategories();

    return (
        <article className="bg-neutral-900 text-white font-medium grid grid-cols-2 divide-x divide-y divide-neutral-700">
            {categories.map((c,i) => (
                <Link key={i} href={`/${c}`} className="py-4 hover:bg-red-500 px-4">
                    {c}
                </Link>
            ))}
        </article>
    )
}