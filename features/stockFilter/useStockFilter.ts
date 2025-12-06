import { useReducer, useCallback } from "react";
import type {
  FilterState,
  FilterAction,
  CriterionDef,
  ActiveCriterion,
  FilterPayload,
} from "./types";
import { CRITERIA_DEFS } from "./CRITERIA_DEFS";

// Initial state
const initialState: FilterState = {
  stagedIds: [],
  active: [],
  rows: [],
  total: 0,
  loading: false,
  error: null,
  pageNumber: 1,
  pageSize: 10000, // Initial page size per spec
  sortColumn: null,
  isDesc: false,
};

// Reducer function
function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "STAGE_TOGGLE": {
      const { id } = action;
      const exists = state.stagedIds.includes(id);
      return {
        ...state,
        stagedIds: exists
          ? state.stagedIds.filter((stageId) => stageId !== id)
          : [...state.stagedIds, id],
      };
    }

    case "STAGE_CLEAR":
      return {
        ...state,
        stagedIds: [],
      };

    case "APPLY": {
      // ID migration alias for old IDs (if needed)
      const alias: Record<string, string> = {
        GIA_TRI_RSI14: "RSI14_VALUE",
        RSI14_SO_VOI_CAC_VUNG_GIA_TRI: "RSI14_ZONE",
        RSI14_VA_VUNG_QUA_MUA_QUA_BAN: "RSI14_OVERZONE",
        // Add more aliases for old IDs if needed
      };

      // Create Map for efficient lookup
      const defsById = new Map(CRITERIA_DEFS.map((d) => [d.id, d]));

      const next: ActiveCriterion[] = [...state.active];

      state.stagedIds.forEach((id) => {
        // Try to fix old IDs using alias
        const fixedId = alias[id] ?? id;
        const def = defsById.get(fixedId);

        if (!def) {
          console.warn("Unknown criterion id:", id);
          return;
        }

        // Skip if already active
        if (next.some((a) => a.id === fixedId)) return;

        // Initialize values from defaults and params
        const init: Record<string, any> = { ...(def.defaults || {}) };

        // Auto-initialize based on params for reasonable UI defaults
        def.params?.forEach((p: any) => {
          if (p.type === "number") {
            if (p.key === "min" && init.min == null) init.min = p.min ?? 0;
            if (p.key === "max" && init.max == null) init.max = p.max ?? 0;
          }
          if (p.type === "select") {
            const first = p.options?.[0]?.value;
            if (first != null && init[p.key] == null) init[p.key] = first;
          }
          if (p.type === "boolean" && init[p.key] == null) init[p.key] = false;
        });

        next.push({
          id: fixedId, // Use fixed ID
          label: def.label,
          control: def.control,
          group: def.group,
          values: init,
        });
      });

      return {
        ...state,
        active: next,
        stagedIds: [], // Clear staged after apply
      };
    }

    case "ACTIVE_UPDATE": {
      const { id, values } = action;
      return {
        ...state,
        active: state.active.map((criterion) =>
          criterion.id === id
            ? { ...criterion, values: { ...criterion.values, ...values } }
            : criterion
        ),
      };
    }

    case "ACTIVE_REMOVE": {
      const { id } = action;
      return {
        ...state,
        active: state.active.filter((criterion) => criterion.id !== id),
      };
    }

    case "RESET_ALL":
      return {
        ...state,
        active: [],
        rows: [],
        total: 0,
        stagedIds: [],
        error: null,
        pageNumber: 1,
      };

    case "LOAD_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "LOAD_SUCCESS": {
      const { rows, total } = action;
      return {
        ...state,
        loading: false,
        rows,
        total,
        error: null,
      };
    }

    case "LOAD_FAIL": {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error,
      };
    }

    case "SET_PAGE": {
      const { pageNumber } = action;
      return {
        ...state,
        pageNumber,
      };
    }

    case "SET_SORT": {
      const { sortColumn, isDesc } = action;
      return {
        ...state,
        sortColumn,
        isDesc,
      };
    }

    default:
      return state;
  }
}

/**
 * Stock filter hook with reducer and payload builder
 */
export function useStockFilter() {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  /**
   * Build API payload from active criteria
   */
  const buildPayload = useCallback((): FilterPayload => {
    // Initialize with correct structure per StockFilter_RN_Payload_Fix.md
    const payload: FilterPayload = {
      faFilter: {},
      taFilter: null,
      booleanFilter: {
        AvailableForFASearching: true,
      },
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      exchanges: ["HSX", "HNX", "UPCOM"], // Correct exchange names
      icbCodes: null,
      sortColumn: "Symbol",
      isDesc: false,
      fAFilterSub: {},
      faKeys: [],
      wlOrPId: null,
      tradingTime: null, // Must be null for this endpoint
    };

    // Add sort if set
    if (state.sortColumn) {
      payload.sortColumn = state.sortColumn;
      payload.isDesc = state.isDesc;
    }

    // Collect arrays for merging
    const faFilterArr: Array<{ key: string; value: any }> = [];
    const fAFilterSubArr: Array<{ key: string; value: any }> = [];
    const booleanFilterArr: Array<{ key: string; value: any }> = [
      { key: "AvailableForFASearching", value: true },
    ];
    const faKeysArr: string[] = [];

    // Build payload from each active criterion using toPayload()
    state.active.forEach((criterion) => {
      const def = CRITERIA_DEFS.find((d) => d.id === criterion.id);
      if (!def) {
        console.warn(`Criterion definition not found for ${criterion.id}`);
        return;
      }

      try {
        const fragment = def.toPayload(criterion.values);

        // Merge fragment into arrays
        if (fragment.faFilter) {
          faFilterArr.push(...fragment.faFilter);
        }
        if (fragment.booleanFilter) {
          booleanFilterArr.push(...fragment.booleanFilter);
        }
        if (fragment.fAFilterSub) {
          fAFilterSubArr.push(...fragment.fAFilterSub);
        }
        if (fragment.faKeys) {
          faKeysArr.push(...fragment.faKeys);
        }
      } catch (error) {
        console.error(`Error building payload for ${criterion.id}:`, error);
      }
    });

    // Reduce arrays into objects
    payload.faFilter = faFilterArr.reduce(
      (o, i) => ((o[i.key] = i.value), o),
      {} as Record<string, any>
    );
    //add {MarketCap: {min: "1600000000000", max: "615400000000000"}}  to faFilter
    payload.faFilter["MarketCap"] = {
      min: "1600000000000",
      max: "615400000000000",
    };
    payload.fAFilterSub = fAFilterSubArr.reduce(
      (o, i) => ((o[i.key] = i.value), o),
      {} as Record<string, any>
    );
    payload.booleanFilter = booleanFilterArr.reduce(
      (o, i) => ((o[i.key] = i.value), o),
      {} as Record<string, any>
    );
    payload.faKeys = faKeysArr;

    return payload;
  }, [
    state.active,
    state.pageNumber,
    state.pageSize,
    state.sortColumn,
    state.isDesc,
  ]);

  return {
    state,
    dispatch,
    buildPayload,
  };
}
