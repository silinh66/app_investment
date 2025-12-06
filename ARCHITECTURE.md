# Stock Filter Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Web StockFilter Code                       │
│                  (StockFilter.zip - 8,574 lines)                │
│                                                                 │
│  const onFilter = async () => {                                 │
│    switch (tieuChi.label) {                                     │
│      case "MACD so với Signal":                                 │
│        switch (tieuChi.compare) { ... }                         │
│        faKeys.push(`MACD_${op}_MACDSignal_${day}`);            │
│        break;                                                   │
│      // ... 223 cases total                                     │
│    }                                                            │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Parse & Extract
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              tools/build_defs_from_zip.ts                       │
│                     (Parser Script)                             │
│                                                                 │
│  1. Unzip StockFilter.zip                                       │
│  2. Find onFilter function                                      │
│  3. Extract 223 case statements                                 │
│  4. Parse switch(tieuChi.xxx) for options                       │
│  5. Detect control types (range/select/boolean)                 │
│  6. Generate toPayload functions                                │
│  7. Output TypeScript code                                      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Generate
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│           features/stockFilter/CRITERIA_DEFS.ts                 │
│                  (7,269 lines - AUTO-GENERATED)                 │
│                                                                 │
│  export const CRITERIA_DEFS: CriterionDef[] = [                 │
│    {                                                            │
│      id: "macd_so_voi_signal",                                  │
│      label: "MACD so với Signal",                               │
│      control: "select",                                         │
│      params: [                                                  │
│        {                                                        │
│          key: "compare",                                        │
│          type: "select",                                        │
│          options: [                                             │
│            { label: "Trên (≥)", value: 0 },                     │
│            { label: "Bằng (=)", value: 1 },                     │
│            { label: "Dưới (≤)", value: 2 }                      │
│          ]                                                      │
│        },                                                       │
│        {                                                        │
│          key: "interval",                                       │
│          type: "select",                                        │
│          options: [                                             │
│            { label: "1 ngày", value: 0 },                       │
│            { label: "1 tuần", value: 1 }                        │
│          ]                                                      │
│        }                                                        │
│      ],                                                         │
│      toPayload: (values) => {                                   │
│        let op = "";                                             │
│        switch (values.compare) {                                │
│          case 0: op = ">="; break;                              │
│          case 1: op = "="; break;                               │
│          case 2: op = "<="; break;                              │
│        }                                                        │
│        let day = "";                                            │
│        switch (values.interval) {                               │
│          case 0: day = "Daily"; break;                          │
│          case 1: day = "Weekly"; break;                         │
│        }                                                        │
│        return {                                                 │
│          faKeys: [`MACD_${op}_MACDSignal_${day}`]              │
│        };                                                       │
│      }                                                          │
│    },                                                           │
│    // ... 222 more criteria                                     │
│  ];                                                             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Import & Use
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                 React Native App Components                      │
└─────────────────────────────────────────────────────────────────┘
        │                    │                      │
        ▼                    ▼                      ▼
┌──────────────┐  ┌──────────────────┐  ┌─────────────────────┐
│ CriteriaModal│  │ActiveConfigBar   │  │ useStockFilter      │
│              │  │                  │  │                     │
│ Display tree │  │ Render controls: │  │ Build payload:      │
│ of 223       │  │                  │  │                     │
│ criteria     │  │ • Range: Slider  │  │ active.forEach(c => │
│              │  │   + min/max input│  │   def = find(c.id)  │
│ Grouped by:  │  │                  │  │   fragment =        │
│ • Popular    │  │ • Select: Picker │  │     def.toPayload(  │
│ • Basic (FA) │  │   or button grid │  │       c.values)     │
│ • Technical  │  │                  │  │                     │
│ • Volatility │  │ • Boolean: Switch│  │   merge fragment    │
│              │  │                  │  │     into payload    │
│ User selects │  │ User configures  │  │ )                   │
│ criteria →   │  │ params →         │  │                     │
│ APPLY        │  │ FILTER           │  │ Send to API →       │
└──────────────┘  └──────────────────┘  └─────────────────────┘
        │                    │                      │
        └────────────────────┴──────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Final API Payload                            │
│                                                                 │
│  {                                                              │
│    faFilter: {},                                                │
│    fAFilterSub: {                                               │
│      "RSI14_Daily": { min: "30", max: "70" }                    │
│    },                                                           │
│    booleanFilter: {                                             │
│      AvailableForFASearching: true                              │
│    },                                                           │
│    faKeys: [                                                    │
│      "MACD_>=_MACDSignal_Daily",                                │
│      "EMA5_VUOT_EMA10_Daily"                                    │
│    ],                                                           │
│    exchanges: ["HSX", "HNX", "UPCOM"],                          │
│    tradingTime: null,                                           │
│    pageSize: 10000,                                             │
│    pageNumber: 1,                                               │
│    sortColumn: "Symbol",                                        │
│    isDesc: false                                                │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP POST
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Stock Filter API                             │
│                                                                 │
│  Returns filtered stock results based on criteria               │
└─────────────────────────────────────────────────────────────────┘
```

## Control Type Examples

### Range Control (95 criteria)
```typescript
{
  label: "Giá trị RSI14",
  control: "range",
  params: [
    { key: "interval", type: "select", options: [...] },  // Timeframe
    { key: "min", type: "number" },
    { key: "max", type: "number" }
  ]
}
```

**UI**: `[Kỳ: ⚪ 1 ngày ⚫ 1 tuần] [Min: ___] [Max: ___]`

**Payload**: `{ fAFilterSub: { "RSI14_Daily": { min: "30", max: "70" } } }`

---

### Select Control (48 criteria)

#### Simple (2 dropdowns)
```typescript
{
  label: "MACD so với Signal",
  control: "select",
  params: [
    { key: "compare", type: "select", options: [...] },
    { key: "interval", type: "select", options: [...] }
  ]
}
```

**UI**: `[So sánh: ⬇] [Kỳ: ⬇]`

**Payload**: `{ faKeys: ["MACD_>=_MACDSignal_Daily"] }`

#### Complex (4 dropdowns)
```typescript
{
  label: "Giao cắt 2 đường TB - EMA",
  control: "select",
  params: [
    { key: "compare", type: "select", options: [VUOT, THUNG] },
    { key: "leftIndexValue", type: "select", options: [EMA5-200] },
    { key: "rightIndexValue", type: "select", options: [EMA5-200] },
    { key: "interval", type: "select", options: [Daily, Weekly] }
  ]
}
```

**UI**: `[Hướng: ⬇] [EMA thứ nhất: ⬇] [EMA thứ hai: ⬇] [Kỳ: ⬇]`

**Payload**: `{ faKeys: ["EMA5_VUOT_EMA10_Daily"] }`

---

### Boolean Control (80 criteria)
```typescript
{
  label: "P/E (TTM)",
  control: "boolean",
  params: []
}
```

**UI**: `[✓ P/E (TTM)]` (just the checkbox, enabled = included)

**Payload**: `{}` (presence in active list = enabled)

---

## Data Flow

1. **User selects criteria** in CriteriaModal
2. **Criteria staged** in `state.stagedIds`
3. **User clicks "Áp dụng"** → dispatch APPLY
4. **Criteria activated** → moved to `state.active[]` with default values
5. **ActiveConfigBar renders** controls based on `criterion.control` and `criterion.params`
6. **User adjusts params** → dispatch ACTIVE_UPDATE with new values
7. **User clicks "Lọc"** → `buildPayload()` called
8. **For each active criterion**:
   - Find definition in CRITERIA_DEFS
   - Call `def.toPayload(criterion.values)`
   - Collect fragment
9. **Merge all fragments** into final payload structure
10. **Send to API** → receive filtered results

## Key Design Decisions

### ✅ Config-Driven Architecture
- All criteria defined in data (CRITERIA_DEFS)
- UI renders dynamically based on params
- No hardcoded switch statements in UI code
- Easy to add/modify criteria by updating data

### ✅ Auto-Generation from Web
- Single source of truth (web code)
- Eliminates manual transcription errors
- Easy to update when web changes
- Guarantees 100% parity

### ✅ Type Safety
- Full TypeScript coverage
- Compile-time validation
- IDE autocomplete support
- Reduced runtime errors

### ✅ Separation of Concerns
- **CRITERIA_DEFS.ts**: Data definitions
- **ActiveConfigBar.tsx**: UI rendering
- **useStockFilter.ts**: State & payload logic
- **CriteriaModal.tsx**: Selection UI

---

**Total Criteria**: 223
**Total Code**: ~10,000 lines (generated + handwritten)
**Compilation**: ✅ 0 errors
**Tests**: ✅ All passing
