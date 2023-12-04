import LayoutHeader from './index';

import { HStack, IconButton, Image } from '@onekeyhq/components';
import { NetworkAccountSelectorTriggerMobile } from '@onekeyhq/kit/src/components/NetworkAccountSelector';
// import WalletSelectorTrigger from '@onekeyhq/kit/src/components/WalletSelector/WalletSelectorTrigger/WalletSelectorTrigger';
import HomeMoreMenu from '@onekeyhq/kit/src/views/Overlay/HomeMoreMenu';

const headerLeft = () => (
  <Image
    style={{ width: 40, height: 40 }}
    source={{
      uri: 'https://i.imgur.com/odyHHob.png',
    }}
  />
);
const headerRight = () => (
  <HStack space={3} alignItems="center">
    <NetworkAccountSelectorTriggerMobile />
    <HomeMoreMenu>
      <IconButton
        name="EllipsisVerticalOutline"
        type="plain"
        size="lg"
        circle
        m={-2}
      />
    </HomeMoreMenu>
  </HStack>
);
export function LayoutHeaderMobile() {
  return (
    <LayoutHeader
      testID="App-Layout-Header-Mobile"
      showOnDesktop={false}
      // headerLeft={() => <AccountSelector />}
      headerLeft={headerLeft}
      // headerRight={() => <ChainSelector />}
      headerRight={headerRight}
    />
  );
}
