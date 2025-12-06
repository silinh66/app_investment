# SVG Icon System Setup Guide

## Overview
This icon system uses SVG components for optimal performance and scalability in React Native.

## Structure
```
components/
  icons/
    index.ts          // Export all icons
    [IconName].tsx    // Individual icon components
    README.md         // This guide
```

## How to Add New Icons from Figma

### Step 1: Export from Figma
1. Select your icon in Figma
2. Right-click → "Copy/Paste as" → "Copy as SVG"
3. Or use "Export" → "SVG" format

### Step 2: Create Icon Component
1. Create a new file: `components/icons/YourIconName.tsx`
2. Use this template:

```typescript
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

const YourIconName: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#000000',
  style 
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"  // Update based on your SVG
      style={style}
    >
      <Path
        d="YOUR_SVG_PATH_DATA_HERE"  // Paste the path data from Figma
        fill={color}
      />
    </Svg>
  );
};

export default YourIconName;
```

### Step 3: Extract Path Data from Figma SVG
When you copy SVG from Figma, you'll get something like:
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2L2 7V22H9V16H15V22H22V7L12 2Z" fill="#000000"/>
</svg>
```

Take the `d` attribute value from the `<path>` element and use it in your component.

### Step 4: Add to Index
Add your new icon to `components/icons/index.ts`:
```typescript
export { default as YourIconName } from './YourIconName';
```

## Usage Examples

### Basic Usage
```typescript
import { HomeIcon, SearchIcon } from '@/components/icons';

// Default size (24) and color (#000000)
<HomeIcon />

// Custom size and color
<SearchIcon size={32} color="#007AFF" />

// With custom styles
<HomeIcon 
  size={20} 
  color="#FF0000" 
  style={{ marginRight: 10 }} 
/>
```

### In Tab Navigation
```typescript
import { HomeIcon, ProfileIcon } from '@/components/icons';

// In your tab navigator
<Tabs.Screen
  name="home"
  options={{
    tabBarIcon: ({ color, focused }) => (
      <HomeIcon 
        size={24} 
        color={focused ? '#007AFF' : '#8E8E93'} 
      />
    ),
  }}
/>
```

### In Buttons
```typescript
import { FilterIcon } from '@/components/icons';

<TouchableOpacity style={styles.filterButton}>
  <FilterIcon size={20} color="#FFFFFF" />
  <Text>Filter</Text>
</TouchableOpacity>
```

## Tips for Figma Export

1. **Optimize SVGs**: Use simple paths, avoid unnecessary groups
2. **Standard ViewBox**: Try to use 24x24 viewBox for consistency
3. **Single Color**: Design icons to use single fill color for easy theming
4. **Test Scaling**: Ensure icons look good at different sizes (16px, 24px, 32px)

## Icon Naming Convention

- Use PascalCase: `HomeIcon`, `SearchIcon`, `ArrowUpIcon`
- Be descriptive: `ChartLineIcon` instead of `ChartIcon` if you have multiple chart types
- Include direction: `ArrowUpIcon`, `ArrowDownIcon`
- Include state if needed: `HeartIcon`, `HeartFilledIcon`

## Common Icon Props

- `size`: Number (default: 24) - Icon size in pixels
- `color`: String (default: '#000000') - Fill color
- `style`: ViewStyle - Additional styling

## Performance Notes

- SVG icons are rendered as native components
- No additional image loading required
- Scales perfectly on all devices
- Small bundle size impact