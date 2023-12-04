import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from './useAppSelector';

import { initializeApp } from 'firebase/app';

import type { User } from 'firebase/auth';

import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  // signOut,
} from 'firebase/auth';

import backgroundApiProxy from '../background/instance/backgroundApiProxy';
import { clearAllUserData } from '../store/reducers/user';

const firebaseConfig = {
  apiKey: 'AIzaSyC1TsI0nqwdcvNdIIauiCJxcIgprFnUj_s',
  authDomain: 'camly-auth.firebaseapp.com',
  projectId: 'camly-auth',
  storageBucket: 'camly-auth.appspot.com',
  messagingSenderId: '568377431690',
  appId: '1:568377431690:web:ea93a3bb0eb139146d7f73',
  measurementId: 'G-B9B6DCTT2Y',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// function LaunchAuthFlow(interactive: boolean) {
//   return new Promise((resolve, reject) => {
//     const manifest = chrome.runtime.getManifest();

//     const clientId = encodeURIComponent(manifest.oauth2?.client_id || '');
//     const scopes = encodeURIComponent(manifest.oauth2?.scopes?.join(' ') || '');
//     const redirectUri = encodeURIComponent(
//       `https://${chrome.runtime.id}.chromiumapp.org`,
//     );

//     let authURL = 'https://accounts.google.com/o/oauth2/auth';
//     authURL += `?client_id=${clientId}`;
//     authURL += `&response_type=token`;
//     authURL += `&redirect_uri=${redirectUri}`;
//     authURL += `&scope=${scopes}`;
//     console.log('authURL', authURL);
//     chrome.identity.launchWebAuthFlow(
//       {
//         url: authURL,
//         interactive,
//       },
//       (redirectedTo) => {
//         if (chrome.runtime.lastError) {
//           console.log(chrome.runtime.lastError.message);
//           resolve(null);
//         } else {
//           console.log('redirectedTo', redirectedTo);
//           let idToken = redirectedTo?.substring(
//             redirectedTo.indexOf('id_token=') + 9,
//           );
//           idToken = idToken?.substring(0, idToken.indexOf('&'));
//           resolve(idToken);
//         }
//       },
//     );
//   });
// }

interface Token {
  accessToken: string;
  idToken: string;
}
export const useGooleSignIn = () => {
  const [ggUser, setGgUser] = useState<User | null>();
  const [ggToken, setGgToken] = useState<Token | null>();

  const { user } = useAppSelector((s) => s.user);

  const signInWithoutUpdateUser = useCallback(() => {
    try {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        if (chrome.runtime.lastError || !token) {
          console.log(
            `SSO ended with an error: ${JSON.stringify(
              chrome.runtime.lastError,
            )}`,
          );
          return;
        }

        signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
          .then(async (res) => {
            const accessToken = token;
            const idToken = await res?.user.getIdToken();
            const currentUser = res?.user;

            if (currentUser) {
              setGgUser(currentUser);
            }

            if (token && idToken) {
              setGgToken({
                accessToken: accessToken || '',
                idToken,
              });
              backgroundApiProxy.serviceUser.initDataMobile({
                idToken,
                accessToken,
              });
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const signIn = useCallback(() => {
    try {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError || !token) {
          console.log(
            `SSO ended with an error: ${JSON.stringify(
              chrome.runtime.lastError,
            )}`,
          );
          return;
        }

        signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
          .then(async (res) => {
            const accessToken = token;
            const idToken = await res?.user.getIdToken();
            const currentUser = res?.user;

            if (currentUser) {
              setGgUser(currentUser);
            }

            if (token && idToken) {
              setGgToken({
                accessToken: accessToken || '',
                idToken,
              });
              backgroundApiProxy.serviceUser.initDataMobile({
                idToken,
                accessToken,
              });
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  // const signInFlow = useCallback(async () => {
  //   const result = await LaunchAuthFlow(true);
  //   console.log('result', result);
  // }, []);

  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      chrome.identity.clearAllCachedAuthTokens(() => {
        setGgUser(null);
        setGgToken(null);
        backgroundApiProxy.dispatch(clearAllUserData());
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    signInWithoutUpdateUser();
  }, [signInWithoutUpdateUser]);

  return {
    ggUser,
    ggToken,
    signIn,
    logout,
    user,
  };
};
