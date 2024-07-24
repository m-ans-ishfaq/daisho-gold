import Link from "next/link";
import { BIKES_DATA } from "@/app/assets/bikes";

export function Categories()
{
    const categories = BIKES_DATA;

    return (
        <article className="bg-neutral-900 text-white font-medium grid grid-cols-2 sm:grid-cols-5">
            {categories.map(({img, label},i) => (
                <Link key={i} href={`/products?bike=${encodeURIComponent(label)}`} className={`flex justify-center items-end relative py-4 hover:bg-neutral-800 group transition-all duration-300 px-4 md:top-0 ${i == 4 ? 'hidden sm:flex' : ''}`}>
                    <img
                        src={img}
                        alt={label}
                        className="w-full object-contain object-center group-hover:animate-scale-up sm:relative sm:-top-3 md:flex"
                    />
                    <label className="font-poppins absolute text-lg sm:text-base md:text-lg md:py-2">
                        {label}
                    </label>
                </Link>
            ))}
        </article>
    )
}