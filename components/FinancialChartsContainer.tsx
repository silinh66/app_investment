import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFinancialCharts } from '../hooks/useFinancialCharts';
import NativeFinancialChart from './NativeFinancialChart';
import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface FinancialChartsContainerProps {
    symbol: string;
    industry?: string;
}

const FilterButton = ({ label, value, onChange }: { label: string, value: 'quarter' | 'year', onChange: (v: 'quarter' | 'year') => void }) => {
    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';

    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#30323B' : '#F2F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}
            onPress={() => onChange(value === 'quarter' ? 'year' : 'quarter')}
        >
            <Text style={{ color: isDark ? '#fff' : '#000', marginRight: 4, fontSize: 12 }}>{value === 'quarter' ? 'Quý' : 'Năm'}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
    );
};

const FinancialChartsContainer: React.FC<FinancialChartsContainerProps> = ({ symbol, industry }) => {
    const {
        loading,
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
        expenseChange,
        capitalChartData,
        setCapitalChange,
        capitalChange,
        debtRatioChartData,
        peValuationChartData,
        pbValuationChartData
    } = useFinancialCharts(symbol, industry);

    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';
    const cardBackground = isDark ? '#202127' : '#F4F5F6';

    // Helper to keep only the last 8 quarters
    const filterRecentQuarters = (data: any, count: number = 8) => {
        if (!data || !data.categories || !data.series) return data;

        const len = data.categories.length;
        if (len <= count) return data;

        const startIndex = len - count;

        // Slice categories
        const newCategories = data.categories.slice(startIndex);

        // Slice series data
        const newSeries = data.series.map((s: any) => ({
            ...s,
            data: s.data.slice(startIndex)
        }));

        return {
            ...data,
            categories: newCategories,
            series: newSeries
        };
    };

    if (loading) {
        return (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 8 }}>
            {/* Revenue Chart */}
            {revenueChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{revenueChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(revenueChartData)}
                            title=""
                            type={revenueChartData.type}
                            unit="(Tỷ)"
                        />
                    </View>
                </View>
            )}

            {/* Profit Chart */}
            {profitChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{profitChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(profitChartData)}
                            title=""
                            type={profitChartData.type}
                            unit="(Tỷ)"
                        />
                    </View>
                </View>
            )}

            {/* Expense/Margin Chart */}
            {expenseChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{expenseChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(expenseChartData)}
                            title=""
                            type={expenseChartData.type}
                            unit="(Tỷ)"
                        />
                    </View>
                </View>
            )}

            {/* Cash Flow Chart */}
            {cashFlowChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{cashFlowChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(cashFlowChartData)}
                            title=""
                            type={cashFlowChartData.type}
                            unit="(Tỷ)"
                        />
                    </View>
                </View>
            )}

            {/* Asset Chart */}
            {assetChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{assetChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(assetChartData)}
                            title=""
                            type={assetChartData.type}
                            unit="(Tỷ)"
                        />
                    </View>
                </View>
            )}

            {/* Capital Chart */}
            {capitalChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{capitalChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(capitalChartData)}
                            title=""
                            type={capitalChartData.type}
                            unit="(Tỷ)"
                        />
                    </View>
                </View>
            )}

            {/* Debt Ratio Chart */}
            {debtRatioChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{debtRatioChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(debtRatioChartData)}
                            title=""
                            type={debtRatioChartData.type}
                        />
                    </View>
                </View>
            )}

            {/* P/E Valuation Chart */}
            {peValuationChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{peValuationChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(peValuationChartData)}
                            title=""
                            type={peValuationChartData.type}
                        />
                    </View>
                </View>
            )}

            {/* P/B Valuation Chart */}
            {pbValuationChartData && (
                <View style={styles.chartContainer}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000', marginBottom: 12 }]}>{pbValuationChartData.title}</Text>
                    <View style={{ backgroundColor: cardBackground, padding: 12, borderRadius: 8 }}>
                        <NativeFinancialChart
                            data={filterRecentQuarters(pbValuationChartData)}
                            title=""
                            type={pbValuationChartData.type}
                        />
                    </View>
                </View>
            )}


        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        marginBottom: 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8
    }
});

export default FinancialChartsContainer;
