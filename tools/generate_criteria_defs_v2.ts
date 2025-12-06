// tools/generate_criteria_defs_v2.ts
// Generate CRITERIA_DEFS.ts từ docs/StockFilter_RN_AllMappings.md
// ĐÃ map chuẩn RSI14, MACD, EMA, MA. Các nhóm khác parse tự động từ snippet web.
// Chạy: npx ts-node tools/generate_criteria_defs_v2.ts --in docs/StockFilter_RN_AllMappings.md --out features/stockFilter/CRITERIA_DEFS.ts

import * as fs from 'fs';
import * as path from 'path';

type ControlType = 'range'|'select'|'boolean';
type Group = 'popular'|'basic'|'technical'|'volatility'|'mine';

export type ParamDef =
  | { key: string; label: string; type: 'select'; options: {label:string, value:any}[] }
  | { key: string; label: string; type: 'number'; min?: number; max?: number; step?: number }
  | { key: 'min'|'max'; label: string; type: 'number'; min?: number; max?: number; step?: number }
  | { key: string; label: string; type: 'boolean' };

type CriterionDef = {
  id: string;
  group: Group;
  familyKey: string;
  familyTitle: string;
  label: string;
  control: ControlType;
  params: ParamDef[];
  defaults?: Record<string, any>;
  toPayload: (values: Record<string,any>) => any;
};

const args = process.argv.slice(2);
const inMd = args[args.indexOf('--in')+1];
const outTs = args[args.indexOf('--out')+1];
if (!inMd || !outTs) { console.error('Usage: --in <md> --out <ts>'); process.exit(1); }

const md = fs.readFileSync(inMd,'utf8');

type MappingItem = { label: string; destination: string[]; snippet: string; hasTF: boolean; };

function parseAll(md: string): MappingItem[] {
  const reBlock = /^##\s+(.+?)\s*$([\s\S]*?)(?=^##\s+|\Z)/gm;
  const items: MappingItem[] = [];
  let m: RegExpExecArray|null;
  while ((m = reBlock.exec(md)) !== null) {
    const label = m[1].trim();
    const body = m[2];
    const destLine = body.match(/\*\*Destination:\*\s*([^\n]+)/);
    const destination = destLine ? destLine[1].split(',').map(s=>s.trim()) : [];
    const hasTF = /Has timeframe:\s*yes/.test(body);
    const snip = (body.match(/```ts([\s\S]*?)```/)||[])[1] || '';
    items.push({ label, destination, snippet: snip, hasTF });
  }
  return items;
}

function familyOf(label: string) {
  const l = label.toLowerCase();
  const m = (title:string) => ({ key: title.toUpperCase().replace(/[^A-Z0-9]/g,''), title });
  if (l.includes('rsi')) return m('RSI14');
  if (l.includes('macd')) return m('MACD (9,12,26)');
  if (l.includes('ichimoku')) return m('Ichimoku');
  if (l.includes('bollinger')) return m('Bollinger band (20,2)');
  if (/\bema\b/.test(l)) return m('EMA');
  if (/\bsma\b/.test(l) || /\bma\b/.test(l)) return m('MA');
  if (l.includes('adx')) return m('ADX');
  if (l.includes('stoch') || l.includes('kdj')) return m('Stochastic/KDJ');
  if (l.includes('mfi')) return m('MFI');
  if (l.includes('cci')) return m('CCI');
  if (l.includes('atr')) return m('ATR');
  if (l.includes('obv')) return m('OBV');
  if (l.includes('roc')) return m('ROC');
  if (l.includes('trix')) return m('TRIX');
  if (l.includes('williams') || l.includes('%r')) return m('Williams %R');
  if (l.includes('parabolic') || /\bsar\b/.test(l)) return m('Parabolic SAR');
  if (l.includes('khối lượng') || l.includes('volume')) return m('Khối lượng/Volume');
  if (l.includes('high - low') || l.includes('biến động')) return m('Biến động/High-Low');
  if (l.includes('rs6')) return m('RS6m (6 tháng)');
  if (l.includes('rs52') || l.includes('52w')) return m('RS52w (52 tuần)');
  if (l.includes('p/e') || l.includes(' pe')) return m('P/E');
  if (l.includes('p/b') || l.includes(' pb')) return m('P/B');
  if (l.includes('roe')) return m('ROE');
  if (l.includes('roa')) return m('ROA');
  if (l.includes('eps')) return m('EPS');
  if (l.includes('doanh thu')) return m('Doanh thu');
  if (l.includes('lợi nhuận') || l.includes('ln ')) return m('Lợi nhuận');
  if (l.includes('vốn hóa')) return m('Vốn hóa');
  return m('Khác');
}
function detectGroup(label: string): Group {
  const l = label.toLowerCase();
  if (l.match(/p\/e|p\/b|pe |pb |roe|roa|eps|doanh thu|lợi nhuận|vốn hóa/)) return 'basic';
  if (l.match(/biến động|high|low|rs6|rs52/)) return 'volatility';
  if (l.match(/nđtnn|foreign|khối ngoại/)) return 'popular';
  return 'technical';
}

