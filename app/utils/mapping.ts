export const INVESTING_MAPPING: Record<string, { pairId: string; title: string; name: string }> = {
    // Currencies
    'currencies/eur-usd': { pairId: '1', title: 'EUR/USD - Euro US Dollar', name: 'EUR/USD' },
    'currencies/gbp-usd': { pairId: '2', title: 'GBP/USD - British Pound US Dollar', name: 'GBP/USD' },
    'currencies/usd-jpy': { pairId: '3', title: 'USD/JPY - US Dollar Japanese Yen', name: 'USD/JPY' },
    'currencies/usd-chf': { pairId: '4', title: 'USD/CHF - US Dollar Swiss Franc', name: 'USD/CHF' },
    'currencies/aud-usd': { pairId: '5', title: 'AUD/USD - Australian Dollar US Dollar', name: 'AUD/USD' },
    'currencies/usd-cad': { pairId: '7', title: 'USD/CAD - US Dollar Canadian Dollar', name: 'USD/CAD' },
    'currencies/usd-vnd': { pairId: '1062753', title: 'USD/VND - US Dollar Vietnamese Dong', name: 'USD/VND' }, // Added manually based on app usage
    'currencies/xau-usd': { pairId: '68', title: 'XAU/USD - Gold Spot US Dollar', name: 'XAU/USD' },
    'currencies/bitcoin/btc-usd': { pairId: '945629', title: 'BTC/USD - Bitcoin US Dollar', name: 'BTC/USD' },

    // Indices
    'indices/us-30': { pairId: '169', title: 'Dow Jones Industrial Average', name: 'Dow Jones' },
    'indices/us-spx-500': { pairId: '166', title: 'S&P 500', name: 'S&P 500' },
    'indices/nq-100': { pairId: '14958', title: 'Nasdaq 100', name: 'Nasdaq' }, // App uses 14958, repo says 20. Keeping app's ID for safety or 20? App used 14958.
    'indices/netherlands-25': { pairId: '168', title: 'AEX', name: 'AEX' }, // AEX

    // Commodities
    'commodities/gold': { pairId: '8830', title: 'Gold Futures', name: 'Vàng' },
    'commodities/silver': { pairId: '8836', title: 'Silver Futures', name: 'Bạc' },
    'commodities/copper': { pairId: '8831', title: 'Copper Futures', name: 'Đồng' },
    'commodities/platinum': { pairId: '959209', title: 'Platinum Futures', name: 'Platin' }, // App uses 959209
    'commodities/crude-oil': { pairId: '8849', title: 'Crude Oil WTI Futures', name: 'Dầu Thô' },
    'commodities/brent-oil': { pairId: '8833', title: 'Brent Oil Futures', name: 'Dầu Brent' },
};

export const getPairId = (key: string) => INVESTING_MAPPING[key]?.pairId;
export const getName = (key: string) => INVESTING_MAPPING[key]?.name;
