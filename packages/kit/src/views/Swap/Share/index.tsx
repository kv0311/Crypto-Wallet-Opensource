import { useEffect, useRef } from 'react';

import { useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import ViewShot from 'react-native-view-shot';

import { Box, Modal, QRCode, Typography } from '@onekeyhq/components';
import LogoPrimary from '@onekeyhq/components/src/Icon/react/illus/LogoPrimary';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import { useNavigation } from '../../../hooks';
import Transaction from '../components/Transaction';
import { useWalletsSwapTransactions } from '../hooks/useTransactions';

import type { SwapRoutes, SwapRoutesParams } from '../typings';
import type { RouteProp } from '@react-navigation/native';

type RouteProps = RouteProp<SwapRoutesParams, SwapRoutes.Transaction>;

const getShareModule = async () => {
  if (!platformEnv.isNative) return null;
  return (
    await import('@onekeyhq/shared/src/modules3rdParty/react-native-share')
  ).default;
};

// const logo =
//   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAMAAAC9ZjJ/AAAAllBMVEUAAAAAuBIAtxAAuBMAtxIAuRIAtxMAuRIAtxIAtxIAuBIAuBMAuBEAsxAAtxIAtxIAuBIAuRIAuBIAuBL///8AtRIAtxIAsxKA2ojf9uG/7cRg0WsgvzCg5Kbv+/BAyk2v6LUQvSFw13pAxk0wxT/P8dMQuiEQtyHv+vBw1HpQzFyQ3Zcwwj6Q4JiQ35fP8tOQ35iP35ce/Hr/AAAAE3RSTlMA3yC/QO9gsJCAz1AwENCgn39wIDfjZgAABGxJREFUeNrtnNlS4zAQReV4zcYALcmWF7ITwjDb///c2BCQwImdcTt2ZyqH5SGVh1NXaklxSs3qmE68wB9ZLrSJZfvBvcNwOHe2C+fDHjrNzVw4O9btoImaDR1he+zf8CzoEMsjmdqH3pidxtSHHjht7o0RZXDusQ2gN+5YNYMb6JHRoNLNgl6xKuwmCLdz2w1c6B13QnNM37Oj63bE7gaIMGIl7oAMQWmnB0KMaU64N9wpM/kGpPCZwRiI4TANqUEtsIlWwxse3eAALMLB6VlnA0Hs/RoHJHEornHvDKmWQ4HLchwgSjGuQyDKkGqtvtcrUMWd0p1yABN2D2TxWABkCZgPOBQvE0Er+NhinfFDcgLaYITdH7LDchJawGKAQ51RzkXKzfgZ5QApl1GWU4flQgpyM044uYyynOJ0h3Uda+glJ4UQYYEIySX3aielKKCXnEYSTE5DOTm4JncyV7mmXOWacrFy16WkimtyTbnKNeVi5xxpOdLDepX7BxKDF2pyIEUocsL8P9atfTmQbwDkf+1A92uIduUW61nyPFsvAEnrcovlXPE9v+ZJCghalpvF/AvZDHDg5bRamTiVgAQvl8b8CH8WOD283OyBH0WlgAAvt+RVPD0jskPLRbyGBGGHlFvyWl4Qdii5Na/nKRXQALRcqvgJxIhTAEIu4594yHbP6ctqN8d/KYGXSz+r7bZhKF5JI/VpYB97kIu5wfdtYSYl5D+53hwRHVKuXA1Rnpo+xUkpok/RCWgARi776gYGUvxGRIeXM7atLCwfzEWMKFis3MzcQvPcKoe9wVqHkvthDqqQ1eOeNIgOIxcbuYSyJtusYzk95WId3LG3bMJu5YwlLhRwEL3YqVDAyeDlUmNCHYvlJ/+gRzk4TERBTki6cjsh61abp27lwNwfZN1qszEKuh68nKotxYX2jztOzjgUrQQcIjFWm47llrX7uuIfPHe8Q6y5ZiWrg+PbjuXMYNSBg3hqHKnmYddyEddsHmXVJ7Mk7PjIBIsH0y6VJTfEzoqWkxE3UIk09JamOE+6ltPRab3F/vWl4iYq7EGu/KQknmdZpvgX0rDbj4Z6Ia4nauSGl1soXkt8wqBi5DCPctQW4YaSq7dTiAmHlpPVdvEW4YaWA/n4s6oWcG7AXEAhRaKOxLbCugH6Spo8rKeSXE0ACouNAI0QSfzlIeeqUJOAw8Zdc9HpPa6i+UblbLLdavuamgQkfjsXhGSuJ0S4Z/+QE03APMCi4yvQYmju2QTaQxa/7eGwKYE+IEegfhGS9BVSsjchHZZDdNJZjNEd11tG+FL1gH6TAZrReZfQ2IJiZ4siOKqtLV6DozrrxszAB1LcMgNiZ5Oi4xbZ/kIeoXaC5eNIiREQ4ebSWrwRsTPdTCYEStYdUG0WCWBNLrOVZW7Xa83eVLj1fWgPqLUS1rhjdgKDb9AD/pSdxrjz8Gzn/2gTXeDZgACdWv3c6yA+F9E6fXjO/Fw7N8Ph3Ae+bbVrZY38wJvU1udfiwGx6zsgLxcAAAAASUVORK5CYII=';
const logo =
  'data:image/png;base64,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';

const Share = () => {
  const ref = useRef<ViewShot | null>(null);
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const transactions = useWalletsSwapTransactions();
  const tx = transactions.find((s) => s.hash === route.params.txid);

  useEffect(() => {
    async function onCapture() {
      const uri = await ref.current?.capture?.();
      if (uri) {
        const share = await getShareModule();
        const options = Platform.select({
          ios: {
            activityItemSources: [
              {
                placeholderItem: { type: 'url' as const, content: logo },
                item: {
                  default: { type: 'url' as const, content: `file://${uri}` },
                },
                linkMetadata: {
                  title: 'Share',
                },
              },
            ],
            failOnCancel: true,
          },
          default: {
            url: `file://${uri}`,
            title: 'Share',
            filename: 'onekey_share.png',
            failOnCancel: true,
          },
        });
        if (!share) return;
        await share.open(options).catch(() => {
          console.log('something wrong');
        });
        navigation.goBack();
      }
    }
    const timer = setTimeout(onCapture, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!tx) {
    return null;
  }

  return (
    <Modal footer={null} staticChildrenProps={{}}>
      <Box w="full" h="full" position="relative">
        <ViewShot ref={ref}>
          <Box px={{ base: 4, md: 6 }} py="6" bg="surface-subdued">
            <Transaction tx={tx} />
            <Box
              mt="8"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <LogoPrimary width={82} height={25} />
                <Typography.Caption mt="2" color="text-subdued">
                  All-in-one crypto wallet
                </Typography.Caption>
              </Box>
              <Box bg="white" p="1" borderRadius={4} shadow="depth.4">
                <QRCode
                  value="https://onekey.so/download"
                  size={64}
                  logoSize={0}
                  logoMargin={0}
                  logoBackgroundColor="white"
                />
              </Box>
            </Box>
          </Box>
        </ViewShot>
        <Box position="absolute" top="0" left="0" w="full" h="full" />
      </Box>
    </Modal>
  );
};

export default Share;
