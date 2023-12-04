/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState } from 'react';

import { useIntl } from 'react-intl';

import {
  Box,
  Button,
  Center,
  IconButton,
  Input,
  Modal,
  Spinner,
  ToastManager,
  Typography,
} from '@onekeyhq/components';
import type { AddReferrerResponse } from '@onekeyhq/kit-bg/src/services/ServiceUser';

import backgroundApiProxy from '../../background/instance/backgroundApiProxy';
import { useGooleSignIn } from '../../hooks/useGoogleSignInWeb';
import { wait } from '../../utils/helper';

import ReferralCodeBlock from './components/ReferralCodeBlock';

import type { UserBase } from '../../store/reducers/user';
import type { AxiosError } from 'axios';

export default function ReferralCode() {
  const intl = useIntl();
  const [input, setInput] = useState('');
  const { user } = useGooleSignIn();
  const [refsLoading, setRefsLoading] = useState(true);
  const [refsList, setRefsList] = useState<UserBase[]>([]);

  const addReferrer = useCallback(async () => {
    try {
      const res = await backgroundApiProxy.serviceUser.addReferrer({
        referrerId: input,
      });
      if (res && res.success) {
        const userRes = await backgroundApiProxy.serviceUser.getProfile();
        if (userRes && userRes.success) {
          ToastManager.show(
            {
              title: intl.formatMessage({
                id: 'msg__your_referrer_added',
                defaultMessage: 'Your referrer added',
              }),
            },
            {
              type: 'success',
            },
          );
        }
      }
    } catch (error: unknown) {
      const errorResponse = (error as AxiosError).response
        ?.data as AddReferrerResponse;

      ToastManager.show(
        {
          title: `Error: ${errorResponse?.message || 'Error'}`,
        },
        {
          type: 'error',
        },
      );
    }
  }, [input, intl]);

  const changeUserRefsList = useCallback(async () => {
    if (user.userRefs) {
      try {
        setRefsLoading(true);
        setRefsList(user.userRefs);
        await wait(300);
        setRefsLoading(false);
      } catch (error) {
        setRefsLoading(false);
      }
    } else {
      setRefsLoading(false);
    }
  }, [user.userRefs]);

  const getUserRefs = useCallback(async () => {
    try {
      await backgroundApiProxy.serviceUser.getUserRefByMe();
      await wait(500);
      await changeUserRefsList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   changeUserRefsList();
  // }, [user.userRefs, changeUserRefsList]);

  useEffect(() => {
    getUserRefs();
  }, [getUserRefs]);

  return (
    <Modal
      hidePrimaryAction
      maxHeight="560px"
      header={intl.formatMessage({
        id: 'title__referral_code',
        defaultMessage: 'Referral Code',
      })}
      rightContent={
        <IconButton
          onPress={getUserRefs}
          name="ArrowPathMini"
          isLoading={Boolean(refsLoading)}
          p={2}
          size="sm"
          type="plain"
          circle
        />
      }
      footer={null}
      scrollViewProps={{
        children: (
          <Box>
            <Typography.DisplaySmall>
              {intl.formatMessage({
                id: 'title__your_referral_code',
                defaultMessage: 'Your referral code',
              })}
            </Typography.DisplaySmall>
            <ReferralCodeBlock code={user?.userId || ''} />

            <Box>
              <Typography.DisplaySmall>
                {intl.formatMessage({
                  id: !user?.referrerId
                    ? 'title__enter_referral_code'
                    : 'title__your_referrer',
                  defaultMessage: !user?.referrerId
                    ? "Enter your friend's referral code"
                    : 'Your referrer',
                })}
              </Typography.DisplaySmall>
              {user && !user?.referrerId ? (
                <Box w="full" mt="4" mb={5}>
                  <Input
                    w="full"
                    value={input}
                    size="xl"
                    onChangeText={(text) => setInput(text.trim())}
                    placeholder={intl.formatMessage({
                      id: 'title__referral_code',
                      defaultMessage: 'Referral Code',
                    })}
                  />
                  <Button
                    isDisabled={!input}
                    onPromise={addReferrer}
                    type="primary"
                    mt="2"
                    size="xl"
                  >
                    <Typography.DisplaySmall color="white">
                      {intl.formatMessage({
                        id: 'action__confirm',
                      })}
                    </Typography.DisplaySmall>
                  </Button>
                </Box>
              ) : (
                <ReferralCodeBlock
                  hasCopy={false}
                  code={user?.referrerId || ''}
                />
              )}
            </Box>

            <Box>
              <Typography.DisplaySmall>
                {intl.formatMessage({
                  id: 'title_user_refs',
                  defaultMessage: 'List of people who entered your code',
                })}
              </Typography.DisplaySmall>
              {refsLoading ? (
                <Center mt={5}>
                  <Spinner />
                </Center>
              ) : refsList.length ? (
                <Box mb={3}>
                  {refsList.map((e) => (
                    <Box key={e._id} my={1}>
                      <Typography.Body1>
                        {e.name} - {e.email}
                      </Typography.Body1>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box>
                  <Box mt={3}>
                    <Typography.Body1>
                      {intl.formatMessage({
                        id: 'user_refs_empty',
                        defaultMessage: 'Your list is empty',
                      })}
                    </Typography.Body1>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        ),
      }}
    />
  );
}
