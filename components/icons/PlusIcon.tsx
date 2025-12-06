import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

const PlusIcon: React.FC<IconProps> = ({ 
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
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.9999 0.399994C10.3313 0.399994 10.5999 0.668623 10.5999 0.999994V9.39999H18.9999C19.3313 9.39999 19.5999 9.66862 19.5999 9.99999C19.5999 10.3314 19.3313 10.6 18.9999 10.6H10.5999V19C10.5999 19.3314 10.3313 19.6 9.9999 19.6C9.66853 19.6 9.3999 19.3314 9.3999 19V10.6H0.999902C0.668532 10.6 0.399902 10.3314 0.399902 9.99999C0.399902 9.66862 0.668532 9.39999 0.999902 9.39999H9.3999V0.999994C9.3999 0.668623 9.66853 0.399994 9.9999 0.399994Z" fill={color}/>
    </Svg>
  );
};

export default PlusIcon;