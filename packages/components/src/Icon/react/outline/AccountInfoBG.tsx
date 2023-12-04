import * as React from 'react';
import Svg, {
  G,
  Rect,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  SvgProps,
} from 'react-native-svg';
import useUserDevice from '../../../Provider/hooks/useUserDevice';
const SVGAccountInfo = (props: SvgProps) => {
  const { screenWidth } = useUserDevice();

  return (
    <Svg
      width={screenWidth}
      height={200}
      viewBox={`0 0 ${screenWidth} 200`}
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_707_2092)">
        <Rect width={screenWidth} height={200} rx={12} fill="#115DA9" />
        <G opacity={0.32}>
          <Circle cx={176} cy={-19} r={59} fill="white" fillOpacity={0.2} />
          <Circle
            cx={176.466}
            cy={-19}
            r={47.4662}
            fill="white"
            fillOpacity={0.3}
          />
          <Circle
            cx={175.932}
            cy={-18.9999}
            r={35.9323}
            fill="white"
            fillOpacity={0.5}
          />
        </G>
        <G opacity={0.32}>
          <Circle
            cx={screenWidth}
            cy={198}
            r={66}
            fill="white"
            fillOpacity={0.2}
          />
          <Circle
            cx={screenWidth}
            cy={198.098}
            r={53.0977}
            fill="white"
            fillOpacity={0.3}
          />
          <Circle
            cx={screenWidth}
            cy={198.195}
            r={40.1955}
            fill="white"
            fillOpacity={0.5}
          />
        </G>
        <G opacity={0.32}>
          <Circle cy={198} r={66} fill="white" fillOpacity={0.2} />
          <Circle
            cx={-1.98495}
            cy={198}
            r={53.0977}
            fill="white"
            fillOpacity={0.3}
          />
          <Circle cy={197.999} r={40.1955} fill="white" fillOpacity={0.5} />
        </G>
      </G>
      <Rect
        x={1}
        y={1}
        width={screenWidth - 2}
        height={198}
        rx={11}
        stroke="url(#paint0_linear_707_2092)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_707_2092"
          x1={screenWidth + (366.569 - 351)}
          y1={97.7776}
          x2={0.00000299299}
          y2={97.7776}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E8D571" />
          <Stop offset={0.209778} stopColor="#F6F0A0" />
          <Stop offset={0.481238} stopColor="#DAAA50" />
          <Stop offset={0.724421} stopColor="#FAF4A4" />
          <Stop offset={1} stopColor="#BA9654" />
        </LinearGradient>
        <ClipPath id="clip0_707_2092">
          <Rect width={screenWidth} height={200} rx={12} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default SVGAccountInfo;
