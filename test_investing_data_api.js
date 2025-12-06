const axios = require('axios');

const API_BASE_URL = 'https://api.dautubenvung.vn';

async function testAPI() {
    try {
        console.log('Testing GET /investing-data endpoint...\n');

        const response = await axios.get(`${API_BASE_URL}/investing-data`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 10000
        });

        console.log('✓ API call successful!');
        console.log('\nStatus:', response.status);
        console.log('\nResponse structure:');
        console.log(JSON.stringify(response.data, null, 2));

        // Analyze data structure
        if (response.data) {
            console.log('\n--- Analysis ---');
            console.log('Type:', typeof response.data);
            if (Array.isArray(response.data)) {
                console.log('Is Array: Yes');
                console.log('Length:', response.data.length);
                if (response.data.length > 0) {
                    console.log('\nFirst item structure:');
                    console.log(JSON.stringify(response.data[0], null, 2));
                }
            } else if (typeof response.data === 'object') {
                console.log('Is Object: Yes');
                console.log('Keys:', Object.keys(response.data));
            }
        }

    } catch (error) {
        console.error('✗ API call failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testAPI();
