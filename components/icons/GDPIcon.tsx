import React from "react";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

const GDPIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#000000",
  style,
}) => {
  return (
    <Svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.6953 1.97137C18.3967 1.81674 18.0421 1.81447 17.7416 1.96526L4.1929 8.76306C3.83789 8.94118 3.61377 9.30437 3.61377 9.70156V26.5331C3.61377 26.9355 3.84381 27.3026 4.206 27.478L17.7547 34.0414C18.048 34.1835 18.3906 34.1814 18.6821 34.0356L31.8062 27.4735C32.1619 27.2957 32.3867 26.9321 32.3867 26.5344V9.70024C32.3867 9.30789 32.1679 8.94827 31.8195 8.76785L18.6953 1.97137ZM6.50412 9.61731L11.3534 7.18427L22.7078 12.9419L17.9198 15.3029L6.50412 9.61731ZM5.41377 11.0852V26.063L17.1857 31.7657V16.9482L5.41377 11.0852ZM24.7256 11.9469L13.354 6.18052L18.2071 3.74557L29.4989 9.59312L24.7256 11.9469ZM18.9857 31.8713L30.5867 26.0709V11.0637L18.9857 16.7842V31.8713Z"
        fill={color}
      />
    </Svg>
  );
};

export default GDPIcon;
