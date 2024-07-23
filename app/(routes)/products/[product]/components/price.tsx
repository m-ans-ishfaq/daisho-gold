"use client";

import { useCurrency } from "@/app/context/currencyContext";
import { convertPrice } from "@/app/lib/curreny";
import { useEffect, useState } from "react";

export const PriceTag = ({ priceInUsd }: { priceInUsd: number }) => {
    
    const [amount, setAmount] = useState(priceInUsd);
    const [priceCurrency, setPriceCurrency] = useState("USD");
    const { currency, currencyRates } = useCurrency();

    useEffect(() => {
        convertPrice(priceInUsd, "PKR", currency, currencyRates)
        .then(am => {
            setPriceCurrency(am.currency);
            setAmount(am.price);
        })
    }, [currency]);

    return (
        <p className="text-2xl font-bold text-primary-yellow">
            {priceCurrency} {amount}
        </p>
    )

}