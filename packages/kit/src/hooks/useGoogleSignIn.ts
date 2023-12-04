/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useEffect, useState } from 'react';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { ToastManager } from '@onekeyhq/components';

import backgroundApiProxy from '../background/instance/backgroundApiProxy';
import { clearAllUserData } from '../store/reducers/user';

import { useAppSelector } from './useAppSelector';

import type { User } from '@react-native-google-signin/google-signin';

interface Token {
  accessToken: string;
  idToken: string;
}
export const useGooleSignIn = () => {
  const [ggUser, setGgUser] = useState<User | null>();
  const [ggToken, setGgToken] = useState<Token | null>();

  const { user } = useAppSelector((s) => s.user);

  const showError = useCallback((errMsg) => {
    ToastManager.show(
      {
        title: errMsg,
      },
      {
        type: 'success',
      },
    );
  }, []);

  const initDataMobile = useCallback(
    ({ idToken, accessToken }) => {
      try {
        backgroundApiProxy.serviceUser
          .initDataMobile({
            idToken,
            accessToken,
          })

          .then(() => {});
      } catch (error: any) {
        console.log(error);
        showError(error.message);
      }
    },
    [showError],
  );

  const handleUser = useCallback(
    async (currentUser: User) => {
      const token = await GoogleSignin.getTokens();

      if (currentUser) {
        setGgUser(currentUser);
      }
      if (token) {
        setGgToken(token);
      }
      initDataMobile({
        idToken: currentUser?.idToken,
        accessToken: token?.accessToken,
      });
    },
    [initDataMobile],
  );

  const configure = useCallback(() => {
    GoogleSignin.configure({
      webClientId:
        '568377431690-gcrj4867p707drtms22lhcvuv6u9n3im.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      iosClientId:
        '568377431690-mglcd111ltq6gc8pgmb9nm01nb06ehrs.apps.googleusercontent.com',
    });
  }, []);

  const configureAndHandleUser = useCallback(async () => {
    configure();

    const isSignedIn = await GoogleSignin.isSignedIn();

    let currentUser = null;
    if (isSignedIn) {
      currentUser = await GoogleSignin.getCurrentUser();
    }

    try {
      if (isSignedIn && !currentUser) {
        const newUser = await GoogleSignin.signInSilently();
        if (newUser) {
          await handleUser(newUser);
        }
      }
    } catch (error: any) {
      console.log(error);
      // showError(error.message);
    }
  }, [handleUser, configure]);

  const getCurrentUser = useCallback(async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (!isSignedIn) {
        return;
      }
      const currentUser = await GoogleSignin.getCurrentUser();

      if (currentUser) {
        setGgUser(currentUser);
        const token = await GoogleSignin.getTokens();
        if (token) {
          setGgToken(token);
        }
        initDataMobile({
          idToken: currentUser?.idToken,
          accessToken: token?.accessToken,
        });
      }
    } catch (error: any) {
      console.log(error);
      showError(error.message);
    }
  }, [initDataMobile, showError]);

  const signIn = useCallback(async () => {
    try {
      configure();
      await GoogleSignin.hasPlayServices();
      const currentUser = await GoogleSignin.signIn();
      if (currentUser) {
        await handleUser(currentUser);
      }
    } catch (error: any) {
      console.log(error);
      let errMsg = '';

      if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
        if (error.code === statusCodes.IN_PROGRESS) {
          errMsg = 'Sign In Error';
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          errMsg = 'Play Services Not Available or Outdated';
        } else {
          errMsg = error.message;
        }
        showError(errMsg);
      }
    }
  }, [configure, handleUser, showError]);

  const logout = useCallback(async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setGgUser(null);
      setGgToken(null);
      backgroundApiProxy.dispatch(clearAllUserData());
    } catch (error: any) {
      console.log(error);
      showError(error.message);
    }
  }, [showError]);

  const getTokens = useCallback(async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const token = await GoogleSignin.getTokens();
        if (token) {
          setGgToken(token);
        }
      }
    } catch (error: any) {
      console.log(error);
      showError(error.message);
    }
  }, [showError]);

  const initData = useCallback(async () => {
    await configureAndHandleUser();
    await getCurrentUser();
  }, [configureAndHandleUser, getCurrentUser]);

  useEffect(() => {
    initData();
  }, [initData]);

  return {
    configure,
    getCurrentUser,
    getTokens,
    ggUser,
    ggToken,
    signIn,
    logout,
    user,
  };
};
