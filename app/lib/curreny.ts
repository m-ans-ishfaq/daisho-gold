const conversionRatesCached = {
    time: new Date(),
    rates: {}
};

export class Currency
{
    static DefaultCurrency = "PKR";
    static CurrencyList = ["BRL", "INR", "BDT", "PKR", "THB", "NPR"];
    static CurrencyExchangeHref = "https://v6.exchangerate-api.com/v6/aef802c29aa2bc8c68134eb3/latest/USD";

    static setCurrencyPreference(currency: string)
    {
        const validCurrencies = this.CurrencyList;
        if (validCurrencies.includes(currency)) {
            localStorage.setItem('currencyPreference', currency);
            console.log(`Currency preference set to: ${currency}`);
        } else {
            console.error(`Invalid currency: ${currency}. Valid options are: ${validCurrencies.join(", ")}`);
        }
    }

    static getCurrencyPreference()
    {
        const currency = localStorage.getItem('currencyPreference');
        
        if (currency) {
            return currency;
        } else {
            return this.DefaultCurrency;
        }
    }

    static async getCurrencyRates()
    {
        const twelveHours = 12 * 60 * 60 * 1000;
        const now = new Date();
        
        if ((now.getTime() - conversionRatesCached.time.getTime()) < twelveHours && Object.keys(conversionRatesCached.rates).length > 0) {
            return conversionRatesCached.rates;
        }

        try {
            const res = await fetch(this.CurrencyExchangeHref);
            const data = await res.json();
            conversionRatesCached.time = new Date();
            conversionRatesCached.rates = data.conversion_rates;
            console.log('Fetched new conversion rates');
            return conversionRatesCached.rates;
        } catch (err) {
            console.error(err);
        }
    }
}