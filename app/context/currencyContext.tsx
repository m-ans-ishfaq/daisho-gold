"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrencyPreference, getCurrencyRates } from '../lib/curreny';

const CurrencyContext = createContext({
  currency: 'USD',
  currencyRates: {},
  setCurrency: (currency: string) => {}
});

export const CurrencyProvider = ({ children }: any) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyRates, setCurrencyRates] = useState<undefined|object>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preferredCurrency = getCurrencyPreference();
      if (preferredCurrency) {
        setCurrency(preferredCurrency);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchCurrencyRates() {
      const rates = await getCurrencyRates();
      setCurrencyRates(rates);
    }

    fetchCurrencyRates();
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
