import axiosClient from './request';

export interface FinancialReportResponse {
    error: boolean;
    data: {
        superSector: string;
        quarter: FinancialDataPeriod;
        year: FinancialDataPeriod;
    };
    message: string;
}

export interface FinancialDataPeriod {
    luuChuyenTien: any[];
    canDoiKeToan: any[];
    ketQuaKinhDoanh: any[];
    taiSan: AssetStructure[];
    nguonVon: CapitalStructure[];
    doanhThuThuan: NetRevenue[];
    coCauLoiNhuanTruocThue: ProfitStructure[];
    loiNhuanSauThue: ProfitAfterTax[];
}

export interface AssetStructure {
    taiSanTaiChinhNganHan?: number;
    taiSanLuuDongKhac?: number;
    taiSanTaiChinhDaiHan?: number;
    taiSanCoDinh?: number;
    giaTriRongBatDongSanDauTu?: number;
    taiSanDoDangDaiHan?: number;
    taiSanDaiHanKhac?: number;
    tienVaTuongDuongTien?: number;
    giaTriThuanDauTuTaiSanTaiChinhNganHan?: number;
    tongCacKhoanPhaiThu?: number;
    hangTonKhoRong?: number;
    dauTuDaiHan?: number;
    quarter: number;
    year: number;
}

export interface CapitalStructure {
    noNganHan?: number;
    noDaiHan?: number;
    vonVaCacQuy?: number;
    loiIchCuaCoDongThieuSo?: number;
    quarter: number;
    year: number;
}

export interface NetRevenue {
    doanhThuThuan: number;
    doanhThuHoatDongTaiChinh?: number;
    doanhThuThuanYoY: number;
    quarter: number;
    year: number;
}

export interface ProfitStructure {
    loiNhuanKhac: number;
    laiLoTuCongTyLDLK: number;
    loiNhuanTaiChinh: number;
    loiNhuanThuanTuHDKDChinh: number;
    loiNhuanTruocThueYOY: number;
    quarter: number;
    year: number;
}

export interface ProfitAfterTax {
    loiNhuanSauThue: number;
    loiNhuanSauThueYOY: number;
    loiNhuanSauThueChuSoHuu?: number;
    loiNhuanSauThueChuSoHuuYOY?: number;
    chiPhiDuPhongRuiRoTinDung?: number;
    chiPhiDuPhongRuiRoTinDungYOY?: number;
    doanhThuPhiBaoHiem?: number;
    doanhThuPhiBaoHiemYoy?: number;
    thuNhapLaiVaCacKhoanTuongTu?: number;
    thuNhapLaiVaCacKhoanTuongTuYoy?: number;
    quarter: number;
    year: number;
}

export const financialApi = {
    getReportChart: (symbol: string) => {
        return axiosClient.get<FinancialReportResponse>('/financial/report-chart', {
            params: { symbol }
        });
    }
};
