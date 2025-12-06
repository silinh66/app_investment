// tools/generate_complete_defs.ts
// Generate CRITERIA_DEFS.ts with all 223 criteria + family fields
// Usage: npx ts-node tools/generate_complete_defs.ts

import * as fs from 'fs';
import * as path from 'path';

const IN = path.join(__dirname, '../features/stockFilter/StockFilter_RN_AllMappings (2).md');
const OUT = path.join(__dirname, '../features/stockFilter/CRITERIA_DEFS.ts');

type Item = {
  label: string;
  snippet: string;
  dest: string[];
  hasTimeframe: boolean;
};

function parse(md: string): Item[] {
  const items: Item[] = [];
  const lines = md.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      const label = lines[i].substring(3).trim();
      
      // Find destination metadata
      let destLine = '';
      for (let j = i + 1; j < i + 10 && j < lines.length; j++) {
        if (lines[j].includes('**Destination:**')) {
          destLine = lines[j].toLowerCase();
          break;
        }
      }
      
      // Find code snippet
      let snippet = '';
      let inSnippet = false;
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('```ts')) {
          inSnippet = true;
          continue;
        }
        if (inSnippet && lines[j].startsWith('```')) {
          break;
        }
        if (inSnippet) {
          snippet += lines[j] + '\n';
        }
        // Stop if we hit next section
        if (lines[j].startsWith('## ')) break;
      }
      
      // Determine destinations
      const dest: string[] = [];
      if (/parameters/.test(destLine) || /parameters\.push/.test(snippet)) dest.push('parameters');
      if (/fakeys/.test(destLine) || /faKeys\.push/.test(snippet)) dest.push('faKeys');
      if (/fafiltersub/.test(destLine) || /fAFilterSub/.test(snippet)) dest.push('fAFilterSub');
      if (/fafilter[^s]/.test(destLine) || /faFilter\.push/.test(snippet)) dest.push('faFilter');
      if (/booleanfilter/.test(destLine) || /booleanFilter\.push/.test(snippet)) dest.push('booleanFilter');
      
      const hasTimeframe = /Daily|Weekly/.test(snippet) || /interval/.test(snippet);
      
      items.push({ label, snippet, dest, hasTimeframe });
    }
  }
  
  return items;
}

