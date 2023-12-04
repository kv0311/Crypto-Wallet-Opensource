import { memo } from 'react';

import { useIntl } from 'react-intl';

import {
  Box,
  Icon,
  Pressable,
  ToastManager,
  Typography,
} from '@onekeyhq/components';
import { copyToClipboard } from '@onekeyhq/components/src/utils/ClipboardUtils';

interface ReferralCodeBlockProps {
  code: string | number;
  hasCopy?: boolean;
}
const ReferralCodeBlock = ({
  code,
  hasCopy = true,
}: ReferralCodeBlockProps) => {
  const intl = useIntl();

  return (
    <Box
      backgroundColor="action-secondary-default"
      width="full"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderRadius={8}
      px={2}
      py={3}
      mt={3}
      mb={5}
    >
      <Typography.Body1Mono>{code}</Typography.Body1Mono>
      {hasCopy ? (
        <Pressable
          _hover={{ bg: 'surface-hovered' }}
          _pressed={{ bg: 'surface-pressed' }}
          onPress={() => {
            copyToClipboard(`${code}`);
            ToastManager.show({
              title: intl.formatMessage({
                id: 'msg__referral_copied',
                defaultMessage: 'Referral Code Copied',
              }),
            });
          }}
        >
          <Icon name="Square2StackOutline" />
        </Pressable>
      ) : null}
    </Box>
  );
};

export default memo(ReferralCodeBlock);
