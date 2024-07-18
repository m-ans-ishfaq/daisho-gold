"use server";
import fs from 'fs/promises';
import path from 'path';
import { CurrencyExchangeHref } from '../lib/curreny';

const currenciesFilePath = path.resolve(__dirname, 'currencies.json');

export async function getCurrencyRates() {
    const twelveHours = 12 * 60 * 60 * 1000;
    const now = new Date();
    // Read the JSON file
    let conversionRatesCached;
    try {
        const data = await fs.readFile(currenciesFilePath, 'utf-8');
        conversionRatesCached = JSON.parse(data);
    } catch (err) {
        console.error('Error reading currencies.json:', err);
        conversionRatesCached = { time: null, currencies: null };
    }

    // Check if data is null or older than 12 hours
    if (!conversionRatesCached.time || !conversionRatesCached.currencies ||
        (now.getTime() - new Date(conversionRatesCached.time).getTime()) >= twelveHours) {
        try {
            const res = await fetch(CurrencyExchangeHref);
            const data = await res.json();
            console.log(data);
            conversionRatesCached.time = now.toISOString();
            conversionRatesCached.currencies = data.conversion_rates;

            // Write the updated data to the JSON file
            await fs.writeFile(currenciesFilePath, JSON.stringify(conversionRatesCached, null, 2));
            console.log('Fetched new conversion rates');
        } catch (err) {
            console.error('Error fetching new conversion rates:', err);
        }
    } else {
        console.log('Using cached conversion rates');
    }

    return JSON.stringify(conversionRatesCached.currencies);
}