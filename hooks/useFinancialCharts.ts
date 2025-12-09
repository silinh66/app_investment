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

    // BVH Profit Categories: Q1'22 ... Q3'25 (15 quarters)
    const categoriesBVH_Profit = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25'];

    // 1. Revenue Chart (SHB - Thu nhập lãi) OR SSI Profit Structure
    const revenueChartData = useMemo(() => {
        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Cơ cấu lợi nhuận" for SSI (Image 1) - Mapped to first slot
            return {
                categories: categoriesSSI,
                title: 'Cơ cấu lợi nhuận',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Lãi từ các tài sản t...', // Pink
                        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                        color: '#FF4081',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản cho vay...', // Beige/Peach
                        data: [500, 400, 300, 300, 400, 500, 500, 500, 500, 400, 500, 400, 800, 800, 900],
                        color: '#FFCC80',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản c...', // Green
                        data: [600, 500, 400, 300, 300, 400, 400, 400, 500, 400, 500, 800, 1000, 1100, 1200],
                        color: '#00E676',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản đ...', // Blue
                        data: [200, 200, 100, 100, 100, 200, 200, 200, 200, 100, 100, 200, 200, 200, 200],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các tài chính ...', // Gold/Brown
                        data: [600, 400, 500, 600, 600, 500, 800, 900, 800, 900, 1000, 1200, 2000, 2100, 2200],
                        color: '#C99C33',
                        stack: 'total'
                    },
                ]
            };
        }

        return null; // Return null for non-supported industries for now
    }, [netRevenueChange, symbol, industry]);

    // 2. Profit Chart (SHB - Lợi nhuận sau thuế) OR SSI Revenue Structure OR BVH Profit
    const profitChartData = useMemo(() => {
        if (symbol === 'BVH' || industry === 'Bảo hiểm') {
            // "Lợi nhuận sau thuế của doanh nghiệp" for BVH
            return {
                categories: categoriesBVH_Profit,
                title: 'Lợi nhuận sau thuế của doanh nghiệp',
                type: 'mixed' as const,
                unitLeft: '(Tỷ)',
                unitRight: '%',
                series: [
                    {
                        name: 'Lợi nhuận sau thuế thu nhập',
                        data: [480, 330, 380, 320, 540, 400, 430, 350, 580, 420, 530, 660, 650, 740, 760],
                        color: '#00E676', // Green
                        type: 'column'
                    },
                    {
                        name: 'Tăng trưởng cùng kỳ',
                        data: [0, -20, -15, -35, 18, 20, 10, 8, 9, 15, 25, 0, 0, 0, 0], // Estimated %
                        color: '#76FF03', // Light Green line
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
                series: [
                    {
                        name: 'Doanh thu hoạt đ...', // Blue
                        data: [0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                        data: [2000, 1600, 1400, 1400, 1500, 1700, 2000, 2100, 2000, 2300, 2200, 3000, 4200, 4500, 4800],
                        color: '#C99C33',
                        stack: 'total'
                    },
                ]
            };
        }

        return null;
    }, [profitChange, symbol, industry]);

    // 3. Expense Chart (SHB - Chi phí dự phòng)
    const expenseChartData = useMemo(() => {
        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Chi phí hoạt động" for SSI (Image 3)
            return {
                categories: categoriesSSI,
                title: 'Chi phí hoạt động',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Chi phí hoạt động ...', // Gold (Bottom/Largest negative)
                        data: [-1200, -1100, -1000, -1200, -900, -1000, -1100, -1500, -1100, -1300, -1100, -1800, -2400, -2500, -2600],
                        color: '#C99C33',
                        stack: 'total'
                    },
                    {
                        name: 'Chi phí quản lý côn...', // Cyan (Middle)
                        data: [-200, -200, -200, -200, -200, -200, -200, -300, -200, -200, -200, -500, -600, -600, -700],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                    {
                        name: 'Chi phí tài chính', // Blue (Top/Smallest negative)
                        data: [-100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100],
                        color: '#448AFF',
                        stack: 'total'
                    },
                ]
            };
        }

        return null;
    }, [expenseChange, symbol, industry]);

    // 4. Cash Flow Chart (BVH - Lưu chuyển tiền tệ)
    const cashFlowChartData = useMemo(() => {
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
                        data: [500, 4000, 5500, 2500, 4000, 6500, 2200, 6500, -1000, 4000, 12000, -3000, -3000, 4800, 4800, 6800, 5000, 4500, 6000],
                        color: '#00E5FF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động kinh doanh', // Purple (Deep Blue/Purple)
                        data: [-1000, -4500, -6000, -2000, -4500, -7500, -2000, -6000, 3000, -4000, -12500, 2200, 2200, -3000, -3000, -7000, -5000, -4000, -6500],
                        color: '#651FFF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động tài chính', // Green
                        data: [200, 200, -500, -2000, 500, -1000, 500, 500, -3500, 500, -500, -3500, -3500, -5500, -5500, -500, -1000, -2000, -1500],
                        color: '#00E676',
                        type: 'column'
                    },
                    {
                        name: 'Tiền và tương đương cuối kì', // Orange Line
                        data: [500, 400, 300, 800, 600, 500, 800, 1200, 500, 600, 800, 500, 600, 2000, 2000, 800, 1000, 1200, 1500],
                        color: '#FF6D00',
                        type: 'line'
                    }
                ]
            };
        }

        return null;
    }, [cashFlowChange, symbol, industry]);

    // 5. Asset Chart (BVH - Cơ cấu tài sản)
    const assetChartData = useMemo(() => {
        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Tài sản" for SSI (Image 5)
            return {
                categories: categoriesSSI,
                title: 'Tài sản',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Tiền và tương đương...', // Beige (Bottom)
                        data: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
                        color: '#FFCC80',
                        stack: 'total'
                    },
                    {
                        name: 'Các khoản cho vay...', // Pink (Lower Middle)
                        data: [4000, 4000, 3000, 3000, 3000, 3000, 3000, 4000, 5000, 4000, 3000, 3000, 2000, 2000, 2000],
                        color: '#FF4081',
                        stack: 'total'
                    },
                    {
                        name: 'Tài sản tài chính...', // Blue (Dominant Middle)
                        data: [45000, 40000, 42000, 46000, 48000, 45000, 50000, 65000, 62000, 66000, 60000, 78000, 94000, 96000, 98000],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Tài sản khác', // Green (Top)
                        data: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
                        color: '#00E676',
                        stack: 'total'
                    },
                ]
            };
        }

        return null;
    }, [assetChange, symbol, industry]);

    // 6. Capital Chart (Nguồn vốn)
    const capitalChartData = useMemo(() => {
        if (symbol === 'SSI' || industry === 'Dịch vụ tài chính') {
            // "Nguồn vốn" for SSI (Image 6)
            return {
                categories: categoriesSSI,
                title: 'Nguồn vốn',
                type: 'stacked' as const,
                series: [
                    {
                        name: 'Vốn và các q...', // Blue (Bottom)
                        data: [15000, 14000, 22000, 22000, 23000, 21000, 22000, 23000, 24000, 25000, 27000, 29000, 31000, 32000, 33000],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ dài hạn', // Cyan (Middle - tiny)
                        data: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 1000, 0, 0, 0, 0, 0],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                    {
                        name: 'Nợ ngắn hạn', // Gold (Top)
                        data: [35000, 30000, 24000, 30000, 29000, 28000, 33000, 45000, 40000, 45000, 48000, 62000, 69000, 70000, 72000],
                        color: '#C99C33',
                        stack: 'total'
                    },
                ]
            };
        }
        return null;
    }, [capitalChange, symbol, industry]);

    // 7. Debt Ratio Chart (Hệ số nợ)
    const debtRatioChartData = useMemo(() => {
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
                        color: '#C99C33',
                    },
                ]
            };
        }
        return null;
    }, [symbol, industry]);

    // 8. P/E Valuation Chart (Định giá P/E)
    const peValuationChartData = useMemo(() => {
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
        return null;
    }, [symbol, industry]);

    // 9. P/B Valuation Chart (Định giá P/B)
    const pbValuationChartData = useMemo(() => {
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
        return null;
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
