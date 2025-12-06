import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import type { ActiveCriterion, ParamDef } from "./types";
import { CRITERIA_DEFS } from "./CRITERIA_DEFS";

interface ActiveConfigBarProps {
  active: ActiveCriterion[];
  onChange: (id: string, patch: Record<string, any>) => void;
  onRemove: (id: string) => void;
  theme: any;
}

export const ActiveConfigBar: React.FC<ActiveConfigBarProps> = ({
  active,
  onChange,
  onRemove,
  theme,
}) => {
  if (active.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={[styles.title, { color: theme.colors.text }]}>
        Cài đặt lọc ({active.length})
      </Text> */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {active.map((criterion) => (
          <CriterionEditor
            key={criterion.id}
            criterion={criterion}
            onChange={onChange}
            onRemove={onRemove}
            theme={theme}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface CriterionEditorProps {
  criterion: ActiveCriterion;
  onChange: (id: string, patch: Record<string, any>) => void;
  onRemove: (id: string) => void;
  theme: any;
}

const CriterionEditor: React.FC<CriterionEditorProps> = ({
  criterion,
  onChange,
  onRemove,
  theme,
}) => {
  const def = CRITERIA_DEFS.find((d) => d.id === criterion.id);
  if (!def) return null;

  const handleChange = (key: string, value: any) => {
    onChange(criterion.id, { [key]: value });
  };

  return (
    <View
      style={[
        styles.criterionCard,
        {
          backgroundColor: theme.colors.backgroundTab,
          borderColor: theme.colors.backgroundTab,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
          {criterion.label}
        </Text>
        <TouchableOpacity onPress={() => onRemove(criterion.id)}>
          <Text style={[styles.removeButton, { color: "#C7C8D1" }]}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Controls based on criterion.control */}
      {criterion.control === "range" && (
        <RangeEditor
          params={def.params}
          values={criterion.values}
          onChange={handleChange}
          unit={def.unit}
          theme={theme}
        />
      )}

      {criterion.control === "select" && (
        <SelectEditor
          params={def.params}
          values={criterion.values}
          onChange={handleChange}
          theme={theme}
        />
      )}

      {criterion.control === "boolean" && (
        <BooleanEditor
          params={def.params}
          values={criterion.values}
          onChange={handleChange}
          theme={theme}
        />
      )}
    </View>
  );
};

// Range editor (min/max with optional timeframe and validation)
const RangeEditor: React.FC<{
  params: ParamDef[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  unit?: string;
  theme: any;
}> = ({ params, values, onChange, unit, theme }) => {
  const numberParams = params.filter((p) => p.type === "number");
  const timeframeParam = params.find(
    (p) => p.type === "timeframe" || p.type === "select"
  );

  // Validate min <= max
  const min = values.min != null ? Number(values.min) : null;
  const max = values.max != null ? Number(values.max) : null;
  const isInvalid = min != null && max != null && min > max;

  return (
    <View style={styles.editorContainer}>
      {/* Unit label if provided */}
      {unit && (
        <Text style={[styles.unitLabel, { color: theme.colors.textResult }]}>
          Đơn vị: {unit}
        </Text>
      )}

      {/* Number inputs */}
      <View style={styles.rangeRow}>
        {numberParams.map((param) => (
          <View key={param.key} style={styles.inputGroup}>
            <Text
              style={[styles.inputLabel, { color: theme.colors.secondaryText }]}
            >
              {param.label}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: theme.colors.text,
                  backgroundColor:
                    theme.mode === "dark" ? "#1C1C1E" : "#FFFFFF",
                  borderColor: isInvalid
                    ? "#FF3B30"
                    : theme.mode === "dark"
                      ? "#3A3A3C"
                      : "#E5E5E7",
                },
              ]}
              keyboardType="numeric"
              value={String(values[param.key] ?? "")}
              onChangeText={(text) => {
                const normalized = text.replace(/,/g, ".");
                onChange(param.key, normalized);
              }}
              placeholder={param.label}
              placeholderTextColor={theme.colors.secondaryText}
            />
          </View>
        ))}
      </View>

      {/* Validation error message */}
      {isInvalid && (
        <Text style={[styles.errorText, { color: "#FF3B30" }]}>
          Giá trị min phải nhỏ hơn hoặc bằng max
        </Text>
      )}

      {/* Timeframe selector if available */}
      {timeframeParam &&
        (timeframeParam.type === "timeframe" ||
          timeframeParam.type === "select") && (
          <View style={styles.timeframeContainer}>
            <Text
              style={[styles.inputLabel, { color: theme.colors.secondaryText }]}
            >
              {timeframeParam.label}
            </Text>
            <View style={styles.timeframeButtons}>
              {timeframeParam.options.map((opt) => (
                <TouchableOpacity
                  key={String(opt.value)}
                  style={[
                    styles.timeframeButton,
                    values[timeframeParam.key] === opt.value &&
                    styles.timeframeButtonActive,
                    {
                      backgroundColor:
                        values[timeframeParam.key] === opt.value
                          ? theme.colors.primary
                          : theme.mode === "dark"
                            ? "#1C1C1E"
                            : "#FFFFFF",
                      borderColor:
                        theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                    },
                  ]}
                  onPress={() => onChange(timeframeParam.key, opt.value)}
                >
                  <Text
                    style={[
                      styles.timeframeButtonText,
                      {
                        color:
                          values[timeframeParam.key] === opt.value
                            ? "#FFFFFF"
                            : theme.colors.text,
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
    </View>
  );
};

// Select editor (dropdown/picker + number inputs for mixed params)
const SelectEditor: React.FC<{
  params: ParamDef[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  theme: any;
}> = ({ params, values, onChange, theme }) => {
  return (
    <View style={styles.editorContainer}>
      {params.map((param) => {
        // Handle select/timeframe params
        if (param.type === "select" || param.type === "timeframe") {
          const selectParam = param;
          const options = selectParam.options || [];

          // Initialize with first option if not set
          if (values[selectParam.key] == null && options.length > 0) {
            onChange(selectParam.key, options[0].value);
          }

          return (
            <View key={selectParam.key} style={styles.selectGroup}>
              <Text
                style={[
                  styles.inputLabel,
                  { color: theme.colors.secondaryText },
                ]}
              >
                {selectParam.label}
              </Text>
              <View style={styles.optionsContainer}>
                {options.map((opt) => (
                  <TouchableOpacity
                    key={String(opt.value)}
                    style={[
                      styles.optionButton,
                      values[selectParam.key] === opt.value &&
                      styles.optionButtonActive,
                      {
                        backgroundColor:
                          values[selectParam.key] === opt.value
                            ? theme.colors.primary
                            : theme.mode === "dark"
                              ? "#1C1C1E"
                              : "#FFFFFF",
                        borderColor:
                          theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                      },
                    ]}
                    onPress={() => onChange(selectParam.key, opt.value)}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        {
                          color:
                            values[selectParam.key] === opt.value
                              ? "#FFFFFF"
                              : theme.colors.text,
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        }

        // Handle number params within select controls (e.g., slider values)
        if (param.type === "number") {
          const numberParam = param;

          return (
            <View key={numberParam.key} style={styles.inputGroup}>
              <Text
                style={[
                  styles.inputLabel,
                  { color: theme.colors.secondaryText },
                ]}
              >
                {numberParam.label}
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    color: theme.colors.text,
                    backgroundColor:
                      theme.mode === "dark" ? "#1C1C1E" : "#FFFFFF",
                    borderColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                  },
                ]}
                keyboardType="numeric"
                value={String(values[numberParam.key] ?? numberParam.min ?? "")}
                onChangeText={(text) => {
                  const normalized = text.replace(/,/g, ".");
                  if (normalized === "") {
                    onChange(numberParam.key, numberParam.min ?? 2);
                  } else {
                    onChange(numberParam.key, normalized);
                  }
                }}
                placeholder={numberParam.label}
                placeholderTextColor={theme.colors.secondaryText}
              />
            </View>
          );
        }

        return null;
      })}
    </View>
  );
};

// Boolean editor (checkbox/toggle)
const BooleanEditor: React.FC<{
  params: ParamDef[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  theme: any;
}> = ({ params, values, onChange, theme }) => {
  return (
    <View style={styles.editorContainer}>
      {params.map((param) => {
        if (param.type !== "boolean") return null;
        const isChecked = !!values[param.key];

        return (
          <TouchableOpacity
            key={param.key}
            style={styles.booleanRow}
            onPress={() => onChange(param.key, !isChecked)}
          >
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: isChecked
                    ? theme.colors.primary
                    : "transparent",
                  borderColor: isChecked
                    ? theme.colors.primary
                    : theme.colors.secondaryText,
                },
              ]}
            >
              {isChecked && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <Text style={[styles.booleanLabel, { color: theme.colors.text }]}>
              {param.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    // paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  scrollView: {
    maxHeight: 200,
  },
  criterionCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  removeButton: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 8,
  },
  editorContainer: {
    gap: 8,
  },
  rangeRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  selectGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: "400",
  },
  timeframeContainer: {
    marginTop: 0,
  },
  timeframeButtons: {
    flexDirection: "row",
    gap: 8,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
  },
  timeframeButtonActive: {},
  timeframeButtonText: {
    fontSize: 13,
    fontWeight: "400",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  optionButtonActive: {},
  optionButtonText: {
    fontSize: 13,
    fontWeight: "500",
  },
  booleanRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkIcon: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  booleanLabel: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  unitLabel: {
    fontSize: 11,
    marginBottom: 4,
    fontStyle: "italic",
  },
});
