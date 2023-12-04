import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SVGReceiveInHome = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.66667 7.08331H12.0833"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 13.75H6.66667"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.75 13.75H12.0833"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.3333 11.6917V13.425C18.3333 16.35 17.5917 17.0834 14.6333 17.0834H5.36667C2.40834 17.0834 1.66667 16.35 1.66667 13.425V6.57502C1.66667 3.65002 2.40834 2.91669 5.36667 2.91669H12.0833"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.6667 2.91669V7.91669L18.3333 6.25002"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.6667 7.91667L15 6.25"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGReceiveInHome;
