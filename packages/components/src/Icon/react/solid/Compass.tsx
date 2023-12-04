import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgCompass = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M2.64168 6.19995L10 10.4583L17.3083 6.22492"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 18.0083V10.45"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.0083 10.6917V7.64163C18.0083 6.49163 17.1833 5.09164 16.175 4.53331L11.725 2.06663C10.775 1.53329 9.225 1.53329 8.275 2.06663L3.825 4.53331C2.81667 5.09164 1.99168 6.49163 1.99168 7.64163V12.3583C1.99168 13.5083 2.81667 14.9083 3.825 15.4666L8.275 17.9333C8.75 18.2 9.375 18.3333 10 18.3333C10.625 18.3333 11.25 18.2 11.725 17.9333"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 17.8334C17.4728 17.8334 18.6667 16.6394 18.6667 15.1667C18.6667 13.6939 17.4728 12.5 16 12.5C14.5273 12.5 13.3333 13.6939 13.3333 15.1667C13.3333 16.6394 14.5273 17.8334 16 17.8334Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.1667 18.3333L18.3333 17.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgCompass;
