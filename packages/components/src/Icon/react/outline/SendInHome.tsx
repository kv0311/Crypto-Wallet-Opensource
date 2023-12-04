import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SVGSendInHome = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.91666 11.4583C7.91666 12.2667 8.54168 12.9167 9.30834 12.9167H10.875C11.5417 12.9167 12.0833 12.35 12.0833 11.6417C12.0833 10.8833 11.75 10.6083 11.2583 10.4333L8.75 9.55834C8.25833 9.38334 7.92501 9.11668 7.92501 8.35001C7.92501 7.65001 8.46666 7.07501 9.13332 7.07501H10.7C11.4667 7.07501 12.0917 7.72501 12.0917 8.53335"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 6.25V13.75"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.3333 10C18.3333 14.6 14.6 18.3334 10 18.3334C5.4 18.3334 1.66666 14.6 1.66666 10C1.66666 5.40002 5.4 1.66669 10 1.66669"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.3333 5.00002V1.66669H15"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.1667 5.83335L18.3333 1.66669"
      stroke="#115DA9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGSendInHome;
