import React from 'react';
import CurrencyConverter from './features/currency-converter/CurrencyConverter';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <CurrencyConverter />
    </div>
  );
};

export default App;
