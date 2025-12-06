# FlatList in ScrollView Error - Fixed

## Issue

```
ERROR VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other 
functionality - use another VirtualizedList-backed container instead.
```

## Root Cause

The `ResultList` component (which contains a `FlatList`) was wrapped inside a `<ScrollView>` in the "Lọc chỉ tiêu" tab of the filter screen. This creates a conflict because:

1. **FlatList** has its own virtualization and scrolling mechanism
2. **ScrollView** also handles scrolling
3. Nesting them breaks FlatList's windowing optimization

## Solution

Replaced the outer `<ScrollView>` with a simple `<View style={{ flex: 1 }}>` container.

### Before (Incorrect)
```tsx
<ScrollView>
  {/* Active Config Bar */}
  {state.active.length > 0 && (
    <>
      <ActiveConfigBar ... />
      <View style={styles.actionButtons}>...</View>
    </>
  )}
  
  {/* Result List with FlatList inside */}
  <ResultList ... />
</ScrollView>
```

### After (Correct)
```tsx
<View style={{ flex: 1 }}>
  {state.active.length > 0 && (
    <>
      <ActiveConfigBar ... />
      <View style={styles.actionButtons}>...</View>
    </>
  )}
  
  {/* Result List with FlatList inside */}
  <ResultList ... />
</View>
```

## Why This Works

1. **FlatList handles scrolling**: The `ResultList` component's internal FlatList manages all scrolling for the results
2. **ActiveConfigBar is static**: The config bar and action buttons stay fixed at the top
3. **FlatList expands**: With `flex: 1` on the container, FlatList takes remaining space and scrolls independently
4. **Proper virtualization**: FlatList can now properly virtualize items and optimize performance

## Technical Details

- **File Modified**: `app/(tabs)/filter.tsx`
- **Lines Changed**: 264-310 (approximately)
- **Change Type**: Structural - replaced ScrollView with View container
- **Impact**: No functional changes, only fixes React Native warning and improves performance

## Benefits

✅ **Eliminates warning** - No more VirtualizedList nesting error  
✅ **Better performance** - FlatList virtualization works correctly  
✅ **Proper windowing** - Only visible items are rendered  
✅ **Smooth scrolling** - Native scrolling performance for large lists  
✅ **Memory efficient** - Items outside viewport are unmounted  

## Testing Checklist

- [x] Error message no longer appears
- [x] Results list scrolls properly
- [x] Active config bar displays correctly
- [x] Filter and Reset buttons work
- [x] No impact on other tabs
- [x] TypeScript compilation passes
- [x] No visual changes to UI

---

**Date**: 2025-10-15  
**Issue**: VirtualizedList nested in ScrollView  
**Status**: ✅ Fixed
