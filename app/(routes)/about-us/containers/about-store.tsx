import { BikeShop } from "@/app/assets";
import Image from "next/image";
import Link from "next/link";

export function AboutStore()
{

    const SUPPLIERS = [
        { name: "HYH Mechanics", city: "São Paulo", country: "Brazil" },
        { name: "Grampati Motors", city: "Delhi", country: "India" },
        { name: "Waseem Traders", city: "Chattogram", country: "Bangladesh" },
        { name: "Irshad Autos", city: "Lahore", country: "Pakistan" },
        { name: "Janjok Thai Auto", city: "Chiang Mai", country: "Thailand" },
        { name: "नेपाल अटो", city: "Kathmandu", country: "Nepal" }
    ];
    

    return (
        <div id="store" className="py-8 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative w-full h-full group flex justify-center group items-center">
                <Image src={BikeShop} alt="Bike Shop" className="relative z-[2] w-full h-full object-cover" />
                <div className="transition-all duration-300 top-0 left-0 absolute w-full h-full z-[3] bg-primary-yellow bg-opacity-0 group-hover:bg-opacity-50" />
                <Link href="/#products" className="absolute z-[4] transition-all duration-300 opacity-0 group-hover:opacity-100 bg-white bg-opacity-80 hover:bg-opacity-100 font-semibold text-black px-6 py-3">
                    SHOP NOW
                </Link>
            </div>
            <div>
                <h4 className="text-primary-yellow font-medium text-sm">
                    SEEMINGLY ELEGANT DESIGN
                </h4>
                <h2 className="font-medium text-3xl">
                    About our online store
                </h2>
                <div className="mt-4 space-y-2">
                    <p>DAISHO GOLD is an international company that provides you with the best high quality products within the market place.</p>
                    <p>We do not have many branches of our company but we have given agencies to reliable and well-respected businessmen of different nations. Our business is really wide in different countries like BRAZIL, INDIA, PAKISTAN, BANGLADESH, THAILAND, NEPAL, INDONESIA, ETC.</p>
                    <p>Businessmen who have our agencies work as our main supplier for that country. Each country has only one main supplier of our Company’s products.</p>
                    <p>Get 3% cash back on every online purchase, credited to your Gold Wallet. Use your cash back for discounts or even free products.</p>
                    <p>Our suppliers include:</p>
                    <ul className="flex flex-wrap gap-2">
                        {SUPPLIERS.map(({city, country, name}, i) => (
                            <li key={i} className="py-2 px-4 hover:border-neutral-600 border flex flex-col">
                                <p>{name}</p>
                                <p className="text-neutral-400 font-medium text-sm">
                                    <span>{city}</span>
                                    {" - "}
                                    <span>{country}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}