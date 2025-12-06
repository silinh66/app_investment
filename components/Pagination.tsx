import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface PaginationProps {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number) => void;
    theme: "light" | "dark";
}

export const Pagination: React.FC<PaginationProps> = ({
    current,
    total,
    pageSize,
    onChange,
    theme,
}) => {
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return null;

    const renderPageButton = (page: number) => {
        const isActive = page === current;
        return (
            <TouchableOpacity
                key={page}
                style={[
                    styles.pageButton,
                    isActive ? styles.activePageButton : styles.inactivePageButton,
                ]}
                onPress={() => onChange(page)}
            >
                <Text
                    style={[
                        styles.pageText,
                        isActive ? styles.activePageText : styles.inactivePageText,
                    ]}
                >
                    {page}
                </Text>
            </TouchableOpacity>
        );
    };

    // Logic to show pages (simplified for now: 1, 2, 3, 4, 5... or sliding window)
    // The image shows 1, 2, 3, 4, 5 ->
    // Let's implement a simple sliding window or just max 5 pages for now
    let pages = [];
    const maxVisible = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <View style={styles.container}>
            {/* Previous Button (optional, not in image but good UX) */}
            {/* {current > 1 && (
        <TouchableOpacity
            style={[styles.pageButton, styles.inactivePageButton]}
            onPress={() => onChange(current - 1)}
        >
             <MaterialIcons name="chevron-left" size={20} color="#4785f5" />
        </TouchableOpacity>
      )} */}

            {pages.map(renderPageButton)}

            {/* Next Button */}
            {current < totalPages && (
                <TouchableOpacity
                    style={[styles.pageButton, styles.inactivePageButton]}
                    onPress={() => onChange(current + 1)}
                >
                    <MaterialIcons name="arrow-forward" size={18} color="#4785f5" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center", // Center the pagination
        alignItems: "center",
        paddingVertical: 16,
        gap: 8,
    },
    pageButton: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB", // Light gray border
        borderRadius: 2, // Square with slight radius
    },
    activePageButton: {
        backgroundColor: "#FEF3C7", // Light orange/beige
        borderColor: "#FCD34D", // Slightly darker border for active
    },
    inactivePageButton: {
        backgroundColor: "transparent",
        borderColor: "#E5E7EB",
    },
    pageText: {
        fontSize: 14,
        fontWeight: "500",
    },
    activePageText: {
        color: "#DC2626", // Red text
        fontWeight: "700",
    },
    inactivePageText: {
        color: "#3B82F6", // Blue text
    },
});
