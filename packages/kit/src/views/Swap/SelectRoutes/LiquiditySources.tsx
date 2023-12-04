import type { FC } from 'react';

import { StyleSheet } from 'react-native';

import { Box, Text, Typography } from '@onekeyhq/components';

import type { Provider } from '../typings';

type LiquiditySourcesProps = {
  providers?: Provider[];
  isDisabled?: boolean;
};

export const LiquiditySources: FC<LiquiditySourcesProps> = ({
  providers,
  isDisabled,
}) => {
  // const isSmall = useIsVerticalLayout();

  // const sources = providers?.map((item) => item.logoUrl).filter(Boolean) ?? [];
  const text = 'Camly Super Wallet Swap';
  // if (providers?.length === 1) {
  //   text = providers[0].name;
  // } else if (providers?.length && providers?.length >= 2) {
  //   text = `${providers.length} Exchanges`;
  // }

  // if (isSmall) {
  //   return <SwappingViaLogos size={6} sources={sources} />;
  // }
  return (
    <Box
      // flexDirection="row"
      alignItems="center"
      bg="surface-neutral-subdued"
      borderRadius={12}
      py="2"
      px="2"
    >
      {/* <SwappingViaLogos sources={sources} /> */}
      {providers && providers.length > 0 ? (
        providers?.map((e) => (
          <Text
            style={styles.text}
            numberOfLines={1}
            ellipsizeMode="tail"
            color={isDisabled ? 'text-disabled' : 'text-default'}
          >
            {`${e.name[0]?.toUpperCase()}${e.name?.substring(1)}`}
          </Text>
        ))
      ) : (
        <Typography.Caption
          color={isDisabled ? 'text-disabled' : 'text-default'}
        >
          {text}
        </Typography.Caption>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    lineHeight: 13,
    textAlign: 'center',
    width: '96%',
    overflow: 'hidden',
  },
});
