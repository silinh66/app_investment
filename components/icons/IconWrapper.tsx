import React from 'react';
import { View, ViewStyle } from 'react-native';

interface IconWrapperProps {
  children: React.ReactNode;
  size?: number;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  style?: ViewStyle;
}

/**
 * IconWrapper - Utility component for adding background, padding, and styling to icons
 * Useful for creating icon buttons or styled icon containers
 */
const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  size = 40,
  backgroundColor = 'transparent',
  borderRadius = 0,
  padding = 8,
  style,
}) => {
  const wrapperStyle: ViewStyle = {
    width: size,
    height: size,
    backgroundColor,
    borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    padding,
    ...style,
  };

  return <View style={wrapperStyle}>{children}</View>;
};

export default IconWrapper;