// Stock Filter Types

export type ControlType = "range" | "select" | "boolean";

export type GroupType =
  | "popular"
  | "basic"
  | "technical"
  | "volatility"
  | "mine";

// Parameter definitions for different control types
export interface NumberParam {
  key: string;
  label: string;
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectParam {
  key: string;
  label: string;
  type: "select";
  options: Array<{ label: string; value: string | number }>;
}

export interface BooleanParam {
  key: string;
  label: string;
  type: "boolean";
}

export interface TimeframeParam {
  key: string;
  label: string;
  type: "timeframe";
  options: Array<{ label: string; value: string }>;
}

export type ParamDef =
  | NumberParam
  | SelectParam
  | BooleanParam
  | TimeframeParam;

// Criterion definition (from CRITERIA_DEFS.ts)
export interface CriterionDef {
  id: string;
  group: GroupType;
  familyKey: string; // e.g., 'RSI14', 'MACD', 'MA', 'EPS'
  familyTitle: string; // e.g., 'RSI14', 'MACD (9,12,26)', 'MA'
  label: string;
  control: ControlType;
  params: ParamDef[];
  defaults?: Record<string, any>;
  unit?: string; // e.g., 'Tỷ', '%', 'VNĐ'
  toPayload: (values: Record<string, any>) => any;
}

// Active criterion (user-configured)
export interface ActiveCriterion {
  id: string;
  label: string;
  control: ControlType;
  group: GroupType;
  values: Record<string, any>;
}

// Filter state
export interface FilterState {
  stagedIds: string[]; // Selected in modal but not applied yet
  active: ActiveCriterion[]; // Applied criteria showing in config bar
  rows: any[];
  total: number;
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  sortColumn: string | null;
  isDesc: boolean;
}

// Filter actions
export type FilterAction =
  | { type: "STAGE_TOGGLE"; id: string }
  | { type: "STAGE_CLEAR" }
  | { type: "APPLY" }
  | { type: "ACTIVE_UPDATE"; id: string; values: Record<string, any> }
  | { type: "ACTIVE_REMOVE"; id: string }
  | { type: "RESET_ALL" }
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; rows: any[]; total: number }
  | { type: "LOAD_FAIL"; error: string }
  | { type: "SET_PAGE"; pageNumber: number }
  | { type: "SET_SORT"; sortColumn: string; isDesc: boolean };

// API payload types
export interface FilterPayload {
  faFilter: Record<string, any>;
  taFilter: any;
  booleanFilter: Record<string, any>;
  pageNumber: number;
  pageSize: number;
  exchanges: string[];
  icbCodes: any;
  sortColumn: string;
  isDesc: boolean;
  fAFilterSub: Record<string, any>;
  faKeys: string[];
  wlOrPId: any;
  tradingTime: any;
  parameters?: any[]; // Optional for legacy support
}

export interface FilterResponse {
  data: {
    data: any;
    result: {
      items: any[];
      totalCount: number;
    };
  };
}
