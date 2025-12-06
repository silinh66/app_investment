// tools/generate_criteria_defs.ts
// Generate CRITERIA_DEFS.ts from raw snippets in docs/StockFilter_RN_AllMappings.md
// Usage:
//   npx ts-node tools/generate_criteria_defs.ts --in docs/StockFilter_RN_AllMappings.md --out features/stockFilter/CRITERIA_DEFS.ts

import * as fs from 'fs';
import * as path from 'path';

type ControlType = 'range' | 'select' | 'boolean';
type Group = 'popular' | 'basic' | 'technical' | 'volatility' | 'mine';

type CriterionDef = {
  id: string;
  group: Group;
  label: string;
  control: ControlType;
  params: any[];        // ParamDef[]
  defaults?: Record<string, any>;
  toPayload: (values: Record<string, any>) => any;
};

type Item = {
  label: string;
  destination: ('faKeys'|'fAFilterSub'|'faFilter'|'parameters'|'booleanFilter')[];
  snippet: string;
  tokens: string[];
  hasTimeframe: boolean;
  controlGuess: string;
};

const argv = process.argv.slice(2);
const inIdx = argv.indexOf('--in');
const outIdx = argv.indexOf('--out');
if (inIdx === -1 || outIdx === -1) {
  console.error('Usage: ts-node tools/generate_criteria_defs.ts --in <md> --out <ts>');
  process.exit(1);
}

const IN = argv[inIdx+1];
const OUT = argv[outIdx+1];

