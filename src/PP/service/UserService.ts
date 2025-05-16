import {Dispatch} from 'redux';
import {AxiosResponse} from 'axios';
import {API} from '@app/utils/constants';
import {
  CHANGE_PASSWORD,
  FORGOT_PASSWORD_CHANGE,
  FORGOT_PASSWORD_REQUEST,
  UPDATE_KIDS_INFORMATION,
  UPDATE_USER_INFORMATION,
  VERIFY_OTP_TYPE,
} from '../../types';
import {setUserInfo} from '../../redux/slice/user.slice';
import {instance} from '@app/utils/server/instance';
import {createFrom} from '@app/utils/helper/Validation';

const {user, kids} = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const getUserDetails = () => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(user.profile);
      const {status, data} = result;

      if (data?.status === 200) {
        console.log('UserInfo -- ', result?.data?.data);

        dispatch(setUserInfo(result?.data?.data));
      }

      return {
        success: status === 200,
        message: data?.message,
        data: result?.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const forgotPasswordRequest = (payload: FORGOT_PASSWORD_REQUEST) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        user.forgotPassword,
        payload,
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const forgotPasswordResendRequest = (payload: FORGOT_PASSWORD_REQUEST) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        user.resendForgotPassword,
        payload,
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const forgotPasswordOtpVerifyRequest = (payload: VERIFY_OTP_TYPE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        user.forgotOtpVerify,
        payload,
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const forgotPasswordChangeRequest = (payload: FORGOT_PASSWORD_CHANGE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        user.forgotPasswordChange,
        payload,
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const deleteUserAccount = () => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(user.deleteAccount);
      const {status, data} = result;

      console.log('delete account result -- ',result);
      

      return {
        success: status === 200,
        message: data?.message,
        data: result?.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const changePasswordRequest = (payload: CHANGE_PASSWORD) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        user.changePassword,
        payload,
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const updateUserInfoRequest = (payload: UPDATE_USER_INFORMATION) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        user.updateUserDetails,
        createFrom(payload),
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      console.log('error -- ', error?.response);

      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const updatekidPassword = (payload: {kid_id: string; new_password: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        user.kidChangePassword,
        payload,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      console.log('error -- ', error?.response);

      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const updateKidInfoRequest = (payload: UPDATE_KIDS_INFORMATION) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        kids.update,
        payload,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      console.log('error -- ', error?.response);

      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

export {
  getUserDetails,
  forgotPasswordRequest,
  forgotPasswordResendRequest,
  forgotPasswordOtpVerifyRequest,
  forgotPasswordChangeRequest,
  deleteUserAccount,
  changePasswordRequest,
  updateUserInfoRequest,
  updateKidInfoRequest,
  updatekidPassword,
};
