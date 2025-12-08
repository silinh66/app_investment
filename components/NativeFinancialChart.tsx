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
                // Workaround for Negative Stacked Chart:
                // 1. Convert data to positive
                // 2. Render StackedBarChart (stable)
                // 3. Flip visually using scaleY: -1
                // 4. Hide chart labels (as they would be mirrored) and render custom labels

                const positiveData = data.categories.map((_: any, index: number) => {
                    return data.series.map((s: any) => Math.abs(s.data[index] || 0));
                });

                // Calculate max value for Y-axis scaling
                const maxVal = Math.max(...positiveData.map((d: number[]) => d.reduce((a, b) => a + b, 0)));
                const yAxisSteps = 3; // 0, 1T, 2T, 3T
                const stepValue = Math.ceil(maxVal / yAxisSteps);

                return (
                    <View style={{ flexDirection: 'row' }}>
                        {/* Custom Y-Axis Labels (Left) */}
                        <View style={{ justifyContent: 'space-between', height: height - 40, paddingBottom: 20, paddingRight: 8 }}>
                            {[0, 1, 2, 3].map((i) => (
                                <Text key={i} style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                    {i === 0 ? '0' : `-${i * stepValue}T`}
                                </Text>
                            ))}
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View>
                                {/* Flipped Chart */}
                                <View style={{ transform: [{ scaleY: -1 }] }}>
                                    <StackedBarChart
                                        data={{
                                            labels: data.categories,
                                            legend: [],
                                            data: positiveData,
                                            barColors: data.series.map((s: any) => s.color || '#000')
                                        }}
                                        width={Math.max(screenWidth - 80, data.categories.length * 50)}
                                        height={height - 20}
                                        chartConfig={{
                                            ...chartConfig,
                                            barPercentage: 0.6,
                                            propsForBackgroundLines: {
                                                strokeDasharray: "4",
                                                stroke: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(229, 231, 235, 0.5)",
                                                strokeWidth: 1
                                            },
                                            // Hide labels in the chart itself
                                            color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                            labelColor: () => 'transparent',
                                        }}
                                        hideLegend={true}
                                        withHorizontalLabels={false}
                                        withVerticalLabels={false}
                                    />
                                </View>

                                {/* Custom X-Axis Labels (Bottom) */}
                                <View style={{ flexDirection: 'row', marginTop: 4, paddingLeft: 10 }}>
                                    {data.categories.map((label: string, index: number) => (
                                        <View key={index} style={{ width: 50, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 10, fontWeight: '600', color: isDark ? '#9CA3AF' : '#6B7280' }}>
                                                {label}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
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

            // Check if we need complex "Split Stack" (Positive + Negative Stacks)
            // This is needed for SSI Cash Flow which has mixed pos/neg values in columns
            const hasNegative = columnSeries.some((s: any) => s.data.some((v: number) => v < 0));
            const isStackedBase = columnSeries.length > 1;

            if (hasNegative && isStackedBase) {
                // 1. Prepare Data
                const posSeries = columnSeries.map((s: any) => ({
                    ...s,
                    data: s.data.map((v: number) => Math.max(0, v))
                }));
                const negSeries = columnSeries.map((s: any) => ({
                    ...s,
                    data: s.data.map((v: number) => Math.abs(Math.min(0, v)))
                }));

                // 2. Calculate Global Max for Scaling
                // We need both charts (Pos & Neg) to have the SAME scale so they align
                // And the Line Chart needs to cover -Max to +Max
                let maxStackVal = 0;
                data.categories.forEach((_: any, i: number) => {
                    const posSum = posSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    const negSum = negSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    maxStackVal = Math.max(maxStackVal, posSum, negSum);
                });

                // Add buffer and round up
                const limit = Math.ceil(maxStackVal * 1.1);

                // 3. Add Spacers to force scale
                const posDataWithSpacer = data.categories.map((_: any, i: number) => {
                    const stackSum = posSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    return [...posSeries.map((s: any) => s.data[i]), limit - stackSum];
                });
                const negDataWithSpacer = data.categories.map((_: any, i: number) => {
                    const stackSum = negSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    return [...negSeries.map((s: any) => s.data[i]), limit - stackSum];
                });

                const barColors = [...columnSeries.map((s: any) => s.color), 'transparent'];

                // 4. Line Chart Data (Force scale -Limit to +Limit)
                // We add hidden datasets with [limit] and [-limit] to force the scale
                const lineDatasets = lineSeries.map((s: any) => ({
                    data: s.data,
                    color: (opacity = 1) => s.color || `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2,
                    withDots: false
                }));
                // Add invisible bounds
                lineDatasets.push({
                    data: new Array(data.categories.length).fill(limit),
                    color: () => 'transparent',
                    strokeWidth: 0,
                    withDots: false
                });
                lineDatasets.push({
                    data: new Array(data.categories.length).fill(-limit),
                    color: () => 'transparent',
                    strokeWidth: 0,
                    withDots: false
                });

                const halfHeight = height / 2;
                const fixPadding = 30; // Increase height to push X-axis labels/padding out of view

                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ height: height, width: chartWidth }}>
                            {/* Top Half: Positive Stack */}
                            <View style={{ height: halfHeight, width: chartWidth, overflow: 'hidden' }}>
                                <StackedBarChart
                                    data={{
                                        labels: data.categories,
                                        legend: [],
                                        data: posDataWithSpacer,
                                        barColors
                                    }}
                                    width={chartWidth}
                                    height={halfHeight + fixPadding}
                                    chartConfig={{
                                        ...chartConfig,
                                        barPercentage: 0.6,
                                        propsForBackgroundLines: { strokeWidth: 0 }, // Hide grid lines in sub-charts
                                        color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: () => 'transparent', // Hide labels
                                    }}
                                    hideLegend={true}
                                    withHorizontalLabels={false}
                                    withVerticalLabels={false}
                                />
                            </View>

                            {/* Bottom Half: Negative Stack (Flipped) */}
                            <View style={{ height: halfHeight, width: chartWidth, transform: [{ scaleY: -1 }], overflow: 'hidden' }}>
                                <StackedBarChart
                                    data={{
                                        labels: data.categories,
                                        legend: [],
                                        data: negDataWithSpacer,
                                        barColors
                                    }}
                                    width={chartWidth}
                                    height={halfHeight + fixPadding}
                                    chartConfig={{
                                        ...chartConfig,
                                        barPercentage: 0.6,
                                        propsForBackgroundLines: { strokeWidth: 0 },
                                        color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: () => 'transparent',
                                    }}
                                    hideLegend={true}
                                    withHorizontalLabels={false}
                                    withVerticalLabels={false}
                                />
                            </View>

                            {/* Overlay: Line Chart (Full Height) */}
                            <View style={{ position: 'absolute', top: 0, left: 0, height: height, width: chartWidth }} pointerEvents="none">
                                <LineChart
                                    data={{
                                        labels: data.categories,
                                        datasets: lineDatasets
                                    }}
                                    width={chartWidth}
                                    height={height}
                                    chartConfig={{
                                        ...chartConfig,
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientToOpacity: 0,
                                        fillShadowGradientFromOpacity: 0,
                                        fillShadowGradientToOpacity: 0,
                                        propsForBackgroundLines: {
                                            strokeDasharray: "4",
                                            stroke: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(229, 231, 235, 0.5)",
                                            strokeWidth: 1
                                        },
                                        color: (opacity = 1) => lineSeries[0]?.color || `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => isDark ? `rgba(156, 163, 175, ${opacity})` : `rgba(107, 114, 128, ${opacity})`,
                                    }}
                                    withInnerLines={true}
                                    withOuterLines={false}
                                    withVerticalLines={false}
                                    withHorizontalLines={true}
                                    fromZero={false} // We handle scale manually
                                    bezier
                                    withDots={false}
                                    withShadow={false}
                                    yAxisLabel=""
                                    yAxisSuffix="T"
                                    segments={4} // Ensure 0 is in middle? No, 4 segments means 5 lines. -L, -L/2, 0, L/2, L
                                />
                            </View>
                        </View>
                    </ScrollView>
                );
            }

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
