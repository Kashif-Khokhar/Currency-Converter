const currencies = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AWG: "AW",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  BTN: "BT",
  BWP: "BW",
  BYN: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  CHE: "CH",
  CHF: "CH",
  CHW: "CH",
  CLF: "CL",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  COU: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  EGP: "EG",
  ERN: "ER",
  ETB: "ET",
  EUR: "EU",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRU: "MR",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MXV: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  NGN: "NG",
  NIO: "NI",
  NOK: "NO",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SHP: "SH",
  SLE: "SL",
  SOS: "SO",
  SRD: "SR",
  SSP: "SS",
  STN: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYI: "UY",
  UYU: "UY",
  UYW: "UY",
  UZS: "UZ",
  VED: "VE",
  VES: "VE",
  VND: "VN",
  VUV: "VU",
  WST: "WS",
  XAF: "CM",
  XCD: "AG",
  XOF: "BJ",
  XPF: "PF",
  YER: "YE",
  ZAR: "ZA",
  ZMW: "ZM",
  ZWG: "ZW"
};

let fromCurrency = "USD";
let toCurrency = "GBP";

// 1. Initialize List
function renderOptions(type) {
    const list = document.getElementById(`${type}Options`);
    list.innerHTML = "";
    Object.keys(currencies).forEach(code => {
        const div = document.createElement('div');
        div.className = 'option-item';
        div.innerHTML = `<img src="https://flagsapi.com/${currencies[code]}/flat/64.png"> ${code}`;
        div.onclick = (e) => {
            e.stopPropagation();
            selectCurrency(type, code);
        };
        list.appendChild(div);
    });
}

// 2. Dropdown Toggle
function toggleDropdown(type) {
    const fromContent = document.querySelector('#fromDropdown .dropdown-content');
    const toContent = document.querySelector('#toDropdown .dropdown-content');
    
    if(type === 'from') {
        fromContent.classList.toggle('show');
        toContent.classList.remove('show');
    } else {
        toContent.classList.toggle('show');
        fromContent.classList.remove('show');
    }
}

// 3. Selection Logic
function selectCurrency(type, code) {
    if(type === 'from') fromCurrency = code;
    else toCurrency = code;
    
    document.getElementById(`${type}Text`).innerText = code;
    document.getElementById(`${type}Flag`).src = `https://flagsapi.com/${currencies[code]}/flat/64.png`;
    document.querySelector(`#${type}Dropdown .dropdown-content`).classList.remove('show');
    convert();
}

// 4. Filter/Search Logic
function filterCurrency(input, type) {
    const filter = input.value.toUpperCase();
    const items = document.querySelectorAll(`#${type}Options .option-item`);
    items.forEach(item => {
        const text = item.innerText.toUpperCase();
        item.style.display = text.includes(filter) ? "flex" : "none";
    });
}

// 5. Conversion Logic
async function convert() {
    const amount = document.getElementById("amount").value;
    const resultText = document.getElementById("resultText");
    const rateDetails = document.getElementById("rateDetails");

    if (!amount || amount <= 0) return;

    resultText.innerText = "...";

    try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await res.json();
        const rate = data.rates[toCurrency];
        const total = (amount * rate).toLocaleString(undefined, {minimumFractionDigits: 2});

        resultText.innerText = `${total} ${toCurrency}`;
        rateDetails.innerText = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    } catch (error) {
        resultText.innerText = "Error";
    }
}

function swapCurrencies() {
    let temp = fromCurrency;
    fromCurrency = toCurrency;
    toCurrency = temp;
    
    selectCurrency('from', fromCurrency);
    selectCurrency('to', toCurrency);
}

// Handle clicking outside to close
window.onclick = (e) => {
    if (!e.target.closest('.custom-dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(el => el.classList.remove('show'));
    }
};

// Initial Start
renderOptions('from');
renderOptions('to');
document.getElementById("amount").addEventListener("input", convert);
convert();