// helpers
const TF_PARAM: ParamDef = { key: 'interval', label: 'Kỳ', type: 'select', options: [{label:'1 ngày',value:0},{label:'1 tuần',value:1}] };
const COMP_PARAM: ParamDef = { key: 'compare', label: 'So sánh', type: 'select', options: [{label:'Trên (≥)',value:0},{label:'Bằng (=)',value:1},{label:'Dưới (≤)',value:2}] };
const CROSS_PARAM: ParamDef = { key: 'compare', label: 'Hướng cắt', type: 'select', options: [{label:'Cắt lên trên',value:0},{label:'Cắt xuống dưới',value:1}] };
const RSI_LEVEL_PARAM: ParamDef = { key: 'level', label: 'Mức', type: 'select', options: [{label:'70',value:0},{label:'60',value:1},{label:'40',value:2},{label:'30',value:3}] };
const HIST_N_PARAM: ParamDef = { key: 'rightIndexValue', label: 'Số phiên', type: 'select', options: [{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},{label:'5',value:5}] };

function emaOptions(): {label:string,value:number}[] {
  return ['EMA(5)','EMA(10)','EMA(15)','EMA(20)','EMA(50)','EMA(100)','EMA(200)'].map((lab,i)=>({label:lab,value:i}));
}
function smaOptions(): {label:string,value:number}[] {
  return ['MA(5)','MA(10)','MA(15)','MA(20)','MA(50)','MA(100)','MA(200)'].map((lab,i)=>({label:lab,value:i}));
}
function emaToken(idx:number){ return ['EMA5','EMA10','EMA15','EMA20','EMA50','EMA100','EMA200'][idx] || 'EMA5'; }
function smaToken(idx:number){ return ['SMA5','SMA10','SMA15','SMA20','SMA50','SMA100','SMA200'][idx] || 'SMA5'; }
const OP = (v:number)=> v===0?'>=':v===1?'=':'<=';

