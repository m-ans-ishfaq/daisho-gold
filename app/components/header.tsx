"use client";
import Image from "next/image";
import { DaishoGoldLogo } from "../assets";
import { IoSearch } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { FaChevronUp, FaCoins } from "react-icons/fa6";
import { MdOutlineMenu, MdOutlineShoppingCart } from "react-icons/md";
import { CurrencyList, DefaultCurrency, getCurrencyPreference, setCurrencyPreference } from "../lib/curreny";
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { Categories } from "../(routes)/(home)/containers/categories";
import { Category } from "../lib/category";
import { useCurrency } from "../context/currencyContext";
import { FaChevronDown } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { getFullnameById } from "../(routes)/user/server";

const CartComponent = ({ notification }: { notification: boolean }) => {
    return (
        <Link href="/cart" className="flex items-center gap-2 font-semibold hover:text-red-500">
            <div className="relative text-2xl">
                <MdOutlineShoppingCart />
                {notification && <div className="absolute w-2 h-2 rounded-full bg-red-500 top-0 right-0" />}
            </div>
            <span>Cart</span>
        </Link>
    )
}

const CurrencyComponent = () => {

    const { currency, setCurrency } = useCurrency();
    const [showCurrency, setShowCurrency] = useState(false);

    return (
        <div className="flex group flex-col gap-4 group relative">
            <div onClick={() => setShowCurrency(x => !x)} className="flex justify-between items-center">
                <button
                    className="flex items-center gap-2 font-semibold hover:text-red-500"
                >
                    <FaCoins />
                    <span>{currency ?? "USD"}</span>
                </button>
                {/* Mobile */}
                <button className="lg:hidden">
                    {showCurrency ? <FaChevronDown /> : <FaChevronUp />}
                </button>
            </div>
            {/* Mobile */}
            {showCurrency && <div className="lg:hidden flex flex-col divide-y">
                {CurrencyList.map((c,i) => (
                    <li key={i} className="list-none font-medium hover:bg-red-500 hover:text-white">
                        <button
                            className="pl-4 pr-8 py-2"
                            onClick={() => {
                                setCurrencyPreference(c);
                                setCurrency(c);
                                setShowCurrency(false);
                            }}
                        >
                            {c}
                        </button>
                    </li>
                ))}
            </div>}
            {/* Desktop */}
            <ul className="bg-white border-2 divide-y hidden lg:group-focus-within:flex flex-col absolute top-16">
                {CurrencyList.map((c,i) => (
                    <li key={i} className="font-medium hover:bg-red-500 hover:text-white">
                        <button
                            className="pl-4 pr-8 py-2"
                            onClick={() => {
                                setCurrencyPreference(c);
                                setCurrency(c);
                                setShowCurrency(false);
                            }}
                        >
                            {c}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const CategoryComponent = () => {

    const [showCategories, setShowCategories] = useState(false);
    const categories = Category.getCategories();

    return (
        <div className="flex flex-col gap-4 group relative">
            <div onClick={() => setShowCategories(x => !x)} className="flex justify-between items-center">
                <button
                    className="flex items-center gap-2 font-semibold hover:text-red-500"
                >
                    <BiCategory />
                    <span>Categories</span>
                </button>
                {/* Mobile */}
                <button className="lg:hidden">
                    {showCategories ? <FaChevronDown /> : <FaChevronUp />}
                </button>
            </div>
            {/* Mobile */}
            {showCategories && <div className="lg:hidden flex flex-col divide-y">
                {categories.map((c,i) => (
                    <Link
                        key={i}
                        href={`/category/${encodeURIComponent(c)}`}
                        className="cursor-pointer py-2 pl-4 pr-8 w-full font-medium hover:bg-red-500 hover:text-white"
                    >
                        {c}
                    </Link>
                ))}
            </div>}
            {/* Desktop */}
            <div className="hidden lg:group-focus-within:flex bg-white border-2 divide-y flex-col absolute top-16">
                {categories.map((c,i) => (
                    <Link
                        key={i}
                        href={`/category/${encodeURIComponent(c)}`}
                        className="cursor-pointer py-2 pl-4 pr-8 w-40 font-medium hover:bg-red-500 hover:text-white"
                    >
                        {c}
                    </Link>
                ))}
            </div>
        </div>
    )
}

const SearchComponent = () => {
    return (
        <div className="relative w-full">
            <input
                placeholder="Search"
                className="w-full border-2 outline-none rounded-md border-red-800 pl-4 pr-12 py-2"
            />
            <button className="absolute top-2 right-3">
                <IoSearch size={24} />
            </button>
        </div>
    )
}

const AboutUsComponent = () => (
    <Link href="/about-us" className="flex items-center gap-2 font-semibold hover:text-red-500">
        <BiSupport />
        <span>About Us</span>
    </Link>
);

const LoggedInComponent = ({ fullName }: { fullName: string }) => (
    <div className="flex gap-2 divide-x-2 font-semibold">
        <Link className="flex items-center gap-2 hover:underline hover:text-red-500" href="/my-account">
            <AiOutlineUser />
            <span>{fullName}</span>
        </Link>
    </div>
)

const NotLoggedInComponent = () => (
    <div className="flex gap-2 divide-x-2 font-semibold">
        <Link className="px-4 hover:underline hover:text-red-500" href="/log-in">Log In</Link>
        <Link className="px-4 hover:underline hover:text-red-500" href="/register">Register</Link>
    </div>
)

export function Header()
{
    const [toggle, setToggle] = useState(false);
    const [fullname, setFullname] = useState<null|string>(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (toggle) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    });

    useEffect(() => {
        console.log(session);
        if (session?.user) {
            getFullnameById(session.user.id)
            .then(res => {
                if (typeof(res) != "string") {
                    setFullname("User");
                } else {
                    setFullname(res);
                }
            })
        }
    }, [session]);

    return (
        <header className="relative z-[1001] border-b h-20 flex justify-center px-4">
            <div className="container flex justify-between items-center">
                {/* Left Side */}
                <div className="flex gap-4 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer">
                        <Image src={DaishoGoldLogo} alt="Daisho Gold Logo" className="w-[2.75rem] object-contain" />
                        <span className="font-bold text-xl">
                            DAISHO GOLD
                        </span>
                    </Link>
                    <div className="hidden xl:flex">
                        <SearchComponent />
                    </div>
                </div>
                {/* Right Side */}
                <div className="flex gap-4 lg:gap-8 items-center">
                    <button
                        className="lg:hidden text-4xl"
                        onClick={() => setToggle(x => !x)}
                    >
                        {toggle ? <MdOutlineClose /> : <MdOutlineMenu />}
                    </button>
                    {/* Desktop Exclusive */}
                    <div className="hidden lg:flex gap-4 lg:gap-8 items-center">
                        {session?.user && fullname ? <LoggedInComponent fullName={fullname} /> : <NotLoggedInComponent />}
                        <CategoryComponent />
                        <CartComponent notification={true} />
                         <CurrencyComponent />
                        <AboutUsComponent />
                    </div>
                </div>
            </div>
            {/* Mobile Exclusive */}
            <div className={`transition-all duration-300 p-4 flex justify-center bg-neutral-100 fixed z-50 overflow-y-auto top-20 ${toggle ? 'left-0' : 'left-full'} w-full h-[calc(100vh-5rem)]`}>
                <div className="container flex flex-col gap-8">
                    <SearchComponent />
                    <div className="flex flex-col gap-8">
                        <CartComponent notification={true} />
                        <CategoryComponent />
                        <CurrencyComponent />
                        <AboutUsComponent />
                    </div>
                    <div className="pb-8">
                        {session?.user && fullname ? <LoggedInComponent fullName={fullname} /> : <NotLoggedInComponent />}
                    </div>
                </div>
            </div>
        </header>
    )
}