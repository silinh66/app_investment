#!/usr/bin/env tsx
/**
 * Auto-generate CRITERIA_DEFS.ts from web StockFilter code
 * Parses the onFilter function to extract 100% accurate criteria configurations
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type ControlType = 'range' | 'select' | 'boolean';
type Group = 'popular' | 'basic' | 'technical' | 'volatility' | 'mine';

type ParamDef =
  | { key: string; label: string; type: 'select'; options: { label: string; value: any }[] }
  | { key: string; label: string; type: 'number'; min?: number; max?: number; step?: number }
  | { key: string; label: string; type: 'boolean' };

interface CriterionDef {
  id: string;
  group: Group;
  familyKey: string;
  familyTitle: string;
  label: string;
  control: ControlType;
  params: ParamDef[];
  defaults?: Record<string, any>;
  toPayload: string; // Will be function body as string
}

interface SwitchMapping {
  variable: string; // e.g., 'compare', 'interval', 'leftIndexValue'
  cases: { caseValue: number; token: string; label: string }[];
}

// ============================================================================
// CONFIGURATION & MAPPINGS
// ============================================================================

// Hardcoded mappings for common patterns
const COMMON_MAPPINGS: Record<string, SwitchMapping> = {
  compare_gte_eq_lte: {
    variable: 'compare',
    cases: [
      { caseValue: 0, token: '>=', label: 'Trên (≥)' },
      { caseValue: 1, token: '=', label: 'Bằng (=)' },
      { caseValue: 2, token: '<=', label: 'Dưới (≤)' },
    ],
  },
  compare_vuot_thung: {
    variable: 'compare',
    cases: [
      { caseValue: 0, token: 'VUOT', label: 'Cắt lên trên' },
      { caseValue: 1, token: 'THUNG', label: 'Cắt xuống dưới' },
    ],
  },
  interval: {
    variable: 'interval',
    cases: [
      { caseValue: 0, token: 'Daily', label: '1 ngày' },
      { caseValue: 1, token: 'Weekly', label: '1 tuần' },
    ],
  },
  ema_values: {
    variable: 'rightIndexValue',
    cases: [
      { caseValue: 0, token: 'EMA5', label: 'EMA(5)' },
      { caseValue: 1, token: 'EMA10', label: 'EMA(10)' },
      { caseValue: 2, token: 'EMA15', label: 'EMA(15)' },
      { caseValue: 3, token: 'EMA20', label: 'EMA(20)' },
      { caseValue: 4, token: 'EMA50', label: 'EMA(50)' },
      { caseValue: 5, token: 'EMA100', label: 'EMA(100)' },
      { caseValue: 6, token: 'EMA200', label: 'EMA(200)' },
    ],
  },
  sma_values: {
    variable: 'rightIndexValue',
    cases: [
      { caseValue: 0, token: 'SMA5', label: 'MA(5)' },
      { caseValue: 1, token: 'SMA10', label: 'MA(10)' },
      { caseValue: 2, token: 'SMA15', label: 'MA(15)' },
      { caseValue: 3, token: 'SMA20', label: 'MA(20)' },
      { caseValue: 4, token: 'SMA50', label: 'MA(50)' },
      { caseValue: 5, token: 'SMA100', label: 'MA(100)' },
      { caseValue: 6, token: 'SMA200', label: 'MA(200)' },
    ],
  },
  rsi_level: {
    variable: 'rightIndexValue',
    cases: [
      { caseValue: 0, token: '70', label: '70' },
      { caseValue: 1, token: '60', label: '60' },
      { caseValue: 2, token: '40', label: '40' },
      { caseValue: 3, token: '30', label: '30' },
    ],
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function sanitizeId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function inferGroupAndFamily(label: string): { group: Group; familyKey: string; familyTitle: string } {
  const l = label.toLowerCase();
  
  // RSI14
  if (l.includes('rsi14') || l.includes('rsi 14')) {
    return { group: 'technical', familyKey: 'RSI14', familyTitle: 'RSI(14)' };
  }
  
  // MACD
  if (l.includes('macd') || l.includes('histogram')) {
    return { group: 'technical', familyKey: 'MACD', familyTitle: 'MACD' };
  }
  
  // EMA
  if (l.includes('ema') && !l.includes('ma/ema')) {
    return { group: 'technical', familyKey: 'EMA', familyTitle: 'EMA' };
  }
  
  // MA / SMA
  if ((l.includes(' ma') || l.includes('sma')) && !l.includes('ma/ema')) {
    return { group: 'technical', familyKey: 'MA', familyTitle: 'MA' };
  }
  
  // Combined EMA/MA
  if (l.includes('ema/ma') || l.includes('ma/ema')) {
    return { group: 'technical', familyKey: 'EMA_MA', familyTitle: 'EMA/MA' };
  }
  
  // Ichimoku
  if (l.includes('ichimoku') || l.includes('tenkan') || l.includes('kijun') || l.includes('chikou')) {
    return { group: 'technical', familyKey: 'Ichimoku', familyTitle: 'Ichimoku' };
  }
  
  // Bollinger
  if (l.includes('bollinger') || l.includes('bb')) {
    return { group: 'technical', familyKey: 'Bollinger', familyTitle: 'Bollinger Bands' };
  }
  
  // ADX
  if (l.includes('adx')) {
    return { group: 'technical', familyKey: 'ADX', familyTitle: 'ADX' };
  }
  
  // Stochastic / KDJ
  if (l.includes('stochastic') || l.includes('kdj') || l.includes('%k') || l.includes('%d')) {
    return { group: 'technical', familyKey: 'Stochastic', familyTitle: 'Stochastic' };
  }
  
  // Volume
  if (l.includes('khối lượng') || l.includes('volume')) {
    return { group: 'volatility', familyKey: 'Volume', familyTitle: 'Khối lượng' };
  }
  
  // Price volatility
  if (l.includes('biến động giá') || l.includes('% thay đổi')) {
    return { group: 'volatility', familyKey: 'PriceChange', familyTitle: 'Biến động giá' };
  }
  
  // Fundamental
  if (l.includes('p/e') || l.includes('p/b') || l.includes('roe') || l.includes('eps') || l.includes('doanh thu')) {
    return { group: 'basic', familyKey: 'Fundamental', familyTitle: 'Phân tích cơ bản' };
  }
  
  // NĐTNN
  if (l.includes('nđtnn') || l.includes('nước ngoài')) {
    return { group: 'popular', familyKey: 'ForeignInvestor', familyTitle: 'NĐTNN' };
  }
  
  // Default
  return { group: 'technical', familyKey: 'Other', familyTitle: 'Khác' };
}

// ============================================================================
// PARSING FUNCTIONS
// ============================================================================

interface ParsedCase {
  label: string;
  snippet: string;
}

function extractCases(onFilterContent: string): ParsedCase[] {
  const cases: ParsedCase[] = [];
  const switchMatch = onFilterContent.match(/switch\s*\(tieuChi\.label\)\s*\{([\s\S]+)\}/);
  
  if (!switchMatch) {
    throw new Error('Could not find switch(tieuChi.label) statement');
  }
  
  const switchBody = switchMatch[1];
  
  // More robust: find all case labels first, then extract snippets between them
  const caseLabelMatches: Array<{ label: string; startIndex: number }> = [];
  const labelRegex = /case\s+"([^"]+)":/g;
  
  let match;
  while ((match = labelRegex.exec(switchBody)) !== null) {
    caseLabelMatches.push({
      label: match[1].trim(),
      startIndex: match.index + match[0].length,
    });
  }
  
  // Extract snippet for each case (from its start to the next case or end)
  for (let i = 0; i < caseLabelMatches.length; i++) {
    const current = caseLabelMatches[i];
    const next = caseLabelMatches[i + 1];
    
    const snippetEnd = next ? next.startIndex - switchBody.substring(next.startIndex - 20, next.startIndex).indexOf('case') : switchBody.length;
    let snippet = switchBody.substring(current.startIndex, snippetEnd);
    
    // Remove the trailing break; and any case/default that might have been included
    snippet = snippet.replace(/\s*break;\s*$/, '');
    snippet = snippet.trim();
    
    // Skip empty or comment-only cases
    if (!snippet || snippet.startsWith('//')) continue;
    
    cases.push({ label: current.label, snippet });
  }
  
  return cases;
}

function detectControlType(snippet: string): ControlType {
  // Range: fAFilterSub or faFilter with min/max
  if (/f[Aa]FilterSub\s*\.\s*push\s*\(\s*\{\s*key:[\s\S]*?value:\s*\{\s*min:/i.test(snippet)) {
    return 'range';
  }
  
  // Select: faKeys.push with template literal containing variables ${...}
  if (/faKeys\s*\.\s*push\s*\(/i.test(snippet) && /\$\{/.test(snippet)) {
    return 'select';
  }
  
  // Boolean: faKeys.push with literal string (no variables)
  if (/faKeys\s*\.\s*push\s*\(/i.test(snippet) && !/\$\{/.test(snippet)) {
    return 'boolean';
  }
  
  // Parameters array (ignore for mobile - return range but will skip payload)
  if (/parameters\s*\.\s*push/i.test(snippet)) {
    return 'range';
  }
  
  return 'boolean'; // Default fallback
}

function parseSwitchStatements(snippet: string): SwitchMapping[] {
  const mappings: SwitchMapping[] = [];
  
  // Find all switch statements - more lenient pattern
  const switchRegex = /switch\s*\(tieuChi\.(\w+)\)\s*\{/g;
  const switches: Array<{ variable: string; startIndex: number }> = [];
  
  let match;
  while ((match = switchRegex.exec(snippet)) !== null) {
    switches.push({
      variable: match[1],
      startIndex: match.index + match[0].length,
    });
  }
  
  // For each switch, extract its body by finding matching braces
  for (const sw of switches) {
    let braceCount = 1;
    let endIndex = sw.startIndex;
    
    for (let i = sw.startIndex; i < snippet.length; i++) {
      if (snippet[i] === '{') braceCount++;
      if (snippet[i] === '}') braceCount--;
      
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }
    
    const switchBody = snippet.substring(sw.startIndex, endIndex);
    
    // Match case statements with variable assignments
    const caseRegex = /case\s+(\d+):\s*([\w\d]+)\s*=\s*["']([^"']+)["'];/g;
    const cases: { caseValue: number; token: string; label: string }[] = [];
    
    let caseMatch;
    while ((caseMatch = caseRegex.exec(switchBody)) !== null) {
      const caseValue = parseInt(caseMatch[1]);
      const varName = caseMatch[2];
      const token = caseMatch[3];
      
      cases.push({ caseValue, token, label: token });
    }
    
    if (cases.length > 0) {
      mappings.push({ variable: sw.variable, cases });
    }
  }
  
  return mappings;
}

function generateParams(controlType: ControlType, snippet: string, label: string): ParamDef[] {
  const params: ParamDef[] = [];
  
  if (controlType === 'range') {
    // Check for interval (Daily/Weekly)
    if (/tieuChi\.interval/.test(snippet)) {
      params.push({
        key: 'interval',
        label: 'Kỳ',
        type: 'select',
        options: [
          { label: '1 ngày', value: 0 },
          { label: '1 tuần', value: 1 },
        ],
      });
    }
    
    // Add min/max params
    params.push(
      { key: 'min', label: 'Từ', type: 'number' },
      { key: 'max', label: 'Đến', type: 'number' }
    );
  } else if (controlType === 'select') {
    const switchMappings = parseSwitchStatements(snippet);
    
    // Check for direct variable assignments that should be number inputs
    const directAssignRegex = /const\s+(\w+)\s*=\s*tieuChi\.([\w\d]+);/g;
    let directMatch;
    const addedKeys = new Set<string>();
    
    while ((directMatch = directAssignRegex.exec(snippet)) !== null) {
      const varName = directMatch[1];
      const prop = directMatch[2];
      
      // These are typically number inputs (like slider values, percentClick, etc.)
      if (!addedKeys.has(prop)) {
        params.push({
          key: prop,
          label: generateParamLabel(prop),
          type: 'number',
          min: 2,
          max: 100,
          step: 1,
        });
        addedKeys.add(prop);
      }
    }
    
    // Apply special handling for known patterns
    for (const mapping of switchMappings) {
      const options = mapping.cases.map((c) => ({
        label: generateFriendlyLabel(c.token, mapping.variable),
        value: c.caseValue,
      }));
      
      params.push({
        key: mapping.variable,
        label: generateParamLabel(mapping.variable),
        type: 'select',
        options,
      });
    }
  }
  // Boolean control has no params
  
  return params;
}

function generateFriendlyLabel(token: string, variable: string): string {
  // Comparison operators
  if (token === '>=') return 'Trên (≥)';
  if (token === '=') return 'Bằng (=)';
  if (token === '<=') return 'Dưới (≤)';
  if (token === 'VUOT') return 'Cắt lên trên';
  if (token === 'THUNG') return 'Cắt xuống dưới';
  
  // Interval
  if (token === 'Daily') return '1 ngày';
  if (token === 'Weekly') return '1 tuần';
  
  // EMA
  if (token.startsWith('EMA')) {
    const num = token.replace('EMA', '');
    return `EMA(${num})`;
  }
  
  // SMA/MA
  if (token.startsWith('SMA')) {
    const num = token.replace('SMA', '');
    return `MA(${num})`;
  }
  
  // MACD
  if (token === 'MACDSignal') return 'Signal';
  if (token === 'MACD') return 'MACD';
  
  // Default: return as-is
  return token;
}

function generateParamLabel(variable: string): string {
  const labels: Record<string, string> = {
    compare: 'So sánh',
    interval: 'Kỳ',
    leftIndexValue: 'Đường thứ nhất',
    rightIndexValue: 'Đường thứ hai',
    session: 'Số phiên',
    level: 'Mức',
    band: 'Vùng',
    change: 'Hướng cắt',
  };
  
  return labels[variable] || variable;
}

function generateToPayloadFunction(controlType: ControlType, snippet: string): string {
  if (controlType === 'boolean') {
    // Extract the literal string from faKeys.push
    const match = snippet.match(/faKeys\s*\.\s*push\s*\(\s*["']([^"']+)["']\s*\)/);
    if (match) {
      const key = match[1];
      return `
  return {
    faKeys: ["${key}"],
  };`;
    }
  }
  
  if (controlType === 'range') {
    // Detect destination: fAFilterSub, faFilter, or parameters
    const fAFilterSubMatch = snippet.match(/fAFilterSub\s*\.\s*push\s*\(\s*\{\s*key:\s*`([^`]+)`/);
    const faFilterMatch = snippet.match(/faFilter\s*\.\s*push\s*\(\s*\{\s*key:\s*`([^`]+)`/);
    const parametersMatch = snippet.match(/parameters\s*\.\s*push\s*\(\s*\{\s*name:\s*"([^"]+)",\s*code:\s*"([^"]+)"/);
    
    if (fAFilterSubMatch) {
      const keyTemplate = fAFilterSubMatch[1];
      // Check if interval is used
      if (/tieuChi\.interval/.test(snippet)) {
        return `
  const day = values.interval === 0 ? 'Daily' : 'Weekly';
  return {
    fAFilterSub: [
      {
        key: \`${keyTemplate.replace(/\$\{day\d+\}/, '${day}')}\`,
        value: { min: String(values.min), max: String(values.max) },
      },
    ],
  };`;
      } else {
        return `
  return {
    fAFilterSub: [
      {
        key: "${keyTemplate.replace(/\$\{.*?\}/g, '')}",
        value: { min: String(values.min), max: String(values.max) },
      },
    ],
  };`;
      }
    }
    
    if (faFilterMatch) {
      const key = faFilterMatch[1];
      return `
  return {
    faFilter: [
      {
        key: "${key}",
        value: { min: String(values.min), max: String(values.max) },
      },
    ],
  };`;
    }
    
    if (parametersMatch) {
      const code = parametersMatch[2];
      return `
  // Parameters array - not typically used in mobile payload
  return {};`;
    }
  }
  
  if (controlType === 'select') {
    // Extract the faKeys.push template
    const match = snippet.match(/faKeys\s*\.\s*push\s*\(\s*`([^`]+)`\s*\)/);
    if (match) {
      let template = match[1];
      
      // Find all switch statements to build variable mappings
      const switchMappings = parseSwitchStatements(snippet);
      
      // Build a map of tieuChi.property → actual variable name used in code
      const varNameMap: Record<string, string> = {};
      const letDeclarationRegex = /let\s+(\w+)\s*=\s*"";/g;
      let letMatch;
      const declaredVars: string[] = [];
      while ((letMatch = letDeclarationRegex.exec(snippet)) !== null) {
        declaredVars.push(letMatch[1]);
      }
      
      // Match switch(tieuChi.property) to the variable name assigned in its cases
      for (const mapping of switchMappings) {
        const switchMatch = snippet.match(new RegExp(`switch\\s*\\(tieuChi\\.${mapping.variable}\\)[\\s\\S]*?case\\s+\\d+:\\s*(\\w+)\\s*=`));
        if (switchMatch) {
          varNameMap[mapping.variable] = switchMatch[1];
        }
      }
      
      // Also find direct variable assignments like: const slider = tieuChi.rightIndexValue;
      const directAssignments: string[] = [];
      const directAssignRegex = /const\s+(\w+)\s*=\s*tieuChi\.([\w\d]+);/g;
      let directMatch;
      while ((directMatch = directAssignRegex.exec(snippet)) !== null) {
        const varName = directMatch[1];
        const prop = directMatch[2];
        // Add this as a direct value reference
        directAssignments.push(`  const ${varName} = values.${prop} || values.rightIndexValue || 2;`);
      }
      
      let functionBody = '';
      const varDeclarations: string[] = [...directAssignments];
      
      for (const mapping of switchMappings) {
        // Use the actual variable name from the web code
        const varName = varNameMap[mapping.variable] || getTemplateVarName(mapping.variable);
        const cases = mapping.cases
          .map((c) => `    case ${c.caseValue}: ${varName} = "${c.token}"; break;`)
          .join('\n');
        
        varDeclarations.push(`  let ${varName} = "";
  switch (values.${mapping.variable}) {
${cases}
    default: break;
  }`);
      }
      
      functionBody = varDeclarations.join('\n  ');
      
      // No need to replace variable names in template - use the template as-is from web code
      // The variable names in the template should match the ones we declared
      
      return `
${functionBody}
  
  return {
    faKeys: [\`${template}\`],
  };`;
    }
  }
  
  return `
  return {};`;
}

function getTemplateVarName(variable: string): string {
  const mapping: Record<string, string> = {
    compare: 'op',
    interval: 'day',
    leftIndexValue: 'left',
    rightIndexValue: 'right',
    session: 'session',
    level: 'level',
    band: 'band',
    change: 'change',
  };
  
  return mapping[variable] || variable;
}

// ============================================================================
// MAIN GENERATION
// ============================================================================

async function main() {
  console.log('🚀 Starting CRITERIA_DEFS generation from web code...\n');
  
  // Read the extracted web file
  const webFilePath = path.join(__dirname, '../.tmp/stockfilter/StockFilter/index.tsx');
  
  if (!fs.existsSync(webFilePath)) {
    console.error('❌ Web file not found. Please unzip StockFilter.zip first.');
    process.exit(1);
  }
  
  const webCode = fs.readFileSync(webFilePath, 'utf-8');
  
  // Extract onFilter function
  const onFilterMatch = webCode.match(/const onFilter = async \(\) => \{([\s\S]+?)(?=\n  const |$)/);
  if (!onFilterMatch) {
    console.error('❌ Could not find onFilter function');
    process.exit(1);
  }
  
  const onFilterContent = onFilterMatch[0];
  console.log('✅ Found onFilter function\n');
  
  // Extract all cases
  const cases = extractCases(onFilterContent);
  console.log(`✅ Extracted ${cases.length} criteria cases\n`);
  
  // Generate criteria definitions
  const criteriaDefs: CriterionDef[] = [];
  
  for (const { label, snippet } of cases) {
    const id = sanitizeId(label);
    const { group, familyKey, familyTitle } = inferGroupAndFamily(label);
    const control = detectControlType(snippet);
    const params = generateParams(control, snippet, label);
    const toPayload = generateToPayloadFunction(control, snippet);
    
    criteriaDefs.push({
      id,
      group,
      familyKey,
      familyTitle,
      label,
      control,
      params,
      toPayload,
    });
  }
  
  console.log(`✅ Generated ${criteriaDefs.length} criterion definitions\n`);
  
  // Generate TypeScript file
  const outputPath = path.join(__dirname, '../features/stockFilter/CRITERIA_DEFS.ts');
  
  const fileContent = generateTypeScriptFile(criteriaDefs);
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  
  console.log(`✅ Written to ${outputPath}\n`);
  console.log(`📊 Summary:`);
  console.log(`   - Total criteria: ${criteriaDefs.length}`);
  console.log(`   - Range controls: ${criteriaDefs.filter((c) => c.control === 'range').length}`);
  console.log(`   - Select controls: ${criteriaDefs.filter((c) => c.control === 'select').length}`);
  console.log(`   - Boolean controls: ${criteriaDefs.filter((c) => c.control === 'boolean').length}`);
  console.log(`\n✅ Done!`);
}

function generateTypeScriptFile(defs: CriterionDef[]): string {
  const imports = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from web StockFilter code by tools/build_defs_from_zip.ts
 * Total criteria: ${defs.length}
 */

