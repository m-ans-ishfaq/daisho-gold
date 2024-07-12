import Image, { StaticImageData } from "next/image";
import { FaStar } from "react-icons/fa6";
import { RiCouponLine } from "react-icons/ri";
import { convertPrice } from "../lib/curreny";
import { useEffect, useLayoutEffect, useState } from "react";
import { useCurrency } from "../context/currencyContext";

export interface IProduct
{
    outOfStock: boolean,
    title: string,
    isCouponAvailable: boolean,
    reviews: number,
    sold: number,
    rating: number,
    price: number,
    currency: string,
    image: StaticImageData
}

export function ProductCard({ productProps }: { productProps: IProduct })
{
    const { currency, currencyRates } = useCurrency();
    const { outOfStock, title, isCouponAvailable, reviews, rating, sold, price, currency: productCurrency, image } = productProps;
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
        <article className="relative p-4 border border-neutral-200 cursor-pointer hover:shadow-lg hover:border-neutral-700 flex flex-col gap-4">
            {outOfStock && <span className="bg-red-500 text-white py-1 px-4 text-sm font-medium absolute rounded-full top-4 right-4">OUT OF STOCK</span>}
            <Image src={image} alt={title + " image"} className="w-full object-contain h-60" />
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
    );
}