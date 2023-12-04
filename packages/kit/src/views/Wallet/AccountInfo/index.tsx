import type { FC } from 'react';
import { useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useIntl } from 'react-intl';

import {
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Skeleton,
  Text,
  Tooltip,
  Typography,
  useIsVerticalLayout,
  useUserDevice,
} from '@onekeyhq/components';
import { DesktopDragZoneAbsoluteBar } from '@onekeyhq/components/src/DesktopDragZoneBox';
import { shortenAddress } from '@onekeyhq/components/src/utils';
import { FormatCurrencyNumber } from '@onekeyhq/kit/src/components/Format';
import {
  getActiveWalletAccount,
  useActiveWalletAccount,
} from '@onekeyhq/kit/src/hooks/redux';
import type { ReceiveTokenRoutesParams } from '@onekeyhq/kit/src/routes/Root/Modal/types';
import {
  ModalRoutes,
  ReceiveTokenModalRoutes,
  RootRoutes,
  TabRoutes,
} from '@onekeyhq/kit/src/routes/routesEnum';
import type { ModalScreenProps } from '@onekeyhq/kit/src/routes/types';
import type { SendRoutesParams } from '@onekeyhq/kit/src/views/Send/types';

import backgroundApiProxy from '../../../background/instance/backgroundApiProxy';
import { useAccountValues, useNavigationActions } from '../../../hooks';
import { useCopyAddress } from '../../../hooks/useCopyAddress';
import useOpenBlockBrowser from '../../../hooks/useOpenBlockBrowser';
import { calculateGains } from '../../../utils/priceUtils';
import AccountMoreMenu from '../../Overlay/AccountMoreMenu';
import { showAccountValueSettings } from '../../Overlay/AccountValueSettings';
// import { ImageBackground } from 'react-native';
import WalletSelectorTrigger from '@onekeyhq/kit/src/components/WalletSelector/WalletSelectorTrigger/WalletSelectorTrigger';

type NavigationProps = ModalScreenProps<ReceiveTokenRoutesParams> &
  ModalScreenProps<SendRoutesParams>;

export const FIXED_VERTICAL_HEADER_HEIGHT = 270;
export const FIXED_HORIZONTAL_HEDER_HEIGHT = 152;

const AccountAmountInfo: FC = () => {
  const intl = useIntl();

  const { account, wallet, networkId, accountId, network } =
    useActiveWalletAccount();

  const { copyAddress } = useCopyAddress({ wallet });

  const accountAllValues = useAccountValues({
    networkId,
    accountId,
  });

  const { openAddressDetails, hasAvailable } = useOpenBlockBrowser(network);

  const { screenWidth } = useUserDevice();

  const summedValueComp = useMemo(
    () =>
      accountAllValues.value.isNaN() ? (
        <Skeleton shape="DisplayXLarge" />
      ) : (
        <HStack flex="1" alignItems="center" justifyContent="center">
          <Typography.Display2XLarge
            numberOfLines={2}
            isTruncated
            color="text-on-primary"
          >
            <FormatCurrencyNumber decimals={2} value={accountAllValues.value} />
          </Typography.Display2XLarge>
          <IconButton
            name="ChevronDownMini"
            onPress={showAccountValueSettings}
            type="plain"
            circle
            iconColor="text-on-primary"
            outlineColor="text-on-primary"
            ml={1}
          />
        </HStack>
      ),
    [accountAllValues],
  );

  const changedValueComp = useMemo(() => {
    const { gainNumber, percentageGain, gainTextColor } = calculateGains({
      basePrice: accountAllValues.value24h.toNumber(),
      price: accountAllValues.value.toNumber(),
    });

    return accountAllValues.value.isNaN() ? (
      <Skeleton shape="Body1" />
    ) : (
      <>
        <Typography.Body1Strong color="text-on-primary" mr="4px">
          {percentageGain}
        </Typography.Body1Strong>
        <Typography.Body1Strong color="text-on-primary">
          (<FormatCurrencyNumber value={Math.abs(gainNumber)} decimals={2} />)
          {` ${intl.formatMessage({ id: 'content__today' })}`}
        </Typography.Body1Strong>
      </>
    );
  }, [intl, accountAllValues]);

  return (
    <Box
      alignItems="center"
      // flex="1"
      justifyContent="center"
      // backgroundColor={'text-default'}
      borderRadius={8}
      // minH={200}
    >
      <Box position="absolute" top={0} zIndex={100}>
        <WalletSelectorTrigger />
      </Box>
      <Icon name="AccountInfoBG" width={350} height={200} />
      <Box
        style={{
          position: 'absolute',
        }}
      >
        <Box flexDir="row" alignItems="center">
          <Tooltip
            hasArrow
            placement="top"
            label={intl.formatMessage({ id: 'action__copy_address' })}
          >
            <Pressable
              flexDirection="row"
              alignItems="center"
              py="4px"
              px="8px"
              rounded="12px"
              _hover={{ bg: 'surface-hovered' }}
              _pressed={{ bg: 'surface-pressed' }}
              onPress={() => {
                copyAddress({
                  address: account?.address,
                  displayAddress: account?.displayAddress,
                });
              }}
            >
              <Text
                typography={{ sm: 'Body2', md: 'CaptionStrong' }}
                mr={2}
                color="text-on-primary"
              >
                {shortenAddress(
                  account?.displayAddress ?? account?.address ?? '',
                )}
              </Text>
              <Icon
                name="Square2StackOutline"
                color="text-on-primary"
                size={16}
              />
            </Pressable>
          </Tooltip>
          {hasAvailable ? (
            <Tooltip
              hasArrow
              placement="top"
              label={intl.formatMessage({ id: 'form__blockchain_browser' })}
            >
              <Pressable
                p={1}
                rounded="full"
                _hover={{ bg: 'surface-hovered' }}
                _pressed={{ bg: 'surface-pressed' }}
                onPress={() => openAddressDetails(account?.address)}
              >
                <Icon
                  name="GlobeAltOutline"
                  color="text-on-primary"
                  size={16}
                />
              </Pressable>
            </Tooltip>
          ) : null}
        </Box>
        <Box flexDirection="row" mt={1} w="full">
          {summedValueComp}
        </Box>
        <Box flexDirection="row" mt={1}>
          {changedValueComp}
        </Box>
      </Box>
    </Box>
  );
};

