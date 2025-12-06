# Filter Modal - Collapse/Expand Feature

## Summary

Added collapse/expand functionality to family headers in FilterModal, matching web behavior.

## Changes Made

### 1. Added State Management
- Added `expandedFamilies` state using `Set<string>` to track which families are expanded
- Added `toggleFamily` function to handle expand/collapse logic
- Default state: All families collapsed (empty Set)

### 2. Updated Family Header
- Changed from `View` to `TouchableOpacity` to make header clickable
- Added arrow icon (▼ for collapsed, ▲ for expanded)
- Header shows family title and selection count

### 3. Conditional Rendering
- Criteria only render when family is expanded: `{isExpanded && family.criteria.map(...)}`
- Clicking header toggles the expanded state

### 4. Styling Updates
- Added `flexDirection: 'row'` to `familyHeader` style
- Added `justifyContent: 'space-between'` to position title and arrow
- Added `arrowIcon` style for the arrow indicator
- Added `flex: 1` to `familyTitle` to prevent text truncation

## User Experience

**Default State**: All families collapsed (showing only headers with counts)

**User Action**: Click on any family header
- First click: Expands family, shows all criteria, arrow changes to ▲
- Second click: Collapses family, hides criteria, arrow changes to ▼

**Benefits**:
- Cleaner interface - easier to scan family names
- Better performance - only renders visible criteria
- Matches web application behavior
- Reduces scrolling when browsing many families

## Technical Details

```typescript
// State to track expanded families
const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set());

// Toggle function
const toggleFamily = (familyKey: string) => {
  setExpandedFamilies(prev => {
    const next = new Set(prev);
    if (next.has(familyKey)) {
      next.delete(familyKey);
    } else {
      next.add(familyKey);
    }
    return next;
  });
};

// Render logic
const isExpanded = expandedFamilies.has(family.familyKey);

// Header with arrow
<TouchableOpacity onPress={() => toggleFamily(family.familyKey)}>
  <Text>{family.familyTitle} ({family.selectedCount}/{family.totalCount})</Text>
  <Text>{isExpanded ? '▲' : '▼'}</Text>
</TouchableOpacity>

// Conditional criteria rendering
{isExpanded && family.criteria.map((criterion) => (...))}
```

## Testing Checklist

- [x] All families start collapsed
- [x] Clicking header expands family
- [x] Arrow icon changes correctly (▼ → ▲)
- [x] Clicking expanded header collapses family
- [x] Arrow icon changes back (▲ → ▼)
- [x] Multiple families can be expanded simultaneously
- [x] Selection counts update correctly
- [x] No impact on other functionality (search, tabs, selection)
- [x] TypeScript compilation passes
- [x] Styling looks correct in dark/light modes

## Files Modified

- `features/stockFilter/FilterModal.tsx`
  - Added state and logic (lines 30-48)
  - Updated render logic (lines 214-284)
  - Updated styles (lines 407-419)

---

**Date**: 2025-10-15
**Feature**: Collapsible Family Headers
**Status**: ✅ Complete
