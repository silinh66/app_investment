#!/usr/bin/env tsx
/**
 * Test CRITERIA_DEFS toPayload functions
 */

import { CRITERIA_DEFS } from '../features/stockFilter/CRITERIA_DEFS';

console.log('🧪 Testing CRITERIA_DEFS toPayload functions\n');

// Test 1: MACD so với Signal (select control with 2 dropdowns)
const macdDef = CRITERIA_DEFS.find((c) => c.label === 'MACD so với Signal');
if (macdDef) {
  console.log('✅ Test 1: MACD so với Signal');
  console.log('  Control:', macdDef.control);
  console.log('  Params:', macdDef.params.map((p) => `${p.key} (${p.type})`).join(', '));
  
  const result = macdDef.toPayload({ compare: 0, interval: 0 });
  console.log('  Payload:', JSON.stringify(result, null, 2));
  console.log('  Expected faKeys: ["MACD_>=_MACDSignal_Daily"]');
  console.log('  Actual faKeys:', result.faKeys);
  console.log('');
}

// Test 2: Giá trị RSI14 (range control with timeframe)
const rsiDef = CRITERIA_DEFS.find((c) => c.label === 'Giá trị RSI14');
if (rsiDef) {
  console.log('✅ Test 2: Giá trị RSI14');
  console.log('  Control:', rsiDef.control);
  console.log('  Params:', rsiDef.params.map((p) => `${p.key} (${p.type})`).join(', '));
  
  const result = rsiDef.toPayload({ interval: 0, min: 30, max: 70 });
  console.log('  Payload:', JSON.stringify(result, null, 2));
  console.log('  Expected fAFilterSub key: "RSI14_Daily"');
  console.log('  Actual:', result.fAFilterSub);
  console.log('');
}

// Test 3: Giao cắt 2 đường TB - EMA (4 dropdowns)
const emaDef = CRITERIA_DEFS.find((c) => c.label === 'Giao cắt 2 đường TB - EMA');
if (emaDef) {
  console.log('✅ Test 3: Giao cắt 2 đường TB - EMA');
  console.log('  Control:', emaDef.control);
  console.log('  Params:', emaDef.params.map((p) => {
    if (p.type === 'select') {
      return `${p.key} (${p.options.length} options)`;
    }
    return `${p.key} (${p.type})`;
  }).join(', '));
  
  const result = emaDef.toPayload({ 
    compare: 0,  // VUOT
    leftIndexValue: 0,  // EMA5
    rightIndexValue: 1,  // EMA10
    interval: 0  // Daily
  });
  console.log('  Payload:', JSON.stringify(result, null, 2));
  console.log('  Expected faKeys: ["EMA5_VUOT_EMA10_Daily"]');
  console.log('  Actual faKeys:', result.faKeys);
  console.log('');
}

// Test 4: Boolean control
const booleanDef = CRITERIA_DEFS.find((c) => c.control === 'boolean');
if (booleanDef) {
  console.log('✅ Test 4: Boolean control -', booleanDef.label);
  console.log('  Control:', booleanDef.control);
  
  const result = booleanDef.toPayload({});
  console.log('  Payload:', JSON.stringify(result, null, 2));
  console.log('');
}

// Summary
console.log('📊 Summary:');
console.log(`  Total criteria: ${CRITERIA_DEFS.length}`);
console.log(`  Range controls: ${CRITERIA_DEFS.filter(c => c.control === 'range').length}`);
console.log(`  Select controls: ${CRITERIA_DEFS.filter(c => c.control === 'select').length}`);
console.log(`  Boolean controls: ${CRITERIA_DEFS.filter(c => c.control === 'boolean').length}`);
