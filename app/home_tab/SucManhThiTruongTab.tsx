import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle, Line, Text as SvgText, G } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const SECTOR_DATA = [
    { name: 'Bảo hiểm', x: 7.0, y: 85, color: '#EF4444' },
    { name: 'Dịch vụ bán lẻ', x: 2.5, y: 95, color: '#3B82F6' },
    { name: 'Phương tiện truyền thông', x: 0.8, y: 160, color: '#0EA5E9' },
    { name: 'Công nghệ', x: 0.8, y: 40, color: '#F59E0B' },
    { name: 'Viễn thông', x: -0.8, y: 50, color: '#64748B' },
    { name: 'Hóa chất', x: -1.0, y: 20, color: '#10B981' },
    { name: 'Dịch vụ tài chính', x: -1.8, y: 15, color: '#F97316' },
    { name: 'Du lịch & Giải trí', x: -3.0, y: -20, color: '#FCD34D' },
    { name: 'Y tế', x: 0.5, y: -10, color: '#14B8A6' },
    { name: 'Bất động sản', x: 4.8, y: 5, color: '#10B981' },
];

const SectorScatterChart = () => {
    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';
    const chartHeight = 300;
    const padding = { top: 40, right: 40, bottom: 60, left: 50 };
    const chartWidth = screenWidth - 32; // Container padding

    const width = chartWidth - padding.left - padding.right;
    const height = chartHeight - padding.top - padding.bottom;

    // Scales (Manual linear scale)
    const xMin = -4, xMax = 8;
    const yMin = -40, yMax = 180;

    const scaleX = (val: number) => ((val - xMin) / (xMax - xMin)) * width;
    const scaleY = (val: number) => height - ((val - yMin) / (yMax - yMin)) * height;

    const axisColor = isDark ? '#6B7280' : '#9CA3AF';
    const textColor = isDark ? '#E5E7EB' : '#374151';
    const gridColor = isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)';



    // Theme colors
    const backgroundColor = isDark ? '#12161f' : '#f5f5f5'; // Main background


    return (
        <View style={{ marginTop: 16, backgroundColor: theme.colors.backgroundCoPhieu, borderRadius: 8, padding: 0 }}>
            <Svg width={chartWidth} height={chartHeight}>
                <G x={padding.left} y={padding.top}>
                    {/* Y-Axis Title - Rotated */}
                    <SvgText
                        x={-height / 2}
                        y={-35}
                        fill={textColor}
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        transform="rotate(-90)"
                    >
                        Thanh khoản so với 5 phiên trước (%)
                    </SvgText>

                    {/* X-Axis Title */}
                    <SvgText
                        x={width / 2}
                        y={height + 40}
                        fill={textColor}
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        Tăng điểm so với 5 phiên trước (%)
                    </SvgText>

                    {/* Grid Lines & Ticks */}
                    {/* Horizontal Line at 0% */}
                    <Line
                        x1={0} y1={scaleY(0)}
                        x2={width} y2={scaleY(0)}
                        stroke={isDark ? '#9CA3AF' : '#6B7280'}
                        strokeWidth={1}
                    />
                    {/* Vertical Line at 0% */}
                    <Line
                        x1={scaleX(0)} y1={0}
                        x2={scaleX(0)} y2={height}
                        stroke={isDark ? '#FFFFFF' : '#000000'}
                        strokeWidth={1}
                    />

                    {/* X-Axis Ticks */}
                    {[-2, 0, 2, 4, 6].map(val => (
                        <G key={`x-${val}`}>
                            <Line
                                x1={scaleX(val)} y1={height}
                                x2={scaleX(val)} y2={height + 5}
                                stroke={axisColor}
                                strokeWidth={1}
                            />
                            <SvgText
                                x={scaleX(val)}
                                y={height + 20}
                                fill={textColor}
                                fontSize="12"
                                textAnchor="middle"
                            >
                                {val}%
                            </SvgText>
                        </G>
                    ))}

                    {/* Y-Axis Ticks */}
                    {[0, 100].map(val => (
                        <G key={`y-${val}`}>
                            <Line
                                x1={-5} y1={scaleY(val)}
                                x2={0} y2={scaleY(val)}
                                stroke={axisColor}
                                strokeWidth={1}
                            />
                            <SvgText
                                x={-10}
                                y={scaleY(val) + 4}
                                fill={textColor}
                                fontSize="12"
                                textAnchor="end"
                            >
                                {val}%
                            </SvgText>
                        </G>
                    ))}

                    {/* Data Points */}
                    {SECTOR_DATA.map((item, index) => {
                        const cx = scaleX(item.x);
                        const cy = scaleY(item.y);
                        return (
                            <G key={index}>
                                <Circle
                                    cx={cx}
                                    cy={cy}
                                    r={7}
                                    fill={item.color}
                                />
                                <SvgText
                                    x={cx}
                                    y={cy - 10}
                                    fill={'#ABADBA'}
                                    fontSize="10"
                                    fontWeight="600"
                                    textAnchor="middle"
                                >
                                    {item.name}
                                </SvgText>
                            </G>
                        );
                    })}
                </G>
            </Svg>
        </View>
    );
};



