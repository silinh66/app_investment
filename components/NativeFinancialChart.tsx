import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import {
    BarChart,
    LineChart,
    StackedBarChart
} from 'react-native-chart-kit';
import { useTheme } from '@/context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

interface NativeFinancialChartProps {
    data: any;
    title: string;
    type?: 'column' | 'line' | 'mixed' | 'stacked';
    height?: number;
}

const LegendItem = ({ color, label }: { color: string, label: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, marginRight: 6 }} />
        <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '500' }}>{label}</Text>
    </View>
);

const NativeFinancialChart: React.FC<NativeFinancialChartProps> = ({ data, title, type = 'column', height = 260 }) => {
    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';

    if (!data) return null;

    const chartConfig = {
        backgroundGradientFrom: isDark ? "#1A1B20" : "#ffffff", // Darker background
        backgroundGradientTo: isDark ? "#1A1B20" : "#ffffff",
        color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => isDark ? `rgba(156, 163, 175, ${opacity})` : `rgba(107, 114, 128, ${opacity})`,
        propsForBackgroundLines: {
            strokeDasharray: "4", // Dotted lines
            stroke: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(229, 231, 235, 0.5)",
            strokeWidth: 1
        },
        propsForLabels: {
            fontSize: 10,
            fontWeight: '600'
        },
        fillShadowGradientFrom: 'transparent',
        fillShadowGradientTo: 'transparent',
        fillShadowGradientFromOpacity: 0,
        fillShadowGradientToOpacity: 0,
    };

    const renderLegend = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, paddingHorizontal: 4 }}>
                {data.series.map((s: any, index: number) => (
                    <LegendItem key={index} color={s.color} label={s.name} />
                ))}
            </View>
        );
    };

    const renderChart = () => {
        // Stacked Bar Chart (Assets, Revenue Structure, etc.)
        if (type === 'stacked') {
            const labels = data.categories;
            const chartData = data.categories.map((_: any, index: number) => {
                return data.series.map((s: any) => s.data[index] || 0);
            });
            const barColors = data.series.map((s: any) => s.color || '#000');

            // Check for negative values (StackedBarChart crashes with negatives)
            const hasNegative = data.series.some((s: any) => s.data.some((v: number) => v < 0));

            if (hasNegative) {
                // Fallback to BarChart (Grouped) for negative values to prevent crash
                // We keep the "downward" visual which is important for expenses
                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={{
                                labels: data.categories,
                                datasets: data.series.map((s: any) => ({
                                    data: s.data,
                                    color: (opacity = 1) => s.color || `rgba(0, 0, 0, ${opacity})`
                                }))
                            }}
                            width={Math.max(screenWidth - 48, data.categories.length * 50)}
                            height={height}
                            chartConfig={{
                                ...chartConfig,
                                barPercentage: 0.6,
                            }}
                            withInnerLines={true}
                            showBarTops={false}
                            fromZero={true}
                            yAxisLabel=""
                            yAxisSuffix="T"
                        />
                    </ScrollView>
                );
            }

            return (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <StackedBarChart
                        data={{
                            labels,
                            legend: [],
                            data: chartData,
                            barColors
                        }}
                        width={Math.max(screenWidth - 48, labels.length * 50)}
                        height={height}
                        chartConfig={{
                            ...chartConfig,
                            barPercentage: 0.6,
                        }}
                        hideLegend={true}
                        yAxisLabel=""
                        yAxisSuffix="T"
                    />
                </ScrollView>
            );
        }

        // Mixed Chart (Column/Stacked + Line Overlay)
        if (type === 'mixed') {
            const columnSeries = data.series.filter((s: any) => s.type === 'column');
            const lineSeries = data.series.filter((s: any) => s.type === 'line');

            const chartWidth = Math.max(screenWidth - 48, data.categories.length * 50);

            // Check if we need Stacked Bar base (multiple column series) or Simple Bar base
            const isStackedBase = columnSeries.length > 1;

            return (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View>
                        {/* Base Chart */}
                        <BarChart
                            data={{
                                labels: data.categories,
                                datasets: columnSeries.map((s: any) => ({
                                    data: s.data,
                                    color: (opacity = 1) => s.color || `rgba(0, 0, 0, ${opacity})`
                                }))
                            }}
                            width={chartWidth}
                            height={height}
                            chartConfig={{
                                ...chartConfig,
                                barPercentage: 0.6,
                            }}
                            withInnerLines={true}
                            showBarTops={false}
                            fromZero={true}
                            yAxisLabel=""
                            yAxisSuffix="T"
                        />

                        {/* Overlay: Line Chart */}
                        {lineSeries.length > 0 && (
                            <View style={{ position: 'absolute', top: 0, left: 0 }}>
                                <LineChart
                                    data={{
                                        labels: data.categories,
                                        datasets: lineSeries.map((s: any) => ({
                                            data: s.data,
                                            color: (opacity = 1) => s.color || `rgba(255, 255, 255, ${opacity})`,
                                            strokeWidth: 2,
                                            withDots: false
                                        }))
                                    }}
                                    width={chartWidth}
                                    height={height}
                                    chartConfig={{
                                        ...chartConfig,
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientToOpacity: 0,
                                        propsForBackgroundLines: { strokeWidth: 0 },
                                        color: (opacity = 1) => lineSeries[0].color || `rgba(255, 255, 255, ${opacity})`,
                                    }}
                                    withInnerLines={false}
                                    withOuterLines={false}
                                    withVerticalLines={false}
                                    withHorizontalLines={false}
                                    fromZero={true}
                                    bezier
                                    withDots={false}
                                    withShadow={false}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            );
        }

        // Default: Column Chart (for Expenses - Negative)
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                    data={{
                        labels: data.categories,
                        datasets: data.series.map((s: any) => ({
                            data: s.data,
                            color: (opacity = 1) => s.color || `rgba(0, 0, 0, ${opacity})`
                        }))
                    }}
                    width={Math.max(screenWidth - 48, data.categories.length * 50)}
                    height={height}
                    chartConfig={chartConfig}
                    showBarTops={false}
                    fromZero={true} // Important for negative values
                    yAxisLabel=""
                    yAxisSuffix="T"
                />
            </ScrollView>
        );
    };

    return (
        <View style={{
            marginVertical: 12,
            backgroundColor: isDark ? '#1A1B20' : '#fff',
            borderRadius: 16,
            padding: 16,
            // No shadow for flat dark look
        }}>
            {renderChart()}
            {renderLegend()}
        </View>
    );
};

export default NativeFinancialChart;
