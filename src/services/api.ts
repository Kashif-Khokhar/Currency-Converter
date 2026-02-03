export const fetchExchangeRates = async (baseCurrency: string) => {
    try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
        if (!res.ok) throw new Error('Failed to fetch exchange rates');
        return await res.json();
    } catch (error) {
        console.error('Error fetching rates:', error);
        throw error;
    }
};