const BarItem = ({ label, value, color, max = 100 }: { label: string, value: number, color: string, max?: number }) => {
    return (
        <View style={styles.barContainer}>
            <Text style={styles.barLabel}>{label}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barFill, { height: `${value}%`, backgroundColor: color }]} />
            </View>
            <Text style={[styles.barValue, { color }]}>{value.toFixed(1)}%</Text>
        </View>
    );
};

const SucManhThiTruongTab = () => {
    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';

    // Theme colors
    const backgroundColor = isDark ? '#12161f' : '#f5f5f5'; // Main background
    const cardColor = isDark ? '#1F2937' : '#F3F4F6'; // Card background
    const textColor = isDark ? '#FFFFFF' : '#111827';
    const subTextColor = isDark ? '#9CA3AF' : '#6B7280';
    const highlightBlue = '#60A5FA';
    const warningBg = isDark ? 'rgba(59, 130, 246, 0.1)' : '#EFF6FF'; // Blueish tint for footer

    const QuickAccessItem = ({ icon, title, onPress, value, color }: { icon: any, title: string, onPress?: () => void, value: number, color: string }) => (
        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 0 }}>

            <TouchableOpacity style={[styles.quickAccessItem, {
                backgroundColor: theme.colors.backgroundTabActive, justifyContent: 'flex-end',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: theme.colors.text
            }]} onPress={onPress}>
                <View style={[styles.barFill, { width: `${value}%`, backgroundColor: color, height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }]}>
                    <Text style={{ color: theme.colors.text, fontSize: value / 100 * 40 }}>{value.toFixed(1)}%</Text>
                </View>
                {/* <View style={styles.quickAccessHeader}>
                {icon}
                <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.secondaryText} />
            </View> */}
            </TouchableOpacity>
            <Text style={[styles.quickAccessTitle, { color: theme.colors.text }]}>{title}</Text>

        </View>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor }]} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Main Card */}
            <View style={[styles.card, { backgroundColor: backgroundColor, borderWidth: 0 }]}>
                {/* Header */}
                <View style={styles.header}>
                    {/* <Ionicons name="time-outline" size={20} color={highlightBlue} /> */}
                    <Ionicons name="analytics-outline" size={22} color={theme.colors.secondaryText} />
                    <Text style={[styles.headerTitle, { color: textColor }]}>Sức mạnh thị trường</Text>
                </View>

                <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#E5E7EB' }]} />

                {/* Section 1: 20 Days Fluctuation */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        {/* <Ionicons name="stats-chart-outline" size={18} color={highlightBlue} /> */}
                        <MaterialCommunityIcons name="percent-outline" size={22} color={theme.colors.secondaryText} />
                        <Text style={[styles.sectionTitle, { color: textColor }]}>Tỷ lệ cổ phiếu so với các đường trung bình</Text>
                    </View>

                    <Text style={[styles.description, { color: subTextColor }]}>
                        MA5 breadth từ <Text style={[styles.boldText, { color: textColor }]}>30.1%</Text> (20 ngày trước) đã cải thiện lên đỉnh <Text style={[styles.boldText, { color: textColor }]}>78.0%</Text> nhưng sau đó suy sụp nhanh về <Text style={[styles.boldText, { color: highlightBlue }]}>33.8%</Text> hiện tại
                    </Text>

                    {/* Bars Chart */}
                    {/* <View style={styles.chartContainer}>
                        <BarItem label="MA10" value={37.9} color="#EF4444" />
                        <BarItem label="MA20" value={40.7} color="#EF4444" />
                        <BarItem label="MA50" value={36.4} color="#F59E0B" />
                        <BarItem label="MA100" value={33.5} color="#F59E0B" />
                        <BarItem label="MA200" value={56.3} color="#22C55E" />
                    </View> */}


                </View>




            </View>
            <View style={styles.gridContainer}>
                <View style={styles.gridRow}>
                    <QuickAccessItem
                        icon={<MaterialCommunityIcons name="star" size={24} color={theme.colors.text} />}
                        title="Nằm trên MA5"
                        value={30.1}
                        color={theme.colors.red}

                    />
                    <QuickAccessItem
                        icon={<View style={{ borderWidth: 1, borderColor: theme.colors.text, borderRadius: 4, paddingHorizontal: 2 }}><Text style={{ fontSize: 10, color: theme.colors.text, fontWeight: 'bold' }}>AI</Text></View>}
                        title="Nằm trên MA10"
                        value={56.1}
                        color={theme.colors.green}
                    />
                </View>
                <View style={styles.gridRow}>
                    <QuickAccessItem
                        icon={
                            <MaterialCommunityIcons name="account-star" size={24} color={theme.colors.text} />

                        }
                        title="Nằm trên MA20"
                        value={65.1}
                        color={theme.colors.green}
                    />
                    <QuickAccessItem
                        icon={
                            // <Feather name="trending-up" size={24} color={theme.colors.text} />
                            <MaterialCommunityIcons name="post" size={24} color={theme.colors.text} />

                        }
                        title="Nằm trên MA50"
                        value={46.1}
                        color={theme.colors.red}
                    />
                </View>
                <View style={styles.gridRow}>
                    <QuickAccessItem
                        icon={<MaterialCommunityIcons name="movie-open-outline" size={24} color={theme.colors.text} />}
                        title="Nằm trên MA100"
                        value={70.1}
                        color={theme.colors.green}
                    />
                    <QuickAccessItem
                        icon={<MaterialIcons name="monetization-on" size={24} color={theme.colors.text} />}
                        title="Nằm trên MA200"
                        value={24.6}
                        color={theme.colors.red}
                    />
                </View>
            </View>
            <View style={styles.sectionHeader}>
                {/* <Ionicons name="stats-chart-outline" size={18} color={highlightBlue} /> */}
                <MaterialCommunityIcons name="chart-scatter-plot" size={22} color={theme.colors.secondaryText} />
                <Text style={[styles.sectionTitle, { color: textColor }]}>Diễn biến dòng tiền ngành</Text>
            </View>
            <View style={[styles.card, { backgroundColor: theme.colors.backgroundCoPhieu, marginTop: 20, marginHorizontal: 4 }]}>


                {/* Section 2: Current Trend */}
                <View style={styles.section}>


                    <SectorScatterChart />
                </View>


            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    gridContainer: {
        paddingHorizontal: 12,
        marginBottom: 24,
        // backgroundColor: 'red'
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,

    },
    quickAccessItem: {
        width: (width - 44) / 2,
        // padding: 16,
        borderRadius: 8,
        height: 60,
        justifyContent: 'space-between',
    },
    quickAccessHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    quickAccessTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)', // Subtle border
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        width: '100%',
        marginBottom: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
    },
    boldText: {
        fontWeight: 'bold',
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        height: 180,
    },
    barContainer: {
        alignItems: 'center',
        flex: 1,
    },
    barLabel: {
        color: '#9CA3AF',
        fontSize: 11,
        marginBottom: 8,
    },
    barBackground: {
        width: 40,
        height: 100,
        backgroundColor: '#374151',
        borderRadius: 4,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    barFill: {
        width: '100%',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    barValue: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    warningIconContainer: {
        width: 20,
        marginRight: 10,
        alignItems: 'center',
    },
    footerText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 20,
    }
});

export default SucManhThiTruongTab;
