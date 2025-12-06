/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from web StockFilter code by tools/build_defs_from_zip.ts
 * Total criteria: 223
 */

export type ControlType = "range" | "select" | "boolean";
export type Group = "popular" | "basic" | "technical" | "volatility" | "mine";

export type ParamDef =
  | {
    key: string;
    label: string;
    type: "select";
    options: { label: string; value: any }[];
  }
  | {
    key: string;
    label: string;
    type: "number";
    min?: number;
    max?: number;
    step?: number;
  }
  | { key: string; label: string; type: "boolean" };

export interface CriterionDef {
  id: string;
  group: Group;
  familyKey: string;
  familyTitle: string;
  label: string;
  control: ControlType;
  params: ParamDef[];
  defaults?: Record<string, any>;
  unit?: string; // Display unit for range inputs (e.g., 'Tỷ', '%', 'VNĐ')
  toPayload: (values: Record<string, any>) => {
    faKeys?: string[];
    fAFilterSub?: { key: string; value: any }[];
    faFilter?: { key: string; value: any }[];
    booleanFilter?: { key: string; value: any }[];
  };
}

export const CRITERIA_DEFS: CriterionDef[] = [
  //   {
  //     id: "bien_dong_gia_1_ngay",
  //     group: "volatility",
  //     familyKey: "PriceChange",
  //     familyTitle: "Biến động giá",
  //     label: "Biến động giá 1 ngày",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_dong_gia_1_tuan",
  //     group: "volatility",
  //     familyKey: "PriceChange",
  //     familyTitle: "Biến động giá",
  //     label: "Biến động giá 1 tuần",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_dong_gia_1_thang",
  //     group: "volatility",
  //     familyKey: "PriceChange",
  //     familyTitle: "Biến động giá",
  //     label: "Biến động giá 1 tháng",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_dong_gia_3_thang",
  //     group: "volatility",
  //     familyKey: "PriceChange",
  //     familyTitle: "Biến động giá",
  //     label: "Biến động giá 3 tháng",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_dong_gia_6_thang",
  //     group: "volatility",
  //     familyKey: "PriceChange",
  //     familyTitle: "Biến động giá",
  //     label: "Biến động giá 6 tháng",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_dong_gia_52_tuan",
  //     group: "volatility",
  //     familyKey: "PriceChange",
  //     familyTitle: "Biến động giá",
  //     label: "Biến động giá 52 tuần",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_dong_gia_tu_dau_nam",
  //     group: "volatility",
  //     familyKey: "PriceChange",
  //     familyTitle: "Biến động giá",
  //     label: "Biến động giá từ đầu năm",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "khoi_luong_gd",
  //     group: "volatility",
  //     familyKey: "Volume",
  //     familyTitle: "Khối lượng",
  //     label: "Khối lượng GD",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "kl_t_binh_5_phien",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Kl T.bình 5 phiên",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "kl_t_binh_10_phien",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Kl T.bình 10 phiên",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "kl_t_binh_20_phien",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Kl T.bình 20 phiên",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "kl_t_binh_3_thang",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Kl T.bình 3 tháng",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "free_float",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "% Free Float",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_tri_gd",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá trị GD",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_tri_gd_t_binh_5d",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá trị GD T.bình 5D",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_tri_gd_t_binh_10d",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá trị GD T.bình 10D",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_tri_gd_t_binh_20d",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá trị GD T.bình 20D",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_tri_gd_t_binh_3m",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá trị GD T.bình 3M",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "von_hoa",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Vốn hóa",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "p_e_fin_ttm",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "P/E - fin (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "p_s_fin_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "P/S - fin (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "p_b_ttm",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "P/B (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_dong_tien_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá - Dòng Tiền (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_dong_tien_tu_do_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá - Dòng Tiền Tự Do (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "gia_t_san_huu_hinh_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Giá - T.sản hữu hình (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "eps_fin_ttm",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "EPS - fin (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "doanh_thu_ti_dong_ttm",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "Doanh thu (tỉ đồng) (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ln_rong_ti_dong_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "LN ròng (tỉ đồng) (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "doanh_thu_ti_dong_nam_truoc",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "Doanh thu (tỉ đồng) (năm trước)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ln_rong_ti_dong_nam_truoc",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "LN ròng (tỉ đồng) (năm trước)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "doanh_thu_quy_gan_nhat",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "Doanh thu (quý gần nhất)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "loi_nhuan_thuan_quy_gan_nhat",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Lợi nhuận thuần (quý gần nhất)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "t_truong_d_thu_yoy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "T.trưởng D.thu (YoY)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "t_truong_ln_gop_yoy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "T.trưởng LN gộp (YoY)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "t_truong_ln_rong_yoy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "T.trưởng LN ròng (YoY)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "t_truong_k_doanh_3_nam",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "T.trưởng K.doanh 3 năm",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "t_truong_ln_rong_3_nam",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "T.trưởng LN ròng 3 năm",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "t_truong_von_csh_3_nam",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "T.trưởng vốn CSH 3 năm",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "t_truong_eps_ttm",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "T.trưởng EPS (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "tang_truong_doanh_thu_quy_gan_nhat_yoy",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "Tăng trưởng doanh thu quý gần nhất (YoY)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "tang_truong_loi_nhuan_thuan_quy_gan_nhat_yoy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tăng trưởng lợi nhuận thuần quý gần nhất (YoY)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "roe_ttm",
  //     group: "basic",
  //     familyKey: "Fundamental",
  //     familyTitle: "Phân tích cơ bản",
  //     label: "ROE (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "roa_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "ROA (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ln_gop_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên LN gộp (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ln_gop_quy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên LN gộp (quý)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ln_gop_nam_gan_nhat",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên LN gộp (năm gần nhất)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ln_rong_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên LN ròng (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ln_rong_quy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên LN ròng (quý)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ln_rong_nam_gan_nhat",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên LN ròng (năm gần nhất)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ebit_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên EBIT (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "bien_ebit_quy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên EBIT (quý)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "roic_quy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "ROIC (quý)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "no_phai_tra_tong_tai_san_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Nợ phải trả/ Tổng tài sản (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "no_phai_tra_von_chu_so_huu_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Nợ phải trả/ Vốn chủ sở hữu (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "no_dai_han_von_chu_so_huu_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Nợ dài hạn/ Vốn chủ sở hữu (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "no_phai_tra_von_chu_so_huu_quy",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Nợ phải trả/ Vốn chủ sở hữu (quý)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ti_suat_thanh_toan_hien_hanh_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tỉ suất thanh toán hiện hành (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ti_suat_thanh_toan_nhanh_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tỉ suất thanh toán nhanh (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ti_suat_thanh_toan_tien_mat_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tỉ suất thanh toán tiền mặt (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "kha_nang_chi_tra_lai_vay_ttm",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Khả năng chi trả lãi vay (TTM)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ti_le_to_chuc_so_huu",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tỉ lệ tổ chức sở hữu",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "so_huu_nuoc_ngoai",
  //     group: "popular",
  //     familyKey: "ForeignInvestor",
  //     familyTitle: "NĐTNN",
  //     label: "Sở hữu nước ngoài",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "room_nuoc_ngoai",
  //     group: "popular",
  //     familyKey: "ForeignInvestor",
  //     familyTitle: "NĐTNN",
  //     label: "Room nước ngoài",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "co_tuc",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Cổ Tức",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ti_suat_co_tuc",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tỉ Suất Cổ Tức",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ti_suat_co_tuc_t_binh_3_nam",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tỉ Suất Cổ Tức T.Bình 3 Năm",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "ti_le_chi_tra_co_tuc",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tỉ Lệ Chi Trả Cổ Tức",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "rsi",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "RSI",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "adx",
  //     group: "technical",
  //     familyKey: "ADX",
  //     familyTitle: "ADX",
  //     label: "ADX",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "cci",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "CCI",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "roc",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "ROC",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "stoch",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "STOCH",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "williams",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Williams",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  //   {
  //     id: "mfi",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "MFI",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   // Parameters array - not typically used in mobile payload
  //   return {};
  //     },
  //   },
  {
    id: "gia_tri_giao_dich_rong_cua_ndtnn",
    group: "popular",
    familyKey: "ForeignInvestor",
    familyTitle: "NĐTNN",
    label: "Giá trị giao dịch ròng của NĐTNN",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "ForeignBuySellValue_",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  //   {
  //     id: "bien_do_gia_dong_cua_theo_so_phien",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Biên độ giá đóng cửa theo số phiên (%)",
  //     control: "range",
  //     params: [
  //     {
  //         key: "min",
  //         label: "Từ",
  //         type: "number"
  //     },
  //     {
  //         key: "max",
  //         label: "Đến",
  //         type: "number"
  //     }
  // ],
  //     toPayload: (values: Record<string, any>) => {
  //   return {
  //     fAFilterSub: [
  //       {
  //         key: "BienDoGia_",
  //         value: { min: String(values.min), max: String(values.max) },
  //       },
  //     ],
  //   };
  //     },
  //   },
  {
    id: "bien_do_gia_high_low_theo_so_phien",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "Biên độ giá High - Low theo số phiên (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "BienDoGiaHighLow_",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "p_e_ttm",
    group: "popular",
    familyKey: "Fundamental",
    familyTitle: "Phân tích cơ bản",
    label: "P/E (TTM)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "eps_ttm",
    group: "popular",
    familyKey: "Fundamental",
    familyTitle: "Phân tích cơ bản",
    label: "EPS (TTM)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "von_hoa_popular",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "Vốn hoá",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "MarketCap",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  {
    id: "von_hoa",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Vốn hoá",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "MarketCap",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  //   {
  //     id: "fscore",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Fscore",
  //     control: "boolean",
  //     params: [],
  //     toPayload: (values: Record<string, any>) => {
  //   return {};
  //     },
  //   },
  //   {
  //     id: "mscore",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Mscore",
  //     control: "boolean",
  //     params: [],
  //     toPayload: (values: Record<string, any>) => {
  //   return {};
  //     },
  //   },
  //   {
  //     id: "zscore",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Zscore",
  //     control: "boolean",
  //     params: [],
  //     toPayload: (values: Record<string, any>) => {
  //   return {};
  //     },
  //   },
  {
    id: "ty_suat_co_tuc_nam_gan_nhat",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "Tỷ suất cổ tức năm gần nhất",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "kltb_3_thang",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "KLTB 3 tháng",
    control: "range",
    unit: "Cổ phiếu",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "AvgVol3M",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "rs1m_1_thang",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "RS1m (1 tháng)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "rs3m_3_thang",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "RS3m (3 tháng)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "rs6m_6_thang",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "RS6m (6 tháng)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "rs52w_52_tuan",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "RS52w (52 tuần)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "khoi_luong_popular",
    group: "popular",
    familyKey: "Volume",
    familyTitle: "Khối lượng",
    label: "Khối lượng",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "khoi_luong",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Khối lượng",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "gia_tri_giao_dich_popular",
    group: "popular",
    familyKey: "Other",
    familyTitle: "Khác",
    label: "Giá trị giao dịch",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "TotalDealValue",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  {
    id: "gia_tri_giao_dich",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Giá trị giao dịch",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "TotalDealValue",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  {
    id: "khoi_luong_trung_binh_theo_so_phien",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Khối lượng Trung bình theo số phiên",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "TotalVolumeAvg_",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "gia_tri_giao_dich_trung_binh_theo_phien",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Giá trị giao dịch Trung bình theo phiên",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "TotalDealValueAvg_",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "loi_nhuan_chuyen_tu_lo_sang_lai_tinh_theo_ky_bao_cao_lien_tuc",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "eps_chuyen_tu_am_sang_duong_tinh_theo_ky_bao_cao_lien_tuc",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_doanh_thu_quy_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng doanh thu Quý gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_doanh_thu_quy_gan_nhi",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng doanh thu Quý gần nhì (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_doanh_thu_4_quy_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng doanh thu 4 Quý gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_doanh_thu_nam_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng doanh thu Năm gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_doanh_thu_binh_quan_3_nam",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng doanh thu Bình quân 3 năm (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_doanh_thu_binh_quan_3_nam_ttm",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_loi_nhuan_quy_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng lợi nhuận Quý gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "Profit_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_loi_nhuan_quy_gan_nhi",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng lợi nhuận Quý gần nhì (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_ln_4_quy_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng LN 4 Quý gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_ln_nam_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng LN Năm gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_ln_binh_quan_3_nam",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng LN Bình quân 3 năm (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_ln_binh_quan_3_nam_ttm",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng LN Bình quân 3 năm (% - TTM)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_eps_quy_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng EPS Quý gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_eps_quy_gan_nhi",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng EPS Quý gần nhì (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_eps_4_quy_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng EPS 4 Quý gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_eps_nam_gan_nhat",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng EPS Năm gần nhất (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_eps_binh_quan_3_nam",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng EPS Bình quân 3 năm (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "tang_truong_eps_binh_quan_3_nam_ttm",
    group: "basic",
    familyKey: "chi_so_tai_chinh",
    familyTitle: "Chỉ số tài chính",
    label: "Tăng trưởng EPS Bình quân 3 năm (% - TTM)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  // {
  //   id: "p_s_ttm",
  //   group: "technical",
  //   familyKey: "Other",
  //   familyTitle: "Khác",
  //   label: "P/S (TTM)",
  //   control: "boolean",
  //   params: [],
  //   toPayload: (values: Record<string, any>) => {
  // return {};
  //   },
  // },
  // {
  //   id: "p_b_mrq",
  //   group: "basic",
  //   familyKey: "Fundamental",
  //   familyTitle: "Phân tích cơ bản",
  //   label: "P/B (MRQ)",
  //   control: "boolean",
  //   params: [],
  //   toPayload: (values: Record<string, any>) => {
  // return {};
  //   },
  // },
  // {
  //   id: "vong_quay_tong_tai_san_ttm",
  //   group: "technical",
  //   familyKey: "Other",
  //   familyTitle: "Khác",
  //   label: "Vòng quay tổng tài sản (TTM)",
  //   control: "boolean",
  //   params: [],
  //   toPayload: (values: Record<string, any>) => {
  // return {};
  //   },
  // },
  // {
  //   id: "vong_quay_hang_ton_kho_ttm",
  //   group: "technical",
  //   familyKey: "Other",
  //   familyTitle: "Khác",
  //   label: "Vòng quay hàng tồn kho (TTM)",
  //   control: "boolean",
  //   params: [],
  //   toPayload: (values: Record<string, any>) => {
  // return {};
  //   },
  // },
  // {
  //   id: "vong_quay_cac_khoan_phai_thu_ttm",
  //   group: "technical",
  //   familyKey: "Other",
  //   familyTitle: "Khác",
  //   label: "Vòng quay các khoản phải thu (TTM)",
  //   control: "boolean",
  //   params: [],
  //   toPayload: (values: Record<string, any>) => {
  // return {};
  //   },
  // },
  // {
  //   id: "roe",
  //   group: "basic",
  //   familyKey: "Fundamental",
  //   familyTitle: "Phân tích cơ bản",
  //   label: "ROE (%)",
  //   control: "boolean",
  //   params: [],
  //   toPayload: (values: Record<string, any>) => {
  // return {};
  //   },
  // },
  // {
  //   id: "roa",
  //   group: "technical",
  //   familyKey: "Other",
  //   familyTitle: "Khác",
  //   label: "ROA (%)",
  //   control: "boolean",
  //   params: [],
  //   toPayload: (values: Record<string, any>) => {
  // return {};
  //   },
  // },
  {
    id: "gia_cuoi",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Giá cuối",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "cao_nhat_52_tuan",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Cao nhất 52 tuần",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thap_nhat_52_tuan",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Thấp nhất 52 tuần",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thay_doi_trong_52_tuan",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Thay đổi trong 52 tuần",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thay_doi_1_thang",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "% thay đổi 1 tháng",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thay_doi_tu_dau_nam",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "% Thay đổi từ đầu năm",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thay_doi_tu_day_52_tuan",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "% Thay đổi từ đáy 52 tuần",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thay_doi_tu_dinh_52_tuan",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "% Thay đổi từ đỉnh 52 tuần",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thay_doi_gia_dong_cua_theo_so_phien",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "% thay đổi giá đóng cửa theo số phiên",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "ChangePercent_",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "bien_dong_trong_ngay",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Biến động trong ngày (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "beta",
    group: "volatility",
    familyKey: "mac_dinh",
    familyTitle: "Mặc định",
    label: "Beta",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "vuot_dinh_1_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Vượt đỉnh 1 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_VUOT_Top1W_Daily"],
      };
    },
  },
  {
    id: "vuot_dinh_4_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Vượt đỉnh 4 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_VUOT_Top4W_Daily"],
      };
    },
  },
  {
    id: "vuot_dinh_12_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Vượt đỉnh 12 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_VUOT_Top12W_Daily"],
      };
    },
  },
  {
    id: "vuot_dinh_52_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Vượt đỉnh 52 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_VUOT_Top52W_Daily"],
      };
    },
  },
  {
    id: "thung_day_1_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Thủng đáy 1 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_THUNG_Bottom1W_Daily"],
      };
    },
  },
  {
    id: "thung_day_4_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Thủng đáy 4 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_THUNG_Bottom4W_Daily"],
      };
    },
  },
  {
    id: "thung_day_12_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Thủng đáy 12 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_THUNG_Bottom12W_Daily"],
      };
    },
  },
  {
    id: "thung_day_52_tuan",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Thủng đáy 52 tuần",
    control: "boolean",
    params: [],
    toPayload: (values: Record<string, any>) => {
      return {
        faKeys: ["Close_THUNG_Bottom52W_Daily"],
      };
    },
  },
  {
    id: "so_phien_tang_gia_lien_tuc",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Số phiên tăng giá liên tục",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "Giá (Close)",
            value: 0,
          },
          {
            label: "Giá (Low)",
            value: 1,
          },
          {
            label: "Giá ((H+L)/2)",
            value: 2,
          },
          {
            label: "Giá ((O + H + L + C)/4)",
            value: 3,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider = values.rightIndexValue || values.rightIndexValue || 2;
      let price8 = "";
      switch (values.leftIndexValue) {
        case 0:
          price8 = "Giá (Close)";
          break;
        case 1:
          price8 = "Giá (Low)";
          break;
        case 2:
          price8 = "Giá ((H+L)/2)";
          break;
        case 3:
          price8 = "Giá ((O + H + L + C)/4)";
          break;
        default:
          break;
      }
      let day8 = "";
      switch (values.interval) {
        case 0:
          day8 = "1 ngày";
          break;
        case 1:
          day8 = "1 tuần";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Close_UP_${slider}_Daily`],
      };
    },
  },
  {
    id: "so_phien_giam_gia_lien_tuc",
    group: "volatility",
    familyKey: "bien_dong_gia",
    familyTitle: "Biến động giá",
    label: "Số phiên giảm giá liên tục",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "Giá (Close)",
            value: 0,
          },
          {
            label: "Giá (Low)",
            value: 1,
          },
          {
            label: "Giá ((H+L)/2)",
            value: 2,
          },
          {
            label: "Giá ((O + H + L + C)/4)",
            value: 3,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider1 = values.rightIndexValue || values.rightIndexValue || 2;
      let price9 = "";
      switch (values.leftIndexValue) {
        case 0:
          price9 = "Giá (Close)";
          break;
        case 1:
          price9 = "Giá (Low)";
          break;
        case 2:
          price9 = "Giá ((H+L)/2)";
          break;
        case 3:
          price9 = "Giá ((O + H + L + C)/4)";
          break;
        default:
          break;
      }
      let day9 = "";
      switch (values.interval) {
        case 0:
          day9 = "1 ngày";
          break;
        case 1:
          day9 = "1 tuần";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Close_DOWN_${slider1}_Daily`],
      };
    },
  },
  {
    id: "so_phien_kl_giam_lien_tiep",
    group: "volatility",
    familyKey: "bien_dong_kl",
    familyTitle: "Biến động KL",
    label: "Số phiên KL giảm liên tiếp",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider2 = values.rightIndexValue || values.rightIndexValue || 2;
      let day10 = "";
      switch (values.interval) {
        case 0:
          day10 = "1 ngày";
          break;
        case 1:
          day10 = "1 tuần";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Vol_DOWN_${slider2}_Daily`],
      };
    },
  },
  {
    id: "so_phien_kl_tang_lien_tiep",
    group: "volatility",
    familyKey: "bien_dong_kl",
    familyTitle: "Biến động KL",
    label: "Số phiên KL tăng liên tiếp",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider3 = values.rightIndexValue || values.rightIndexValue || 2;
      let day11 = "";
      switch (values.interval) {
        case 0:
          day11 = "1 ngày";
          break;
        case 1:
          day11 = "1 tuần";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Vol_UP_${slider3}_Daily`],
      };
    },
  },
  {
    id: "khoi_luong_khop_lenh_dang_cao_nhat",
    group: "volatility",
    familyKey: "bien_dong_kl",
    familyTitle: "Biến động KL",
    label: "Khối lượng khớp lệnh đang cao nhất",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider4 = values.rightIndexValue || values.rightIndexValue || 2;
      let day12 = "";
      switch (values.interval) {
        case 0:
          day12 = "1 ngày";
          break;
        case 1:
          day12 = "1 tuần";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Vol_MAX_${slider4}_Daily`],
      };
    },
  },
  {
    id: "khoi_luong_khop_lenh_dang_thap_nhat",
    group: "volatility",
    familyKey: "bien_dong_kl",
    familyTitle: "Biến động KL",
    label: "Khối lượng khớp lệnh đang thấp nhất",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider5 = values.rightIndexValue || values.rightIndexValue || 2;
      let day33 = "";
      switch (values.interval) {
        case 0:
          day33 = "1 ngày";
          break;
        case 1:
          day33 = "1 tuần";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Vol_MIN_${slider5}_Daily`],
      };
    },
  },
  {
    id: "tong_kl_khop_hien_tai_tang_dot_bien_so_voi_tbkl_cung_thoi_diem_5_ngay_lien_truoc",
    group: "volatility",
    familyKey: "khoi_luong_tang_cao",
    familyTitle: "Khối lượng tăng cao",
    label:
      "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 5 ngày liền trước",
    control: "select",
    params: [
      {
        key: "percent",
        label: "percent",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "80",
            value: 1,
          },
          {
            label: "90",
            value: 2,
          },
          {
            label: "100",
            value: 3,
          },
          {
            label: "110",
            value: 4,
          },
          {
            label: "120",
            value: 5,
          },
          {
            label: "130",
            value: 6,
          },
          {
            label: "150",
            value: 7,
          },
          {
            label: "200",
            value: 8,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let percentClick = "";
      switch (values.percent) {
        case 0:
          percentClick = "70";
          break;
        case 1:
          percentClick = "80";
          break;
        case 2:
          percentClick = "90";
          break;
        case 3:
          percentClick = "100";
          break;
        case 4:
          percentClick = "110";
          break;
        case 5:
          percentClick = "120";
          break;
        case 6:
          percentClick = "130";
          break;
        case 7:
          percentClick = "150";
          break;
        case 8:
          percentClick = "200";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MutationAvgVol5D_>=_${percentClick}_Daily`],
      };
    },
  },
  {
    id: "tong_kl_khop_hien_tai_tang_dot_bien_so_voi_tbkl_cung_thoi_diem_10_ngay_lien_truoc",
    group: "volatility",
    familyKey: "khoi_luong_tang_cao",
    familyTitle: "Khối lượng tăng cao",
    label:
      "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 10 ngày liền trước",
    control: "select",
    params: [
      {
        key: "percent",
        label: "percent",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "80",
            value: 1,
          },
          {
            label: "90",
            value: 2,
          },
          {
            label: "100",
            value: 3,
          },
          {
            label: "110",
            value: 4,
          },
          {
            label: "120",
            value: 5,
          },
          {
            label: "130",
            value: 6,
          },
          {
            label: "150",
            value: 7,
          },
          {
            label: "200",
            value: 8,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let percentClick1 = "";
      switch (values.percent) {
        case 0:
          percentClick1 = "70";
          break;
        case 1:
          percentClick1 = "80";
          break;
        case 2:
          percentClick1 = "90";
          break;
        case 3:
          percentClick1 = "100";
          break;
        case 4:
          percentClick1 = "110";
          break;
        case 5:
          percentClick1 = "120";
          break;
        case 6:
          percentClick1 = "130";
          break;
        case 7:
          percentClick1 = "150";
          break;
        case 8:
          percentClick1 = "200";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MutationAvgVol10D_>=_${percentClick1}_Daily`],
      };
    },
  },
  {
    id: "tong_kl_khop_hien_tai_tang_dot_bien_so_voi_tbkl_cung_thoi_diem_20_ngay_lien_truoc",
    group: "volatility",
    familyKey: "khoi_luong_tang_cao",
    familyTitle: "Khối lượng tăng cao",
    label:
      "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 20 ngày liền trước",
    control: "select",
    params: [
      {
        key: "percent",
        label: "percent",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "80",
            value: 1,
          },
          {
            label: "90",
            value: 2,
          },
          {
            label: "100",
            value: 3,
          },
          {
            label: "110",
            value: 4,
          },
          {
            label: "120",
            value: 5,
          },
          {
            label: "130",
            value: 6,
          },
          {
            label: "150",
            value: 7,
          },
          {
            label: "200",
            value: 8,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let percentClick2 = "";
      switch (values.percent) {
        case 0:
          percentClick2 = "70";
          break;
        case 1:
          percentClick2 = "80";
          break;
        case 2:
          percentClick2 = "90";
          break;
        case 3:
          percentClick2 = "100";
          break;
        case 4:
          percentClick2 = "110";
          break;
        case 5:
          percentClick2 = "120";
          break;
        case 6:
          percentClick2 = "130";
          break;
        case 7:
          percentClick2 = "150";
          break;
        case 8:
          percentClick2 = "200";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MutationAvgVol20D_>=_${percentClick2}_Daily`],
      };
    },
  },
  {
    id: "tong_kl_khop_hien_tai_tang_dot_bien_so_voi_tbkl_cung_thoi_diem_60_ngay_lien_truoc",
    group: "volatility",
    familyKey: "khoi_luong_tang_cao",
    familyTitle: "Khối lượng tăng cao",
    label:
      "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 60 ngày liền trước",
    control: "select",
    params: [
      {
        key: "percent",
        label: "percent",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "80",
            value: 1,
          },
          {
            label: "90",
            value: 2,
          },
          {
            label: "100",
            value: 3,
          },
          {
            label: "110",
            value: 4,
          },
          {
            label: "120",
            value: 5,
          },
          {
            label: "130",
            value: 6,
          },
          {
            label: "150",
            value: 7,
          },
          {
            label: "200",
            value: 8,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let percentClick3 = "";
      switch (values.percent) {
        case 0:
          percentClick3 = "70";
          break;
        case 1:
          percentClick3 = "80";
          break;
        case 2:
          percentClick3 = "90";
          break;
        case 3:
          percentClick3 = "100";
          break;
        case 4:
          percentClick3 = "110";
          break;
        case 5:
          percentClick3 = "120";
          break;
        case 6:
          percentClick3 = "130";
          break;
        case 7:
          percentClick3 = "150";
          break;
        case 8:
          percentClick3 = "200";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MutationAvgVol60D_>=_${percentClick3}_Daily`],
      };
    },
  },
  {
    id: "kl_tang_so_voi_cung_thoi_diem_cua_phien_lien_truoc",
    group: "volatility",
    familyKey: "khoi_luong_tang_cao",
    familyTitle: "Khối lượng tăng cao",
    label: "KL tăng so với cùng thời điểm của phiên liền trước",
    control: "select",
    params: [
      {
        key: "percent",
        label: "percent",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "80",
            value: 1,
          },
          {
            label: "90",
            value: 2,
          },
          {
            label: "100",
            value: 3,
          },
          {
            label: "110",
            value: 4,
          },
          {
            label: "120",
            value: 5,
          },
          {
            label: "130",
            value: 6,
          },
          {
            label: "150",
            value: 7,
          },
          {
            label: "200",
            value: 8,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let percentClick4 = "";
      switch (values.percent) {
        case 0:
          percentClick4 = "70";
          break;
        case 1:
          percentClick4 = "80";
          break;
        case 2:
          percentClick4 = "90";
          break;
        case 3:
          percentClick4 = "100";
          break;
        case 4:
          percentClick4 = "110";
          break;
        case 5:
          percentClick4 = "120";
          break;
        case 6:
          percentClick4 = "130";
          break;
        case 7:
          percentClick4 = "150";
          break;
        case 8:
          percentClick4 = "200";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MutationVolT1_>=_${percentClick4}_Daily`],
      };
    },
  },
  {
    id: "kl_trong_phien_dat_bang_khoi_luong_phien_giao_dich_truoc",
    group: "volatility",
    familyKey: "khoi_luong_tang_cao",
    familyTitle: "Khối lượng tăng cao",
    label: "KL trong phiên đạt bằng Khối lượng phiên giao dịch trước",
    control: "select",
    params: [
      {
        key: "percent",
        label: "percent",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "80",
            value: 1,
          },
          {
            label: "90",
            value: 2,
          },
          {
            label: "100",
            value: 3,
          },
          {
            label: "110",
            value: 4,
          },
          {
            label: "120",
            value: 5,
          },
          {
            label: "130",
            value: 6,
          },
          {
            label: "150",
            value: 7,
          },
          {
            label: "200",
            value: 8,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let percentClick5 = "";
      switch (values.percent) {
        case 0:
          percentClick5 = "70";
          break;
        case 1:
          percentClick5 = "80";
          break;
        case 2:
          percentClick5 = "90";
          break;
        case 3:
          percentClick5 = "100";
          break;
        case 4:
          percentClick5 = "110";
          break;
        case 5:
          percentClick5 = "120";
          break;
        case 6:
          percentClick5 = "130";
          break;
        case 7:
          percentClick5 = "150";
          break;
        case 8:
          percentClick5 = "200";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Vol_${percentClick5}_VolT1_Daily`],
      };
    },
  },
  {
    id: "doanh_thu_ttm",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Doanh thu (TTM)",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_TTM",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  {
    id: "doanh_thu_nam_gan_nhat",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Doanh thu (năm gần nhất)",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_MRY",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  {
    id: "loi_nhuan_sau_thue_ttm",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Lợi nhuận sau thuế (TTM)",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "Profit_TTM",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  {
    id: "loi_nhuan_sau_thue_nam_gan_nhat",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Lợi nhuận sau thuế (năm gần nhất)",
    control: "range",
    unit: "Tỷ",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "Profit_MRY",
            value: { min: String(values.min * 1000000000), max: String(values.max * 1000000000) },
          },
        ],
      };
    },
  },
  {
    id: "bien_loi_nhuan_gop_ttm",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Biên lợi nhuận gộp (TTM - %)",
    control: "range",
    unit: "%",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "MG_GrossMargin_TTM",
            value: { min: String(values.min / 100), max: String(values.max / 100) },
          },
        ],
      };
    },
  },
  {
    id: "bien_loi_nhuan_gop_5_nam",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Biên lợi nhuận gộp (5 năm - %)",
    control: "range",
    unit: "%",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "MG_GrossMargin_Avg_5Y",
            value: { min: String(values.min / 100), max: String(values.max / 100) },
          },
        ],
      };
    },
  },
  {
    id: "bien_loi_nhuan_hoat_dong_ttm",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Biên lợi nhuận hoạt động (TTM - %)",
    control: "range",
    unit: "%",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "MG_GrossMargin_Avg_5Y",
            value: { min: String(values.min / 100), max: String(values.max / 100) },
          },
        ],
      };
    },
  },
  {
    id: "bien_loi_nhuan_hoat_dong_5_nam",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Biên lợi nhuận hoạt động (5 năm - %)",
    control: "range",
    unit: "%",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "MG_GrossMargin_Avg_5Y",
            value: { min: String(values.min / 100), max: String(values.max / 100) },
          },
        ],
      };
    },
  },
  {
    id: "bien_loi_nhuan_truoc_thue_ttm",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Biên lợi nhuận trước thuế (TTM - %)",
    control: "range",
    unit: "%",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "MG_GrossMargin_Avg_5Y",
            value: { min: String(values.min / 100), max: String(values.max / 100) },
          },
        ],
      };
    },
  },
  {
    id: "bien_loi_nhuan_truoc_thue_5_nam",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Biên lợi nhuận trước thuế (5 năm - %)",
    control: "range",
    unit: "%",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "MG_GrossMargin_Avg_5Y",
            value: { min: String(values.min / 100), max: String(values.max / 100) },
          },
        ],
      };
    },
  },
  {
    id: "ty_le_thanh_toan_nhanh_mrq",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Tỷ lệ thanh toán nhanh (MRQ)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "FS_QuickRatio",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "tong_no_von_csh_total_debt_to_equity",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Tổng nợ/Vốn CSH (Total Debt to Equity)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "FS_DebtOnEquityRatio",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "dong_tien_tu_hoat_dong_kinh_doanh",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Dòng tiền từ hoạt động kinh doanh",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "CF_Operating__FH",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "dong_tien_tu_hoat_dong_dau_tu",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Dòng tiền từ hoạt động đầu tư",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "CF_Investing__FH",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "dong_tien_tu_hoat_dong_tai_chinh",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Dòng tiền từ hoạt động tài chính",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "CF_Financing__FH",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "dong_tien_tong_hop",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Dòng tiền tổng hợp",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "CF_Total__FH",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "dong_tien_tu_do",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Dòng tiền tự do",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "CF_FreeCashFlow__FH",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "dong_tien_tu_hdkd_dt_thuan",
    group: "basic",
    familyKey: "thong_so_co_ban",
    familyTitle: "Thông số cơ bản",
    label: "Dòng tiền từ HĐKD/DT thuần",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        fAFilterSub: [
          {
            key: "CF_OperatingNetSalePercent__FH",
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "co_tuc_bang_tien_nam_gan_nhat",
    group: "basic",
    familyKey: "nhom_co_tuc",
    familyTitle: "Nhóm cổ tức",
    label: "Cổ tức (bằng tiền) năm gần nhất",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "co_tuc_deu_dan_tren_3_nam",
    group: "basic",
    familyKey: "nhom_co_tuc",
    familyTitle: "Nhóm cổ tức",
    label: "Cổ tức đều đặn trên 3 năm",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "co_tuc_bang_tien_nam_gan_nhat",
    group: "basic",
    familyKey: "nhom_co_tuc",
    familyTitle: "Nhóm cổ tức",
    label: "Cổ tức bằng tiền (năm gần nhất)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "ty_suat_co_tuc",
    group: "basic",
    familyKey: "nhom_co_tuc",
    familyTitle: "Nhóm cổ tức",
    label: "Tỷ suất cổ tức",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "thu_nhap_tu_co_tuc_nam_gan_nhat_theo_gia_hien_tai",
    group: "basic",
    familyKey: "nhom_co_tuc",
    familyTitle: "Nhóm cổ tucw",
    label: "Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  //   {
  //     id: "thu_nhap_tu_co_tuc_binh_quan_3_nam",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Thu nhập từ cổ tức bình quân 3 năm (%)",
  //     control: "boolean",
  //     params: [],
  //     toPayload: (values: Record<string, any>) => {
  //   return {};
  //     },
  //   },
  //   {
  //     id: "tang_truong_co_tuc",
  //     group: "technical",
  //     familyKey: "Other",
  //     familyTitle: "Khác",
  //     label: "Tăng trưởng cổ tức (%)",
  //     control: "boolean",
  //     params: [],
  //     toPayload: (values: Record<string, any>) => {
  //   return {};
  //     },
  //   },
  {
    id: "thu_nhap_tu_co_tuc_du_kien",
    group: "basic",
    familyKey: "nhom_co_tuc",
    familyTitle: "Nhóm cổ tức",
    label: "Thu nhập từ cổ tực dự kiến (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "ty_le_chi_tra_co_tuc",
    group: "basic",
    familyKey: "nhom_co_tuc",
    familyTitle: "Nhóm cổ tức",
    label: "Tỷ lệ chi trả cổ tức (%)",
    control: "range",
    params: [
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {
        faFilter: [
          {
            key: "NetSale_Growth_MRQ",
            value: {
              min: String(values.min / 100),
              max: String(values.max / 100),
            },
          },
        ],
      };
    },
  },
  {
    id: "gia_so_voi_duong_tb_ema",
    group: "technical",
    familyKey: "EMA",
    familyTitle: "EMA",
    label: "Giá so với đường TB - EMA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare = "";
      switch (values.compare) {
        case 0:
          checkCompare = ">=";
          break;
        case 1:
          checkCompare = "=";
          break;
        case 2:
          checkCompare = "<=";
          break;
        default:
          break;
      }
      let ema = "";
      switch (values.rightIndexValue) {
        case 0:
          ema = "EMA5";
          break;
        case 1:
          ema = "EMA10";
          break;
        case 2:
          ema = "EMA15";
          break;
        case 3:
          ema = "EMA20";
          break;
        case 4:
          ema = "EMA50";
          break;
        case 5:
          ema = "EMA100";
          break;
        case 6:
          ema = "EMA200";
          break;
        default:
          break;
      }
      let day14 = "";
      switch (values.interval) {
        case 0:
          day14 = "Daily";
          break;
        case 1:
          day14 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Close_${checkCompare}_${ema}_${day14}`],
      };
    },
  },
  {
    id: "gia_cat_duong_tb_ema",
    group: "technical",
    familyKey: "EMA",
    familyTitle: "EMA",
    label: "Giá cắt đường TB - EMA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare1 = "";
      switch (values.compare) {
        case 0:
          checkCompare1 = ">=";
          break;
        case 1:
          checkCompare1 = "=";
          break;
        case 2:
          checkCompare1 = "<=";
          break;
        default:
          break;
      }
      let ema1 = "";
      switch (values.rightIndexValue) {
        case 0:
          ema1 = "EMA5";
          break;
        case 1:
          ema1 = "EMA10";
          break;
        case 2:
          ema1 = "EMA15";
          break;
        case 3:
          ema1 = "EMA20";
          break;
        case 4:
          ema1 = "EMA50";
          break;
        case 5:
          ema1 = "EMA100";
          break;
        case 6:
          ema1 = "EMA200";
          break;
        default:
          break;
      }
      let day15 = "";
      switch (values.interval) {
        case 0:
          day15 = "Daily";
          break;
        case 1:
          day15 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Close_VUOT_${checkCompare1}_${ema1}_${day15}`],
      };
    },
  },
  {
    id: "so_sanh_2_duong_tb_ema",
    group: "technical",
    familyKey: "EMA",
    familyTitle: "EMA",
    label: "So sánh 2 đường TB - EMA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare2 = "";
      switch (values.compare) {
        case 0:
          checkCompare2 = ">=";
          break;
        case 1:
          checkCompare2 = "=";
          break;
        case 2:
          checkCompare2 = "<=";
          break;
        default:
          break;
      }
      let ema02 = "";
      switch (values.leftIndexValue) {
        case 0:
          ema02 = "EMA5";
          break;
        case 1:
          ema02 = "EMA10";
          break;
        case 2:
          ema02 = "EMA15";
          break;
        case 3:
          ema02 = "EMA20";
          break;
        case 4:
          ema02 = "EMA50";
          break;
        case 5:
          ema02 = "EMA100";
          break;
        case 6:
          ema02 = "EMA200";
          break;
        default:
          break;
      }
      let ema2 = "";
      switch (values.rightIndexValue) {
        case 0:
          ema2 = "EMA5";
          break;
        case 1:
          ema2 = "EMA10";
          break;
        case 2:
          ema2 = "EMA15";
          break;
        case 3:
          ema2 = "EMA20";
          break;
        case 4:
          ema2 = "EMA50";
          break;
        case 5:
          ema2 = "EMA100";
          break;
        case 6:
          ema2 = "EMA200";
          break;
        default:
          break;
      }
      let day16 = "";
      switch (values.interval) {
        case 0:
          day16 = "Daily";
          break;
        case 1:
          day16 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${ema02}_${checkCompare2}_${ema2}_${day16}`],
      };
    },
  },
  {
    id: "giao_cat_2_duong_tb_ema",
    group: "technical",
    familyKey: "EMA",
    familyTitle: "EMA",
    label: "Giao cắt 2 đường TB - EMA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change = "";
      switch (values.compare) {
        case 0:
          change = "VUOT";
          break;
        case 1:
          change = "THUNG";
          break;
        default:
          break;
      }
      let checkCompare3 = "";
      switch (values.leftIndexValue) {
        case 0:
          checkCompare3 = "EMA5";
          break;
        case 1:
          checkCompare3 = "EMA10";
          break;
        case 2:
          checkCompare3 = "EMA15";
          break;
        case 3:
          checkCompare3 = "EMA20";
          break;
        case 4:
          checkCompare3 = "EMA50";
          break;
        case 5:
          checkCompare3 = "EMA100";
          break;
        case 6:
          checkCompare3 = "EMA200";
          break;
        default:
          break;
      }
      let ema3 = "";
      switch (values.rightIndexValue) {
        case 0:
          ema3 = "EMA5";
          break;
        case 1:
          ema3 = "EMA10";
          break;
        case 2:
          ema3 = "EMA15";
          break;
        case 3:
          ema3 = "EMA20";
          break;
        case 4:
          ema3 = "EMA50";
          break;
        case 5:
          ema3 = "EMA100";
          break;
        case 6:
          ema3 = "EMA200";
          break;
        default:
          break;
      }
      let day17 = "";
      switch (values.interval) {
        case 0:
          day17 = "Daily";
          break;
        case 1:
          day17 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${checkCompare3}_${change}_${ema3}_${day17}`],
      };
    },
  },
  {
    id: "gia_so_voi_duong_tb_ma",
    group: "technical",
    familyKey: "MA",
    familyTitle: "MA",
    label: "Giá so với đường TB - MA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "MA(5)",
            value: 0,
          },
          {
            label: "MA(10)",
            value: 1,
          },
          {
            label: "MA(15)",
            value: 2,
          },
          {
            label: "MA(20)",
            value: 3,
          },
          {
            label: "MA(50)",
            value: 4,
          },
          {
            label: "MA(100)",
            value: 5,
          },
          {
            label: "MA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare4 = "";
      switch (values.compare) {
        case 0:
          checkCompare4 = ">=";
          break;
        case 1:
          checkCompare4 = "=";
          break;
        case 2:
          checkCompare4 = "<=";
          break;
        default:
          break;
      }
      let ema4 = "";
      switch (values.rightIndexValue) {
        case 0:
          ema4 = "SMA5";
          break;
        case 1:
          ema4 = "SMA10";
          break;
        case 2:
          ema4 = "SMA15";
          break;
        case 3:
          ema4 = "SMA20";
          break;
        case 4:
          ema4 = "SMA50";
          break;
        case 5:
          ema4 = "SMA100";
          break;
        case 6:
          ema4 = "SMA200";
          break;
        default:
          break;
      }
      let day18 = "";
      switch (values.interval) {
        case 0:
          day18 = "Daily";
          break;
        case 1:
          day18 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${checkCompare4}_${ema4}_${day18}`],
      };
    },
  },
  {
    id: "so_sanh_2_duong_tb_ma",
    group: "technical",
    familyKey: "MA",
    familyTitle: "MA",
    label: "So sánh 2 đường TB - MA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "MA(5)",
            value: 0,
          },
          {
            label: "MA(10)",
            value: 1,
          },
          {
            label: "MA(15)",
            value: 2,
          },
          {
            label: "MA(20)",
            value: 3,
          },
          {
            label: "MA(50)",
            value: 4,
          },
          {
            label: "MA(100)",
            value: 5,
          },
          {
            label: "MA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "MA(5)",
            value: 0,
          },
          {
            label: "MA(10)",
            value: 1,
          },
          {
            label: "MA(15)",
            value: 2,
          },
          {
            label: "MA(20)",
            value: 3,
          },
          {
            label: "MA(50)",
            value: 4,
          },
          {
            label: "MA(100)",
            value: 5,
          },
          {
            label: "MA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare5 = "";
      switch (values.compare) {
        case 0:
          checkCompare5 = ">=";
          break;
        case 1:
          checkCompare5 = "=";
          break;
        case 2:
          checkCompare5 = "<=";
          break;
        default:
          break;
      }
      let ema05 = "";
      switch (values.leftIndexValue) {
        case 0:
          ema05 = "SMA5";
          break;
        case 1:
          ema05 = "SMA10";
          break;
        case 2:
          ema05 = "SMA15";
          break;
        case 3:
          ema05 = "SMA20";
          break;
        case 4:
          ema05 = "SMA50";
          break;
        case 5:
          ema05 = "SMA100";
          break;
        case 6:
          ema05 = "SMA200";
          break;
        default:
          break;
      }
      let ema5 = "";
      switch (values.rightIndexValue) {
        case 0:
          ema5 = "SMA5";
          break;
        case 1:
          ema5 = "SMA10";
          break;
        case 2:
          ema5 = "SMA15";
          break;
        case 3:
          ema5 = "SMA20";
          break;
        case 4:
          ema5 = "SMA50";
          break;
        case 5:
          ema5 = "SMA100";
          break;
        case 6:
          ema5 = "SMA200";
          break;
        default:
          break;
      }
      let day19 = "";
      switch (values.interval) {
        case 0:
          day19 = "Daily";
          break;
        case 1:
          day19 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${ema05}_${checkCompare5}_${ema5}_${day19}`],
      };
    },
  },
  {
    id: "giao_cat_2_duong_tb_ma",
    group: "technical",
    familyKey: "MA",
    familyTitle: "MA",
    label: "Giao cắt 2 đường TB - MA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change1 = "";
      switch (values.compare) {
        case 0:
          change1 = "VUOT";
          break;
        case 1:
          change1 = "THUNG";
          break;
        default:
          break;
      }
      let checkCompare6 = "";
      switch (values.leftIndexValue) {
        case 0:
          checkCompare6 = "EMA5";
          break;
        case 1:
          checkCompare6 = "EMA10";
          break;
        case 2:
          checkCompare6 = "EMA15";
          break;
        case 3:
          checkCompare6 = "EMA20";
          break;
        case 4:
          checkCompare6 = "EMA50";
          break;
        case 5:
          checkCompare6 = "EMA100";
          break;
        case 6:
          checkCompare6 = "EMA200";
          break;
        default:
          break;
      }
      let ema6 = "";
      switch (values.rightIndexValue) {
        case 0:
          ema6 = "EMA5";
          break;
        case 1:
          ema6 = "EMA10";
          break;
        case 2:
          ema6 = "EMA15";
          break;
        case 3:
          ema6 = "EMA20";
          break;
        case 4:
          ema6 = "EMA50";
          break;
        case 5:
          ema6 = "EMA100";
          break;
        case 6:
          ema6 = "EMA200";
          break;
        default:
          break;
      }
      let day20 = "";
      switch (values.interval) {
        case 0:
          day20 = "Daily";
          break;
        case 1:
          day20 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${checkCompare6}_${change1}_${ema6}_${day20}`],
      };
    },
  },
  {
    id: "gia_cat_duong_tb_ma",
    group: "technical",
    familyKey: "MA",
    familyTitle: "MA",
    label: "Giá cắt đường TB - MA",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "EMA(5)",
            value: 0,
          },
          {
            label: "EMA(10)",
            value: 1,
          },
          {
            label: "EMA(15)",
            value: 2,
          },
          {
            label: "EMA(20)",
            value: 3,
          },
          {
            label: "EMA(50)",
            value: 4,
          },
          {
            label: "EMA(100)",
            value: 5,
          },
          {
            label: "EMA(200)",
            value: 6,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change2 = "";
      switch (values.compare) {
        case 0:
          change2 = "VUOT";
          break;
        case 1:
          change2 = "THUNG";
          break;
        default:
          break;
      }
      let ema7 = "";
      switch (values.rightIndexValue) {
        case 0:
          ema7 = "EMA5";
          break;
        case 1:
          ema7 = "EMA10";
          break;
        case 2:
          ema7 = "EMA15";
          break;
        case 3:
          ema7 = "EMA20";
          break;
        case 4:
          ema7 = "EMA50";
          break;
        case 5:
          ema7 = "EMA100";
          break;
        case 6:
          ema7 = "EMA200";
          break;
        default:
          break;
      }
      let day21 = "";
      switch (values.interval) {
        case 0:
          day21 = "Daily";
          break;
        case 1:
          day21 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${change2}_${ema7}_${day21}`],
      };
    },
  },
  {
    id: "gia_so_voi_tenkan_9",
    group: "technical",
    familyKey: "Ichimoku",
    familyTitle: "Ichimoku",
    label: "Giá so với Tenkan(9)",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare7 = "";
      switch (values.compare) {
        case 0:
          checkCompare7 = ">=";
          break;
        case 1:
          checkCompare7 = "=";
          break;
        case 2:
          checkCompare7 = "<=";
          break;
        default:
          break;
      }
      let day22 = "";
      switch (values.interval) {
        case 0:
          day22 = "Daily";
          break;
        case 1:
          day22 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${checkCompare7}_Tenkan_${day22}`],
      };
    },
  },
  {
    id: "gia_so_voi_kijun_26",
    group: "technical",
    familyKey: "Ichimoku",
    familyTitle: "Ichimoku",
    label: "Giá so với Kijun(26)",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 1,
          },
          {
            label: "Bằng (=)",
            value: 2,
          },
          {
            label: "Dưới (≤)",
            value: 4,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare8 = "";
      switch (values.compare) {
        case 1:
          checkCompare8 = ">=";
          break;
        case 2:
          checkCompare8 = "=";
          break;
        case 4:
          checkCompare8 = "<=";
          break;
        default:
          break;
      }
      let day23 = "";
      switch (values.interval) {
        case 0:
          day23 = "Daily";
          break;
        case 1:
          day23 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${checkCompare8}_Kijun_${day23}`],
      };
    },
  },
  {
    id: "gia_so_voi_cloud_52",
    group: "technical",
    familyKey: "Ichimoku",
    familyTitle: "Ichimoku",
    label: "Giá so với Cloud(52)",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      return {};
    },
  },
  {
    id: "gia_giao_cat_voi_tenkan_9",
    group: "technical",
    familyKey: "Ichimoku",
    familyTitle: "Ichimoku",
    label: "Giá giao cắt với Tenkan(9)",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change3 = "";
      switch (values.compare) {
        case 0:
          change3 = "VUOT";
          break;
        case 1:
          change3 = "THUNG";
          break;
        default:
          break;
      }
      let day25 = "";
      switch (values.interval) {
        case 0:
          day25 = "Daily";
          break;
        case 1:
          day25 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${change3}_Tenkan_${day25}`],
      };
    },
  },
  {
    id: "gia_giao_cat_voi_kijun_26",
    group: "technical",
    familyKey: "Ichimoku",
    familyTitle: "Ichimoku",
    label: "Giá giao cắt với Kijun(26)",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change4 = "";
      switch (values.compare) {
        case 0:
          change4 = "VUOT";
          break;
        case 1:
          change4 = "THUNG";
          break;
        default:
          break;
      }
      let day26 = "";
      switch (values.interval) {
        case 0:
          day26 = "Daily";
          break;
        case 1:
          day26 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${change4}_Kijun_${day26}`],
      };
    },
  },
  {
    id: "gia_giao_cat_voi_cloud_52",
    group: "technical",
    familyKey: "Ichimoku",
    familyTitle: "Ichimoku",
    label: "Giá giao cắt với Cloud(52)",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change5 = "";
      switch (values.compare) {
        case 0:
          change5 = "VUOT";
          break;
        case 1:
          change5 = "THUNG";
          break;
        default:
          break;
      }
      let day27 = "";
      switch (values.interval) {
        case 0:
          day27 = "Daily";
          break;
        case 1:
          day27 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${change5}_Cloud_${day27}`],
      };
    },
  },
  {
    id: "giao_cat_thanh_phan_tenkan_va_kijun",
    group: "technical",
    familyKey: "Ichimoku",
    familyTitle: "Ichimoku",
    label: "Giao cắt thành phần Tenkan và Kijun",
    control: "select",
    params: [
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "Tenkan",
            value: 0,
          },
          {
            label: "Kijun",
            value: 1,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "Tenkan",
            value: 0,
          },
          {
            label: "Kijun",
            value: 1,
          },
        ],
      },
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let left = "";
      switch (values.leftIndexValue) {
        case 0:
          left = "Tenkan";
          break;
        case 1:
          left = "Kijun";
          break;
        default:
          break;
      }
      let right = "";
      switch (values.rightIndexValue) {
        case 0:
          right = "Tenkan";
          break;
        case 1:
          right = "Kijun";
          break;
        default:
          break;
      }
      let change6 = "";
      switch (values.compare) {
        case 0:
          change6 = "VUOT";
          break;
        case 1:
          change6 = "THUNG";
          break;
        default:
          break;
      }
      let day28 = "";
      switch (values.interval) {
        case 0:
          day28 = "Daily";
          break;
        case 1:
          day28 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${left}_${change6}_${right}_${day28}`],
      };
    },
  },
  {
    id: "macd_so_voi_signal",
    group: "technical",
    familyKey: "MACD",
    familyTitle: "MACD",
    label: "MACD so với Signal",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare10 = "";
      switch (values.compare) {
        case 0:
          checkCompare10 = ">=";
          break;
        case 1:
          checkCompare10 = "=";
          break;
        case 2:
          checkCompare10 = "<=";
          break;
        default:
          break;
      }
      let day30 = "";
      switch (values.interval) {
        case 0:
          day30 = "Daily";
          break;
        case 1:
          day30 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MACD_${checkCompare10}_MACDSignal_${day30}`],
      };
    },
  },
  {
    id: "macd_cat_voi_signal",
    group: "technical",
    familyKey: "MACD",
    familyTitle: "MACD",
    label: "MACD cắt với Signal",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change7 = "";
      switch (values.compare) {
        case 0:
          change7 = "VUOT";
          break;
        case 1:
          change7 = "THUNG";
          break;
        default:
          break;
      }
      let day31 = "";
      switch (values.interval) {
        case 0:
          day31 = "Daily";
          break;
        case 1:
          day31 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MACD_${change7}_MACDSignal_${day31}`],
      };
    },
  },
  {
    id: "trang_thai_gia_tri_cua_macd",
    group: "technical",
    familyKey: "MACD",
    familyTitle: "MACD",
    label: "Trạng thái giá trị của MACD",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: ">=_0",
            value: 0,
          },
          {
            label: "<_0",
            value: 1,
          },
          {
            label: "VUOT_0",
            value: 2,
          },
          {
            label: "THUNG_0",
            value: 3,
          },
        ],
      },
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "MACD",
            value: 0,
          },
          {
            label: "Signal",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare11 = "";
      switch (values.compare) {
        case 0:
          checkCompare11 = ">=_0";
          break;
        case 1:
          checkCompare11 = "<_0";
          break;
        case 2:
          checkCompare11 = "VUOT_0";
          break;
        case 3:
          checkCompare11 = "THUNG_0";
          break;
        default:
          break;
      }
      let left1 = "";
      switch (values.leftIndexValue) {
        case 0:
          left1 = "MACD";
          break;
        case 1:
          left1 = "MACDSignal";
          break;
        default:
          break;
      }
      let day32 = "";
      switch (values.interval) {
        case 0:
          day32 = "Daily";
          break;
        case 1:
          day32 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${left1}_${checkCompare11}_${day32}`],
      };
    },
  },
  {
    id: "histogram_tang_lien_tuc",
    group: "technical",
    familyKey: "MACD",
    familyTitle: "MACD",
    label: "Histogram tăng liên tục",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider6 = values.rightIndexValue || values.rightIndexValue || 2;
      let day34 = "";
      switch (values.interval) {
        case 0:
          day34 = "Daily";
          break;
        case 1:
          day34 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MACDHist_UP_${slider6}_${day34}`],
      };
    },
  },
  {
    id: "histogram_giam_lien_tuc",
    group: "technical",
    familyKey: "MACD",
    familyTitle: "MACD",
    label: "Histogram giảm liên tục",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider7 = values.rightIndexValue || values.rightIndexValue || 2;
      let day35 = "";
      switch (values.interval) {
        case 0:
          day35 = "Daily";
          break;
        case 1:
          day35 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MACDHist_DOWN_${slider7}_${day35}`],
      };
    },
  },
  {
    id: "gia_tri_rsi14",
    group: "technical",
    familyKey: "RSI14",
    familyTitle: "RSI(14)",
    label: "Giá trị RSI14",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `RSI14_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "rsi14_so_voi_cac_vung_gia_tri",
    group: "technical",
    familyKey: "RSI14",
    familyTitle: "RSI(14)",
    label: "RSI14 so với các vùng giá trị",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "60",
            value: 1,
          },
          {
            label: "40",
            value: 2,
          },
          {
            label: "30",
            value: 3,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let checkCompare12 = "";
      switch (values.compare) {
        case 0:
          checkCompare12 = ">=";
          break;
        case 1:
          checkCompare12 = "=";
          break;
        case 2:
          checkCompare12 = "<=";
          break;
        default:
          break;
      }
      let right3 = "";
      switch (values.rightIndexValue) {
        case 0:
          right3 = "70";
          break;
        case 1:
          right3 = "60";
          break;
        case 2:
          right3 = "40";
          break;
        case 3:
          right3 = "30";
          break;
        default:
          break;
      }
      let day37 = "";
      switch (values.interval) {
        case 0:
          day37 = "Daily";
          break;
        case 1:
          day37 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`RSI14_${checkCompare12}_${right3}_${day37}`],
      };
    },
  },
  {
    id: "rsi14_va_vung_qua_mua_qua_ban",
    group: "technical",
    familyKey: "RSI14",
    familyTitle: "RSI(14)",
    label: "RSI14 và vùng Quá mua/Quá bán",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "30",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let left2 = "";
      switch (values.compare) {
        case 0:
          left2 = "VUOT";
          break;
        case 1:
          left2 = "THUNG";
          break;
        default:
          break;
      }
      let right2 = "";
      switch (values.rightIndexValue) {
        case 0:
          right2 = "70";
          break;
        case 1:
          right2 = "30";
          break;
        default:
          break;
      }
      let day38 = "";
      switch (values.interval) {
        case 0:
          day38 = "Daily";
          break;
        case 1:
          day38 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`RSI14_${left2}_${right2}_${day38}`],
      };
    },
  },
  {
    id: "gia_tang_vuot_bien_tren",
    group: "technical",
    familyKey: "Bollinger",
    familyTitle: "Bollinger Bands",
    label: "Giá tăng vượt Biên trên",
    control: "select",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let day39 = "";
      switch (values.interval) {
        case 0:
          day39 = "Daily";
          break;
        case 1:
          day39 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_VUOT_UpperBand_${day39}`],
      };
    },
  },
  {
    id: "gia_giam_qua_bien_tren",
    group: "technical",
    familyKey: "Bollinger",
    familyTitle: "Bollinger Bands",
    label: "Giá giảm qua Biên trên",
    control: "select",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let day40 = "";
      switch (values.interval) {
        case 0:
          day40 = "Daily";
          break;
        case 1:
          day40 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_THUNG_UpperBand_${day40}`],
      };
    },
  },
  {
    id: "gia_giam_thung_bien_duoi",
    group: "technical",
    familyKey: "Bollinger",
    familyTitle: "Bollinger Bands",
    label: "Giá giảm thủng Biên dưới",
    control: "select",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let day41 = "";
      switch (values.interval) {
        case 0:
          day41 = "Daily";
          break;
        case 1:
          day41 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_THUNG_LowerBand_${day41}`],
      };
    },
  },
  {
    id: "gia_tang_qua_bien_duoi",
    group: "technical",
    familyKey: "Bollinger",
    familyTitle: "Bollinger Bands",
    label: "Giá tăng qua Biên dưới",
    control: "select",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let day42 = "";
      switch (values.interval) {
        case 0:
          day42 = "Daily";
          break;
        case 1:
          day42 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_VUOT_LowerBand_${day42}`],
      };
    },
  },
  {
    id: "gia_duy_tri_vuot_ngoai_bien_tren_bollinger",
    group: "technical",
    familyKey: "Bollinger",
    familyTitle: "Bollinger Bands",
    label: "Giá duy trì vượt ngoài Biên trên Bollinger",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider8 = values.rightIndexValue || values.rightIndexValue || 2;
      let day43 = "";
      switch (values.interval) {
        case 0:
          day43 = "Daily";
          break;
        case 1:
          day43 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Close_UP_${slider8}_${day43}_UpperBand`],
      };
    },
  },
  {
    id: "gia_duy_tri_ngoai_bien_duoi_bollinger",
    group: "technical",
    familyKey: "Bollinger",
    familyTitle: "Bollinger Bands",
    label: "Giá duy trì ngoài Biên dưới Bollinger",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const slider9 = values.rightIndexValue || values.rightIndexValue || 2;
      let day44 = "";
      switch (values.interval) {
        case 0:
          day44 = "Daily";
          break;
        case 1:
          day44 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`Close_DOWN_${slider9}_${day44}_LowerBand`],
      };
    },
  },
  {
    id: "gia_tri_mfi_20",
    group: "technical",
    familyKey: "mfi",
    familyTitle: "MFI",
    label: "Giá trị MFI(20)",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `MFI_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "mfi_20_va_vung_qua_mua_qua_ban",
    group: "technical",
    familyKey: "mfi",
    familyTitle: "MFI",
    label: "MFI(20) và vùng Quá mua/Quá bán",
    control: "select",
    params: [
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "70",
            value: 0,
          },
          {
            label: "30",
            value: 1,
          },
        ],
      },
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let right4 = "";
      switch (values.rightIndexValue) {
        case 0:
          right4 = "70";
          break;
        case 1:
          right4 = "30";
          break;
        default:
          break;
      }
      let change8 = "";
      switch (values.compare) {
        case 0:
          change8 = "VUOT";
          break;
        case 1:
          change8 = "THUNG";
          break;
        default:
          break;
      }
      let day46 = "";
      switch (values.interval) {
        case 0:
          day46 = "Daily";
          break;
        case 1:
          day46 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`MFI_${change8}_${right4}_${day46}`],
      };
    },
  },
  {
    id: "stochastic_va_vung_qua_mua_qua_ban",
    group: "technical",
    familyKey: "Stochastic",
    familyTitle: "Stochastic",
    label: "Stochastic và vùng Quá mua/Quá bán",
    control: "select",
    params: [
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "StochSlowK",
            value: 0,
          },
          {
            label: "StochSlowD",
            value: 1,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "80",
            value: 0,
          },
          {
            label: "20",
            value: 1,
          },
        ],
      },
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let left5 = "";
      switch (values.leftIndexValue) {
        case 0:
          left5 = "StochSlowK";
          break;
        case 1:
          left5 = "StochSlowD";
          break;
        default:
          break;
      }
      let right5 = "";
      switch (values.rightIndexValue) {
        case 0:
          right5 = "80";
          break;
        case 1:
          right5 = "20";
          break;
        default:
          break;
      }
      let change9 = "";
      switch (values.compare) {
        case 0:
          change9 = "VUOT";
          break;
        case 1:
          change9 = "THUNG";
          break;
        default:
          break;
      }
      let day47 = "";
      switch (values.interval) {
        case 0:
          day47 = "Daily";
          break;
        case 1:
          day47 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${left5}_${change9}_${right5}_${day47}`],
      };
    },
  },
  {
    id: "stochastic_giao_cat_nhau",
    group: "technical",
    familyKey: "Stochastic",
    familyTitle: "Stochastic",
    label: "Stochastic giao cắt nhau",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change10 = "";
      switch (values.compare) {
        case 0:
          change10 = "VUOT";
          break;
        case 1:
          change10 = "THUNG";
          break;
        default:
          break;
      }
      let day48 = "";
      switch (values.interval) {
        case 0:
          day48 = "Daily";
          break;
        case 1:
          day48 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`faKeysStochSlowK_${change10}_StochSlowD_${day48}`],
      };
    },
  },
  {
    id: "gia_tri_mcdx_banker",
    group: "technical",
    familyKey: "mcdx",
    familyTitle: "MCDX",
    label: "Giá trị MCDX (Banker)",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `MCDXBanker_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "gia_tri_mcdx_hot_money",
    group: "technical",
    familyKey: "mcdx",
    familyTitle: "MCDX",
    label: "Giá trị MCDX (Hot money)",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `MCDXHotMoney_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "bien_dong_mcdx",
    group: "technical",
    familyKey: "mcdx",
    familyTitle: "MCDX",
    label: "Biến động MCDX",
    control: "select",
    params: [
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "MCDXBanker",
            value: 0,
          },
          {
            label: "MCDXHotMoney",
            value: 1,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "20",
            value: 0,
          },
          {
            label: "25",
            value: 1,
          },
          {
            label: "30",
            value: 2,
          },
          {
            label: "40",
            value: 3,
          },
          {
            label: "50",
            value: 4,
          },
          {
            label: "60",
            value: 5,
          },
          {
            label: "70",
            value: 6,
          },
          {
            label: "75",
            value: 7,
          },
          {
            label: "80",
            value: 8,
          },
        ],
      },
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let left6 = "";
      switch (values.leftIndexValue) {
        case 0:
          left6 = "MCDXBanker";
          break;
        case 1:
          left6 = "MCDXHotMoney";
          break;
        default:
          break;
      }
      let right6 = "";
      switch (values.rightIndexValue) {
        case 0:
          right6 = "20";
          break;
        case 1:
          right6 = "25";
          break;
        case 2:
          right6 = "30";
          break;
        case 3:
          right6 = "40";
          break;
        case 4:
          right6 = "50";
          break;
        case 5:
          right6 = "60";
          break;
        case 6:
          right6 = "70";
          break;
        case 7:
          right6 = "75";
          break;
        case 8:
          right6 = "80";
          break;
        default:
          break;
      }
      let change11 = "";
      switch (values.compare) {
        case 0:
          change11 = "VUOT";
          break;
        case 1:
          change11 = "THUNG";
          break;
        default:
          break;
      }
      let day51 = "";
      switch (values.interval) {
        case 0:
          day51 = "Daily";
          break;
        case 1:
          day51 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${left6}_${change11}_${right6}_${day51}`],
      };
    },
  },
  {
    id: "gia_tri_adx_14",
    group: "technical",
    familyKey: "ADX",
    familyTitle: "ADX",
    label: "Giá trị ADX(14)",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `ADX_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "gia_tri_di_14",
    group: "technical",
    familyKey: "ADX",
    familyTitle: "ADX",
    label: "Giá trị -DI(14)",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `DIN14_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "gia_tri_di_14",
    group: "technical",
    familyKey: "ADX",
    familyTitle: "ADX",
    label: "Giá trị +DI(14)",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `DIP14_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "giao_cat_nhom_adx",
    group: "technical",
    familyKey: "ADX",
    familyTitle: "ADX",
    label: "Giao cắt nhóm ADX",
    control: "select",
    params: [
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "DIP14",
            value: 0,
          },
          {
            label: "DIN14",
            value: 1,
          },
          {
            label: "ADX",
            value: 2,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "DIP14",
            value: 0,
          },
          {
            label: "DIN14",
            value: 1,
          },
          {
            label: "ADX",
            value: 2,
          },
        ],
      },
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let left7 = "";
      switch (values.leftIndexValue) {
        case 0:
          left7 = "DIP14";
          break;
        case 1:
          left7 = "DIN14";
          break;
        case 2:
          left7 = "ADX";
          break;
        default:
          break;
      }
      let right7 = "";
      switch (values.rightIndexValue) {
        case 0:
          right7 = "DIP14";
          break;
        case 1:
          right7 = "DIN14";
          break;
        case 2:
          right7 = "ADX";
          break;
        default:
          break;
      }
      let change12 = "";
      switch (values.compare) {
        case 0:
          change12 = "VUOT";
          break;
        case 1:
          change12 = "THUNG";
          break;
        default:
          break;
      }
      let day55 = "";
      switch (values.interval) {
        case 0:
          day55 = "Daily";
          break;
        case 1:
          day55 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${left7}_${change12}_${right7}_${day55}`],
      };
    },
  },
  {
    id: "adx_va_nguong_gia_tri",
    group: "technical",
    familyKey: "ADX",
    familyTitle: "ADX",
    label: "ADX và ngưỡng giá trị",
    control: "select",
    params: [
      {
        key: "leftIndexValue",
        label: "Đường thứ nhất",
        type: "select",
        options: [
          {
            label: "ADX",
            value: 0,
          },
          {
            label: "DIP14",
            value: 1,
          },
          {
            label: "DIN14",
            value: 2,
          },
        ],
      },
      {
        key: "rightIndexValue",
        label: "Đường thứ hai",
        type: "select",
        options: [
          {
            label: "20",
            value: 0,
          },
          {
            label: "25",
            value: 1,
          },
          {
            label: "30",
            value: 2,
          },
          {
            label: "35",
            value: 3,
          },
          {
            label: "40",
            value: 4,
          },
          {
            label: "45",
            value: 5,
          },
          {
            label: "50",
            value: 6,
          },
          {
            label: "55",
            value: 7,
          },
          {
            label: "60",
            value: 8,
          },
          {
            label: "65",
            value: 9,
          },
          {
            label: "70",
            value: 10,
          },
        ],
      },
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let left8 = "";
      switch (values.leftIndexValue) {
        case 0:
          left8 = "ADX";
          break;
        case 1:
          left8 = "DIP14";
          break;
        case 2:
          left8 = "DIN14";
          break;
        default:
          break;
      }
      let right8 = "";
      switch (values.rightIndexValue) {
        case 0:
          right8 = "20";
          break;
        case 1:
          right8 = "25";
          break;
        case 2:
          right8 = "30";
          break;
        case 3:
          right8 = "35";
          break;
        case 4:
          right8 = "40";
          break;
        case 5:
          right8 = "45";
          break;
        case 6:
          right8 = "50";
          break;
        case 7:
          right8 = "55";
          break;
        case 8:
          right8 = "60";
          break;
        case 9:
          right8 = "65";
          break;
        case 10:
          right8 = "70";
          break;
        default:
          break;
      }
      let change13 = "";
      switch (values.compare) {
        case 0:
          change13 = ">=";
          break;
        case 1:
          change13 = "=";
          break;
        case 2:
          change13 = "<=";
          break;
        default:
          break;
      }
      let day56 = "";
      switch (values.interval) {
        case 0:
          day56 = "Daily";
          break;
        case 1:
          day56 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`${left8}_${change13}_${right8}_${day56}`],
      };
    },
  },
  {
    id: "gia_so_voi_psar",
    group: "technical",
    familyKey: "psar",
    familyTitle: "Parabolic SAR - PSAR",
    label: "Giá so với PSar",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Trên (≥)",
            value: 0,
          },
          {
            label: "Bằng (=)",
            value: 1,
          },
          {
            label: "Dưới (≤)",
            value: 2,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change14 = "";
      switch (values.compare) {
        case 0:
          change14 = ">=";
          break;
        case 1:
          change14 = "=";
          break;
        case 2:
          change14 = "<=";
          break;
        default:
          break;
      }
      let day57 = "";
      switch (values.interval) {
        case 0:
          day57 = "Daily";
          break;
        case 1:
          day57 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${change14}_PSar_${day57}`],
      };
    },
  },
  {
    id: "khoang_cach_gia_va_psar",
    group: "technical",
    familyKey: "psar",
    familyTitle: "Parabolic SAR - PSAR",
    label: "Khoảng cách giá và PSar",
    control: "range",
    params: [
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
      {
        key: "min",
        label: "Từ",
        type: "number",
      },
      {
        key: "max",
        label: "Đến",
        type: "number",
      },
    ],
    toPayload: (values: Record<string, any>) => {
      const day = values.interval === 0 ? "Daily" : "Weekly";
      return {
        fAFilterSub: [
          {
            key: `CloseVsPSARMUTATION_${day}`,
            value: { min: String(values.min), max: String(values.max) },
          },
        ],
      };
    },
  },
  {
    id: "psar_dao_chieu",
    group: "technical",
    familyKey: "psar",
    familyTitle: "Parabolic SAR - PSAR",
    label: "PSar đảo chiều",
    control: "select",
    params: [
      {
        key: "compare",
        label: "So sánh",
        type: "select",
        options: [
          {
            label: "Cắt lên trên",
            value: 0,
          },
          {
            label: "Cắt xuống dưới",
            value: 1,
          },
        ],
      },
      {
        key: "interval",
        label: "Kỳ",
        type: "select",
        options: [
          {
            label: "1 ngày",
            value: 0,
          },
          {
            label: "1 tuần",
            value: 1,
          },
        ],
      },
    ],
    toPayload: (values: Record<string, any>) => {
      let change16 = "";
      switch (values.compare) {
        case 0:
          change16 = "VUOT";
          break;
        case 1:
          change16 = "THUNG";
          break;
        default:
          break;
      }
      let day59 = "";
      switch (values.interval) {
        case 0:
          day59 = "Daily";
          break;
        case 1:
          day59 = "Weekly";
          break;
        default:
          break;
      }

      return {
        faKeys: [`CLOSE_${change16}_PSar_${day59}`],
      };
    },
  },
];
export const getCriterionInfoFromKey = (
  key: string
): { label: string; unit?: string } | undefined => {
  // Common mappings that might not be in criteria defs or need overrides
  const commonMappings: Record<string, { label: string; unit?: string }> = {
    Symbol: { label: "Mã" },
    symbol: { label: "Mã" },
    MarketCap: { label: "Vốn hoá", unit: "Tỷ" },
  };

  if (commonMappings[key]) {
    return commonMappings[key];
  }

  for (const criterion of CRITERIA_DEFS) {
    try {
      // Create dummy values for toPayload
      const dummyValues: Record<string, any> = { min: 0, max: 0 };
      if (criterion.params) {
        criterion.params.forEach((p) => {
          dummyValues[p.key] = 0;
        });
      }

      const payload = criterion.toPayload(dummyValues);

      // Check if key exists in payload
      const matches =
        payload.faKeys?.includes(key) ||
        payload.fAFilterSub?.some((item) => item.key === key) ||
        payload.faFilter?.some((item) => item.key === key) ||
        payload.booleanFilter?.some((item) => item.key === key);

      if (matches) {
        return { label: criterion.label, unit: criterion.unit };
      }
    } catch (e) {
      // Ignore errors during dummy payload generation
    }
  }

  return undefined;
};
