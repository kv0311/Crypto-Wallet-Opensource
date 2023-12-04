import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SVGSwapInHome = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.0833 12.4916L12.9083 16.675"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.91667 12.4916H17.0833"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.91667 7.50835L7.09167 3.32501"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.0833 7.50836H2.91667"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGSwapInHome;