function readMappingsMD(mdPath: string): Item[] {
  const md = fs.readFileSync(mdPath, 'utf8');
  // Blocks start with "## <label>"
  const reBlock = /^##\s+(.+?)\s*$([\s\S]*?)(?=^##\s+|\Z)/gm;
  const items: Item[] = [];
  let m: RegExpExecArray | null;
  while ((m = reBlock.exec(md)) !== null) {
    const label = m[1].trim();
    const body = m[2];

    // destination
    const destMatch = body.match(/^\-\s+\*\*Destination:\*\*\s*([^\n]+)/m);
    const dests: Item['destination'] = [];
    if (destMatch) {
      const s = destMatch[1];
      if (/faKeys/.test(s)) dests.push('faKeys');
      if (/fAFilterSub/.test(s)) dests.push('fAFilterSub');
      if (/parameters/.test(s)) dests.push('parameters');
      if (/booleanFilter/.test(s)) dests.push('booleanFilter');
      if (/faFilter/.test(s)) dests.push('faFilter');
      // Handle N/A case - look at snippet to determine destination
      if (/N\/A/.test(s) || dests.length === 0) {
        // Analyze snippet to determine destination
        const snipMatch = body.match(/```ts([\s\S]*?)```/m);
        const snippet = snipMatch ? snipMatch[1] : '';
        if (/faKeys\.push\(/.test(snippet)) dests.push('faKeys');
        if (/fAFilterSub\.push\(/.test(snippet)) dests.push('fAFilterSub');
        if (/faFilter\.push\(/.test(snippet)) dests.push('faFilter');
        if (/parameters\.push\(/.test(snippet)) dests.push('parameters');
        if (/booleanFilter\.push\(/.test(snippet)) dests.push('booleanFilter');
      }
    }

    // control guess
    const controlMatch = body.match(/^\-\s+\*\*Control guess:\*\*\s*([^\n]+)/m);
    const controlGuess = controlMatch ? controlMatch[1].trim() : 'select';

    // tokens
    const tokMatch = body.match(/^\-\s+\*\*Tokens seen:\*\*\s*([^\n]+)/m);
    const tokens = tokMatch ? tokMatch[1].split(',').map(s => s.trim()) : [];

    // has timeframe
    const tf = /Has timeframe:\s*(yes|true)/i.test(body);

    // snippet code block
    const snipMatch = body.match(/```ts([\s\S]*?)```/m);
    const snippet = snipMatch ? snipMatch[1] : '';

    items.push({ label, destination: dests, snippet, tokens, hasTimeframe: tf, controlGuess });
  }
  return items;
}

function slugify(s: string) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();
}

function detectGroup(label: string, snippet: string): Group {
  const l = (label + ' ' + snippet).toLowerCase();
  if (/(rsi|macd|bollinger|ema|sma|ma |stoch|adx|mfi|cci|atr|obv|roc|kdj|trix|williams)/.test(l)) return 'technical';
  if (/(high[\s-]low|biến động|rs[136]|rs52|52w|volatility|%|phiên|beta|vượt đỉnh|thủng đáy|biên độ)/.test(l)) return 'volatility';
  if (/(p\/e|pe |p\/b|pb |roe|roa|eps|doanh thu|lợi nhuận|ln ròng|biên|margin|d\/e|vốn hóa|cash|dòng tiền|cổ tức|fscore|mscore|zscore|tăng trưởng)/.test(l)) return 'basic';
  if (/(nđtnn|foreign|khối ngoại|room nước ngoài|sở hữu nước ngoài)/.test(l)) return 'popular';
  return 'basic';
}

// ---------- UI builders ----------
function buildRangeParams(min?: number|null, max?: number|null, step?: number|null) {
  const pmin: any = { key: 'min', label: 'Min', type: 'number' };
  const pmax: any = { key: 'max', label: 'Max', type: 'number' };
  if (min != null) { pmin.min = min; pmax.min = min; }
  if (max != null) { pmin.max = max; pmax.max = max; }
  if (step != null) { pmin.step = step; pmax.step = step; }
  return [pmin, pmax];
}
const TIMEFRAME_PARAM = { key: 'timeframe', label: 'Kỳ', type: 'select', options: [
  { label: '1 ngày', value: '1D' }, { label: '1 tuần', value: '1W' }
]};

// ---------- PATTERN RULES (exact) ----------
// RSI14 (3)
function isRSI(label: string) { return /rsi14/i.test(label); }
function makeRSI(label: string, snip: string) : CriterionDef | null {
  if (/Giá trị RSI14/i.test(label)) {
    return {
      id: 'RSI14_VALUE',
      group: 'technical',
      label,
      control: 'range',
      params: [...buildRangeParams(0,100,0.1), TIMEFRAME_PARAM],
      toPayload: (v) => {
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { fAFilterSub: [{ key: `RSI14_${day}`, value: { min: String(v.min), max: String(v.max) } }] };
      }
    };
  }
  if (/RSI14 so với các vùng/i.test(label)) {
    return {
      id: 'RSI14_ZONE',
      group: 'technical',
      label,
      control: 'select',
      params: [
        { key: 'compare', label: 'So sánh', type: 'select', options: [{label:'≥',value:0},{label:'=',value:1},{label:'≤',value:2}] },
        { key: 'level', label: 'Mức', type: 'select', options: [{label:'70',value:0},{label:'60',value:1},{label:'40',value:2},{label:'30',value:3}] },
        TIMEFRAME_PARAM
      ],
      toPayload: (v) => {
        const op = v.compare === 0 ? '>=' : v.compare === 1 ? '=' : '<=';
        const level = ['70','60','40','30'][v.level ?? 0];
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { faKeys: [`RSI14_${op}_${level}_${day}`] };
      }
    };
  }
  if (/RSI14 và vùng Quá mua\/Quá bán/i.test(label)) {
    return {
      id: 'RSI14_OVERZONE',
      group: 'technical',
      label,
      control: 'select',
      params: [
        { key: 'compare', label: 'Hành động', type: 'select', options: [{label:'Vượt',value:0},{label:'Thủng',value:1}] },
        { key: 'band', label: 'Ngưỡng', type: 'select', options: [{label:'70',value:0},{label:'30',value:1}] },
        TIMEFRAME_PARAM
      ],
      toPayload: (v) => {
        const action = v.compare === 0 ? 'VUOT' : 'THUNG';
        const band = v.band === 1 ? '30' : '70';
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { faKeys: [`RSI14_${action}_${band}_${day}`] };
      }
    };
  }
  return null;
}

// MACD (9,12,26) — 5 criteria
function isMACD(label: string) { return /\bMACD\b/i.test(label); }
function makeMACD(label: string, snip: string): CriterionDef | null {
  if (/MACD so với Signal/i.test(label)) {
    return {
      id: 'MACD_VS_SIGNAL',
      group: 'technical',
      label,
      control: 'select',
      params: [
        { key: 'compare', label: 'So sánh', type: 'select', options: [{label:'≥',value:0},{label:'=',value:1},{label:'≤',value:2}] },
        TIMEFRAME_PARAM
      ],
      toPayload: (v) => {
        const op = v.compare === 0 ? '>=' : v.compare === 1 ? '=' : '<=';
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { faKeys: [`MACD_${op}_MACDSignal_${day}`] };
      }
    };
  }
  if (/MACD cắt với Signal/i.test(label)) {
    return {
      id: 'MACD_CROSS_SIGNAL',
      group: 'technical',
      label,
      control: 'select',
      params: [
        { key: 'compare', label: 'Kiểu cắt', type: 'select', options: [{label:'Vượt lên',value:0},{label:'Thủng xuống',value:1}] },
        TIMEFRAME_PARAM
      ],
      toPayload: (v) => {
        const action = v.compare === 0 ? 'VUOT' : 'THUNG';
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { faKeys: [`MACD_${action}_MACDSignal_${day}`] };
      }
    };
  }
  if (/Trạng thái giá trị của MACD/i.test(label)) {
    return {
      id: 'MACD_STATE',
      group: 'technical',
      label,
      control: 'select',
      params: [
        { key: 'leftIndexValue', label: 'So với', type: 'select', options: [{label:'MACD',value:0},{label:'Signal',value:1}] },
        { key: 'compare', label: 'Trạng thái', type: 'select', options: [{label:'≥ 0',value:0},{label:'< 0',value:1},{label:'Vượt 0',value:2},{label:'Thủng 0',value:3}] },
        TIMEFRAME_PARAM
      ],
      toPayload: (v) => {
        const left = v.leftIndexValue === 1 ? 'MACDSignal' : 'MACD';
        const state = ['>=_0','<_0','VUOT_0','THUNG_0'][v.compare ?? 0];
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { faKeys: [`${left}_${state}_${day}`] };
      }
    };
  }
  if (/Histogram tăng liên tục/i.test(label)) {
    return {
      id: 'MACD_HIST_UP_SEQ',
      group: 'technical',
      label,
      control: 'select',
      params: [
        { key: 'rightIndexValue', label: 'Số phiên', type: 'select',
          options: [{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},{label:'5',value:5}] },
        TIMEFRAME_PARAM
      ],
      toPayload: (v) => {
        const n = Number(v.rightIndexValue);
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { faKeys: [`MACDHist_UP_${n}_${day}`] };
      }
    };
  }
  if (/Histogram giảm liên tục/i.test(label)) {
    return {
      id: 'MACD_HIST_DOWN_SEQ',
      group: 'technical',
      label,
      control: 'select',
      params: [
        { key: 'rightIndexValue', label: 'Số phiên', type: 'select',
          options: [{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},{label:'5',value:5}] },
        TIMEFRAME_PARAM
      ],
      toPayload: (v) => {
        const n = Number(v.rightIndexValue);
        const day = v.timeframe === '1W' ? 'Weekly' : 'Daily';
        return { faKeys: [`MACDHist_DOWN_${n}_${day}`] };
      }
    };
  }
  return null;
}

// Generic helpers for the rest
function hasMinMaxObject(snippet: string) {
  // Detect fAFilterSub["..."] = { min: "...", max: "..." } or selectedValue: [min,max]
  if (/fAFilterSub\s*\[[^\]]+\]\s*=\s*\{[\s\S]*?\bmin\b[\s\S]*?\bmax\b[\s\S]*?\}/m.test(snippet)) return true;
  if (/selectedValue\s*:\s*\[\s*[^,\]]+\s*,\s*[^,\]]+\s*\]/.test(snippet) && /type\s*:\s*["']Range["']/.test(snippet)) return true;
  return false;
}
function extractDailyWeeklyKey(snippet: string): { base?: string } {
  // e.g., fAFilterSub["RSI14_Daily"] and ["RSI14_Weekly"]
  const m = snippet.match(/fAFilterSub\s*\[\s*["']([A-Za-z0-9_]+)_Daily["']\s*\]/);
  if (m) return { base: m[1] };
  return {};
}

// Main
function main() {
  const items = readMappingsMD(IN);
  const defs: CriterionDef[] = [];
  const unresolved: string[] = [];

  for (const it of items) {
    const id = slugify(it.label);
    const group = detectGroup(it.label, it.snippet);

    // 1) Special families (exact)
    let def: CriterionDef | null = null;
    if (isRSI(it.label)) def = makeRSI(it.label, it.snippet);
    if (!def && isMACD(it.label)) def = makeMACD(it.label, it.snippet);

    // 2) Generic rules by destination
    if (!def) {
      // Parameters destination
      if (it.destination.includes('parameters')) {
        const isRange = /type\s*:\s*["']Range["']/.test(it.snippet) || /selectedValue\s*:\s*\[.+?,.+?\]/.test(it.snippet);
        const codeMatch = it.snippet.match(/code\s*:\s*["']([^"']+)["']/);
        const code = codeMatch ? codeMatch[1] : id;
        
        def = {
          id,
          group,
          label: it.label,
          control: isRange ? 'range' : 'select',
          params: isRange ? buildRangeParams() : [{ key: 'value', label: 'Giá trị', type: 'select', options: [] }],
          toPayload: (v) => {
            if (isRange) {
              // Check for percentage conversion
              if (/\/\s*100/.test(it.snippet)) {
                return { parameters: [{ name: it.label, code, type: 'Range', selectedValue: [Number(v.min) / 100, Number(v.max) / 100], unit: 'Percentage' }]};
              } else if (/\*\s*1000000000/.test(it.snippet)) {
                return { parameters: [{ name: it.label, code, type: 'Range', selectedValue: [Number(v.min) * 1000000000, Number(v.max) * 1000000000], unit: 'BillionVND' }]};
              } else if (/\*\s*1000000/.test(it.snippet)) {
                return { parameters: [{ name: it.label, code, type: 'Range', selectedValue: [Number(v.min) * 1000000, Number(v.max) * 1000000], unit: 'MillionVND' }]};
              }
              return { parameters: [{ name: it.label, code, type: 'Range', selectedValue: [Number(v.min), Number(v.max)], unit: 'Unit' }]};
            }
            return { parameters: [{ name: it.label, code, type: 'Set', selectedValue: [v.value] }]};
          }
        };
      }
      // fAFilterSub destination
      else if (it.destination.includes('fAFilterSub')) {
        // Check if has session mapping
        const hasSession = /switch \(tieuChi\.session\)/.test(it.snippet);
        if (hasSession) {
          const keyMatch = it.snippet.match(/key\s*:\s*[`"']([^`"']+)[`"']/);
          const baseKey = keyMatch ? keyMatch[1].split('_')[0] : slugify(it.label);
          
          def = {
            id,
            group,
            label: it.label,
            control: 'range',
            params: [
              ...buildRangeParams(),
              { key: 'session', label: 'Phiên', type: 'select', options: [
                {label:'5 phiên', value:0}, {label:'10 phiên', value:1}, {label:'20 phiên', value:2}, {label:'60 phiên', value:3}, {label:'120 phiên', value:4}
              ]}
            ],
            toPayload: (v) => {
              const sessionMap = [5, 10, 20, 60, 120];
              const sessionValue = sessionMap[v.session ?? 0];
              return { fAFilterSub: [{ key: `${baseKey}_${sessionValue}`, value: { min: String(v.min), max: String(v.max) } }] };
            }
          };
        } else {
          // Regular fAFilterSub with Daily/Weekly timeframes
          const hasDW = /Daily|Weekly/.test(it.snippet) || it.hasTimeframe;
          const keyMatch = it.snippet.match(/key\s*:\s*[`"']([^`"']+)[`"']/);
          const baseKey = keyMatch ? keyMatch[1].replace(/_Daily|_Weekly/, '') : slugify(it.label);
          
          def = {
            id,
            group,
            label: it.label,
            control: 'range',
            params: hasDW ? [...buildRangeParams(), TIMEFRAME_PARAM] : [...buildRangeParams()],
            toPayload: (v) => {
              const key = hasDW ? `${baseKey}_${(v.timeframe === '1W' ? 'Weekly' : 'Daily')}` : baseKey;
              return { fAFilterSub: [{ key, value: { min: String(v.min), max: String(v.max) } }] };
            }
          };
        }
      }
      // faFilter destination 
      else if (it.destination.includes('faFilter')) {
        const keyMatch = it.snippet.match(/key\s*:\s*[`"']([^`"']+)[`"']/);
        const key = keyMatch ? keyMatch[1] : id;
        
        def = {
          id,
          group,
          label: it.label,
          control: 'range',
          params: buildRangeParams(),
          toPayload: (v) => {
            // Check for percentage conversion in faFilter
            if (/\/\s*100/.test(it.snippet)) {
              return { faFilter: [{ key, value: { min: (Number(v.min) / 100).toString(), max: (Number(v.max) / 100).toString() } }] };
            }
            return { faFilter: [{ key, value: { min: String(v.min), max: String(v.max) } }] };
          }
        };
      }
      // faKeys destination
      else if (it.destination.includes('faKeys')) {
        // Check for simple string literal push
        const strLit = it.snippet.match(/faKeys\.push\(\s*["'`](.+?)["'`]\s*\)/);
        if (strLit && !/switch|case|if/.test(it.snippet)) {
          // Simple boolean criterion
          def = {
            id,
            group,
            label: it.label,
            control: 'boolean',
            params: [],
            toPayload: (_v) => ({ faKeys: [strLit[1]] }),
          };
        } else {
          // Complex faKeys with conditions - analyze patterns
          const params: any[] = [];
          
          // Check for leftIndexValue (price type selection)
          if (/tieuChi\.leftIndexValue/.test(it.snippet)) {
            params.push({ key: 'leftIndexValue', label: 'Loại giá', type: 'select', options: [
              {label:'Giá (Close)', value:0}, {label:'Giá (High)', value:1}, {label:'Giá (Low)', value:2}, {label:'Giá (Average)', value:3}
            ]});
          }
          
          // Check for interval (timeframe)
          if (/tieuChi\.interval/.test(it.snippet) || it.hasTimeframe) {
            params.push(TIMEFRAME_PARAM);
          }
          
          // Check for month selection
          if (/tieuChi\.month/.test(it.snippet)) {
            params.push({ key: 'month', label: 'Kỳ báo cáo', type: 'select', options: [
              {label:'Quý gần nhất', value:0}, {label:'Quý gần nhì', value:1}, {label:'TTM', value:2}, {label:'Năm gần nhất', value:3}
            ]});
          }
          
          def = {
            id,
            group,
            label: it.label,
            control: params.length ? 'select' : 'boolean',
            params,
            toPayload: (v) => {
              // Try to extract the key pattern from snippet
              // This is a fallback - specific patterns should be handled above
              const keyPattern = it.snippet.match(/faKeys\.push\(["']([^"']+)["']\)/);
              if (keyPattern) {
                return { faKeys: [keyPattern[1]] };
              }
              // Generate a best-effort key
              const parts = [id];
              if (v.timeframe) parts.push(v.timeframe === '1W' ? 'Weekly' : 'Daily');
              return { faKeys: [parts.join('_')] };
            }
          };
        }
      }
      else {
        // No clear destination - make a generic one
        def = {
          id,
          group,
          label: it.label,
          control: it.controlGuess === 'range' ? 'range' : 'select',
          params: it.controlGuess === 'range' ? buildRangeParams() : [],
          toPayload: (_v) => {
            console.warn('UNRESOLVED CRITERION (no clear destination):', it.label);
            return {};
          }
        };
      }
    }

    if (!def) {
      unresolved.push(it.label);
      // Make a placeholder that forces developer attention but won't break build
      def = {
        id,
        group,
        label: it.label,
        control: 'select',
        params: [],
        toPayload: (_v) => {
          console.warn('UNRESOLVED CRITERION (fill manually):', it.label);
          return {};
        }
      };
    }
    defs.push(def);
  }

  const header =
`// AUTO-GENERATED by tools/generate_criteria_defs.ts
// Source: ${path.resolve(IN)}
// IMPORTANT: RSI14 & MACD mappings are exact per web; other families follow snippet-driven rules.
// If any criterion appears in the "UNRESOLVED" list below, open docs/StockFilter_RN_AllMappings.md and fill it manually.

import { CriterionDef } from './types';

export const CRITERIA_DEFS: CriterionDef[] = [
`;

  const lines: string[] = [header];
  for (const d of defs) {
    const params = JSON.stringify(d.params, null, 2);
    // inline toPayload as function body string
    const body = d.toPayload.toString()
      .replace(/^\(\w+\)\s*=>\s*\{?/, '(values: Record<string, any>) => {')
      .replace(/\}$/, '}');

    lines.push(`  {
    id: ${JSON.stringify(d.id)},
    group: ${JSON.stringify(d.group)},
    label: ${JSON.stringify(d.label)},
    control: ${JSON.stringify(d.control)},
    params: ${params},
    toPayload: ${body},
  },`);
  }
  lines.push('];\n');

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, lines.join('\n'), 'utf8');

  if (unresolved.length) {
    console.log('\nUNRESOLVED (need manual tweak per snippet):', unresolved.length);
    unresolved.forEach(l => console.log(' -', l));
    process.exitCode = 2; // make it visible in CI
  } else {
    console.log('CRITERIA_DEFS.ts generated with 0 unresolved criteria.');
  }
}

main();
