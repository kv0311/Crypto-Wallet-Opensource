import * as React from 'react';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';
const SVGAccountInfoOption = (props: SvgProps) => (
  <Svg
    width={296}
    height={60}
    viewBox="0 0 296 60"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={295} height={59} rx={7.5} fill="white" />
    <Rect
      x={0.5}
      y={0.5}
      width={295}
      height={59}
      rx={7.5}
      stroke="url(#paint0_linear_709_2092)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_709_2092"
        x1={309.129}
        y1={29.3333}
        x2={0.00000252401}
        y2={29.3333}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E8D571" />
        <Stop offset={0.209778} stopColor="#F6F0A0" />
        <Stop offset={0.481238} stopColor="#DAAA50" />
        <Stop offset={0.724421} stopColor="#FAF4A4" />
        <Stop offset={1} stopColor="#BA9654" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGAccountInfoOption;