type AccountOptionProps = { isSmallView: boolean };

const AccountOption: FC<AccountOptionProps> = ({ isSmallView }) => {
  const intl = useIntl();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const { wallet, account, network } = useActiveWalletAccount();
  const isVertical = useIsVerticalLayout();
  const { sendToken } = useNavigationActions();
  const iconBoxFlex = isVertical ? 1 : 0;

  const onSwap = useCallback(async () => {
    const token = await backgroundApiProxy.engine.getNativeTokenInfo(
      network?.id ?? '',
    );
    if (token) {
      backgroundApiProxy.serviceSwap.sellToken(token);
      if (account) {
        backgroundApiProxy.serviceSwap.setSendingAccountSimple(account);
        const paymentToken =
          await backgroundApiProxy.serviceSwap.getPaymentToken(token);
        if (paymentToken?.networkId === network?.id) {
          backgroundApiProxy.serviceSwap.setRecipientToAccount(
            account,
            network,
          );
        }
      }
    }
    navigation.getParent()?.navigate(TabRoutes.Swap);
  }, [network, account, navigation]);

  return (
    <Box
      flexDirection="row"
      px={isVertical ? 1 : 0}
      borderColor="border-warning-default"
      borderWidth={1}
      borderRadius={8}
      py={3}
    >
      <Box flex={iconBoxFlex} minW="56px" alignItems="center">
        <IconButton
          circle
          size={isSmallView ? 'base' : 'lg'}
          name="SendInHome"
          type="basic"
          isDisabled={wallet?.type === 'watching' || !account}
          onPress={() => {
            const { accountId, networkId } = getActiveWalletAccount();
            sendToken({ accountId, networkId });
          }}
          backgroundColor="wallet-account-option"
        />
        <Typography.CaptionStrong
          textAlign="center"
          mt="4px"
          color={
            wallet?.type === 'watching' || !account
              ? 'text-disabled'
              : 'focused-default'
          }
        >
          {intl.formatMessage({ id: 'action__send' })}
        </Typography.CaptionStrong>
      </Box>
      <Box flex={iconBoxFlex} minW="56px" alignItems="center">
        <IconButton
          circle
          size={isSmallView ? 'base' : 'lg'}
          name="ReceiveInHome"
          type="basic"
          isDisabled={wallet?.type === 'watching' || !account}
          onPress={() => {
            navigation.navigate(RootRoutes.Modal, {
              screen: ModalRoutes.Receive,
              params: {
                screen: ReceiveTokenModalRoutes.ReceiveToken,
                params: {},
              },
            });
          }}
          backgroundColor="wallet-account-option"
        />
        <Typography.CaptionStrong
          textAlign="center"
          mt="4px"
          color={
            wallet?.type === 'watching' || !account
              ? 'text-disabled'
              : 'focused-default'
          }
        >
          {intl.formatMessage({ id: 'action__receive' })}
        </Typography.CaptionStrong>
      </Box>
      <Box flex={iconBoxFlex} minW="56px" alignItems="center">
        <IconButton
          circle
          size={isSmallView ? 'base' : 'lg'}
          name="SwapInHome"
          type="basic"
          isDisabled={wallet?.type === 'watching' || !account}
          onPress={onSwap}
          backgroundColor="wallet-account-option"
        />
        <Typography.CaptionStrong
          textAlign="center"
          mt="4px"
          color={
            wallet?.type === 'watching' || !account
              ? 'text-disabled'
              : 'focused-default'
          }
        >
          {intl.formatMessage({ id: 'title__swap' })}
        </Typography.CaptionStrong>
      </Box>

      <Box flex={iconBoxFlex} minW="56px" alignItems="center">
        <AccountMoreMenu>
          <IconButton
            circle
            size={isSmallView ? 'base' : 'lg'}
            name="MoreInHome"
            type="basic"
            backgroundColor="wallet-account-option"
          />
        </AccountMoreMenu>
        <Typography.CaptionStrong
          textAlign="center"
          mt="4px"
          color="focused-default"
        >
          {intl.formatMessage({ id: 'action__more' })}
        </Typography.CaptionStrong>
      </Box>
    </Box>
  );
};

const AccountInfo = () => {
  const isSmallView = useIsVerticalLayout();
  if (isSmallView) {
    return (
      <Box
        // pt="24px"
        // pb="24px"
        w="100%"
        px="24px"
        flexDirection="column"
        bgColor="background-default"
        h={FIXED_VERTICAL_HEADER_HEIGHT}
      >
        <AccountAmountInfo />
        <Box
          marginTop={-10}
          marginX={10}
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
          }}
        >
          <AccountOption isSmallView={isSmallView} />
        </Box>
      </Box>
    );
  }
  return (
    <>
      <DesktopDragZoneAbsoluteBar />
      <Box
        h={FIXED_HORIZONTAL_HEDER_HEIGHT}
        py={8}
        px={{ sm: 8, lg: 4 }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bgColor="background-default"
      >
        <AccountAmountInfo />
        <AccountOption isSmallView={isSmallView} />
      </Box>
    </>
  );
};

export default AccountInfo;
