const conversionRatesCached = {
    time: new Date(),
    rates: {}
};

export const DefaultCurrency = "USD";
export const CurrencyList = ["USD", "BRL", "INR", "BDT", "PKR", "THB", "NPR"];
export const CurrencyExchangeHref = "https://v6.exchangerate-api.com/v6/aef802c29aa2bc8c68134eb3/latest/USD";

export function setCurrencyPreference(currency: string)
{
    const validCurrencies = CurrencyList;
    if (validCurrencies.includes(currency)) {
        localStorage.setItem('currencyPreference', currency);
        console.log(`Currency preference set to: ${currency}`);
    } else {
        console.error(`Invalid currency: ${currency}. Valid options are: ${validCurrencies.join(", ")}`);
    }
}

export function getCurrencyPreference()
{
    const currency = localStorage.getItem('currencyPreference');
    
    if (currency) {
        return currency;
    } else {
        return DefaultCurrency;
    }
}

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

export async function convertPrice(price: number, currency: string, targetCurrency: string, currencyRates: any) {
    if (currencyRates && targetCurrency in currencyRates) {
      const conversionRate = parseFloat(currencyRates[targetCurrency]);
  
      let convertedPrice;
      if (currency === 'USD') {
        // Convert from USD to the target currency
        convertedPrice = price * conversionRate;
      } else {
        // Convert from the given currency to USD first, then to the target currency
        const usdToGivenCurrencyRate = parseFloat(currencyRates[currency]);
        convertedPrice = (price / usdToGivenCurrencyRate) * conversionRate;
      }
  
      convertedPrice = parseFloat(convertedPrice.toFixed(2));
  
      return { currency: targetCurrency, price: convertedPrice };
    } else {
      // Handle the case where currency rates are undefined or target currency is not found
      return { currency: currency, price: price };
    }
  }
  