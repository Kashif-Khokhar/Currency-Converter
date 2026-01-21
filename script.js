const currencies = {
    USD: "US", EUR: "EU", GBP: "GB", JPY: "JP", PKR: "PK", 
    INR: "IN", AED: "AE", CAD: "CA", AUD: "AU", CNY: "CN",
    TRY: "TR", SAR: "SA", SGD: "SG", MXN: "MX", NZD: "NZ", ZAR: "ZA",
    BRL: "BR", RUB: "RU", CHF: "CH", HKD: "HK", SEK: "SE",
    NOK: "NO", DKK: "DK", KRW: "KR", IDR: "ID", THB: "TH",
    MYR: "MY", VND: "VN", PHP: "PH", COP: "CO", ARS: "AR", JOD: "JO"
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