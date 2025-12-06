import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

const MenuIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#000000',
  style 
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <Path
        d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
        fill={color}
      />
    </Svg>
  );
};

export default MenuIcon;