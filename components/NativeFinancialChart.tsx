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
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
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
        barPercentage: 0.8,
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
            <View style={{ flexDirection: 'column', marginTop: 16, marginLeft: 18 }}>
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
        const availableWidth = (screenWidth - 32) * 0.90;

        // Stacked Bar Chart (Assets, Revenue Structure, etc.)
        // Stacked Bar Chart (Assets, Revenue Structure, etc.)
        if (type === 'stacked') {
            const labels = processedLabels;
            const barColors = data.series.map((s: any) => s.color || '#000');
            const hasNegative = data.series.some((s: any) => s.data.some((v: number) => v < 0));

            // Calculate Max Value for custom Axis
            // For stacked, we sum the absolute values of columns (approximation for scale)
            // Actually for proper scale we need max stack height.
            let maxVal = 0;
            const positiveData = data.categories.map((_: any, index: number) => {
                const stackSum = data.series.reduce((sum: number, s: any) => sum + Math.abs(s.data[index] || 0), 0);
                if (stackSum > maxVal) maxVal = stackSum;
                return data.series.map((s: any) => Math.abs(s.data[index] || 0));
            });

            const yAxisSteps = 4; // Use 4 steps for better granularity
            const stepValue = Math.ceil(maxVal / yAxisSteps);
            const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => (stepValue * i).toFixed(1)); // 0, step, 2step...

            // Determine chart height vs axis
            const graphHeight = height - 40;

            const itemWidth = availableWidth / data.categories.length;
            const chartWidth = Math.max(availableWidth, itemWidth * data.categories.length);

            // Conditional Data Handling
            // If negative, we used the Flipped approach.
            // If positive, we use Standard.

            return (
                <View style={{ marginLeft: 10 }}>
                    {/* Fixed Custom Y-Axis Labels (Absolute Left) */}
                    <View style={{ position: 'absolute', left: 0, top: 0, zIndex: 10, justifyContent: 'space-between', height: graphHeight, paddingBottom: 0, paddingRight: 4, marginLeft: 4 }}>
                        {yAxisLabels.reverse().map((label, i) => (
                            <Text key={i} style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                {hasNegative ? `-${label}` : label}
                            </Text>
                        ))}
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 0 }}>
                        <View>
                            {hasNegative ? (
                                /* Flipped Chart for Negative Values */
                                <View style={{ transform: [{ scaleY: -1 }, { translateX: -45 }] }}>
                                    <StackedBarChart
                                        data={{
                                            labels: processedLabels,
                                            legend: [],
                                            data: positiveData,
                                            barColors
                                        }}
                                        width={chartWidth + 45}
                                        height={graphHeight}
                                        chartConfig={{
                                            ...chartConfig,
                                            barPercentage: 0.7,
                                            propsForBackgroundLines: {
                                                strokeDasharray: "4",
                                                stroke: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(229, 231, 235, 0.5)",
                                                strokeWidth: 1
                                            },
                                            color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                            labelColor: () => 'transparent', // Hide internal labels
                                        }}
                                        hideLegend={true}
                                        withVerticalLabels={false}
                                        style={{ paddingRight: 0, paddingLeft: 0 }}
                                    />
                                </View>
                            ) : (
                                /* Standard Chart for Positive Values */
                                <View style={{ transform: [{ translateX: -45 }] }}>
                                    <StackedBarChart
                                        data={{
                                            labels: processedLabels,
                                            legend: [],
                                            data: positiveData,
                                            barColors
                                        }}
                                        width={chartWidth + 45}
                                        height={graphHeight}
                                        // Note: StackedBarChart auto-calculates scale if we don't provide segments/max. 
                                        // To sync with our custom axis, we might need 'segments'.
                                        // segments = yAxisSteps. 
                                        // And 'fromZero'.
                                        segments={yAxisSteps}
                                        chartConfig={{
                                            ...chartConfig,
                                            barPercentage: 0.7,
                                            color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                            labelColor: () => 'transparent', // Hide internal labels
                                        }}
                                        hideLegend={true}
                                        style={{ paddingRight: 0, paddingLeft: 0 }}
                                        withHorizontalLabels={false} // Hide Y Axis
                                        withVerticalLabels={false} // Hide X Axis (we render manually below?)
                                        yAxisLabel=""
                                        yAxisSuffix=""
                                    />
                                </View>
                            )}

                            {/* Custom X-Axis Labels (Bottom) - Required for Flipped, optional for Standard if we hide chart's */}
                            {/* To ensure perfect alignment with bars, better to render manually for both. */}
                            {/* But standard ChartKit renders X labels well. */}
                            {/* Let's try rendering Custom X Axis for BOTH to be safe and consistent. */}
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
                    </ScrollView >
                </View >
            );
        }

        // Mixed Chart (Column/Stacked + Line Overlay)
        if (type === 'mixed') {
            const columnSeries = data.series.filter((s: any) => s.type === 'column');
            const lineSeries = data.series.filter((s: any) => s.type === 'line' || s.type === undefined); // Default to line if undefined? No, usually explicitly type.
            // Actually in useFinancialCharts, mixed has type:'column' and 'line'.

            const chartWidth = Math.max(availableWidth, data.categories.length * 30);

            // Check if we need complex "Split Stack" values
            const hasNegative = columnSeries.some((s: any) => s.data.some((v: number) => v < 0));
            const isStackedBase = columnSeries.length > 1; // If multiple columns for mixed, usually stacked? 
            // In useFinancialCharts, Mixed usually has 1 column series and 1 line series. 
            // EXCEPT "Chi phí hoạt động" (SSI) which is Stacked (handled by 'stacked' type).
            // "Lợi nhuận" has 1 column, 1 line.

            // Wait, "Cơ cấu doanh thu" (SSI) is Stacked. "Lợi nhuận" is Mixed.
            // If "Mixed" has only 1 column series, it's not "Stacked Base".
            // So lines 226 logic (Split Stacked) was likely for specific complex charts or misinterpretation.
            // Assuming Standard Mixed logic (Bar + Line) is main target.

            // Let's implement robust calculation for Standard Mixed.

            // Combine all data to find Max
            let allData: number[] = [];
            columnSeries.forEach((s: any) => allData.push(...s.data));
            // Only include Line series in Max calculation if they share the unit (Left Axis)
            // If unitRight is set, line might be on secondary axis.
            if (!unitRight) {
                lineSeries.forEach((s: any) => allData.push(...s.data));
            }

            const maxVal = Math.max(...allData, 0.1);
            // If negative exists in Mixed (e.g. Profit can be constant negative?), we need FromZero?
            // BarChart 'fromZero' usually handles it.
            // If we have negatives, we need range [min, max].
            const minVal = Math.min(...allData, 0);

            const range = maxVal - minVal;
            const yAxisSteps = 4;
            const stepValue = range / yAxisSteps;
            const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => (minVal + stepValue * i).toFixed(1));
            if (minVal === 0 && maxVal > 1000) {
                // Format large numbers? The user scales data by 1000 already.
            }

            const graphHeight = height;

            return (
                <View style={{ marginLeft: 10 }}>
                    {/* Fixed Custom Y-Axis Labels (Absolute Left) */}
                    <View style={{ position: 'absolute', left: 0, top: 10, zIndex: 10, justifyContent: 'space-between', height: graphHeight - 48, paddingBottom: 0, paddingRight: 4, marginLeft: 4 }}>
                        {/* marginTop to align with grid top? */}
                        {yAxisLabels.reverse().map((label, i) => (
                            <Text key={i} style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                {label}{yAxisSuffixLeft || ''}
                            </Text>
                        ))}
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 0 }}>
                        <View style={{ transform: [{ translateX: -45 }] }}>
                            {/* Base Chart - Columns */}
                            <BarChart
                                data={{
                                    labels: processedLabels,
                                    datasets: columnSeries.map((s: any) => ({
                                        data: s.data,
                                        color: (opacity = 1) => s.color || `rgba(0, 0, 0, ${opacity})`
                                    }))
                                }}
                                width={chartWidth + 45}
                                height={graphHeight}
                                chartConfig={{
                                    ...chartConfig,
                                    fillShadowGradientFrom: columnSeries[0]?.color ?? '#00E676',
                                    fillShadowGradientTo: columnSeries[0]?.color ?? '#00E676',
                                    fillShadowGradientFromOpacity: 1,
                                    fillShadowGradientToOpacity: 1,
                                    barPercentage: 0.7,
                                    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: () => 'transparent', // Hide internal labels
                                }}
                                segments={yAxisSteps} // Force steps
                                fromZero={minVal >= 0}
                                withInnerLines={true}
                                showBarTops={false}
                                style={{ paddingRight: unitRight ? 40 : 0, paddingLeft: 0 }} // Add padding for right axis if needed
                                withHorizontalLabels={false} // Hide Y Axis
                                yAxisLabel=""
                                yAxisSuffix=""
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
                                        width={chartWidth + 45}
                                        height={graphHeight}
                                        chartConfig={{
                                            ...chartConfig,
                                            backgroundGradientFromOpacity: 0,
                                            backgroundGradientToOpacity: 0,
                                            propsForBackgroundLines: { strokeWidth: 0 },
                                            color: (opacity = 1) => lineSeries[0]?.color || `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: () => 'transparent',
                                        }}
                                        withInnerLines={false}
                                        style={{ paddingRight: unitRight ? 40 : 0 }}
                                        withOuterLines={false}
                                        withVerticalLines={false}
                                        withHorizontalLines={false}
                                        fromZero={false}
                                        bezier
                                        withDots={false}
                                        withShadow={false}
                                        yAxisLabel=""
                                        yAxisSuffix=""
                                        withVerticalLabels={false}
                                        withHorizontalLabels={false}
                                        segments={yAxisSteps} // Match segments
                                    />
                                    {unitRight && (
                                        // Simple Right Axis Labels (Simulated)
                                        <View style={{ position: 'absolute', right: 0, top: 10, height: height - 60, justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                                {/* Calculate Max for Line separately if unitRight? */}
                                                Max%
                                            </Text>
                                            <Text style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                                Min%
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            );
        }

        // Line Chart (Debt Ratio)
        if (type === 'line') {
            const chartData = data.series[0].data;
            const minVal = Math.min(...chartData, 0);
            const maxVal = Math.max(...chartData);
            const range = maxVal - minVal;
            const yAxisSteps = 4;
            const stepValue = range / yAxisSteps;
            const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => (minVal + stepValue * i).toFixed(1));
            const graphHeight = height;

            // TODO: Ensure ChartKit scales to this Exact range? 
            // We can pass `fromZero` if min >= 0.
            // If we have negatives, LineChart handles it.

            return (
                <View style={{ marginLeft: 10 }}>
                    <View style={{ position: 'absolute', left: 0, top: 10, zIndex: 10, justifyContent: 'space-between', height: graphHeight - 48, paddingBottom: 0, paddingRight: 4, marginLeft: 4 }}>
                        {yAxisLabels.reverse().map((label, i) => (
                            <Text key={i} style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                {label}{unit === '%' ? '%' : ''}
                            </Text>
                        ))}
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 0 }}>
                        <View style={{ transform: [{ translateX: -45 }] }}>
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
                                width={Math.max(availableWidth, data.categories.length * 35) + 45}
                                height={graphHeight}
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
                                    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: () => 'transparent',
                                }}
                                bezier
                                withDots={false}
                                withShadow={false}
                                withInnerLines={true}
                                withOuterLines={false}
                                withVerticalLines={false}
                                withHorizontalLines={true}
                                fromZero={minVal >= 0}
                                segments={yAxisSteps}
                                yAxisLabel=""
                                yAxisSuffix="" // Suffix handled in custom labels
                                withHorizontalLabels={false}
                                style={{ paddingRight: 0, paddingLeft: 0 }}
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        }

        // Default: Column Chart (for Expenses - Negative)
        {
            // Calculate scale for BarChart
            let allData: number[] = [];
            data.series.forEach((s: any) => allData.push(...s.data));
            const maxVal = Math.max(...allData, 0);
            const minVal = Math.min(...allData, 0);
            const range = maxVal - minVal;
            const yAxisSteps = 4;
            const stepValue = range / yAxisSteps || 1;
            const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => (minVal + stepValue * i).toFixed(1));
            const graphHeight = height;

            return (
                <View style={{ marginLeft: 10 }}>
                    <View style={{ position: 'absolute', left: 0, top: 10, zIndex: 10, justifyContent: 'space-between', height: graphHeight - 48, paddingBottom: 0, paddingRight: 4, marginLeft: 4 }}>
                        {yAxisLabels.reverse().map((label, i) => (
                            <Text key={i} style={{ fontSize: 10, color: isDark ? '#9CA3AF' : '#6B7280', textAlign: 'right' }}>
                                {label}{yAxisSuffixLeft || ''}
                            </Text>
                        ))}
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 0 }}>
                        <View style={{ transform: [{ translateX: -45 }] }}>
                            <BarChart
                                data={{
                                    labels: processedLabels,
                                    datasets: data.series.map((s: any) => ({
                                        data: s.data,
                                        color: (opacity = 1) => s.color || `rgba(0, 0, 0, ${opacity})`
                                    }))
                                }}
                                width={Math.max(availableWidth, data.categories.length * 30) + 45}
                                height={graphHeight}
                                chartConfig={{
                                    ...chartConfig,
                                    fillShadowGradientFrom: data.series[0]?.color ?? '#00E676',
                                    fillShadowGradientTo: data.series[0]?.color ?? '#00E676',
                                    fillShadowGradientFromOpacity: 1,
                                    fillShadowGradientToOpacity: 1,
                                    barPercentage: 0.8,
                                    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: () => 'transparent',
                                }}
                                showBarTops={false}
                                style={{ paddingRight: 0, paddingLeft: 0 }}
                                fromZero={true} // Important for negative values? BarChart handles it.
                                // If min < 0, FromZero=true works for BarChart.
                                segments={yAxisSteps}
                                withHorizontalLabels={false}
                                yAxisLabel=""
                                yAxisSuffix=""
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        }
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
                        fontWeight: '500',
                        marginLeft: 8 // Adjust this value to change distance from left edge
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

