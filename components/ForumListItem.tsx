import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Topic } from "../api/topics";
import { useTheme } from "../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

interface ForumListItemProps {
    topic: Topic;
    onPress: (topicId: number) => void;
    index?: number;
}

export const ForumListItem: React.FC<ForumListItemProps> = ({ topic, onPress, index }) => {
    console.log('index', index);

    const { theme } = useTheme();
    const isDark = theme.mode === 'dark';

    // Format date: "05 thg 12"
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return dayjs(dateString).format("DD [thg] MM");
    };

    // Extract symbol (simplified)
    const getSymbol = (topic: Topic) => {
        const match = topic.description?.match(/\b[A-Z]{3}\b/);
        return match ? match[0] : null;
    };

    const symbol = getSymbol(topic);

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    // backgroundColor: theme.colors.background,
                    backgroundColor: theme.colors.backgroundCoPhieu,

                    borderBottomColor: theme.colors.border,
                    borderTopEndRadius: index === 0 ? 12 : 0,
                    borderTopStartRadius: index === 0 ? 12 : 0,
                    marginHorizontal: 8,
                }
            ]}
            onPress={() => onPress(topic.topic_id)}
        >
            {/* Row 1: Symbol info (aligned with title) */}
            {symbol ? (
                <View style={styles.symbolRow}>
                    <Text style={styles.symbolText}>{symbol}</Text>
                </View>
            ) : null}

            {/* Row 2: Avatar + Content */}
            <View style={styles.mainRow}>
                <Image
                    source={{ uri: topic.avatar || "https://i.pravatar.cc/100" }}
                    style={styles.avatar}
                />
                <View style={styles.contentContainer}>
                    <Text
                        style={[styles.title, { color: theme.colors.text }]}
                        numberOfLines={3}
                    >
                        {topic.title || topic.description}
                    </Text>

                    <View style={styles.metaContainer}>
                        <Text style={[styles.author, { color: theme.colors.text }]}>{topic.author}</Text>
                        <Text style={styles.metaText}>{formatDate(topic.created_at)}</Text>

                        <View style={styles.commentContainer}>
                            <MaterialIcons name="chat-bubble-outline" size={14} color="#9CA3AF" />
                            <Text style={styles.commentCount}>{topic.comment_count || 0}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column", // Changed to column
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    symbolRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8, // Space between symbol and title
        marginLeft: 52, // Align with title (40 avatar + 12 margin)
        gap: 8,
    },
    symbolText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#9CA3AF",
        textTransform: "uppercase",
    },
    mainRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        marginTop: 0,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: "400",
        lineHeight: 22,
        marginBottom: 8,
        width: '95%',
    },
    metaContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    author: {
        fontSize: 12,
        fontWeight: "500",
    },
    metaText: {
        fontSize: 12,
        color: "#9CA3AF",
    },
    commentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginLeft: 4,
    },
    commentCount: {
        fontSize: 12,
        color: "#9CA3AF",
    },
});
