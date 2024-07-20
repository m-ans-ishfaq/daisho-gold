import { FaStar } from "react-icons/fa6";
import { RiCouponLine } from "react-icons/ri";
import { convertPrice } from "../lib/curreny";
import { useEffect, useLayoutEffect, useState } from "react";
import { useCurrency } from "../context/currencyContext";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export interface IProduct
{
    _id: string,
    outOfStock: boolean,
    title: string,
    isCouponAvailable: boolean,
    reviews: number,
    sold: number,
    rating: number,
    price: number,
    currency: string,
    image: string
}

export function SkeletonProductCard()
{
    return (
        <div className="border border-neutral-400 gap-4 flex flex-col space-y-4">
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

export function ProductCard({ productProps }: { productProps: IProduct })
{
    const { currency, currencyRates } = useCurrency();
    const { _id, outOfStock, title, isCouponAvailable, reviews, rating, sold, price, currency: productCurrency, image } = productProps;
    const [amount, setAmount] = useState<{ currency: string, price: number }>({ currency, price });

    const stars = new Array(5).fill(0)
                .map((x,i) => i < rating);
    
    useEffect(() => {
        convertPrice(price, productCurrency, currency, currencyRates)
        .then(am => {
            setAmount({ currency: am.currency, price: am.price });
        })
    }, [currency]);
    
    return (
        <Link href={`/product/${encodeURIComponent(title)}-${_id}`} className="h-full">
            <article className="h-full relative p-4 border border-neutral-200 cursor-pointer hover:shadow-lg hover:border-neutral-700 flex flex-col gap-4">
                {outOfStock && <span className="bg-red-500 text-white py-1 px-4 text-sm font-medium absolute rounded-full top-4 right-4">OUT OF STOCK</span>}
                <img src={image} alt={title + " image"} className="w-full object-contain h-60" />
                <div className="flex flex-col h-full justify-between gap-4">
                    <h4 className="text-lg font-bold">{title}</h4>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 flex-wrap items-end justify-between">
                            <span className="text-neutral-600">
                                {sold} Sold, {reviews} Reviews
                            </span>
                            {isCouponAvailable && <span className="bg-yellow-500 text-white py-1 px-2 rounded-xl font-medium flex justify-center gap-2 items-center">
                                <RiCouponLine />
                                <span className="text-xs">COUPON AVAILABLE</span>
                            </span>}
                        </div>
                        <div className="flex gap-2 flex-wrap justify-between">
                            <span className="flex gap-1 items-center">
                                {rating + " "}
                                {stars.map((isColored, i) => (
                                    <FaStar size={16} key={i} className={isColored ? 'text-yellow-500' : 'text-neutral-300'} />
                                ))} 
                            </span>
                            <span className="text-2xl font-semibold">
                                {amount.currency} {amount.price}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}