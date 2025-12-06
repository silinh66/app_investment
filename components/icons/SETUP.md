# Icon System Configuration

## Quick Setup Instructions

### 1. Required Dependencies
Make sure you have `react-native-svg` installed:
```bash
npm install react-native-svg
# or
yarn add react-native-svg
```

For Expo projects:
```bash
expo install react-native-svg
```

### 2. File Structure Created
```
components/
  icons/
    ├── index.ts              # Main export file
    ├── README.md             # Detailed documentation
    ├── SETUP.md              # This file
    ├── ExampleUsage.tsx      # Usage examples
    ├── IconWrapper.tsx       # Utility component
    └── [IconName].tsx        # Individual icon files
```

### 3. Add Your Icons from Figma

#### Step-by-Step Process:
1. **Export from Figma**: Right-click icon → Copy as SVG
2. **Create component file**: Copy any existing icon file (e.g., HomeIcon.tsx)
3. **Replace the path**: Update the `d` attribute in the `<Path>` element
4. **Update viewBox**: Match your SVG's viewBox if different from 24x24
5. **Add to index.ts**: Export your new icon
6. **Import and use**: `import { YourIcon } from '@/components/icons'`

#### Template for New Icon:
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
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="PASTE_YOUR_SVG_PATH_HERE" fill={color} />
    </Svg>
  );
};

export default YourIconName;
```

### 4. Usage Examples

#### Basic Usage:
```typescript
import { HomeIcon } from '@/components/icons';

<HomeIcon size={24} color="#007AFF" />
```

#### In Tab Navigator:
```typescript
import { HomeIcon } from '@/components/icons';

<Tab.Screen
  name="home"
  options={{
    tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />
  }}
/>
```

#### With Background:
```typescript
import { HomeIcon, IconWrapper } from '@/components/icons';

<IconWrapper size={48} backgroundColor="#007AFF" borderRadius={24}>
  <HomeIcon size={24} color="#FFFFFF" />
</IconWrapper>
```

### 5. Icon Naming Best Practices

- Use PascalCase: `HomeIcon`, `UserProfileIcon`
- Be descriptive: `ChartLineUpIcon` vs `ChartIcon`
- Include variations: `HeartIcon`, `HeartFilledIcon`
- Include directions: `ArrowUpIcon`, `ArrowLeftIcon`

### 6. TypeScript Benefits

- Full type safety
- IntelliSense autocomplete
- Props validation
- Consistent interface across all icons

### 7. Performance Benefits

- No image loading required
- Scales perfectly on all devices
- Small bundle size
- Themeable colors
- Fast rendering

### 8. Common Props

All icons accept these props:
- `size?: number` - Icon size (default: 24)
- `color?: string` - Fill color (default: '#000000')
- `style?: ViewStyle` - Additional styling

### 9. Troubleshooting

**Icon not showing?**
- Check if the SVG path is correct
- Verify the viewBox dimensions
- Make sure the icon is exported in index.ts

**TypeScript errors?**
- Ensure the icon file exists
- Check the export statement in index.ts
- Verify the import path

**Performance issues?**
- Keep SVG paths simple
- Avoid complex gradients or effects
- Use single fill colors when possible

### 10. Next Steps

1. Replace the example icons with your Figma designs
2. Update the icon names to match your design system
3. Test on different screen sizes
4. Consider adding icon categories for better organization

This system is now ready to use! Just copy your SVG paths from Figma and paste them into the icon components.