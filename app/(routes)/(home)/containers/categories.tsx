import Link from "next/link";
import { Category } from "../../../lib/category";
import Image from "next/image";

export function Categories()
{
    const categories = Category.getCategoriesForLandingPage();

    return (
        <article className="bg-neutral-900 text-white font-medium grid grid-cols-2 md:grid-cols-5 divide-x divide-y divide-neutral-700">
            {categories.map(({img, label},i) => (
                <Link key={i} href={`/category/${label}`} className="flex justify-center items-end relative py-4 hover:bg-neutral-800 group transition-all duration-300 px-4">
                    <Image
                        src={img}
                        alt={label}
                        className="w-full object-contain group-hover:animate-scale-up"
                    />
                    <label className="font-poppins absolute text-lg md:py-2">
                        {label}
                    </label>
                </Link>
            ))}
        </article>
    )
}