import { useNavigation } from '@react-navigation/core';
import { Avatar } from 'native-base';
import { useIntl } from 'react-intl';

import {
  Box,
  Icon,
  Pressable,
  ScrollView,
  Text,
  Typography,
  useSafeAreaInsets,
} from '@onekeyhq/components';
import { useSettings } from '@onekeyhq/kit/src/hooks/redux';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import HelpSelector from '../Help/HelpSelector';

import { useGooleSignIn } from '../../hooks/useGoogleSignInWeb';
import { ModalRoutes, RootRoutes } from '../../routes/routesEnum';
import { ReferralCodeRoutes } from '../ReferralCode/type';

import { AboutSection } from './AboutSection';
// import { AdvancedSection } from './AdvancedSection';
import { DefaultSection } from './DefaultSection';
import { DevSettingSection } from './DevSetting';
import { FooterAction } from './FooterSection';
import { GenaralSection } from './GenaralSection';
// import { HardwareBridgeSection } from './HardwareBridgeSection';
// import { PushSection } from './PushSection';
import { SecuritySection } from './SecuritySection';
import { UtilSection } from './UtilSection';
import backgroundApiProxy from '../../background/instance/backgroundApiProxy';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

export const Me = (options: any) => {
  // useHideTabNavigatorHeader();
  const { enable: devModeEnable } = useSettings().devMode || {};
  console.log('me options >>>>', options);
  const navigation = useNavigation<any>();
  const intl = useIntl();
  const inset = useSafeAreaInsets();

  const { ggUser, signIn, logout, user } = useGooleSignIn();

  return (
    <Box bg="background-default" flex="1">
      <ScrollView px={4} py={{ base: 6, md: 8 }} bg="background-default">
        <Box w="full" maxW={768} mx="auto" pb={`${inset.bottom}px`}>
          {/* Gmail Section */}
          <Box justifyContent="center" alignItems="center" mb={5}>
            {ggUser ? (
              <>
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="full"
                  mb={5}
                >
                  <Box alignItems="center" flexDirection="row" mt={1}>
                    {ggUser.photoURL ? (
                      <Avatar mr={2} source={{ uri: ggUser.photoURL }} />
                    ) : null}
                    <Box>
                      <Typography.DisplaySmall numberOfLines={2} isTruncated>
                        {ggUser.displayName}
                      </Typography.DisplaySmall>
                      <Typography.Caption numberOfLines={2} isTruncated>
                        Camly point: {user?.camlyPoint || 0}
                      </Typography.Caption>
                    </Box>
                  </Box>
                  {/* <Box>
                    <Pressable
                      style={{
                        paddingVertical: 2,
                      }}
                      backgroundColor="icon-success"
                      width={100}
                      mt={2}
                      onPress={() => {}}
                      borderRadius={30}
                    >
                      <Text
                        flex={1}
                        textAlign="center"
                        color="white"
                        typography="CaptionMono"
                        ml={1}
                      >
                        Đã xác minh
                      </Text>
                    </Pressable>
                  </Box> */}
                </Box>
                <Box w="full" mb="6">
                  <Box pb={2}>
                    <Typography.Subheading color="text-subdued">
                      Account
                    </Typography.Subheading>
                  </Box>
                  <Box
                    borderRadius="12"
                    bg="surface-default"
                    borderWidth={1}
                    borderColor="border-subdued"
                  >
                    {/* <Pressable
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      py={4}
                      px={{ base: 4, md: 6 }}
                      onPress={() => {}}
                    >
                      <Icon name="UserOutline" />
                      <Text
                        typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
                        flex={1}
                        mx={3}
                      >
                        KYC
                      </Text>
                      <Box>
                        <Icon
                          name="ChevronRightMini"
                          color="icon-subdued"
                          size={20}
                        />
                      </Box>
                    </Pressable> */}
                    <Pressable
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      py={4}
                      px={{ base: 4, md: 6 }}
                      onPress={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                        navigation.navigate(RootRoutes.Modal, {
                          screen: ModalRoutes.ReferralCode,
                          params: {
                            screen: ReferralCodeRoutes.ReferralCodeModel,
                          },
                        });
                      }}
                    >
                      <Icon name="UserPlusOutline" />
                      <Text
                        typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
                        flex={1}
                        mx={3}
                      >
                        {intl.formatMessage({
                          id: 'title__referral_code',
                          defaultMessage: 'Referral Code',
                        })}
                      </Text>
                      <Box>
                        <Icon
                          name="ChevronRightMini"
                          color="icon-subdued"
                          size={20}
                        />
                      </Box>
                    </Pressable>
                    <Pressable
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      py={4}
                      px={{ base: 4, md: 6 }}
                      onPress={logout}
                    >
                      <Icon color="icon-critical" name="LogoutOutline" />
                      <Text
                        typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
                        color="text-critical"
                        flex={1}
                        mx={3}
                      >
                        {intl.formatMessage({
                          id: 'action__logout',
                        })}
                      </Text>
                      <Box>
                        <Icon
                          name="ChevronRightMini"
                          color="icon-subdued"
                          size={20}
                        />
                      </Box>
                    </Pressable>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                borderRadius="12"
                bg="surface-default"
                borderWidth={1}
                borderColor="border-subdued"
                width="full"
              >
                <Pressable
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  py={4}
                  px={{ base: 4, md: 6 }}
                  onPress={signIn}
                >
                  <Icon name="LoginOutline" />
                  <Text
                    typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
                    flex={1}
                    mx={3}
                  >
                    {intl.formatMessage({
                      id: 'sign_in_with_google',
                      defaultMessage: 'Sign in with Google',
                    })}
                  </Text>
                  <Box>
                    <Icon
                      name="ChevronRightMini"
                      color="icon-subdued"
                      size={20}
                    />
                  </Box>
                </Pressable>
              </Box>
            )}
          </Box>

          <UtilSection />
          <DefaultSection />
          <GenaralSection />
          <SecuritySection />
          {/* // tạm ẩn */}
          {/* <PushSection /> */}
          {/* <AdvancedSection /> */}
          <AboutSection />
          {/* <HardwareBridgeSection /> */}
          <FooterAction />
          {devModeEnable ? <DevSettingSection /> : null}
        </Box>
      </ScrollView>
      {/* <Box
        position="absolute"
        bottom={{ base: 4, md: 8 }}
        right={{ base: 4, md: 8 }}
      >
        <HelpSelector />
      </Box> */}
    </Box>
  );
};

export default Me;
