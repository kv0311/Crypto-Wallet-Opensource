import { useIsVerticalLayout } from '@onekeyhq/components';

import ReferralCode from '../../../views/ReferralCode';
import { ReferralCodeRoutes } from '../../../views/ReferralCode/type';

import createStackNavigator from './createStackNavigator';

import type { ReferralCodeRoutesParams } from '../../../views/ReferralCode/type';

const ReferralCodeNavigator = createStackNavigator<ReferralCodeRoutesParams>();
const modelRoutes = [
  {
    name: ReferralCodeRoutes.ReferralCodeModel,
    component: ReferralCode,
  },
];

const ReferralCodeModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <ReferralCodeNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: !!isVerticalLayout,
      }}
    >
      {modelRoutes.map((route) => (
        <ReferralCodeNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </ReferralCodeNavigator.Navigator>
  );
};
export default ReferralCodeModalStack;