function detectFamily(label: string): { key: string; title: string } {
  const l = label.toLowerCase();
  
  // Technical indicators with exact families
  if (/rsi14/i.test(label)) return { key: 'RSI14', title: 'RSI14' };
  if (/\bmacd\b|histogram/i.test(label)) return { key: 'MACD', title: 'MACD (9,12,26)' };
  if (/bollinger/i.test(label)) return { key: 'BOLLINGER', title: 'Bollinger Band (20,2)' };
  if (/\bma\b|đường tb.*ma/i.test(label) && !/ema|sma/i.test(label)) return { key: 'MA', title: 'MA' };
  if (/\bema\b|đường tb.*ema/i.test(label)) return { key: 'EMA', title: 'EMA' };
  if (/\badx\b/i.test(label)) return { key: 'ADX', title: 'ADX' };
  if (/stoch|kdj/i.test(label)) return { key: 'STOCH', title: 'Stochastic/KDJ' };
  if (/\bmfi\b/i.test(label)) return { key: 'MFI', title: 'MFI' };
  if (/\bcci\b/i.test(label)) return { key: 'CCI', title: 'CCI' };
  if (/\broc\b/i.test(label)) return { key: 'ROC', title: 'ROC' };
  if (/psar|parabolic/i.test(label)) return { key: 'PSAR', title: 'Parabolic SAR' };
  if (/williams/i.test(label)) return { key: 'WPR', title: 'Williams %R' };
  if (/ichimoku|tenkan|kijun|cloud/i.test(label)) return { key: 'ICHIMOKU', title: 'Ichimoku' };
  
  // Volume & Price families
  if (/khối lượng|kl |volume/i.test(label)) return { key: 'VOLUME', title: 'Khối lượng/Volume' };
  if (/biến động|high.*low|rs\d+|beta|vượt đỉnh|thủng đáy/i.test(label)) return { key: 'HILO', title: 'Biến động/High-Low' };
  if (/rs6m|6 tháng.*rs/i.test(label)) return { key: 'RS6M', title: 'RS6m (6 tháng)' };
  if (/rs52w|52 tuần.*rs/i.test(label)) return { key: 'RS52W', title: 'RS52w (52 tuần)' };
  
  // Fundamental families
  if (/\bp\/e\b|pe /i.test(label)) return { key: 'PE', title: 'P/E' };
  if (/\bp\/b\b|pb /i.test(label)) return { key: 'PB', title: 'P/B' };
  if (/\broe\b/i.test(label)) return { key: 'ROE', title: 'ROE' };
  if (/\broa\b/i.test(label)) return { key: 'ROA', title: 'ROA' };
  if (/\beps\b/i.test(label)) return { key: 'EPS', title: 'EPS' };
  if (/doanh thu/i.test(label)) return { key: 'REV', title: 'Doanh thu' };
  if (/lợi nhuận|ln |biên ln/i.test(label)) return { key: 'PROFIT', title: 'Lợi nhuận/biên LN' };
  if (/vốn hóa|vốn hoá/i.test(label)) return { key: 'CAP', title: 'Vốn hóa' };
  if (/foreign|nước ngoài|nđtnn/i.test(label)) return { key: 'FOREIGN', title: 'Sở hữu nước ngoài' };
  if (/cổ tức|dividend/i.test(label)) return { key: 'DIV', title: 'Cổ tức' };
  if (/dòng tiền|cash.*flow/i.test(label)) return { key: 'CF', title: 'Dòng tiền' };
  if (/fscore|mscore|zscore/i.test(label)) return { key: 'SCORE', title: 'Scores' };
  
  // Default to "Khác" for all others
  return { key: 'OTHER', title: 'Khác' };
}

function detectGroup(label: string, snippet: string): string {
  const l = (label + ' ' + snippet).toLowerCase();
  if (/(rsi|macd|bollinger|ema|sma|ma |stoch|adx|mfi|cci|obv|roc|kdj|trix|williams|ichimoku|psar)/.test(l)) return 'technical';
  if (/(biến động|rs[136]|rs52|volatility|beta|vượt đỉnh|thủng đáy)/.test(l)) return 'volatility';
  if (/(p\/e|p\/b|roe|roa|eps|doanh thu|lợi nhuận|biên|vốn hóa|cash|dòng tiền|cổ tức|score)/.test(l)) return 'basic';
  if (/(nđtnn|foreign|khối ngoại|room)/.test(l)) return 'popular';
  return 'basic';
}

function slugify(s: string) {
  return s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').toUpperCase();
}

const TF = `{ key: 'timeframe', label: 'Kỳ', type: 'select', options: [{label:'1 ngày',value:'1D'},{label:'1 tuần',value:'1W'}] }`;

