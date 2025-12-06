import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ActiveCriterion } from './types';

const PRESETS_STORAGE_KEY = 'my_filter_presets';

export interface FilterPreset {
  id: string;
  name: string;
  active: ActiveCriterion[];
  createdAt: string;
}

/**
 * Load all saved filter presets
 */
export async function loadPresets(): Promise<FilterPreset[]> {
  try {
    const json = await AsyncStorage.getItem(PRESETS_STORAGE_KEY);
    if (!json) return [];
    
    const presets = JSON.parse(json);
    return Array.isArray(presets) ? presets : [];
  } catch (error) {
    console.error('Error loading presets:', error);
    return [];
  }
}

/**
 * Save a new filter preset
 */
export async function savePreset(preset: FilterPreset): Promise<void> {
  try {
    const presets = await loadPresets();
    presets.push(preset);
    await AsyncStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error('Error saving preset:', error);
    throw error;
  }
}

/**
 * Update an existing preset
 */
export async function updatePreset(preset: FilterPreset): Promise<void> {
  try {
    const presets = await loadPresets();
    const index = presets.findIndex((p) => p.id === preset.id);
    
    if (index === -1) {
      throw new Error('Preset not found');
    }
    
    presets[index] = preset;
    await AsyncStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error('Error updating preset:', error);
    throw error;
  }
}

/**
 * Delete a preset
 */
export async function deletePreset(id: string): Promise<void> {
  try {
    const presets = await loadPresets();
    const filtered = presets.filter((p) => p.id !== id);
    await AsyncStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting preset:', error);
    throw error;
  }
}