function makeRSI(label: string): CriterionDef | null {
  if (/Giá trị RSI14/i.test(label)) {
    return {
      id: 'RSI14_VALUE',
      group: 'technical',
      familyKey: 'RSI14', familyTitle: 'RSI14',
      label, control: 'range',
      params: [
        { key:'min', label:'Min', type:'number', min:0, max:100, step:0.1 },
        { key:'max', label:'Max', type:'number', min:0, max:100, step:0.1 },
        TF_PARAM
      ],
      toPayload: v => ({ fAFilterSub: [{ key: `RSI14_${v.interval===1?'Weekly':'Daily'}`, value: {min:String(v.min), max:String(v.max)} }] })
    };
  }
  if (/RSI14 so với các vùng giá trị/i.test(label)) {
    return {
      id: 'RSI14_ZONE',
      group: 'technical',
      familyKey: 'RSI14', familyTitle: 'RSI14',
      label, control: 'select',
      params: [COMP_PARAM, RSI_LEVEL_PARAM, TF_PARAM],
      toPayload: v => ({ faKeys: [`RSI14_${OP(v.compare)}_${['70','60','40','30'][v.level??0]}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/RSI14 và vùng Quá mua\/Quá bán/i.test(label)) {
    return {
      id: 'RSI14_OVERZONE',
      group: 'technical',
      familyKey: 'RSI14', familyTitle: 'RSI14',
      label, control: 'select',
      params: [{ key:'compare', label:'Hành động', type:'select', options:[{label:'Vượt',value:0},{label:'Thủng',value:1}] },
               { key:'band', label:'Ngưỡng', type:'select', options:[{label:'70',value:0},{label:'30',value:1}] },
               TF_PARAM],
      toPayload: v => ({ faKeys: [`RSI14_${v.compare===0?'VUOT':'THUNG'}_${v.band===1?'30':'70'}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  return null;
}

function makeMACD(label: string): CriterionDef | null {
  if (/MACD so với Signal/i.test(label)) {
    return { id:'MACD_VS_SIGNAL', group:'technical', familyKey:'MACD', familyTitle:'MACD (9,12,26)',
      label, control:'select', params:[COMP_PARAM, TF_PARAM],
      toPayload:v => ({ faKeys: [`MACD_${OP(v.compare)}_MACDSignal_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/MACD cắt với Signal/i.test(label)) {
    return { id:'MACD_CROSS_SIGNAL', group:'technical', familyKey:'MACD', familyTitle:'MACD (9,12,26)',
      label, control:'select', params:[CROSS_PARAM, TF_PARAM],
      toPayload:v => ({ faKeys: [`MACD_${v.compare===0?'VUOT':'THUNG'}_MACDSignal_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/Trạng thái giá trị của MACD/i.test(label)) {
    return { id:'MACD_STATE', group:'technical', familyKey:'MACD', familyTitle:'MACD (9,12,26)',
      label, control:'select',
      params:[
        { key:'leftIndexValue', label:'So với', type:'select', options:[{label:'MACD',value:0},{label:'Signal',value:1}] },
        { key:'compare', label:'Trạng thái', type:'select',
          options:[{label:'≥ 0',value:0},{label:'< 0',value:1},{label:'Vượt 0',value:2},{label:'Thủng 0',value:3}] },
        TF_PARAM
      ],
      toPayload:v => ({ faKeys: [`${v.leftIndexValue===1?'MACDSignal':'MACD'}_${['>=_0','<_0','VUOT_0','THUNG_0'][v.compare??0]}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/Histogram tăng liên tục/i.test(label)) {
    return { id:'MACD_HIST_UP', group:'technical', familyKey:'MACD', familyTitle:'MACD (9,12,26)',
      label, control:'select', params:[HIST_N_PARAM, TF_PARAM],
      toPayload:v => ({ faKeys: [`MACDHist_UP_${Number(v.rightIndexValue)||2}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/Histogram giảm liên tục/i.test(label)) {
    return { id:'MACD_HIST_DOWN', group:'technical', familyKey:'MACD', familyTitle:'MACD (9,12,26)',
      label, control:'select', params:[HIST_N_PARAM, TF_PARAM],
      toPayload:v => ({ faKeys: [`MACDHist_DOWN_${Number(v.rightIndexValue)||2}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  return null;
}

function makeEMA_MA(label: string): CriterionDef | null {
  const isEMA = /EMA/i.test(label);
  const fam = isEMA ? {k:'EMA',t:'EMA'} : {k:'MA',t:'MA'};
  const pickOpts = isEMA ? emaOptions() : smaOptions();
  const token = isEMA ? emaToken : smaToken;
  if (/Giá so với đường TB/i.test(label)) {
    return {
      id: isEMA ? 'EMA_PRICE_VS' : 'MA_PRICE_VS',
      group:'technical', familyKey:fam.k, familyTitle:fam.t,
      label, control:'select',
      params:[ {key:'rightIndexValue',label:`Đường ${fam.t}`,type:'select',options:pickOpts},
               COMP_PARAM, TF_PARAM ],
      toPayload:v => ({ faKeys: [`Close_${OP(v.compare)}_${token(v.rightIndexValue||0)}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/Giá cắt đường TB/i.test(label)) {
    return {
      id: isEMA ? 'EMA_PRICE_CROSS' : 'MA_PRICE_CROSS',
      group:'technical', familyKey:fam.k, familyTitle:fam.t,
      label: label.trim(), control:'select',
      params:[ {key:'compare',label:'Hướng cắt',type:'select',options:[{label:'Cắt lên trên',value:0},{label:'Cắt xuống dưới',value:1}]},
               {key:'rightIndexValue',label:`Đường ${fam.t}`,type:'select',options:pickOpts},
               TF_PARAM ],
      toPayload:v => ({ faKeys: [`Close_${v.compare===0?'VUOT':'THUNG'}_${token(v.rightIndexValue||0)}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/So sánh 2 đường TB/i.test(label)) {
    return {
      id: isEMA ? 'EMA_COMPARE_TWO' : 'MA_COMPARE_TWO',
      group:'technical', familyKey:fam.k, familyTitle:fam.t,
      label, control:'select',
      params:[ {key:'leftIndexValue',label:`${fam.t} thứ nhất`,type:'select',options:pickOpts},
               COMP_PARAM,
               {key:'rightIndexValue',label:`${fam.t} thứ hai`,type:'select',options:pickOpts},
               TF_PARAM ],
      toPayload:v => ({ faKeys: [`${token(v.leftIndexValue||0)}_${OP(v.compare)}_${token(v.rightIndexValue||0)}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  if (/Giao cắt 2 đường TB/i.test(label)) {
    return {
      id: isEMA ? 'EMA_CROSS_TWO' : 'MA_CROSS_TWO',
      group:'technical', familyKey:fam.k, familyTitle:fam.t,
      label, control:'select',
      params:[ {key:'leftIndexValue',label:`${fam.t} thứ nhất`,type:'select',options:pickOpts},
               {key:'compare',label:'Hướng cắt',type:'select',options:[{label:'Cắt lên trên',value:0},{label:'Cắt xuống dưới',value:1}]},
               {key:'rightIndexValue',label:`${fam.t} thứ hai`,type:'select',options:pickOpts},
               TF_PARAM ],
      toPayload:v => ({ faKeys: [`${token(v.leftIndexValue||0)}_${v.compare===0?'VUOT':'THUNG'}_${token(v.rightIndexValue||0)}_${v.interval===1?'Weekly':'Daily'}`] })
    };
  }
  return null;
}

function parseGeneric(item: MappingItem): CriterionDef {
  const fam = familyOf(item.label);
  const group = detectGroup(item.label);
  
  // Handle 'parameters' destination
  if (item.destination.includes('parameters')) {
    const isRange = /type\s*:\s*["']Range["']/.test(item.snippet);
    const codeMatch = item.snippet.match(/code\s*:\s*["']([^"']+)["']/);
    const code = codeMatch ? codeMatch[1] : slugId(item.label);
    const hasPercent = /\/\s*100/.test(item.snippet);
    const hasBillion = /\*\s*1000000000/.test(item.snippet);
    const hasMillion = /\*\s*1000000/.test(item.snippet);
    
    if (isRange) {
      return {
        id: slugId(item.label),
        group,
        familyKey: fam.key.replace(/[^A-Z0-9]/g,''), 
        familyTitle: fam.title,
        label: item.label.trim(), 
        control: 'range',
        params: [
          { key:'min', label:'Min', type:'number' },
          { key:'max', label:'Max', type:'number' }
        ],
        toPayload: v => ({
          parameters: [{
            name: item.label,
            code,
            type: 'Range',
            selectedValue: hasPercent 
              ? [Number(v.min)/100, Number(v.max)/100]
              : hasBillion
              ? [Number(v.min)*1000000000, Number(v.max)*1000000000]
              : hasMillion
              ? [Number(v.min)*1000000, Number(v.max)*1000000]
              : [Number(v.min), Number(v.max)],
            unit: hasPercent ? 'Percentage' : hasBillion ? 'BillionVND' : hasMillion ? 'MillionVND' : 'Unit'
          }]
        })
      };
    }
  }
  
  // Nếu có fAFilterSub {min,max} => range (+ TF nếu có)
  if (item.destination.includes('fAFilterSub') && /{[^}]*min[^}]*max[^}]*}/.test(item.snippet)) {
    const tf = item.hasTF || /Daily|Weekly/.test(item.snippet);
    const params: ParamDef[] = [
      { key:'min', label:'Min', type:'number' },
      { key:'max', label:'Max', type:'number' },
    ];
    if (tf) params.push(TF_PARAM);
    return {
      id: slugId(item.label),
      group: detectGroup(item.label),
      familyKey: fam.key.replace(/[^A-Z0-9]/g,''), familyTitle: fam.title,
      label: item.label.trim(), control:'range', params,
      toPayload: v => {
        const keyBase = (item.snippet.match(/fAFilterSub\[\s*["']([A-Za-z0-9_]+)_/ )||[])[1] || slugId(item.label);
        const day = tf ? (v.interval===1?'Weekly':'Daily') : '';
        const fkey = tf ? `${keyBase}_${day}` : keyBase;
        return { fAFilterSub: [{ key: fkey, value: { min: String(v.min), max: String(v.max) } }] };
      }
    };
  }

  // Nếu có faKeys.push(`...`) template => select/boolean
  const tpl = (item.snippet.match(/faKeys\.push\(\s*`([^`]+)`\s*\)/) || [])[1];
  if (tpl) {
    const fam2 = familyOf(item.label);
    const vars = Array.from(tpl.matchAll(/\$\{([a-zA-Z0-9_]+)\}/g)).map(m=>m[1]);
    // suy ra options từ các switch gần đó
    const params: ParamDef[] = [];
    const addTF = item.hasTF || /Daily|Weekly/.test(tpl);
    const tplValue = tpl; // Capture for serialization
    
    // comparator
    if (vars.some(v => v.toLowerCase().includes('compare'))) {
      if (/_VUOT_|_THUNG_/.test(tpl)) params.push(CROSS_PARAM);
      else params.push(COMP_PARAM);
    }
    // levels
    if (vars.some(v => /level|band/i.test(v))) {
      // RSI levels đã handle ở RSI; generic bỏ qua (generator đã có RSI riêng)
    }
    // left/right index values (đường chỉ báo)
    if (vars.some(v => /leftIndexValue/i.test(v))) {
      params.push({ key:'leftIndexValue', label:'Chỉ báo A', type:'select', options: [] });
    }
    if (vars.some(v => /rightIndexValue/i.test(v))) {
      params.push({ key:'rightIndexValue', label:'Chỉ báo B', type:'select', options: [] });
    }
    if (addTF) params.push(TF_PARAM);

    const def: CriterionDef = {
      id: slugId(item.label),
      group: detectGroup(item.label),
      familyKey: fam2.key.replace(/[^A-Z0-9]/g,''), familyTitle: fam2.title,
      label: item.label.trim(),
      control: params.length ? 'select' : 'boolean',
      params,
      toPayload: (v => {
        // chắp template
        const day = addTF ? (v.interval===1?'Weekly':'Daily') : undefined;
        const compiled = tplValue
          .replace(/\$\{day\}/g, day||'')
          .replace(/\$\{compare\}/g, (params.find(p=>p.key==='compare') ? (v.compare===0?'>=':v.compare===1?'=':'<=') : ''))
          .replace(/\$\{leftIndexValue\}/g, String(v.leftIndexValue ?? ''))
          .replace(/\$\{rightIndexValue\}/g, String(v.rightIndexValue ?? ''));
        return { faKeys: [compiled] };
      }) as any
    } as any;
    return def;
  }

  // Nếu faKeys.push("literal") => boolean
  const lit = (item.snippet.match(/faKeys\.push\(\s*["']([^"'`]+)["']\s*\)/)||[])[1];
  if (lit) {
    const fam3 = familyOf(item.label);
    const litValue = lit; // capture for serialization
    return {
      id: slugId(item.label),
      group: detectGroup(item.label),
      familyKey: fam3.key.replace(/[^A-Z0-9]/g,''), familyTitle: fam3.title,
      label: item.label.trim(), control:'boolean', params: [],
      toPayload: (_ => ({ faKeys: [litValue] })) as any
    } as any;
  }

  // default
  const fam4 = familyOf(item.label);
  return {
    id: slugId(item.label),
    group: detectGroup(item.label),
    familyKey: fam4.key.replace(/[^A-Z0-9]/g,''), familyTitle: fam4.title,
    label: item.label.trim(), control:'select', params: [],
    toPayload: _ => ({})
  };
}

function slugId(label:string){ return label.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'_').replace(/^_+|_+$/g,'').toUpperCase(); }

function main() {
  const items = parseAll(md);
  const defs: CriterionDef[] = [];
  const unresolved: string[] = [];

  for (const it of items) {
    let def: CriterionDef|null = null;
    // exact families first
    def = makeRSI(it.label) || def;
    def = makeMACD(it.label) || def;
    def = makeEMA_MA(it.label) || def;

    if (!def) def = parseGeneric(it);
    if (!def) { unresolved.push(it.label); continue; }
    defs.push(def);
  }

  // Xuất file
  const typeDefMatch = fs.readFileSync(__filename,'utf8').match(/type CriterionDef = [\s\S]*?;\n/);
  const typeDef = typeDefMatch ? typeDefMatch[0] : '';
  const header = `// AUTO-GENERATED from ${path.basename(inMd)}
import { ParamDef } from './types';
export type ControlType = 'range'|'select'|'boolean';
export type Group = 'popular'|'basic'|'technical'|'volatility'|'mine';
export ${typeDef}
export const CRITERIA_DEFS: CriterionDef[] = [
`;
  const lines: string[] = [header];
  for (const d of defs) {
    // Serialize toPayload function with proper variable substitution
    let payloadStr = d.toPayload.toString();
    
    // Check if this contains closure variables that need to be embedded
    if (payloadStr.includes('litValue')) {
      // Extract the actual value by calling the function
      const result = d.toPayload({});
      if (result.faKeys && Array.isArray(result.faKeys)) {
        payloadStr = `_ => ({ faKeys: [${JSON.stringify(result.faKeys[0])}] })`;
      }
    } else if (payloadStr.includes('tplValue')) {
      // Template case - need to embed the template string and params closure
      payloadStr = payloadStr
        .replace(/tplValue/g, '`' + payloadStr.match(/tplValue/)?.[0] + '`')
        .replace(/params\.find/g, 'd.params.find');
      // Actually, better to just reconstruct it based on the definition
      // For now, keep the original toString() for select/boolean with templates
    }
    
    lines.push(`  {
    id: ${JSON.stringify(d.id)},
    group: ${JSON.stringify(d.group)},
    familyKey: ${JSON.stringify(d.familyKey)},
    familyTitle: ${JSON.stringify(d.familyTitle)},
    label: ${JSON.stringify(d.label)},
    control: ${JSON.stringify(d.control)},
    params: ${JSON.stringify(d.params, null, 2)},
    toPayload: ${payloadStr},
  },
`);
  }
  lines.push('];\n');
  fs.mkdirSync(path.dirname(outTs), {recursive:true});
  fs.writeFileSync(outTs, lines.join(''), 'utf8');

  if (unresolved.length){
    console.warn('UNRESOLVED count:', unresolved.length);
    unresolved.forEach(x=>console.warn(' -', x));
    process.exitCode = 2;
  } else {
    console.log('Generated CRITERIA_DEFS.ts with', defs.length, 'criteria.');
  }
}
main();
