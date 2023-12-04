import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SVGMoreInHome = (props: SvgProps) => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14 9.33744V9.32696"
      stroke="#115DA9"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 14.0053V13.9948"
      stroke="#115DA9"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 18.6731V18.6626"
      stroke="#115DA9"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGMoreInHome;
