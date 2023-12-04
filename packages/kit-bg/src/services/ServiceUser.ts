import { getServerEndpoint } from '@onekeyhq/engine/src/endpoint';
import type { User, UserBase } from '@onekeyhq/kit/src/store/reducers/user';
import {
  updateUser,
  updateUserRefs,
  updateUserToken,
} from '@onekeyhq/kit/src/store/reducers/user';
import {
  backgroundClass,
  backgroundMethod,
  bindThis,
} from '@onekeyhq/shared/src/background/backgroundDecorators';

import ServiceBase from './ServiceBase';

import type { AxiosError } from 'axios';

export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface InitDataMobileResponse extends BaseResponse {
  data: {
    authType: string;
    token: string;
    userId: string;
  };
}
export interface GetProfileResponse extends BaseResponse {
  data: {
    user: User;
  };
}

export interface AddReferrerResponse extends BaseResponse {
  data: {
    authType: string;
    token: string;
    userId: string;
  };
}
export interface GetUserRefByMeResponse extends BaseResponse {
  data: {
    data: UserBase[];
  };
}

@backgroundClass()
class ServiceUser extends ServiceBase {
  get baseUrl() {
    return `${getServerEndpoint()}/user`;
  }

  @bindThis()
  @backgroundMethod()
  async initDataMobile(payload: { idToken?: string; accessToken?: string }) {
    const apiUrl = `${this.baseUrl}/oauth2/google/init-data-mobile`;
    const { dispatch } = this.backgroundApi;

    const data = await this.client
      .post<InitDataMobileResponse>(apiUrl, payload)
      .then((resp) => resp.data)
      .catch((error) => {
        console.log(error);
      });

    if (data && data.data.token) {
      dispatch(updateUserToken(data.data.token));
      await this.getProfile(data.data.token);
      await this.getUserRefByMe(data.data.token);
    }

    return data;
  }

  @bindThis()
  @backgroundMethod()
  async getProfile(token?: string) {
    const apiUrl = `${this.baseUrl}/me`;
    const { appSelector, dispatch } = this.backgroundApi;
    const { userToken } = appSelector((s) => s.user);
    const data = await this.client
      .get<GetProfileResponse>(apiUrl, {
        headers: {
          Authorization: `Bearer ${token || userToken}`,
        },
      })
      .then((resp) => resp.data)
      .catch((error) => {
        console.log(error);
      });

    if (data && data.data.user) {
      dispatch(updateUser(data.data.user));
    }
    return data;
  }

  @bindThis()
  @backgroundMethod()
  async addReferrer(payload: { referrerId: string }) {
    const apiUrl = `${this.baseUrl}/referrer`;
    const { appSelector } = this.backgroundApi;
    const { userToken } = appSelector((s) => s.user);
    const data = await this.client
      .put<AddReferrerResponse>(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => resp.data)
      .catch((error: AxiosError) => {
        throw error;
      });

    return data;
  }

  @bindThis()
  @backgroundMethod()
  async getUserRefByMe(token?: string) {
    const apiUrl = `${this.baseUrl}/my-ref`;
    const { appSelector, dispatch } = this.backgroundApi;
    const { userToken } = appSelector((s) => s.user);
    const res = await this.client
      .get<GetUserRefByMeResponse>(apiUrl, {
        headers: {
          Authorization: `Bearer ${token || userToken}`,
        },
      })
      .then((resp) => resp.data)
      .catch((error: AxiosError) => {
        throw error;
      });

    if (res && res.data.data) {
      dispatch(updateUserRefs(res.data.data));
    }

    return res;
  }
}

export default ServiceUser;
