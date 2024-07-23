"use client";

import { RiCouponLine } from "react-icons/ri";
import { convertPrice } from "../lib/curreny";
import { useEffect, useState } from "react";
import { useCurrency } from "../context/currencyContext";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { IProductCard } from "../models/product";
import { capitalize } from "../lib/format";

export function SkeletonProductCard()
{
    return (
        <div className="border gap-4 flex flex-col space-y-4">
            <Skeleton className="h-60 w-full" />
            <div className="p-4 pt-0 space-y-2">
                <Skeleton className="h-4 w-[75%]" />
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-4 w-[70%]" />
                <div className="mt-4 flex justify-end">
                    <Skeleton className="h-4 w-[30%]" />
                </div>
            </div>
        </div>
    )
}

export function ProductCard({ productProps }: { productProps: IProductCard })
{
    const { currency, currencyRates } = useCurrency();
    const { _id, outOfStock, title, bike, category, isCouponAvailable, price, currency: productCurrency, image } = productProps;
    const [amount, setAmount] = useState<{ currency: string, price: number }>({ currency, price });

    useEffect(() => {
        convertPrice(price, productCurrency, currency, currencyRates)
        .then(am => {
            setAmount({ currency: am.currency, price: am.price });
        })
    }, [currency, currencyRates, price, productCurrency]);
    
    return (
        <Link href={`/products/${encodeURIComponent(title)}-${_id}`} className="h-full">
            <article className="group h-full relative p-4 border border-neutral-200 cursor-pointer hover:shadow-lg hover:border-neutral-700 flex flex-col gap-4">
                {outOfStock && <span className="bg-red-500 text-white py-1 px-4 text-sm font-medium absolute rounded-full top-4 right-4">OUT OF STOCK</span>}
                <div className="w-full h-60">
                    <img
                        src={image}
                        alt={title + " image"} 
                        className="w-full object-contain h-full"
                        onError={(e:any) => {
                            e.target.onerror = null;
                            e.target.src = "/logo.png";
                        }}
                    />
                </div>
                <div className="flex flex-col justify-between h-full gap-4">
                    <h4 className="text-lg font-bold capitalize">{title}</h4>
                    <div className="flex flex-col">
                        <div className="flex gap-2 flex-wrap items-end justify-between">
                            <span className="text-primary-yellow font-semibold">
                                {bike}
                            </span>
                            {isCouponAvailable && <span className="bg-yellow-500 text-white py-1 px-2 rounded-xl font-medium flex justify-center gap-2 items-center">
                                <RiCouponLine />
                                <span className="text-xs">COUPON AVAILABLE</span>
                            </span>}
                        </div>
                        <div className="flex gap-2 flex-wrap justify-between">
                            <span className="flex gap-1 items-center font-medium text-neutral-400">
                                {capitalize(category!)}
                            </span>
                            <span className="text-2xl font-semibold group-hover:text-primary-red">
                                {amount.currency} {amount.price}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}