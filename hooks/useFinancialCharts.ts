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

    // SSI Categories from Image: Q1'22 ... Q1'25 (13 quarters)
    const categoriesSSI = ['Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25'];

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
                        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                        color: '#FF4081',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản cho vay...', // Beige/Peach
                        data: [0.5, 0.4, 0.3, 0.3, 0.4, 0.5, 0.5, 0.5, 0.5, 0.4, 0.5, 0.4, 0.8],
                        color: '#FFCC80',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản c...', // Green
                        data: [0.6, 0.5, 0.4, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.4, 0.5, 0.8, 1.0],
                        color: '#00E676',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các khoản đ...', // Blue
                        data: [0.2, 0.2, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi từ các tài chính ...', // Gold/Brown
                        data: [0.6, 0.4, 0.5, 0.6, 0.6, 0.5, 0.8, 0.9, 0.8, 0.9, 1.0, 1.2, 2.0],
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
                        data: [0, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        color: '#448AFF',
                        stack: 'total'
                    },
                    {
                        name: 'Lãi/lỗ từ công ty li...', // Green
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        color: '#00E676',
                        stack: 'total'
                    },
                    {
                        name: 'Doanh thu hoạt đ...', // Gold
                        data: [2.0, 1.6, 1.4, 1.4, 1.5, 1.7, 2.0, 2.1, 2.0, 2.3, 2.2, 3.0, 4.2],
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
                        data: [-1.2, -1.1, -1.0, -1.2, -0.9, -1.0, -1.1, -1.5, -1.1, -1.3, -1.1, -1.8, -2.4],
                        color: '#C99C33',
                        stack: 'total'
                    },
                    {
                        name: 'Chi phí quản lý côn...', // Cyan (Middle)
                        data: [-0.2, -0.2, -0.2, -0.2, -0.2, -0.2, -0.2, -0.3, -0.2, -0.2, -0.2, -0.5, -0.6],
                        color: '#00E5FF',
                        stack: 'total'
                    },
                    {
                        name: 'Chi phí tài chính', // Blue (Top/Smallest negative)
                        data: [-0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1],
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
            // Categories: Q1'21 to Q4'24 (16 quarters)
            const categoriesSSI_CashFlow = [
                'Q1\'21', 'Q2\'21', 'Q3\'21', 'Q4\'21',
                'Q1\'22', 'Q2\'22', 'Q3\'22', 'Q4\'22',
                'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23',
                'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'
            ];

            return {
                categories: categoriesSSI_CashFlow,
                title: 'Lưu chuyển tiền tệ',
                type: 'mixed' as const,
                series: [
                    {
                        name: 'Hoạt động đầu tư', // Cyan
                        data: [0.5, 4.0, 5.5, 2.5, 4.0, 6.5, 2.2, 6.5, -1.0, 4.0, 12.0, -3.0, -3.0, 4.8, 4.8, 6.8],
                        color: '#00E5FF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động kinh doanh', // Purple (Deep Blue/Purple)
                        data: [-1.0, -4.5, -6.0, -2.0, -4.5, -7.5, -2.0, -6.0, 3.0, -4.0, -12.5, 2.2, 2.2, -3.0, -3.0, -7.0],
                        color: '#651FFF',
                        type: 'column'
                    },
                    {
                        name: 'Hoạt động tài chính', // Green
                        data: [0.2, 0.2, -0.5, -2.0, 0.5, -1.0, 0.5, 0.5, -3.5, 0.5, -0.5, -3.5, -3.5, -5.5, -5.5, -0.5],
                        color: '#00E676',
                        type: 'column'
                    },
                    {
                        name: 'Tiền và tương đương cuối kì', // Orange Line
                        data: [0.5, 0.4, 0.3, 0.8, 0.6, 0.5, 0.8, 1.2, 0.5, 0.6, 0.8, 0.5, 0.6, 2.0, 2.0, 0.8],
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
    }, [assetChange]);

    return {
        loading,
        superSector: 'Mock',
        assetChartData,
        cashFlowChartData,
        revenueChartData,
        profitChartData,
        expenseChartData,
        setAssetChange,
        assetChange,
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
