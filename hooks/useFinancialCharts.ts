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
}

export const useFinancialCharts = (symbol: string) => {
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

    // 1. Revenue Chart (SHB - Thu nhập lãi) OR SSI Profit Structure
    const revenueChartData = useMemo(() => {
        if (symbol === 'SSI') {
            // "Cơ cấu lợi nhuận" for SSI (Image 1) - Mapped to first slot
            return {
                categories: categoriesSSI,
                title: 'Cơ cấu lợi nhuận',
                type: 'stacked' as const,
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
                        color: '#FFCC80',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản c...', // Green
                        data: [0.6, 0.5, 0.4, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.4, 0.5, 0.8, 1.0, 1.1, 1.2],
                        color: '#00E676',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản đ...', // Blue
                        data: [0.2, 0.2, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các tài chính ...', // Gold/Brown
                        data: [0.6, 0.4, 0.5, 0.6, 0.6, 0.5, 0.8, 0.9, 0.8, 0.9, 1.0, 1.2, 2.0, 2.1, 2.2],
                        color: '#C99C33',
                        stack: 'total'
                    },
                ]
            };
        }

        // Default SHB
        return {
            categories: categoriesSHB,
            title: 'Thu nhập lãi và các khoản thu nhập tương tự',
            type: 'mixed' as const,
            series: [
                {
                    name: 'Thu nhập lãi và các khoản...',
                    data: [9, 10, 11, 12, 18, 13, 14, 15, 12, 10, 14, 11, 15],
                    color: '#00E676',
                    type: 'column'
                },
                {
                    name: 'Tăng trưởng cùng kỳ',
                    data: [10, 8, 9, 8, 9, 16, 12, 11, 12, 5, 4, 8, 15],
                    color: '#76FF03',
                    type: 'line'
                }
            ]
        };
    }, [netRevenueChange, symbol]);

    // 2. Profit Chart (SHB - Lợi nhuận sau thuế) OR SSI Revenue Structure
    const profitChartData = useMemo(() => {
        if (symbol === 'SSI') {
            // "Cơ cấu doanh thu" for SSI (Image 2) - Mapped to second slot
            return {
                categories: categoriesSSI,
                title: 'Cơ cấu doanh thu',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Doanh thu hoạt đ...', // Blue
                        data: [0, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi/lỗ từ công ty li...', // Green
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        color: '#00E676',
                        stack: 'total'
                    },
                    {
                        name: 'Doanh thu hoạt đ...', // Gold
                        data: [2.0, 1.6, 1.4, 1.4, 1.5, 1.7, 2.0, 2.1, 2.0, 2.3, 2.2, 3.0, 4.2, 4.5, 4.8],
                        color: '#C99C33',
                        stack: 'total'
                    },
                ]
            };
        }

        return {
            categories: categoriesSHB,
            title: 'Lợi nhuận sau thuế',
            type: 'mixed' as const,
            series: [
                {
                    name: 'Lợi nhuận sau thuế',
                    data: [2.5, 2.0, 2.2, 0.5, 2.8, 1.8, 2.0, 0.6, 3.2, 2.2, 1.5, 3.5, 2.8],
                    color: '#2979FF',
                    type: 'column'
                },
                {
                    name: 'Lợi nhuận sau thuế (YoY)',
                    data: [2.0, 1.9, 2.0, 0.8, 1.2, 1.0, 1.2, 1.5, 1.5, 1.5, 0.8, 3.0, 1.8],
                    color: '#76FF03',
                    type: 'line'
                }
            ]
        };
    }, [profitChange, symbol]);

    // 3. Expense Chart (SHB - Chi phí dự phòng)
    const expenseChartData = useMemo(() => {
        if (symbol === 'SSI') {
            // "Chi phí hoạt động" for SSI (Image 3)
            return {
                categories: categoriesSSI,
                title: 'Chi phí hoạt động',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Chi phí hoạt động ...', // Gold (Bottom/Largest negative)
                        data: [-1.2, -1.1, -1.0, -1.2, -0.9, -1.0, -1.1, -1.5, -1.1, -1.3, -1.1, -1.8, -2.4, -2.5, -2.6],
                        color: '#C99C33',
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
                        color: '#448AFF',
                        stack: 'total'
                    },
                ]
            };
        }

        // Default SHB
        return {
            categories: categoriesSHB,
            title: 'Chi phí dự phòng rủi ro tín dụng',
            type: 'column' as const,
            series: [
                {
                    name: 'Chi phí dự phòng',
                    data: [-0.5, -1.2, -0.8, -3.0, -1.5, -1.2, -0.8, -4.0, -0.5, -0.5, -0.8, -4.5, -1.5],
                    color: '#FFAB00',
                    type: 'column'
                }
            ]
        };
    }, [expenseChange, symbol]);

    // 4. Cash Flow Chart (BVH - Lưu chuyển tiền tệ)
    const cashFlowChartData = useMemo(() => {
        if (symbol === 'SSI') {
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
                        color: '#00E676',
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

        return {
            categories: categoriesBVH,
            title: 'Lưu chuyển tiền tệ',
            type: 'mixed' as const,
            series: [
                {
                    name: 'Hoạt động đầu tư',
                    data: [2, 1, 3, -5, 2, -8, 2, -3, 1, 2, -2, 1, -1, 3, 2],
                    color: '#29B6F6',
                    type: 'column',
                    stack: 'flow'
                },
                {
                    name: 'Hoạt động kinh doanh',
                    data: [-1, 2, -1, 1, -2, 3, -2, 2, -1, 1, -1, 2, -4, 1, -1],
                    color: '#651FFF',
                    type: 'column',
                    stack: 'flow'
                },
                {
                    name: 'Hoạt động tài chính',
                    data: [1, -1, 2, 3, -1, 2, -3, 1, 2, -1, 2, -1, 1, 2, -1],
                    color: '#00E676',
                    type: 'column',
                    stack: 'flow'
                },
                {
                    name: 'Tiền và tương đương cuối kì',
                    data: [3, 4, 5, 8, 5, 4, 3, 3, 6, 5, 6, 7, 5, 8, 10],
                    color: '#FF6D00',
                    type: 'line'
                }
            ]
        };
    }, [cashFlowChange, symbol]);

    // 5. Asset Chart (BVH - Cơ cấu tài sản)
    const assetChartData = useMemo(() => {
        if (symbol === 'SSI') {
            // "Tài sản" for SSI (Image 5)
            return {
                categories: categoriesSSI,
                title: 'Tài sản',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Tiền và tương đương...', // Beige (Bottom)
                        data: [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
                        color: '#FFCC80',
                        stack: 'total'
                    },
                    {
                        name: 'Các khoản cho vay...', // Pink (Lower Middle)
                        data: [4, 4, 3, 3, 3, 3, 3, 4, 5, 4, 3, 3, 2, 2, 2],
                        color: '#FF4081',
                        stack: 'total'
                    },
                    {
                        name: 'Tài sản tài chính...', // Blue (Dominant Middle)
                        data: [45, 40, 42, 46, 48, 45, 50, 65, 62, 66, 60, 78, 94, 96, 98],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Tài sản khác', // Green (Top)
                        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        color: '#00E676',
                        stack: 'total'
                    },
                ]
            };
        }

        return {
            categories: categoriesAssets,
            title: 'Cơ cấu tài sản',
            type: 'stacked' as const,
            series: [
                { name: "Tiền và tương đương tiền", data: [80, 70, 85, 80, 90, 95, 100, 110, 120, 125, 130, 135, 140, 145], color: "#FFAB00", stack: 'total' },
                { name: "Đầu tư ngắn hạn", data: [60, 65, 60, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120], color: "#F50057", stack: 'total' },
                { name: "Các khoản phải thu", data: [20, 25, 20, 25, 30, 35, 30, 35, 40, 45, 40, 45, 50, 55], color: "#00E676", stack: 'total' },
                { name: "Hàng tồn kho", data: [10, 15, 10, 15, 20, 15, 20, 15, 20, 15, 20, 15, 20, 15], color: "#00B0FF", stack: 'total' },
            ]
        };
    }, [assetChange, symbol]);

    // 6. Capital Chart (Nguồn vốn)
    const capitalChartData = useMemo(() => {
        if (symbol === 'SSI') {
            // "Nguồn vốn" for SSI (Image 6)
            return {
                categories: categoriesSSI,
                title: 'Nguồn vốn',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Vốn và các q...', // Blue (Bottom)
                        data: [15, 14, 22, 22, 23, 21, 22, 23, 24, 25, 27, 29, 31, 32, 33],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ dài hạn', // Cyan (Middle - tiny)
                        data: [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ ngắn hạn', // Gold (Top)
                        data: [35, 30, 24, 30, 29, 28, 33, 45, 40, 45, 48, 62, 69, 70, 72],
                        color: '#C99C33',
                        stack: 'total'
                    },
                ]
            };
        }
        return null;
    }, [capitalChange, symbol]);

    // 7. Debt Ratio Chart (Hệ số nợ)
    const debtRatioChartData = useMemo(() => {
        if (symbol === 'SSI') {
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
                        color: '#C99C33',
                    },
                ]
            };
        }
        return null;
    }, [symbol]);

    // 8. P/E Valuation Chart (Định giá P/E)
    const peValuationChartData = useMemo(() => {
        if (symbol === 'SSI') {
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
        return null;
    }, [symbol]);

    // 9. P/B Valuation Chart (Định giá P/B)
    const pbValuationChartData = useMemo(() => {
        if (symbol === 'SSI') {
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
        return null;
    }, [symbol]);



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
