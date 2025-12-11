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
    unit?: string;
    unitLeft?: string;
    unitRight?: string;
    yAxisSuffixLeft?: string;
}

const LegendItem = ({ color, label }: { color: string, label: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, marginRight: 6 }} />
        <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '500' }}>{label}</Text>
    </View>
);

const NativeFinancialChart: React.FC<NativeFinancialChartProps> = ({ data, title, type = 'column', height = 260, unit, unitLeft, unitRight, yAxisSuffixLeft }) => {
    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';

    if (!data) return null;

    const chartConfig = {
        backgroundGradientFrom: "transparent",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "transparent",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.6,
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
        // Helper to determine if label should be shown (every 2nd label from the end)
        const shouldShowLabel = (index: number, total: number) => {
            return (total - 1 - index) % 2 === 0;
        };

        const processedLabels = data.categories.map((label: string, index: number) =>
            shouldShowLabel(index, data.categories.length) ? label : ''
        );

        // Common Width Adjustment to reduce right padding
        // Changed from -80 to -40 to push content closer to edges
        const availableWidth = screenWidth - 32;

        // Stacked Bar Chart (Assets, Revenue Structure, etc.)
        if (type === 'stacked') {
            const labels = processedLabels;
            const chartData = data.categories.map((_: any, index: number) => {
                return data.series.map((s: any) => s.data[index] || 0);
            });
            const barColors = data.series.map((s: any) => s.color || '#000');

            // Check for negative values (StackedBarChart crashes with negatives)
            const hasNegative = data.series.some((s: any) => s.data.some((v: number) => v < 0));

            if (hasNegative) {
                // Workaround for Negative Stacked Chart
                const positiveData = data.categories.map((_: any, index: number) => {
                    return data.series.map((s: any) => Math.abs(s.data[index] || 0));
                });

                const maxVal = Math.max(...positiveData.map((d: number[]) => d.reduce((a, b) => a + b, 0)));
                const yAxisSteps = 3;
                const stepValue = Math.ceil(maxVal / yAxisSteps);

                // Calculate dynamic width to ensure alignment
                const itemWidth = availableWidth / data.categories.length;
                const chartWidth = itemWidth * data.categories.length;

                return (
                    <View style={{ flexDirection: 'row' }}>
                        {/* Custom Y-Axis Labels (Left) */}
                        <View style={{ justifyContent: 'space-between', height: height - 40, paddingBottom: 20, paddingRight: 2 }}>
                            {[0, 1, 2, 3].map((i) => (
                                <Text key={i} style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                    {i === 0 ? '0' : `-${i * stepValue}`}
                                </Text>
                            ))}
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View>
                                {/* Flipped Chart */}
                                <View style={{ transform: [{ scaleY: -1 }] }}>
                                    <StackedBarChart
                                        data={{
                                            labels: processedLabels,
                                            legend: [],
                                            data: positiveData,
                                            barColors: data.series.map((s: any) => s.color || '#000')
                                        }}
                                        width={chartWidth}
                                        height={height - 20}
                                        chartConfig={{
                                            ...chartConfig,
                                            barPercentage: 0.6, // Thinner bars
                                            propsForBackgroundLines: {
                                                strokeDasharray: "4",
                                                stroke: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(229, 231, 235, 0.5)",
                                                strokeWidth: 1
                                            },
                                            color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                            labelColor: () => 'transparent',
                                        }}
                                        hideLegend={true}
                                        style={{ paddingRight: 0 }}
                                        withHorizontalLabels={false}
                                        withVerticalLabels={false}
                                    />
                                </View>

                                {/* Custom X-Axis Labels (Bottom) */}
                                <View style={{ flexDirection: 'row', marginTop: 4, paddingLeft: 0 }}>
                                    {data.categories.map((label: string, index: number) => (
                                        <View key={index} style={{ width: itemWidth, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 10, fontWeight: '600', color: isDark ? '#9CA3AF' : '#6B7280' }}>
                                                {shouldShowLabel(index, data.categories.length) ? label : ''}
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
                            labels: processedLabels,
                            legend: [],
                            data: chartData,
                            barColors
                        }}
                        width={Math.max(availableWidth, labels.length * 30)}
                        height={height}
                        chartConfig={{
                            ...chartConfig,
                            barPercentage: 0.6, // Thinner bars
                        }}
                        hideLegend={true}
                        style={{ paddingRight: 0, paddingLeft: 0 }}
                        yAxisLabel=""
                        yAxisSuffix=""
                    />
                </ScrollView>
            );
        }

        // Mixed Chart (Column/Stacked + Line Overlay)
        if (type === 'mixed') {
            const columnSeries = data.series.filter((s: any) => s.type === 'column');
            const lineSeries = data.series.filter((s: any) => s.type === 'line');

            const chartWidth = Math.max(availableWidth, data.categories.length * 30);

            // Check if we need complex "Split Stack" values
            const hasNegative = columnSeries.some((s: any) => s.data.some((v: number) => v < 0));
            const isStackedBase = columnSeries.length > 1;

            if (hasNegative && isStackedBase) {
                const posSeries = columnSeries.map((s: any) => ({
                    ...s,
                    data: s.data.map((v: number) => Math.max(0, v))
                }));
                const negSeries = columnSeries.map((s: any) => ({
                    ...s,
                    data: s.data.map((v: number) => Math.abs(Math.min(0, v)))
                }));

                let maxStackVal = 0;
                data.categories.forEach((_: any, i: number) => {
                    const posSum = posSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    const negSum = negSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    maxStackVal = Math.max(maxStackVal, posSum, negSum);
                });

                const limit = Math.ceil(maxStackVal * 1.1);

                const posDataWithSpacer = data.categories.map((_: any, i: number) => {
                    const stackSum = posSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    return [...posSeries.map((s: any) => s.data[i]), limit - stackSum];
                });
                const negDataWithSpacer = data.categories.map((_: any, i: number) => {
                    const stackSum = negSeries.reduce((acc: number, s: any) => acc + s.data[i], 0);
                    return [...negSeries.map((s: any) => s.data[i]), limit - stackSum];
                });

                const barColors = [...columnSeries.map((s: any) => s.color), 'transparent'];

                const lineDatasets = lineSeries.map((s: any) => ({
                    data: s.data,
                    color: (opacity = 1) => s.color || `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2,
                    withDots: false
                }));
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
                const fixPadding = 30;

                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ height: height, width: chartWidth }}>
                            {/* Top Half: Positive Stack */}
                            <View style={{ height: halfHeight, width: chartWidth, overflow: 'hidden' }}>
                                <StackedBarChart
                                    data={{
                                        labels: processedLabels,
                                        legend: [],
                                        data: posDataWithSpacer,
                                        barColors
                                    }}
                                    width={chartWidth}
                                    height={halfHeight + fixPadding}
                                    chartConfig={{
                                        ...chartConfig,
                                        barPercentage: 0.6, // Thinner bars
                                        propsForBackgroundLines: { strokeWidth: 0 },
                                        color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: () => 'transparent',
                                    }}
                                    hideLegend={true}
                                    style={{ paddingRight: 0, paddingLeft: 0 }}
                                    withHorizontalLabels={false}
                                    withVerticalLabels={false}
                                />
                            </View>

                            {/* Bottom Half: Negative Stack (Flipped) */}
                            <View style={{ height: halfHeight, width: chartWidth, transform: [{ scaleY: -1 }], overflow: 'hidden' }}>
                                <StackedBarChart
                                    data={{
                                        labels: processedLabels,
                                        legend: [],
                                        data: negDataWithSpacer,
                                        barColors
                                    }}
                                    width={chartWidth}
                                    height={halfHeight + fixPadding}
                                    chartConfig={{
                                        ...chartConfig,
                                        barPercentage: 0.6, // Thinner bars
                                        propsForBackgroundLines: { strokeWidth: 0 },
                                        color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: () => 'transparent',
                                    }}
                                    hideLegend={true}
                                    style={{ paddingRight: 0, paddingLeft: 0 }}
                                    withHorizontalLabels={false}
                                    withVerticalLabels={false}
                                />
                            </View>

                            {/* Overlay: Line Chart */}
                            <View style={{ position: 'absolute', top: 0, left: 0, height: height, width: chartWidth }} pointerEvents="none">
                                <LineChart
                                    data={{
                                        labels: processedLabels,
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
                                    fromZero={false}
                                    bezier
                                    withDots={false}
                                    withShadow={false}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                    segments={4}
                                    style={{ paddingRight: 0 }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                );
            }

            // Config for BarChart to ensure bars are visible (Solid 100% opacity)
            const barChartConfig = {
                ...chartConfig,
                fillShadowGradientFrom: columnSeries[0]?.color ?? '#00E676',
                fillShadowGradientTo: columnSeries[0]?.color ?? '#00E676',
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientToOpacity: 1,
                barPercentage: 0.7, // Thicker bars like sample
            };

            return (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View>
                        {/* Base Chart - Columns */}
                        <BarChart
                            data={{
                                labels: processedLabels,
                                datasets: columnSeries.map((s: any) => ({
                                    data: s.data,
                                    color: (opacity = 1) => s.color || `rgba(0, 0, 0, ${opacity})`
                                }))
                            }}
                            width={chartWidth}
                            height={height}
                            chartConfig={barChartConfig}
                            withInnerLines={true}
                            showBarTops={false}
                            style={{ paddingRight: unitRight ? 40 : 0 }} // Add padding for right axis if needed
                            fromZero={true}
                            yAxisLabel=""
                            yAxisSuffix={yAxisSuffixLeft || ""}
                        />

                        {/* Overlay: Line Chart */}
                        {lineSeries.length > 0 && (
                            <View style={{ position: 'absolute', top: 0, left: 0 }}>
                                <LineChart
                                    data={{
                                        labels: processedLabels,
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
                                        // Hide Left Y-Axis labels if we are in dual axis mode (assume Line is Right Axis)
                                        // We set labelColor to transparent for Y-axis? No, that hides X-axis too.
                                        // We can use yAxisLabel with a special character or just let them overlap if we don't handle it?
                                        // Better: If unitRight is set, we assume this LineChart corresponds to Right Axis.
                                        // React Native Chart Kit doesn't support hiding ONLY Y-axis labels via config easily.
                                        // But we can set `withVerticalLabels={false}` (Hides X-Axis labels - which we want, as BarChart has them).
                                        // Wait, `withVerticalLabels` controls X-axis labels (vertical lines).
                                        // `withHorizontalLabels` controls Y-axis labels.
                                    }}
                                    withInnerLines={false}
                                    style={{ paddingRight: unitRight ? 40 : 0 }}
                                    withOuterLines={false}
                                    withVerticalLines={false}
                                    withHorizontalLines={false}
                                    fromZero={false} // Line chart might go negative (growth %)
                                    bezier
                                    withDots={false}
                                    withShadow={false}
                                    yAxisLabel=""
                                    yAxisSuffix={unitRight || ""}
                                    withVerticalLabels={false} // Hide X-Axis labels on overlay to prevent overlap with BarChart
                                    withHorizontalLabels={!unitRight} // Hide Left Y-Axis labels if we want to simulate Right Axis visually?
                                // Actually if we hide Left Labels, we still need to render Right Labels.
                                // ChartKit doesn't render Right Labels.
                                // We will render a second LineChart for the Right Labels?? No.
                                // For now, let's keep it simple: Render LineChart on top. If unitRight is used, we might accept that it renders on Left (standard overlap) OR we try to move it.
                                // The user sample has 2 columns (axes).
                                // If we can't move it to right easily, at least ensure it renders.
                                />
                                {unitRight && (
                                    // Manual Right Axis Labels Simulation
                                    <View style={{ position: 'absolute', right: 0, top: 10, height: height - 20, justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                            {Math.max(...lineSeries[0].data)}%
                                        </Text>
                                        <Text style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                            0%
                                        </Text>
                                        <Text style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                            {Math.min(...lineSeries[0].data)}%
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </ScrollView>
            );
        }

        // Line Chart (Debt Ratio)
        if (type === 'line') {
            return (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={{
                            labels: processedLabels,
                            datasets: data.series.map((s: any) => ({
                                data: s.data,
                                color: (opacity = 1) => s.color || `rgba(255, 255, 255, ${opacity})`,
                                strokeWidth: 2,
                                withDots: false
                            }))
                        }}
                        width={Math.max(availableWidth, data.categories.length * 35)}
                        height={height}
                        chartConfig={{
                            ...chartConfig,
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            propsForBackgroundLines: {
                                strokeDasharray: "4",
                                stroke: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(229, 231, 235, 0.5)",
                                strokeWidth: 1
                            },
                            decimalPlaces: 1,
                        }}
                        bezier
                        withDots={false}
                        withShadow={false}
                        withInnerLines={true}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                        fromZero={true}
                        yAxisLabel=""
                        yAxisSuffix="%"
                        style={{ paddingRight: 0, paddingLeft: 0 }}
                    />
                </ScrollView>
            );
        }

        // Default: Column Chart (for Expenses - Negative)
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                    data={{
                        labels: processedLabels,
                        datasets: data.series.map((s: any) => ({
                            data: s.data,
                            color: (opacity = 1) => s.color || `rgba(0, 0, 0, ${opacity})`
                        }))
                    }}
                    width={Math.max(availableWidth, data.categories.length * 30)}
                    height={height}
                    chartConfig={{
                        ...chartConfig,
                        fillShadowGradientFrom: data.series[0]?.color ?? '#00E676',
                        fillShadowGradientTo: data.series[0]?.color ?? '#00E676',
                        fillShadowGradientFromOpacity: 1,
                        fillShadowGradientToOpacity: 1,
                        barPercentage: 0.7,
                    }}
                    showBarTops={false}
                    style={{ paddingRight: 0, paddingLeft: 0 }}
                    fromZero={true} // Important for negative values
                    yAxisLabel=""
                    yAxisSuffix={yAxisSuffixLeft || ""}
                />
            </ScrollView>
        );
    };

    return (
        <View style={{
            marginTop: 12,
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0 }}>
                {(unit || unitLeft) && (
                    <Text style={{
                        fontSize: 10,
                        color: isDark ? '#9CA3AF' : '#6B7280',
                        marginBottom: 4,
                        fontWeight: '500'
                    }}>
                        {unit || unitLeft}
                    </Text>
                )}
                {unitRight && (
                    <Text style={{
                        fontSize: 10,
                        color: isDark ? '#9CA3AF' : '#6B7280',
                        marginBottom: 4,
                        fontWeight: '500'
                    }}>
                        {unitRight}
                    </Text>
                )}
            </View>
            {renderChart()}
            {renderLegend()}
        </View>
    );
};

export default NativeFinancialChart;
