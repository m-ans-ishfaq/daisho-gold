"use client";
const conversionRatesCached = {
    time: new Date(),
    rates: {}
};

export const DefaultCurrency = "PKR";
export const CurrencyList = ["BRL", "INR", "BDT", "PKR", "THB", "NPR"];
export const CurrencyExchangeHref = "https://v6.exchangerate-api.com/v6/aef802c29aa2bc8c68134eb3/latest/USD";

export async function getCurrencyRates()
{
    const twelveHours = 12 * 60 * 60 * 1000;
    const now = new Date();
    
    if ((now.getTime() - conversionRatesCached.time.getTime()) < twelveHours && Object.keys(conversionRatesCached.rates).length > 0) {
        return conversionRatesCached.rates;
    }

    try {
        const res = await fetch(CurrencyExchangeHref);
        const data = await res.json();
        conversionRatesCached.time = new Date();
        conversionRatesCached.rates = data.conversion_rates;
        console.log('Fetched new conversion rates');
        return conversionRatesCached.rates;
    } catch (err) {
        console.error(err);
    }
}