function buildDef(it: Item, idx: number): string {
  const { label, snippet, dest } = it;
  const id = slugify(label);
  const group = detectGroup(label, snippet);
  const fam = detectFamily(label);
  
  // RSI14 exact mappings
  if (/Giá trị RSI14/i.test(label)) {
    return `{ id: 'RSI14_VALUE', group: 'technical', familyKey: 'RSI14', familyTitle: 'RSI14', label: ${JSON.stringify(label)}, control: 'range',
      params: [{ key: 'min', label: 'Min', type: 'number', min: 0, max: 100, step: 0.1 }, { key: 'max', label: 'Max', type: 'number', min: 0, max: 100, step: 0.1 }, ${TF}],
      toPayload: (v: Record<string,any>) => { const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { fAFilterSub: [{ key: \`RSI14_\${day}\`, value: { min: String(v.min), max: String(v.max) } }] }; }
    }`;
  }
  if (/RSI14 so với các vùng/i.test(label)) {
    return `{ id: 'RSI14_ZONE', group: 'technical', familyKey: 'RSI14', familyTitle: 'RSI14', label: ${JSON.stringify(label)}, control: 'select',
      params: [{ key: 'compare', label: 'So sánh', type: 'select', options: [{label:'≥',value:0},{label:'=',value:1},{label:'≤',value:2}] }, { key: 'level', label: 'Mức', type: 'select', options: [{label:'70',value:0},{label:'60',value:1},{label:'40',value:2},{label:'30',value:3}] }, ${TF}],
      toPayload: (v: Record<string,any>) => { const op = v.compare === 0 ? '>=' : v.compare === 1 ? '=' : '<='; const level = ['70','60','40','30'][v.level ?? 0]; const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { faKeys: [\`RSI14_\${op}_\${level}_\${day}\`] }; }
    }`;
  }
  if (/RSI14 và vùng Quá mua/i.test(label)) {
    return `{ id: 'RSI14_OVERZONE', group: 'technical', familyKey: 'RSI14', familyTitle: 'RSI14', label: ${JSON.stringify(label)}, control: 'select',
      params: [{ key: 'compare', label: 'Hành động', type: 'select', options: [{label:'Vượt',value:0},{label:'Thủng',value:1}] }, { key: 'band', label: 'Ngưỡng', type: 'select', options: [{label:'70',value:0},{label:'30',value:1}] }, ${TF}],
      toPayload: (v: Record<string,any>) => { const action = v.compare === 0 ? 'VUOT' : 'THUNG'; const band = v.band === 1 ? '30' : '70'; const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { faKeys: [\`RSI14_\${action}_\${band}_\${day}\`] }; }
    }`;
  }
  
  // MACD exact mappings
  if (/MACD so với Signal/i.test(label)) {
    return `{ id: 'MACD_VS_SIGNAL', group: 'technical', familyKey: 'MACD', familyTitle: 'MACD (9,12,26)', label: ${JSON.stringify(label)}, control: 'select',
      params: [{ key: 'compare', label: 'So sánh', type: 'select', options: [{label:'≥',value:0},{label:'=',value:1},{label:'≤',value:2}] }, ${TF}],
      toPayload: (v: Record<string,any>) => { const op = v.compare === 0 ? '>=' : v.compare === 1 ? '=' : '<='; const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { faKeys: [\`MACD_\${op}_MACDSignal_\${day}\`] }; }
    }`;
  }
  if (/MACD cắt với Signal/i.test(label)) {
    return `{ id: 'MACD_CROSS_SIGNAL', group: 'technical', familyKey: 'MACD', familyTitle: 'MACD (9,12,26)', label: ${JSON.stringify(label)}, control: 'select',
      params: [{ key: 'compare', label: 'Kiểu cắt', type: 'select', options: [{label:'Vượt lên',value:0},{label:'Thủng xuống',value:1}] }, ${TF}],
      toPayload: (v: Record<string,any>) => { const action = v.compare === 0 ? 'VUOT' : 'THUNG'; const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { faKeys: [\`MACD_\${action}_MACDSignal_\${day}\`] }; }
    }`;
  }
  if (/Trạng thái giá trị của MACD/i.test(label)) {
    return `{ id: 'MACD_STATE', group: 'technical', familyKey: 'MACD', familyTitle: 'MACD (9,12,26)', label: ${JSON.stringify(label)}, control: 'select',
      params: [{ key: 'leftIndexValue', label: 'So với', type: 'select', options: [{label:'MACD',value:0},{label:'Signal',value:1}] }, { key: 'compare', label: 'Trạng thái', type: 'select', options: [{label:'≥ 0',value:0},{label:'< 0',value:1},{label:'Vượt 0',value:2},{label:'Thủng 0',value:3}] }, ${TF}],
      toPayload: (v: Record<string,any>) => { const left = v.leftIndexValue === 1 ? 'MACDSignal' : 'MACD'; const state = ['>=_0','<_0','VUOT_0','THUNG_0'][v.compare ?? 0]; const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { faKeys: [\`\${left}_\${state}_\${day}\`] }; }
    }`;
  }
  if (/Histogram tăng liên tục/i.test(label)) {
    return `{ id: 'MACD_HIST_UP_SEQ', group: 'technical', familyKey: 'MACD', familyTitle: 'MACD (9,12,26)', label: ${JSON.stringify(label)}, control: 'select',
      params: [{ key: 'rightIndexValue', label: 'Số phiên', type: 'select', options: [{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},{label:'5',value:5}] }, ${TF}],
      toPayload: (v: Record<string,any>) => { const n = Number(v.rightIndexValue); const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { faKeys: [\`MACDHist_UP_\${n}_\${day}\`] }; }
    }`;
  }
  if (/Histogram giảm liên tục/i.test(label)) {
    return `{ id: 'MACD_HIST_DOWN_SEQ', group: 'technical', familyKey: 'MACD', familyTitle: 'MACD (9,12,26)', label: ${JSON.stringify(label)}, control: 'select',
      params: [{ key: 'rightIndexValue', label: 'Số phiên', type: 'select', options: [{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},{label:'5',value:5}] }, ${TF}],
      toPayload: (v: Record<string,any>) => { const n = Number(v.rightIndexValue); const day = v.timeframe === '1W' ? 'Weekly' : 'Daily'; return { faKeys: [\`MACDHist_DOWN_\${n}_\${day}\`] }; }
    }`;
  }
  
  // Generic parameter-based (check this BEFORE other destinations)
  if (dest.includes('parameters')) {
    const isRange = /type\s*:\s*["']Range["']/.test(snippet);
    const codeMatch = snippet.match(/code\s*:\s*["']([^"']+)["']/);
    const code = codeMatch ? codeMatch[1] : id;
    const hasPercent = /\/\s*100/.test(snippet);
    const hasBillion = /\*\s*1000000000/.test(snippet);
    const hasMillion = /\*\s*1000000/.test(snippet);
    
    if (isRange) {
      return `{ id: ${JSON.stringify(id)}, group: ${JSON.stringify(group)}, familyKey: ${JSON.stringify(fam.key)}, familyTitle: ${JSON.stringify(fam.title)}, label: ${JSON.stringify(label)}, control: 'range',
        params: [{ key: 'min', label: 'Min', type: 'number' }, { key: 'max', label: 'Max', type: 'number' }],
        toPayload: (v: Record<string,any>) => { return { parameters: [{ name: ${JSON.stringify(label)}, code: ${JSON.stringify(code)}, type: 'Range', selectedValue: [${hasPercent ? 'Number(v.min)/100, Number(v.max)/100' : hasBillion ? 'Number(v.min)*1000000000, Number(v.max)*1000000000' : hasMillion ? 'Number(v.min)*1000000, Number(v.max)*1000000' : 'Number(v.min), Number(v.max)'}], unit: ${JSON.stringify(hasPercent ? 'Percentage' : hasBillion ? 'BillionVND' : hasMillion ? 'MillionVND' : 'Unit')} }] }; }
      }`;
    } else {
      return `{ id: ${JSON.stringify(id)}, group: ${JSON.stringify(group)}, familyKey: ${JSON.stringify(fam.key)}, familyTitle: ${JSON.stringify(fam.title)}, label: ${JSON.stringify(label)}, control: 'select',
        params: [{ key: 'value', label: 'Giá trị', type: 'select', options: [] }],
        toPayload: (v: Record<string,any>) => { return { parameters: [{ name: ${JSON.stringify(label)}, code: ${JSON.stringify(code)}, type: 'Set', selectedValue: [v.value] }] }; }
      }`;
    }
  }
  
  // Generic fAFilterSub-based  
  if (!dest.includes('parameters') && dest.includes('fAFilterSub')) {
    const keyMatch = snippet.match(/fAFilterSub\s*\[\s*["'`]([^"'`]+)["'`]/);
    const baseKey = keyMatch ? keyMatch[1].replace(/_Daily|_Weekly/, '') : id;
    const hasDW = /Daily|Weekly/.test(snippet) || it.hasTimeframe;
    
    return `{ id: ${JSON.stringify(id)}, group: ${JSON.stringify(group)}, familyKey: ${JSON.stringify(fam.key)}, familyTitle: ${JSON.stringify(fam.title)}, label: ${JSON.stringify(label)}, control: 'range',
      params: [{ key: 'min', label: 'Min', type: 'number' }, { key: 'max', label: 'Max', type: 'number' }${hasDW ? ', ' + TF : ''}],
      toPayload: (v: Record<string,any>) => { ${hasDW ? "const key = `" + baseKey + "_${v.timeframe === '1W' ? 'Weekly' : 'Daily'}`;" : `const key = ${JSON.stringify(baseKey)};`} return { fAFilterSub: [{ key, value: { min: String(v.min), max: String(v.max) } }] }; }
    }`;
  }
  
  // Generic faFilter-based  
  if (!dest.includes('parameters') && dest.includes('faFilter')) {
    const keyMatch = snippet.match(/key\s*:\s*["']([^"']+)["']/);
    const key = keyMatch ? keyMatch[1] : id;
    const hasPercent = /\/\s*100/.test(snippet);
    
    return `{ id: ${JSON.stringify(id)}, group: ${JSON.stringify(group)}, familyKey: ${JSON.stringify(fam.key)}, familyTitle: ${JSON.stringify(fam.title)}, label: ${JSON.stringify(label)}, control: 'range',
      params: [{ key: 'min', label: 'Min', type: 'number' }, { key: 'max', label: 'Max', type: 'number' }],
      toPayload: (v: Record<string,any>) => { return { faFilter: [{ key: ${JSON.stringify(key)}, value: { min: ${hasPercent ? '(Number(v.min)/100).toString()' : 'String(v.min)'}, max: ${hasPercent ? '(Number(v.max)/100).toString()' : 'String(v.max)'} } }] }; }
    }`;
  }
  
  // Generic faKeys-based
  if (!dest.includes('parameters') && dest.includes('faKeys')) {
    const strLit = snippet.match(/faKeys\.push\(\s*["'`](.+?)["'`]\s*\)/);
    if (strLit && !/switch|case|if/.test(snippet)) {
      // Boolean literal
      return `{ id: ${JSON.stringify(id)}, group: ${JSON.stringify(group)}, familyKey: ${JSON.stringify(fam.key)}, familyTitle: ${JSON.stringify(fam.title)}, label: ${JSON.stringify(label)}, control: 'boolean',
        params: [],
        toPayload: (_v: Record<string,any>) => { return { faKeys: [${JSON.stringify(strLit[1])}] }; }
      }`;
    } else {
      // Complex faKeys with conditions
      return `{ id: ${JSON.stringify(id)}, group: ${JSON.stringify(group)}, familyKey: ${JSON.stringify(fam.key)}, familyTitle: ${JSON.stringify(fam.title)}, label: ${JSON.stringify(label)}, control: 'select',
        params: [{ key: 'value', label: 'Giá trị', type: 'select', options: [] }],
        toPayload: (v: Record<string,any>) => { return { faKeys: [${JSON.stringify(id)}] }; }
      }`;
    }
  }
  
  // Fallback
  return `{ id: ${JSON.stringify(id)}, group: ${JSON.stringify(group)}, familyKey: ${JSON.stringify(fam.key)}, familyTitle: ${JSON.stringify(fam.title)}, label: ${JSON.stringify(label)}, control: 'select',
    params: [],
    toPayload: (_v: Record<string,any>) => { console.warn('Unresolved criterion: ${label}'); return {}; }
  }`;
}

function main() {
  const md = fs.readFileSync(IN, 'utf8');
  const items = parse(md);
  
  console.log(`Found ${items.length} criteria`);
  
  const defs = items.map((it, idx) => buildDef(it, idx));
  
  const output = `// AUTO-GENERATED by tools/generate_complete_defs.ts
// Source: StockFilter_RN_AllMappings (2).md

import { CriterionDef } from './types';

export const CRITERIA_DEFS: CriterionDef[] = [
${defs.join(',\n')}
];
`;
  
  fs.writeFileSync(OUT, output, 'utf8');
  console.log(`Generated ${OUT} with ${items.length} criteria`);
}

main();