export type ControlType = 'range' | 'select' | 'boolean';
export type Group = 'popular' | 'basic' | 'technical' | 'volatility' | 'mine';

export type ParamDef =
  | { key: string; label: string; type: 'select'; options: { label: string; value: any }[] }
  | { key: string; label: string; type: 'number'; min?: number; max?: number; step?: number }
  | { key: string; label: string; type: 'boolean' };

export interface CriterionDef {
  id: string;
  group: Group;
  familyKey: string;
  familyTitle: string;
  label: string;
  control: ControlType;
  params: ParamDef[];
  defaults?: Record<string, any>;
  toPayload: (values: Record<string, any>) => {
    faKeys?: string[];
    fAFilterSub?: { key: string; value: any }[];
    faFilter?: { key: string; value: any }[];
    booleanFilter?: { key: string; value: any }[];
  };
}

`;
  
  const defsArray = defs.map((def, idx) => {
    const paramsStr = JSON.stringify(def.params, null, 4).replace(/"([^"]+)":/g, '$1:');
    
    return `  {
    id: "${def.id}",
    group: "${def.group}",
    familyKey: "${def.familyKey}",
    familyTitle: "${def.familyTitle}",
    label: "${def.label}",
    control: "${def.control}",
    params: ${paramsStr},
    toPayload: (values: Record<string, any>) => {${def.toPayload}
    },
  }`;
  });
  
  return `${imports}
export const CRITERIA_DEFS: CriterionDef[] = [
${defsArray.join(',\n')}
];
`;
}

// ============================================================================
// EXECUTE
// ============================================================================

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
