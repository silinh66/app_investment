import { useState, useMemo } from 'react';

export interface ChartData {
    categories: string[];
    series: {
        name: string;
        data: number[];
        color?: string;
        type?: string;
        stack?: string;
        yAxis?: number;
    }[];
    title?: string;
    type?: 'column' | 'line' | 'mixed' | 'stacked';
    unit?: string;
    unitLeft?: string;
    unitRight?: string;
    yAxisSuffixLeft?: string;
}

export const useFinancialCharts = (symbol: string, industry?: string) => {
    const [loading, setLoading] = useState(false);

    // Filter states
    const [assetChange, setAssetChange] = useState<'quarter' | 'year'>('quarter');
    const [capitalChange, setCapitalChange] = useState<'quarter' | 'year'>('quarter');
    const [cashFlowChange, setCashFlowChange] = useState<'quarter' | 'year'>('quarter');
    const [netRevenueChange, setNetRevenueChange] = useState<'quarter' | 'year'>('quarter');
    const [profitChange, setProfitChange] = useState<'quarter' | 'year'>('quarter');
    const [expenseChange, setExpenseChange] = useState<'quarter' | 'year'>('quarter');

    const categoriesSHB = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25'];
    const categoriesBVH = ['Q1\'21', 'Q2\'21', 'Q3\'21', 'Q4\'21', 'Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24'];
    const categoriesAssets = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

    // SSI Categories from Image: Q1'22 ... Q3'25 (15 quarters)
    const categoriesSSI = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25'];

    // BVH    // Categories for BVH (Q1'22 - Q3'25 - 15 quarters)
    const categoriesBVH_Profit = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25'];

    // Categories for TCB (Q1'22 - Q4'25 - 16 quarters)
    const categoriesTCB = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25', 'Q4\'25'];

    // 1. Revenue Chart (SHB - Thu nhập lãi) OR SSI Profit Structure
    const revenueChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            // "Thu nhập lãi và các khoản..." for TCB
            // Estimated Data from Image:
            // Columns (green): ~10-12T range, rising to 13T, dipping, then rising to ~16T
            // Line (growth): Starts high ~25%, dips to ~12%, rises to ~30%, drops to -5%, flat/low 0-5% at end
            return {
                categories: categoriesTCB,
                title: 'Thu nhập lãi và các khoản phải thu tương tự',
                type: 'mixed' as const,
                unit: '(Nghìn tỷ)',
                unitLeft: '', // No Unit text
                yAxisSuffixLeft: 'T', // 24T, 16T...
                unitRight: '%',
                series: [
                    {
                        name: 'Thu nhập lãi và các khoản...',
                        data: [10.5, 10.2, 11.0, 11.8, 12.5, 12.8, 13.5, 13.5, 14.2, 14.2, 14.8, 14.8, 14.6, 15.5, 16.0, 17.5], // Green Column growing to ~17.5T (near 24T mark? No 24T is top axis)
                        color: '#00E676', // Green
                        type: 'column'
                    },
                    {
                        name: 'Tăng trưởng cùng kỳ',
                        data: [28, 14, 16, 22, 29, 28, 32, 28, 15, 6, 9, 3, 3, 0, 0, 0], // Green Line
                        color: '#a6c852', // Light Green
                        type: 'line'
                    }
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Cơ cấu lợi nhuận" for SSI (Image 1) - Mapped to first slot
            return {
                categories: categoriesSSI,
                title: 'Cơ cấu lợi nhuận',
                type: 'stacked' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Lãi từ các tài sản t...', // Pink
                        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                        color: '#FF4081',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản cho vay...', // Beige/Peach
                        data: [0.5, 0.4, 0.3, 0.3, 0.4, 0.5, 0.5, 0.5, 0.5, 0.4, 0.5, 0.4, 0.8, 0.8, 0.9],
                        color: '#ec8751',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản c...', // Green
                        data: [0.6, 0.5, 0.4, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.4, 0.5, 0.8, 1.0, 1.1, 1.2],
                        color: '#a6c852',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản đ...', // Blue
                        data: [0.2, 0.2, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2],
                        color: '#2865C4',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các tài chính ...', // Gold/Brown
                        data: [0.6, 0.4, 0.5, 0.6, 0.6, 0.5, 0.8, 0.9, 0.8, 0.9, 1.0, 1.2, 2.0, 2.1, 2.2],
                        color: '#f6c554',
                        stack: 'total'
                    },
                ]
            };
        } else if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            // "Doanh thu phí bảo hiểm" for BVH
            return {
                categories: categoriesBVH_Profit, // Reuse same categories
                title: 'Doanh thu phí bảo hiểm',
                type: 'mixed' as const,
                unitLeft: '(Nghìn tỷ)',
                unitRight: '%',
                series: [
                    {
                        name: 'Doanh thu phí bảo hiểm',
                        data: [9.5, 10.5, 10.2, 11.0, 10.0, 10.2, 10.0, 10.8, 9.8, 10.3, 10.0, 10.3, 11.2, 10.1, 11.0], // Approx 10T
                        color: '#A6C852', // Green
                        type: 'column'
                    },
                    {
                        name: 'Tăng trưởng cùng kỳ',
                        data: [6, 4, 11, 5, 5, -3, -3, 1, 0.5, 3, 2, 1, 1, 1, 1], // Approx %
                        color: '#a6c852', // Light Green line
                        type: 'line'
                    }
                ]
            };
        }



        // Default for Other Sectors (Manufacturing, Real Estate, etc.)
        // "Doanh thu thuần"
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Doanh thu thuần',
            type: 'mixed' as const,
            unit: '(Nghìn tỷ)',
            unitLeft: '', // No Unit text
            yAxisSuffixLeft: 'T', // 60T max
            unitRight: '%',
            series: [
                {
                    name: 'Doanh thu thuần',
                    data: [0.045, 0.038, 0.035, 0.026, 0.028, 0.030, 0.029, 0.035, 0.032, 0.040, 0.035, 0.038, 0.036, 0.037], // Green Columns
                    color: '#00E676', // Green
                    type: 'column'
                },
                {
                    name: 'Doanh thu thuần (YoY)',
                    data: [50, 40, 20, 5, 8, 28, 30, 70, 50, 60, 20, 40, 10, 25], // Light Green Line
                    color: '#a6c852', // Light Green
                    type: 'line'
                }
            ]
        };
    }, [netRevenueChange, symbol, industry]);

    // 2. Profit Chart (SHB - Lợi nhuận sau thuế) OR SSI Revenue Structure OR BVH Profit
    const profitChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            // "Lợi nhuận sau thuế" for TCB
            // Estimated Data from Image:
            // Columns (green): ~5.5, 5.8, 5.3, 3.5, 4.5, 4.5, 4.7, 4.5, 6.2, 6.1, 5.8, 3.4, 3.4, 6.0, 6.3, 6.5
            // Line (growth): ~25, 24, 23, -20, -15, -12, 40, 42, 43, 40, 30, -25, 0, 0, 0, 0
            return {
                categories: categoriesTCB, // Reuse TCB categories
                title: 'Lợi nhuận sau thuế',
                type: 'mixed' as const,
                unit: '(Nghìn tỷ)',
                unitLeft: '', // No Unit text
                yAxisSuffixLeft: 'T', // 7.5T, 5T...
                unitRight: '%',
                series: [
                    {
                        name: 'Lợi nhuận sau thuế',
                        data: [5.5, 5.8, 5.3, 3.5, 4.5, 4.5, 4.7, 4.5, 6.2, 6.1, 5.8, 3.4, 3.4, 6.0, 6.3, 6.5],
                        color: '#A6C852', // Green
                        type: 'column'
                    },
                    {
                        name: 'Lợi nhuận sau thuế (YoY)',
                        data: [25, 24, 23, -20, -15, -12, 5, 28, 40, 42, 40, 4, 3, 0, 0, 0], // Green Line
                        color: '#a6c852', // Light Green
                        type: 'line'
                    }
                ]
            };
        }

        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            // "Lợi nhuận sau thuế của doanh nghiệp" for BVH
            return {
                categories: categoriesBVH_Profit,
                title: 'Lợi nhuận sau thuế của doanh nghiệp',
                type: 'mixed' as const,
                unitLeft: '(Nghìn tỷ)',
                unitRight: '%',
                series: [
                    {
                        name: 'Lợi nhuận sau thuế thu nhập',
                        data: [0.48, 0.33, 0.38, 0.32, 0.54, 0.40, 0.43, 0.35, 0.58, 0.42, 0.53, 0.66, 0.65, 0.74, 0.76],
                        color: '#A6C852', // Green
                        type: 'column'
                    },
                    {
                        name: 'Tăng trưởng cùng kỳ',
                        data: [0, -20, -15, -35, 18, 20, 10, 8, 9, 15, 25, 0, 0, 0, 0], // Estimated %
                        color: '#a6c852', // Light Green line
                        type: 'line'
                    }
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Cơ cấu doanh thu" for SSI (Image 2) - Mapped to second slot
            return {
                categories: categoriesSSI,
                title: 'Cơ cấu doanh thu',
                type: 'stacked' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Doanh thu hoạt đ...', // Blue
                        data: [0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        color: '#2865C4',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi/lỗ từ công ty li...', // Green
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        color: '#A6C852',
                        stack: 'total'
                    },
                    {
                        name: 'Doanh thu hoạt đ...', // Gold
                        data: [2.0, 1.6, 1.4, 1.4, 1.5, 1.7, 2.0, 2.1, 2.0, 2.3, 2.2, 3.0, 4.2, 4.5, 4.8],
                        color: '#F6C554',
                        stack: 'total'
                    },
                ]
            };
        }



        // Default for Other Sectors
        // "Lợi nhuận sau thuế"
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Lợi nhuận sau thuế',
            type: 'mixed' as const,
            unit: '(Nghìn tỷ)',
            unitLeft: '', // No Unit text
            yAxisSuffixLeft: 'T', // 10T max
            unitRight: '%',
            series: [
                {
                    name: 'Lợi nhuận sau thuế',
                    data: [0.008, 0.004, -0.002, -0.002, 0.0005, 0.0015, 0.002, 0.003, 0.0028, 0.003, 0.0027, 0.0032, 0.0042, 0.004], // Green Columns (Est from image)
                    color: '#00E676', // Green
                    type: 'column'
                },
                {
                    name: 'Lợi nhuận sau thuế (YoY)',
                    data: [0, -40, -80, -90, -70, -50, -100, -150, 700, 100, 20, 30, 40, 50], // Light Green Line (Est spike)
                    color: '#a6c852', // Light Green
                    type: 'line'
                }
            ]
        };
    }, [profitChange, symbol, industry]);

    // 3. Expense Chart (SHB - Chi phí dự phòng)
    const expenseChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            // "Chi phí dự phòng rủi ro tín dụng" for TCB
            // Data estimated from image (Negative values)
            // Range 0 to -2T
            return {
                categories: categoriesTCB,
                title: 'Chi phí dự phòng rủi ro tín dụng',
                type: 'column' as const, // Simple column chart
                unit: '(Nghìn tỷ)',
                unitLeft: '',
                yAxisSuffixLeft: 'T',
                series: [
                    {
                        name: 'Chi phí dự phòng rủi ro tín dụng',
                        data: [-0.2, -0.4, -0.6, -0.7, -0.3, -0.8, -0.9, -1.8, -1.2, -1.3, -1.1, -0.1, -0.1, -1.1, -1.0, -1.5], // Green Column
                        color: '#A6C852', // Green
                    }
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Chi phí hoạt động" for SSI (Image 3)
            return {
                categories: categoriesSSI,
                title: 'Chi phí hoạt động',
                type: 'stacked' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Chi phí hoạt động ...', // Gold (Bottom/Largest negative)
                        data: [-1.2, -1.1, -1.0, -1.2, -0.9, -1.0, -1.1, -1.5, -1.1, -1.3, -1.1, -1.8, -2.4, -2.5, -2.6],
                        color: '#F6C554',
                        stack: 'total'
                    },
                    {
                        name: 'Chi phí quản lý côn...', // Cyan (Middle)
                        data: [-0.2, -0.2, -0.2, -0.2, -0.2, -0.2, -0.2, -0.3, -0.2, -0.2, -0.2, -0.5, -0.6, -0.6, -0.7],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                    {
                        name: 'Chi phí tài chính', // Blue (Top/Smallest negative)
                        data: [-0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1],
                        color: '#2865C4',
                        stack: 'total'
                    },
                ]
            };
        }



        // Default for Other Sectors
        // "Biên lãi"
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Biên lãi',
            type: 'line' as const,
            unit: '%', // Shows % on axis
            series: [
                {
                    name: 'Biên lãi gộp',
                    data: [20, 15, 18, 5, 10, 25, 30, 15, 20, 10, 8, 12, 12, 13], // Green
                    color: '#00E676',
                },
                {
                    name: 'Biên lãi EBITDA',
                    data: [18, 12, 15, 4, 8, 22, 28, 12, 18, 8, 5, 10, 10, 11], // Gold
                    color: '#C99C33',
                },
                {
                    name: 'Biên lãi sau thuế',
                    data: [10, 8, 5, -5, -2, 15, 20, 8, 10, 0, -2, 4, 3, 5], // Cyan
                    color: '#00E5FF',
                }
            ]
        };
    }, [expenseChange, symbol, industry]);

    // 4. Cash Flow Chart (BVH - Lưu chuyển tiền tệ)
    const cashFlowChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            return {
                categories: categoriesTCB,
                title: 'Lưu chuyển tiền tệ',
                type: 'mixed' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Hoạt động đầu tư', // Cyan
                        data: [5.0, 4.0, 5.5, 2.5, 4.0, 6.5, 2.2, 6.5, -1.0, 4.0, 12.0, -3.0, -3.0, 4.8, 5.0, 6.0],
                        color: '#00E5FF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động kinh doanh', // Purple
                        data: [-1.0, -4.5, -6.0, -2.0, -4.5, -7.5, -2.0, -6.0, 3.0, -4.0, -12.5, 2.2, 2.2, -3.0, -4.0, -5.0],
                        color: '#651FFF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động tài chính', // Green
                        data: [2.0, 2.0, -0.5, -2.0, 0.5, -1.0, 0.5, 0.5, -3.5, 0.5, -0.5, -3.5, -3.5, -5.5, -2.0, -1.0],
                        color: '#A6C852',
                        type: 'column'
                    },
                    {
                        name: 'Tiền và tương đương cuối kì', // Orange Line
                        data: [5.0, 4.0, 3.0, 8.0, 6.0, 5.0, 8.0, 12.0, 5.0, 6.0, 8.0, 5.0, 6.0, 2.0, 1.5, 2.5],
                        color: '#FF6D00',
                        type: 'line'
                    }
                ]
            };
        }

        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            return {
                categories: categoriesBVH_Profit,
                title: 'Lưu chuyển tiền tệ',
                type: 'mixed' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Hoạt động đầu tư', // Cyan
                        data: [5.0, 4.0, 5.5, 2.5, 4.0, 6.5, 2.2, 6.5, -1.0, 4.0, 12.0, -3.0, -3.0, 4.8, 5.0],
                        color: '#00E5FF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động kinh doanh', // Purple
                        data: [-1.0, -4.5, -6.0, -2.0, -4.5, -7.5, -2.0, -6.0, 3.0, -4.0, -12.5, 2.2, 2.2, -3.0, -4.0],
                        color: '#651FFF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động tài chính', // Green
                        data: [2.0, 2.0, -0.5, -2.0, 0.5, -1.0, 0.5, 0.5, -3.5, 0.5, -0.5, -3.5, -3.5, -5.5, -2.0],
                        color: '#A6C852',
                        type: 'column'
                    },
                    {
                        name: 'Tiền và tương đương cuối kì', // Orange Line
                        data: [5.0, 4.0, 3.0, 8.0, 6.0, 5.0, 8.0, 12.0, 5.0, 6.0, 8.0, 5.0, 6.0, 2.0, 1.5],
                        color: '#FF6D00',
                        type: 'line'
                    }
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Lưu chuyển tiền tệ" for SSI (Image 4)
            // Categories: Q1'21 to Q3'25 (19 quarters)
            const categoriesSSI_CashFlow = [
                'Q1\'21', 'Q2\'21', 'Q3\'21', 'Q4\'21',
                'Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22',
                'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23',
                'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24',
                'Q1\'25', 'Q2\'25', 'Q3\'25'
            ];

            return {
                categories: categoriesSSI_CashFlow,
                title: 'Lưu chuyển tiền tệ',
                type: 'mixed' as const,
                series: [
                    {
                        name: 'Hoạt động đầu tư', // Cyan
                        data: [0.5, 4.0, 5.5, 2.5, 4.0, 6.5, 2.2, 6.5, -1.0, 4.0, 12.0, -3.0, -3.0, 4.8, 4.8, 6.8, 5.0, 4.5, 6.0],
                        color: '#00E5FF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động kinh doanh', // Purple (Deep Blue/Purple)
                        data: [-1.0, -4.5, -6.0, -2.0, -4.5, -7.5, -2.0, -6.0, 3.0, -4.0, -12.5, 2.2, 2.2, -3.0, -3.0, -7.0, -5.0, -4.0, -6.5],
                        color: '#651FFF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động tài chính', // Green
                        data: [0.2, 0.2, -0.5, -2.0, 0.5, -1.0, 0.5, 0.5, -3.5, 0.5, -0.5, -3.5, -3.5, -5.5, -5.5, -0.5, -1.0, -2.0, -1.5],
                        color: '#A6C852',
                        type: 'column'
                    },
                    {
                        name: 'Tiền và tương đương cuối kì', // Orange Line
                        data: [0.5, 0.4, 0.3, 0.8, 0.6, 0.5, 0.8, 1.2, 0.5, 0.6, 0.8, 0.5, 0.6, 2.0, 2.0, 0.8, 1.0, 1.2, 1.5],
                        color: '#FF6D00',
                        type: 'line'
                    }
                ]
            };
        }

        // Default for Other Sectors
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Lưu chuyển tiền tệ',
            type: 'mixed' as const,
            unit: '(Nghìn tỷ)',
            series: [
                {
                    name: 'Hoạt động đầu tư', // Cyan
                    data: [1.0, 2.0, 3.0, 1.5, 2.0, 3.0, 1.0, 3.0, -0.5, 2.0, 6.0, -1.5, -1.5, 2.4],
                    color: '#00E5FF',
                    type: 'column'
                },
                {
                    name: 'Hoạt động kinh doanh', // Purple
                    data: [-0.5, -2.0, -3.0, -1.0, -2.0, -3.5, -1.0, -3.0, 1.5, -2.0, -6.0, 1.1, 1.1, -1.5],
                    color: '#651FFF',
                    type: 'column'
                },
                {
                    name: 'Hoạt động tài chính', // Green
                    data: [0.1, 0.1, -0.25, -1.0, 0.25, -0.5, 0.25, 0.25, -1.7, 0.25, -0.25, -1.7, -1.7, -2.7],
                    color: '#A6C852',
                    type: 'column'
                },
                {
                    name: 'Tiền và tương đương cuối kì', // Orange Line
                    data: [0.25, 0.2, 0.15, 0.4, 0.3, 0.25, 0.4, 0.6, 0.25, 0.3, 0.4, 0.25, 0.3, 1.0],
                    color: '#FF6D00',
                    type: 'line'
                }
            ]
        };
    }, [cashFlowChange, symbol, industry]);

    // 5. Asset Chart (BVH - Đầu tư tài chính) OR SSI Asset Structure
    const assetChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            return {
                categories: categoriesTCB,
                title: 'Cơ cấu tài sản',
                type: 'stacked' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Cho vay khách hàng', // Green (Main Asset for Bank)
                        data: [350, 360, 380, 400, 420, 430, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620],
                        color: '#A6C852',
                        stack: 'total'
                    },
                    {
                        name: 'Đầu tư chứng khoán', // Yellow
                        data: [80, 90, 100, 120, 140, 130, 140, 120, 100, 110, 120, 140, 150, 160, 170, 180],
                        color: '#F6C554',
                        stack: 'total'
                    },
                    {
                        name: 'Tài sản khác', // Blue
                        data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
                        color: '#2865C4',
                        stack: 'total'
                    },
                ]
            };
        }

        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            // "Đầu tư tài chính" for BVH
            return {
                categories: categoriesBVH_Profit, // Reuse Q1'22 - Q3'25
                title: 'Đầu tư tài chính',
                type: 'mixed' as const,
                unit: '(Nghìn tỷ)', // Explicitly empty to override default (Tỷ)
                unitLeft: '', // No Unit on Top Left as per image
                yAxisSuffixLeft: 'T', // Axis labels: 150T, 100T...
                unitRight: '%',
                series: [
                    {
                        name: 'Đầu tư tài chính ngắn hạn',
                        // Estimated data: ~80-120 range
                        data: [85, 110, 100, 102, 115, 108, 90, 100, 99, 95, 93, 112, 116, 118, 115], // Green Column
                        color: '#A6C852', // Green
                        type: 'column'
                    },
                    {
                        name: 'Tăng trưởng cùng kỳ',
                        // Estimated curve: Start 10%, Peak 45%, Dip -15%, End 25%
                        data: [10, 45, 40, 25, 35, 0, -10, -5, -15, -12, 0, 12, 15, 16, 17], // Blue Line
                        color: '#2865C4', // Blue line
                        type: 'line'
                    }
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Tài sản" for SSI (Image 5)
            return {
                categories: categoriesSSI,
                title: 'Tài sản',
                type: 'stacked' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Tiền và tương đương...', // Beige (Bottom)
                        data: [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
                        color: '#ec8751',
                        stack: 'total'
                    },
                    {
                        name: 'Các khoản cho vay...', // Pink (Lower Middle)
                        data: [4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 5.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0],
                        color: '#FF4081',
                        stack: 'total'
                    },
                    {
                        name: 'Tài sản tài chính...', // Blue (Dominant Middle)
                        data: [45.0, 40.0, 42.0, 46.0, 48.0, 45.0, 50.0, 65.0, 62.0, 66.0, 60.0, 78.0, 94.0, 96.0, 98.0],
                        color: '#2865C4',
                        stack: 'total'
                    },
                    {
                        name: 'Tài sản khác', // Green (Top)
                        data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
                        color: '#A6C852',
                        stack: 'total'
                    },
                ]
            };
        }

        // Default for Other Sectors
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Cơ cấu tài sản',
            type: 'stacked' as const,
            unit: '(Nghìn tỷ)', // Updated unit
            series: [
                {
                    name: 'Tiền và tương đương...', // Beige (Bottom)
                    data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
                    color: '#ec8751',
                    stack: 'total'
                },
                {
                    name: 'Các khoản cho vay...', // Pink (Lower Middle)
                    data: [2.0, 2.0, 1.5, 1.5, 1.5, 1.5, 1.5, 2.0, 2.5, 2.0, 1.5, 1.5, 1.0, 1.0],
                    color: '#FF4081',
                    stack: 'total'
                },
                {
                    name: 'Tài sản tài chính...', // Blue (Dominant Middle)
                    data: [20.0, 18.0, 19.0, 21.0, 22.0, 21.0, 23.0, 30.0, 29.0, 31.0, 28.0, 36.0, 43.0, 44.0],
                    color: '#2865C4',
                    stack: 'total'
                },
                {
                    name: 'Tài sản khác', // Green (Top)
                    data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                    color: '#A6C852',
                    stack: 'total'
                },
            ]
        };
    }, [assetChange, symbol, industry]);

    // 6. Capital Chart (Nguồn vốn)
    const capitalChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            return {
                categories: categoriesTCB,
                title: 'Nguồn vốn',
                type: 'stacked' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Vốn chủ sở hữu', // Blue
                        data: [90.0, 95.0, 100.0, 105.0, 110.0, 115.0, 120.0, 125.0, 130.0, 135.0, 140.0, 145.0, 150.0, 155.0, 160.0, 165.0],
                        color: '#2865C4',
                        stack: 'total'
                    },
                    {
                        name: 'Tiền gửi khách hàng', // Gold (Main Liability)
                        data: [300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0, 370.0, 380.0, 390.0, 400.0, 410.0, 420.0, 430.0, 440.0, 450.0],
                        color: '#F6C554',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ khác', // Cyan
                        data: [50.0, 55.0, 60.0, 65.0, 70.0, 75.0, 80.0, 85.0, 90.0, 95.0, 100.0, 105.0, 110.0, 115.0, 120.0, 125.0],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                ]
            };
        }

        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            return {
                categories: categoriesBVH_Profit,
                title: 'Nguồn vốn',
                type: 'stacked' as const,
                unit: '(Nghìn tỷ)',
                series: [
                    {
                        name: 'Vốn và các quỹ', // Blue
                        data: [15.0, 15.5, 16.0, 16.5, 17.0, 17.5, 18.0, 18.5, 19.0, 19.5, 20.0, 20.0, 20.0, 20.5, 21.0],
                        color: '#2865C4',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ dài hạn', // Cyan
                        data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ ngắn hạn', // Gold
                        data: [140.0, 145.0, 150.0, 160.0, 170.0, 175.0, 180.0, 190.0, 200.0, 210.0, 215.0, 220.0, 225.0, 230.0, 235.0],
                        color: '#F6C554',
                        stack: 'total'
                    },
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Nguồn vốn" for SSI (Image 6)
            return {
                categories: categoriesSSI,
                title: 'Nguồn vốn',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Vốn và các q...', // Blue (Bottom)
                        data: [15.0, 14.0, 22.0, 22.0, 23.0, 21.0, 22.0, 23.0, 24.0, 25.0, 27.0, 29.0, 31.0, 32.0, 33.0],
                        color: '#2865C4',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ dài hạn', // Cyan (Middle - tiny)
                        data: [0, 0, 0, 0, 0, 1.0, 0, 0, 0, 1.0, 0, 0, 0, 0, 0],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ ngắn hạn', // Gold (Top)
                        data: [35.0, 30.0, 24.0, 30.0, 29.0, 28.0, 33.0, 45.0, 40.0, 45.0, 48.0, 62.0, 69.0, 70.0, 72.0],
                        color: '#F6C554',
                        stack: 'total'
                    },
                ]
            };
        }

        // Default for Other Sectors
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Nguồn vốn',
            type: 'stacked' as const,
            unit: '(Nghìn tỷ)',
            series: [
                {
                    name: 'Vốn và các q...', // Blue (Bottom)
                    data: [7.0, 6.5, 10.0, 10.0, 10.5, 9.5, 10.0, 10.5, 11.0, 11.5, 12.5, 13.5, 14.5, 15.0],
                    color: '#448AFF',
                    stack: 'total'
                },
                {
                    name: 'Nợ dài hạn', // Cyan (Middle - tiny)
                    data: [0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0.5, 0, 0, 0, 0],
                    color: '#00E5FF',
                    stack: 'total'
                },
                {
                    name: 'Nợ ngắn hạn', // Gold (Top)
                    data: [16.0, 14.0, 11.0, 14.0, 13.5, 13.0, 15.5, 21.0, 19.0, 21.0, 22.5, 29.0, 32.0, 33.0],
                    color: '#C99C33',
                    stack: 'total'
                },
            ]
        };
    }, [capitalChange, symbol, industry]);

    // 7. Debt Ratio Chart (Hệ số nợ)
    const debtRatioChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            return {
                categories: categoriesTCB,
                title: 'Hệ số nợ',
                type: 'line' as const,
                series: [
                    {
                        name: 'Nợ/Vốn chủ sở hữu',
                        data: [5.2, 5.3, 5.2, 5.1, 5.0, 5.2, 5.3, 5.4, 5.3, 5.2, 5.1, 5.0, 5.1, 5.2, 5.3, 5.4],
                        color: '#00E5FF',
                    },
                ]
            };
        }

        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            return {
                categories: categoriesBVH_Profit,
                title: 'Hệ số nợ',
                type: 'line' as const,
                series: [
                    {
                        name: 'Nợ/Vốn chủ sở hữu',
                        data: [1.2, 1.3, 1.2, 1.1, 1.0, 1.2, 1.3, 1.4, 1.3, 1.2, 1.1, 1.0, 1.1, 1.2, 1.3],
                        color: '#00E5FF',
                    },
                    {
                        name: 'Vay tài chính/Vốn chủ sở hữu',
                        data: [0.5, 0.6, 0.5, 0.4, 0.3, 0.5, 0.6, 0.7, 0.6, 0.5, 0.4, 0.3, 0.4, 0.5, 0.6],
                        color: '#F6C554',
                    },
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Hệ số nợ" for SSI (Image 7)
            // Wave pattern: High -> Low -> Mid -> Low -> High
            const wavePattern = [2.3, 1.8, 1.0, 1.3, 1.2, 1.5, 2.2, 1.8, 1.0, 1.2, 1.1, 1.4, 2.2, 1.8, 1.0, 1.3, 1.2, 1.5, 2.2, 1.8, 1.0, 1.3, 1.2, 1.5, 2.2, 2.2];
            // Extend pattern for 2 more quarters (6 more points)
            const extendedWave = [...wavePattern, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6];

            // Generate categories for 32 points (26 + 6), mapping to Q1'22 - Q3'25
            const categoriesSSI_Debt = new Array(32).fill('');
            const quarters = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25'];

            quarters.forEach((q, index) => {
                const dataIndex = index * 3;
                if (dataIndex < 32) {
                    categoriesSSI_Debt[dataIndex] = q;
                }
            });

            return {
                categories: categoriesSSI_Debt,
                title: 'Hệ số nợ',
                type: 'line' as const,
                series: [
                    {
                        name: 'Nợ/Vốn chủ sở hữu', // Cyan
                        data: [2.4, 2.0, 1.0, 1.3, 1.2, 1.8, 2.4, 1.8, 1.0, 1.3, 1.2, 1.8, 2.4, 1.8, 1.0, 1.3, 1.2, 1.8, 2.4, 1.8, 1.0, 1.3, 1.2, 1.8, 2.2, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6],
                        color: '#00E5FF',
                    },
                    {
                        name: 'Vay tài chính/Vốn chủ sở hữu', // Gold/Brown
                        data: [2.2, 1.8, 0.9, 1.2, 1.1, 1.7, 2.2, 1.7, 0.9, 1.2, 1.1, 1.7, 2.2, 1.7, 0.9, 1.2, 1.1, 1.7, 2.2, 1.7, 0.9, 1.2, 1.1, 1.7, 2.1, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5],
                        color: '#F6C554',
                    },
                ]
            };
        }

        // Default for Other Sectors
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Hệ số nợ',
            type: 'line' as const,
            series: [
                {
                    name: 'Nợ/Vốn chủ sở hữu',
                    data: [1.2, 1.1, 1.3, 1.4, 1.3, 1.2, 1.1, 1.2, 1.3, 1.4, 1.3, 1.2, 1.1, 1.2],
                    color: '#00E5FF',
                }
            ]
        };
    }, [symbol, industry]);

    // 8. P/E Valuation Chart (Định giá P/E)
    const peValuationChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            return {
                categories: categoriesTCB,
                title: 'Định giá P/E',
                type: 'line' as const,
                series: [
                    {
                        name: 'P/E',
                        data: [8, 9, 10, 8, 7, 6, 8, 9, 10, 11, 10, 9, 8, 7, 8, 9],
                        color: '#FFA000',
                    }
                ]
            };
        }

        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            return {
                categories: categoriesBVH_Profit,
                title: 'Định giá P/E',
                type: 'line' as const,
                series: [
                    {
                        name: 'P/E',
                        data: [15, 14, 16, 18, 17, 16, 15, 14, 13, 14, 15, 16, 17, 18, 19],
                        color: '#FFA000',
                    }
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Định giá P/E" for SSI (Image 8)
            // Wave pattern: 4 Peaks. Range ~7 to ~29.
            const dataPoints = [
                7, 6.5, 10, 29, 28, 26, 24, 10, 7, // Wave 1
                7, 12, 29, 28, 25, 20, 16, 7, // Wave 2
                7, 14, 29, 28, 24, 19, 16, 22, 23, // Wave 3 & 4 start
                24, 25, 26, 27, 28, 29 // Extension
            ];

            // Re-using the categories from Debt Ratio (Q1'22 - Q3'25)
            const categoriesFull = new Array(32).fill('');
            const quarters = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25'];
            quarters.forEach((q, index) => {
                const dataIndex = index * 3;
                if (dataIndex < 32) {
                    categoriesFull[dataIndex] = q;
                }
            });

            return {
                categories: categoriesFull,
                title: 'Định giá P/E',
                type: 'line' as const,
                series: [
                    {
                        name: 'P/E',
                        data: dataPoints,
                        color: '#FFA000', // Gold/Orange
                    }
                ]
            };
        }

        // Default for Other Sectors
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Định giá P/E',
            type: 'line' as const,
            series: [
                {
                    name: 'P/E',
                    data: [12, 11, 13, 15, 14, 13, 12, 11, 12, 13, 14, 15, 16, 15],
                    color: '#FFA000',
                }
            ]
        };
    }, [symbol, industry]);

    // 9. P/B Valuation Chart (Định giá P/B)
    const pbValuationChartData = useMemo<ChartData | null>(() => {
        if (symbol === 'TCB' || industry === 'Ngân hàng') {
            return {
                categories: categoriesTCB,
                title: 'Định giá P/B',
                type: 'line' as const,
                series: [
                    { name: 'P/B', data: [1.2, 1.3, 1.4, 1.2, 1.1, 1.0, 1.2, 1.3, 1.4, 1.5, 1.4, 1.3, 1.2, 1.1, 1.2, 1.3], color: '#FFA000' }
                ]
            };
        }

        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            return {
                categories: categoriesBVH_Profit,
                title: 'Định giá P/B',
                type: 'line' as const,
                series: [
                    { name: 'P/B', data: [1.5, 1.4, 1.6, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9], color: '#FFA000' }
                ]
            };
        }

        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Định giá P/B" for SSI (Image 9)
            // Pattern: Start ~1.5 -> Drop ~0.6 -> Flat -> Rise -> Spike ~3.5 -> Drop
            const pbData = [
                1.5, 0.6, 0.6, 0.6, 1.2, 1.2, 1.3, 1.5, 1.4, 1.5,
                0.6, 0.6, 0.6, 1.2, 1.2, 1.3, 1.3, 1.2, 1.9, 1.0,
                0.9, 1.0, 1.5, 3.4, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2
            ];

            // Match categories length
            const categoriesPB = new Array(pbData.length).fill('');
            const quarters = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25'];
            quarters.forEach((q, index) => {
                const dataIndex = index * 3;
                if (dataIndex < pbData.length) {
                    categoriesPB[dataIndex] = q;
                }
            });

            return {
                categories: categoriesPB,
                title: 'Định giá P/B',
                type: 'line' as const,
                series: [{ name: 'P/B', data: pbData, color: '#FFA000' }]
            };
        }

        // Default for Other Sectors
        const categoriesOther = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'];

        return {
            categories: categoriesOther,
            title: 'Định giá P/B',
            type: 'line' as const,
            series: [{ name: 'P/B', data: [1.5, 1.4, 1.6, 1.5, 1.4, 1.5, 1.6, 1.5, 1.4, 1.3, 1.4, 1.5, 1.6, 1.5], color: '#FFA000' }]
        };
    }, [symbol, industry]);



    return {
        loading,
        superSector: 'Mock',
        assetChartData,
        cashFlowChartData,
        revenueChartData,
        profitChartData,
        expenseChartData,
        capitalChartData,
        debtRatioChartData,
        peValuationChartData,
        pbValuationChartData,
        setAssetChange,
        assetChange,
        setCapitalChange,
        capitalChange,
        setCashFlowChange,
        cashFlowChange,
        setNetRevenueChange,
        netRevenueChange,
        setProfitChange,
        profitChange,
        setExpenseChange,
        expenseChange
    };
};
