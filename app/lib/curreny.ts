export class Currency
{
    static DefaultCurrency = "PKR";
    static CurrencyList = ["BRL", "INR", "BDT", "PKR", "THB", "NPR"];

    static setCurrencyPreference(currency: string) {
        const validCurrencies = this.CurrencyList;
        if (validCurrencies.includes(currency)) {
            localStorage.setItem('currencyPreference', currency);
            console.log(`Currency preference set to: ${currency}`);
        } else {
            console.error(`Invalid currency: ${currency}. Valid options are: ${validCurrencies.join(", ")}`);
        }
    }

    static getCurrencyPreference() {
        const currency = localStorage.getItem('currencyPreference');
        
        if (currency) {
            return currency;
        } else {
            return this.DefaultCurrency;
        }
    }
}