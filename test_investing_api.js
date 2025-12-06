const InvestingApiV2 = require('investing-com-api-v2');

// Test fetching data for the pairs we use in the app
const testPairs = [
    { key: 'currencies/usd-vnd', name: 'USD/VND', pairId: '1062753' },
    { key: 'indices/us-30', name: 'Dow Jones', pairId: '169' },
    { key: 'commodities/gold', name: 'Gold', pairId: '8830' },
    { key: 'currencies/xau-usd', name: 'XAU/USD', pairId: '68' },
];

async function testAPI() {
    console.log('Testing Investing.com API...\n');

    for (const pair of testPairs) {
        try {
            console.log(`Testing ${pair.name} (${pair.key})...`);

            // Try using the key
            const data = await InvestingApiV2.getHistoricalData(pair.key, 'P1D', 'PT1H', 1);

            if (data && data.length > 0) {
                const latest = data[data.length - 1]; // Get the most recent data point
                console.log(`✓ Success! Latest data:`, {
                    date: new Date(latest.date),
                    value: latest.value,
                    open: latest.price_open,
                    high: latest.price_high,
                    low: latest.price_low,
                    close: latest.price_close
                });
            } else {
                console.log(`✗ No data returned for ${pair.name}`);
            }
        } catch (error) {
            console.error(`✗ Error for ${pair.name}:`, error.message);
        }
        console.log('---');
    }

    // Close the browser
    await InvestingApiV2.close();
    console.log('\nTest complete!');
}

testAPI();
