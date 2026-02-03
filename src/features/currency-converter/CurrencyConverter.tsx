import React, { useState, useEffect, useCallback } from 'react';
import './CurrencyConverter.css';
import CurrencyDropdown from '../../components/common/CurrencyDropdown';
import { fetchExchangeRates } from '../../services/api';
import { worldCurrencies, type CurrencyInfo } from '../../data/currencies';

const CurrencyConverter: React.FC = () => {
  const defaultFrom = worldCurrencies.find(c => c.code === 'USD') || worldCurrencies[0];
  const defaultTo = worldCurrencies.find(c => c.code === 'GBP') || worldCurrencies[1];

  const [amount, setAmount] = useState<number>(1.00);
  const [fromCurrency, setFromCurrency] = useState<CurrencyInfo>(defaultFrom);
  const [toCurrency, setToCurrency] = useState<CurrencyInfo>(defaultTo);
  const [result, setResult] = useState<string>('--. --');
  const [rateDetails, setRateDetails] = useState<string>('Connecting to market...');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const convert = useCallback(async () => {
    if (!amount || amount <= 0) {
      setResult('--. --');
      setRateDetails('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setResult('...');

    try {
      const data = await fetchExchangeRates(fromCurrency.code);
      const rate = data.rates[toCurrency.code];
      const total = (amount * rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      setResult(`${total} ${toCurrency.code}`);
      setRateDetails(`1 ${fromCurrency.code} = ${rate.toFixed(4)} ${toCurrency.code}`);
    } catch {
      setResult('Error');
      setRateDetails('Failed to fetch rates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency.code, toCurrency.code]);

  useEffect(() => {
    convert();
  }, [convert]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="app-container">
      <div className="exchange-card">
        <div className="header">
          <h2>Currency <span className="pro-label">PRO</span></h2>
          <p>Search & Convert Worldwide</p>
        </div>

        <div className="input-container">
          <label htmlFor="amount">Amount to Convert</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="selection-grid">
          <CurrencyDropdown
            label="From"
            selectedCurrency={fromCurrency}
            onSelect={setFromCurrency}
            type="from"
          />

          <button className="swap-btn" onClick={swapCurrencies} aria-label="Swap Currencies">
            ⇅
          </button>

          <CurrencyDropdown
            label="To"
            selectedCurrency={toCurrency}
            onSelect={setToCurrency}
            type="to"
          />
        </div>

        <div className="result-panel">
          <div className="result-header">Converted Amount</div>
          <div id="resultText" className={isLoading ? 'loading' : ''}>{result}</div>
          <div id="rateDetails">{rateDetails}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
