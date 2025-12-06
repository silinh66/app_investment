import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

const BackIcon: React.FC<IconProps> = ({ 
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
      <Path d="M9.9999 19.308L0.691895 10L9.9999 0.692017L11.0639 1.75602L2.81889 10L11.0629 18.244L9.9999 19.308Z" fill={color}/>
    </Svg>
  );
};

export default BackIcon;