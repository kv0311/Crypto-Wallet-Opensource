import type { FC } from 'react';

import { Box, Image } from '@onekeyhq/components';
import camlyLogoDisable from '@onekeyhq/kit/assets/walletLogo/camly_logo_sm_disable.png';
import camlyLogoEnable from '@onekeyhq/kit/assets/walletLogo/camly_logo_sm_enable.png';

import type { ImageSourcePropType } from 'react-native';

type WalletFlipIconProps = {
  baseLogoImage: ImageSourcePropType;
  enable: boolean;
};

export const WalletFlipIcon: FC<WalletFlipIconProps> = ({
  baseLogoImage,
  enable,
}) => (
  <Box w="40px" h="40px" justifyContent="center" alignItems="center">
    <Image source={baseLogoImage} size={8} />
    <Box position="absolute" right="0" bottom="0">
      <Image src={enable ? camlyLogoEnable : camlyLogoDisable} size={4} />
    </Box>
  </Box>
);
