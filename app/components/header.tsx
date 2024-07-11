"use client";
import Image from "next/image";
import { DaishoGoldLogo } from "../assets";
import { IoSearch } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { FaCoins } from "react-icons/fa6";
import { MdOutlineMenu, MdOutlineShoppingCart } from "react-icons/md";
import { CurrencyList, DefaultCurrency, getCurrencyPreference, getCurrencyRates, setCurrencyPreference } from "../lib/curreny";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { Categories } from "../containers/categories";
import { Category } from "../lib/category";

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

    const [currency, setCurrency] = useState(getCurrencyPreference());
    const [showCurrency, setShowCurrency] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setShowCurrency(c => !c)}
                className="flex items-center gap-2 font-semibold hover:text-red-500"
            >
                <FaCoins />
                <span>{currency}</span>
            </button>
            {showCurrency && <ul className="bg-white border-2 divide-y flex flex-col absolute top-16">
                {CurrencyList.map((c,i) => (
                    <li key={i} className="font-medium hover:bg-red-500 hover:text-white">
                        <button
                            className="pl-4 pr-8 py-2"
                            onClick={() => {
                                setCurrencyPreference(c);
                                setCurrency(c);
                                getCurrencyRates();
                                setShowCurrency(false);
                                location.reload();
                            }}
                        >
                            {c}
                        </button>
                    </li>
                ))}
            </ul>}
        </div>
    )
}

const CategoryComponent = () => {

    const categories = Category.getCategories();

    return (
        <div className="group relative">
            <button
                className="flex items-center gap-2 font-semibold hover:text-red-500"
            >
                <BiCategory />
                <span>Categories</span>
            </button>
            <div className="hidden group-focus-within:flex bg-white border-2 divide-y flex-col absolute top-16">
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

const NotLoggedInComponent = () => (
    <div className="flex gap-2 divide-x-2 font-semibold">
        <Link className="px-4 hover:underline hover:text-red-500" href="/log-in">Log In</Link>
        <Link className="px-4 hover:underline hover:text-red-500" href="/register">Register</Link>
    </div>
)

export function Header()
{
    const [toggle, setToggle] = useState(false);

    return (
        <header className="relative z-[1001] border-b h-20 flex justify-center px-4">
            <div className="container flex justify-between items-center">
                {/* Left Side */}
                <div className="flex gap-4 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer">
                        <Image src={DaishoGoldLogo} alt="Daisho Gold Logo" className="w-[44px] object-contain" />
                        <span className="font-bold text-xl">
                            DAISHO GOLD
                        </span>
                    </Link>
                    <div className="hidden lg:flex">
                        <SearchComponent />
                    </div>
                </div>
                {/* Right Side */}
                <div className="flex gap-4 lg:gap-8 items-center">
                    <button
                        className="md:hidden text-4xl"
                        onClick={() => setToggle(x => !x)}
                    >
                        {toggle ? <MdOutlineClose /> : <MdOutlineMenu />}
                    </button>
                    {/* Desktop Exclusive */}
                    <div className="hidden md:flex gap-4 lg:gap-8 items-center">
                        <NotLoggedInComponent />
                        <CategoryComponent />
                        <CartComponent notification={true} />
                        {(typeof window != "undefined") && <CurrencyComponent />}
                        <AboutUsComponent />
                    </div>
                </div>
            </div>
            {/* Mobile Exclusive */}
            <div className={`transition-all duration-300 p-4 flex justify-center bg-neutral-100 fixed z-[1001] top-20 ${toggle ? 'left-0' : 'left-full'} w-full h-[calc(100vh-80px)]`}>
                <div className="container flex flex-col gap-8">
                    <SearchComponent />
                    <div className="flex flex-col gap-8">
                        <CartComponent notification={true} />
                        <CategoryComponent />
                        {(typeof window != "undefined") && <CurrencyComponent />}
                        <AboutUsComponent />
                    </div>
                    <NotLoggedInComponent />
                </div>
            </div>
        </header>
    )
}