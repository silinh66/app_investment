// Generate complete CRITERIA_DEFS.ts with all 223 criteria from AllMappings.md
// Usage: npx ts-node tools/generate_complete_criteria.ts

import * as fs from 'fs';
import * as path from 'path';

const WORKSPACE = '/Users/mac/Code/snowball/snowball-app';
const IN_FILE = path.join(WORKSPACE, 'docs/StockFilter_RN_AllMappings.md');
const OUT_FILE = path.join(WORKSPACE, 'features/stockFilter/CRITERIA_DEFS.ts');

type Item = {
  label: string;
  destination: string[];
  snippet: string;
  hasTimeframe: boolean;
};

// Family detection based on label patterns
function detectFamily(label: string): { key: string; title: string } {
  const l = label.toLowerCase();
  
  // RSI14 family
  if (/rsi14/i.test(label)) return { key: 'RSI14', title: 'RSI14' };
  
  // MACD family
  if (/macd/i.test(label) || /histogram/i.test(label)) return { key: 'MACD', title: 'MACD (9,12,26)' };
  
  // Ichimoku family
  if (/tenkan|kijun|cloud|ichimoku/i.test(label)) return { key: 'ICHIMOKU', title: 'Ichimoku' };
  
  // Bollinger Band family
  if (/bollinger/i.test(label)) return { key: 'BOLLINGER', title: 'Bollinger Band (20,2)' };
  
  // MA family
  if (/\bma\b/i.test(label) && !/macd/i.test(label)) return { key: 'MA', title: 'MA' };
  
  // EMA family
  if (/\bema\b/i.test(label)) return { key: 'EMA', title: 'EMA' };
  
  // SMA family
  if (/\bsma\b/i.test(label)) return { key: 'SMA', title: 'SMA' };
  
  // ADX family
  if (/adx|di14|din14|dip14/i.test(label)) return { key: 'ADX', title: 'ADX' };
  
  // Stochastic/KDJ family
  if (/stoch|kdj/i.test(label)) return { key: 'STOCH', title: 'Stochastic/KDJ' };
  
  // MFI family
  if (/\bmfi\b/i.test(label)) return { key: 'MFI', title: 'MFI' };
  
  // CCI
  if (/\bcci\b/i.test(label)) return { key: 'CCI', title: 'CCI' };
  
  // ROC
  if (/\broc\b/i.test(label)) return { key: 'ROC', title: 'ROC' };
  
  // Parabolic SAR
  if (/psar|parabolic/i.test(label)) return { key: 'SAR', title: 'Parabolic SAR' };
  
  // Williams
  if (/williams/i.test(label)) return { key: 'WILLIAMS', title: 'Williams %R' };
  
  // Volume
  if (/khối lượng|volume|kl /i.test(label)) return { key: 'VOLUME', title: 'Khối lượng/Volume' };
  
  // High-Low/Biến động
  if (/biến động|biên độ|high.*low/i.test(label)) return { key: 'HILO', title: 'Biến động/High-Low' };
  
  // RS6m
  if (/rs6m|6 tháng/i.test(label) && /rs/i.test(label)) return { key: 'RS6M', title: 'RS6m (6 tháng)' };
  
  // RS52w
  if (/rs52w|52 tuần/i.test(label) && /rs/i.test(label)) return { key: 'RS52W', title: 'RS52w (52 tuần)' };
  
  // P/E
  if (/p\/e|pe /i.test(label)) return { key: 'PE', title: 'P/E' };
  
  // P/B
  if (/p\/b|pb /i.test(label)) return { key: 'PB', title: 'P/B' };
  
  // P/S
  if (/p\/s|ps /i.test(label)) return { key: 'PS', title: 'P/S' };
  
  // ROE
  if (/\broe\b/i.test(label)) return { key: 'ROE', title: 'ROE' };
  
  // ROA
  if (/\broa\b/i.test(label)) return { key: 'ROA', title: 'ROA' };
  
  // EPS
  if (/\beps\b/i.test(label)) return { key: 'EPS', title: 'EPS' };
  
  // Doanh thu/Revenue
  if (/doanh thu|revenue/i.test(label)) return { key: 'REVENUE', title: 'Doanh thu' };
  
  // Lợi nhuận/Profit
  if (/lợi nhuận|ln |profit|biên/i.test(label)) return { key: 'PROFIT', title: 'Lợi nhuận' };
  
  // Vốn hóa/Market Cap
  if (/vốn hóa|market cap/i.test(label)) return { key: 'CAP', title: 'Vốn hóa' };
  
  // Foreign/NĐTNN
  if (/nđtnn|foreign|nước ngoài/i.test(label)) return { key: 'FOREIGN', title: 'NĐTNN' };
  
  // Cổ tức/Dividend
  if (/cổ tức|dividend/i.test(label)) return { key: 'DIVIDEND', title: 'Cổ tức' };
  
  // Cash Flow
  if (/dòng tiền|cash flow/i.test(label)) return { key: 'CASHFLOW', title: 'Dòng tiền' };
  
  // Scores (F/M/Z)
  if (/score/i.test(label)) return { key: 'SCORES', title: 'Scores' };
  
  // Beta
  if (/beta/i.test(label)) return { key: 'BETA', title: 'Beta' };
  
  // Breakout patterns
  if (/vượt đỉnh|thủng đáy|breakout/i.test(label)) return { key: 'BREAKOUT', title: 'Vượt đỉnh/Thủng đáy' };
  
  // Consecutive sessions
  if (/phiên.*liên tục|liên tiếp/i.test(label)) return { key: 'CONSECUTIVE', title: 'Phiên liên tục' };
  
  // Default to OTHER
  return { key: 'OTHER', title: 'Khác' };
}

