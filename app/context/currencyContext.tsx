"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrencyPreference } from '../lib/curreny';
import { getCurrencyRates } from '../utils/getCurrencyRates';

const CurrencyContext = createContext({
  currency: 'USD',
  currencyRates: {},
  setCurrency: (currency: string) => {}
});

export const CurrencyProvider = ({ children }: any) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyRates, setCurrencyRates] = useState<undefined|object>({});

  useEffect(() => {

    async function fetchCurrencyRates() {
      const res = await getCurrencyRates();
      const rates = JSON.parse(res);
      setCurrencyRates(rates);
    }

    fetchCurrencyRates().then(() => {
      const preferredCurrency = getCurrencyPreference();
      if (preferredCurrency) {
        setCurrency(preferredCurrency);
      }
    });

  }, []);

  return (
    // @ts-ignore
    <CurrencyContext.Provider value={{ currency, currencyRates, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook for using the CurrencyContext
export const useCurrency = () => useContext(CurrencyContext);
