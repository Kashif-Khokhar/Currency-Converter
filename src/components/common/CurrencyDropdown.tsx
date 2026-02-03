import React, { useState, useRef, useEffect } from 'react';
import { worldCurrencies, type CurrencyInfo } from '../../data/currencies';

interface CurrencyDropdownProps {
    label: string;
    selectedCurrency: CurrencyInfo;
    onSelect: (currency: CurrencyInfo) => void;
    type: 'from' | 'to';
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ label, selectedCurrency, onSelect, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredCurrencies = worldCurrencies.filter(curr =>
        curr.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curr.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curr.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="select-box" ref={dropdownRef}>
            <label>{label}</label>
            <div className={`custom-dropdown ${type}-dropdown`}>
                <div
                    className="selected-display"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src={`https://flagsapi.com/${selectedCurrency.countryCode}/flat/64.png`}
                        alt={selectedCurrency.country}
                    />
                    <div className="selected-text-group">
                        <span className="code">{selectedCurrency.code}</span>
                        <span className="country-name">{selectedCurrency.country}</span>
                    </div>
                    <div className="arrow"></div>
                </div>

                {isOpen && (
                    <div className="dropdown-content show">
                        <input
                            type="text"
                            placeholder="Search country or currency..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                        <div className="options-list">
                            {filteredCurrencies.map((curr, index) => (
                                <div
                                    key={`${curr.code}-${curr.countryCode}-${index}`}
                                    className="option-item"
                                    onClick={() => {
                                        onSelect(curr);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                >
                                    <img
                                        src={`https://flagsapi.com/${curr.countryCode}/flat/64.png`}
                                        alt={curr.country}
                                    />
                                    <div className="option-text-group">
                                        <div className="top-row">
                                            <span className="code">{curr.code}</span>
                                            <span className="country">{curr.country}</span>
                                        </div>
                                        <span className="name">{curr.name}</span>
                                    </div>
                                </div>
                            ))}
                            {filteredCurrencies.length === 0 && (
                                <div className="option-item no-results">No results found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyDropdown;
