import React from 'react';
import Svg, { Defs, Path, Pattern, Rect, Use } from 'react-native-svg';
import VnFlag from "./VnFlagIcon.svg"; // 👈 works now
import { View } from 'react-native';
interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

const VnFlagIcon: React.FC<any> = ({ 
  size = 24, 
  color = '#000000',
  style 
}) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <VnFlag />
    </View>

  );
};

export default VnFlagIcon;