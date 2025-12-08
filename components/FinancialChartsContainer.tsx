import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFinancialCharts } from '../hooks/useFinancialCharts';
import NativeFinancialChart from './NativeFinancialChart';
import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface FinancialChartsContainerProps {
    symbol: string;
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

const FinancialChartsContainer: React.FC<FinancialChartsContainerProps> = ({ symbol }) => {
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
        expenseChange
    } = useFinancialCharts(symbol);

    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';

    if (loading) {
        return (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {/* Revenue Chart */}
            {revenueChartData && (
                <View style={styles.chartContainer}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{revenueChartData.title}</Text>
                        <FilterButton label="Thời gian" value={netRevenueChange} onChange={setNetRevenueChange} />
                    </View>
                    <NativeFinancialChart
                        data={revenueChartData}
                        title=""
                        type={revenueChartData.type}
                    />
                </View>
            )}

            {/* Profit Chart */}
            {profitChartData && (
                <View style={styles.chartContainer}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{profitChartData.title}</Text>
                        <FilterButton label="Thời gian" value={profitChange} onChange={setProfitChange} />
                    </View>
                    <NativeFinancialChart
                        data={profitChartData}
                        title=""
                        type={profitChartData.type}
                    />
                </View>
            )}

            {/* Expense/Margin Chart */}
            {expenseChartData && (
                <View style={styles.chartContainer}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{expenseChartData.title}</Text>
                        <FilterButton label="Thời gian" value={expenseChange} onChange={setExpenseChange} />
                    </View>
                    <NativeFinancialChart
                        data={expenseChartData}
                        title=""
                        type={expenseChartData.type}
                    />
                </View>
            )}

            {/* Cash Flow Chart */}
            {cashFlowChartData && (
                <View style={styles.chartContainer}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{cashFlowChartData.title}</Text>
                        <FilterButton label="Thời gian" value={cashFlowChange} onChange={setCashFlowChange} />
                    </View>
                    <NativeFinancialChart
                        data={cashFlowChartData}
                        title=""
                        type={cashFlowChartData.type}
                    />
                </View>
            )}

            {/* Asset Chart */}
            {assetChartData && (
                <View style={styles.chartContainer}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{assetChartData.title}</Text>
                        <FilterButton label="Thời gian" value={assetChange} onChange={setAssetChange} />
                    </View>
                    <NativeFinancialChart
                        data={assetChartData}
                        title=""
                        type={assetChartData.type}
                    />
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