// Detect group from label and snippet
function detectGroup(label: string, snippet: string): 'popular' | 'basic' | 'technical' | 'volatility' | 'mine' {
  const l = (label + ' ' + snippet).toLowerCase();
  if (/(rsi|macd|bollinger|ema|sma|ma |stoch|adx|mfi|cci|atr|obv|roc|kdj|trix|williams|ichimoku|psar)/i.test(l)) return 'technical';
  if (/(biến động|biên độ|high.*low|rs6|rs52|52w|volatility|beta|vượt đỉnh|thủng đáy)/i.test(l)) return 'volatility';
  if (/(p\/e|pe |p\/b|pb |roe|roa|eps|doanh thu|lợi nhuận|ln |biên|margin|vốn hóa|cash|dòng tiền|cổ tức|fscore|mscore|zscore|tăng trưởng)/i.test(l)) return 'basic';
  if(/(nđtnn|foreign|khối ngoại|room)/i.test(l)) return 'popular';
  return 'basic';
}

// Slugify for ID generation
function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();
}

// Parse MD file
function parseMD(mdPath: string): Item[] {
  const md = fs.readFileSync(mdPath, 'utf8');
  const reBlock = /^##\s+(.+?)\s*$([\\s\\S]*?)(?=^##\s+|\\Z)/gm;
  const items: Item[] = [];
  let m: RegExpExecArray | null;
  
  while ((m = reBlock.exec(md)) !== null) {
    const label = m[1].trim();
    const body = m[2];
    
    // Extract destination
    const destMatch = body.match(/^\-\s+\*\*Destination:\*\*\s*([^\n]+)/m);
    const dests: string[] = [];
    if (destMatch) {
      const s = destMatch[1];
      if (/faKeys/i.test(s)) dests.push('faKeys');
      if (/fAFilterSub/i.test(s)) dests.push('fAFilterSub');
      if (/parameters/i.test(s)) dests.push('parameters');
      if (/booleanFilter/i.test(s)) dests.push('booleanFilter');
      if (/faFilter/i.test(s)) dests.push('faFilter');
      // Handle N/A - analyze snippet
      if (/N\/A/i.test(s) || dests.length === 0) {
        const snipMatch = body.match(/```ts([\\s\\S]*?)```/m);
        const snippet = snipMatch ? snipMatch[1] : '';
        if (/faKeys\.push\(/.test(snippet)) dests.push('faKeys');
        if (/fAFilterSub\.push\(/.test(snippet)) dests.push('fAFilterSub');
        if (/faFilter\.push\(/.test(snippet)) dests.push('faFilter');
        if (/parameters\.push\(/.test(snippet)) dests.push('parameters');
        if (/booleanFilter\.push\(/.test(snippet)) dests.push('booleanFilter');
      }
    }
    
    // Has timeframe
    const tf = /Has timeframe:\s*(yes|true)/i.test(body);
    
    // Extract snippet
    const snipMatch = body.match(/```ts([\\s\\S]*?)```/m);
    const snippet = snipMatch ? snipMatch[1] : '';
    
    items.push({ label, destination: dests, snippet, hasTimeframe: tf });
  }
  
  return items;
}

console.log('Generating complete CRITERIA_DEFS.ts...');
console.log(`Reading from: ${IN_FILE}`);
console.log(`Writing to: ${OUT_FILE}`);

const items = parseMD(IN_FILE);
console.log(`Found ${items.length} criteria`);

// Generate output
const lines: string[] = [];
lines.push(`// AUTO-GENERATED CRITERIA_DEFS.ts - Complete ${items.length} criteria`);
lines.push(`// Source: docs/StockFilter_RN_AllMappings.md`);
lines.push(`// Generated: ${new Date().toISOString()}`);
lines.push(`// IMPORTANT: RSI14 & MACD mappings are exact per web`);
lines.push(``);
lines.push(`import { CriterionDef } from './types';`);
lines.push(``);
lines.push(`export const CRITERIA_DEFS: CriterionDef[] = [`);

let count = 0;
for (const it of items) {
  const id = slugify(it.label);
  const family = detectFamily(it.label);
  const group = detectGroup(it.label, it.snippet);
  
  // Determine control type
  let control: 'range' | 'select' | 'boolean' = 'select';
  if (it.destination.includes('fAFilterSub') || it.destination.includes('faFilter') || it.destination.includes('parameters')) {
    if (/type\s*:\s*["']Range["']/.test(it.snippet) || /selectedValue\s*:\s*\[/.test(it.snippet) || /{[\s\S]*?min[\s\S]*?max[\s\S]*?}/.test(it.snippet)) {
      control = 'range';
    }
  } else if (it.destination.includes('faKeys')) {
    const literalMatch = it.snippet.match(/faKeys\.push\(\s*["'](.+?)["']\s*\)/);
    if (literalMatch && !/switch|case|if/.test(it.snippet)) {
      control = 'boolean';
    }
  }
  
  // Build params
  const params: string[] = [];
  if (control === 'range') {
    params.push(`{ key: 'min', label: 'Min', type: 'number' }`);
    params.push(`{ key: 'max', label: 'Max', type: 'number' }`);
    if (it.hasTimeframe || /Daily|Weekly/.test(it.snippet)) {
      params.push(`{ key: 'timeframe', label: 'Kỳ', type: 'select', options: [{label:'1 ngày',value:'1D'},{label:'1 tuần',value:'1W'}] }`);
    }
  }
  
  // Generate toPayload placeholder
  const toPayload = `(values) => { console.warn('TODO: ${it.label}'); return {}; }`;
  
  lines.push(`  {`);
  lines.push(`    id: '${id}',`);
  lines.push(`    group: '${group}',`);
  lines.push(`    familyKey: '${family.key}',`);
  lines.push(`    familyTitle: '${family.title}',`);
  lines.push(`    label: '${it.label.replace(/'/g, "\\'")}',`);
  lines.push(`    control: '${control}',`);
  lines.push(`    params: [${params.join(', ')}],`);
  lines.push(`    toPayload: ${toPayload}`);
  lines.push(`  },`);
  
  count++;
}

lines.push(`];`);
lines.push(``);
lines.push(`// Total: ${count} criteria`);

fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');
console.log(`✅ Generated ${count} criteria to ${OUT_FILE}`);
console.log(`Next: Manually fill toPayload() for each criterion using snippets from AllMappings.md`);
