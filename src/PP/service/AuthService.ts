import {Dispatch} from 'redux';
import axios, {AxiosResponse} from 'axios';
import {instance} from '@app/utils/server/instance';
import {createFrom} from '@app/utils/helper/Validation';
import {
  resetAuth,
  setfocusAssessmentList,
  setGoalsList,
  setGradeList,
  setInterestList,
  setUserAvater,
  setUserStatus,
} from '../../redux/slice/auth.slice';
import {
  KIDS_REGISTER_TYPE,
  RESENT_OTP_TYPE,
  SIGN_IN_TYPE,
  SIGN_UP_TYPE,
  USER_ROLE,
  VERIFY_OTP_TYPE,
} from '../../types';
import {resetOthers} from '@app/redux/slice/others.slice';
import {resetUser} from '@app/redux/slice/user.slice';
import {API} from '@app/utils/constants';
import Storage from '@app/utils/storage';
import {reset} from '@app/utils/helper/RootNaivgation';
import {showMessage} from '../helper/Toast';

const {avater, auth, interest, focus_assessment, goal, kids, grade, cms} = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const getUserAvater = (payload: {role: USER_ROLE}) => {
  console.log('Call API - getUserAvater', payload);
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(
        `${avater.avater_images}${payload.role}`,
      );

      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setUserAvater(result?.data?.data));
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

const userActive = (payload: {
  token: string;
  refreshToken: string;
  childInfo: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      // console.log('token -- ', payload.token);
      // console.log('refreshToken -- ', payload.refreshToken);
      // console.log('child-info -- ', payload.childInfo);

      Storage.setItem('token', payload.token);
      Storage.setItem('refresh-token', payload.refreshToken);
      Storage.setItem('child-info', payload.childInfo);

      if (payload.childInfo !== '0' && payload.token) {
        dispatch(setUserStatus(true));
        reset(0, 'TabNavigation');
      }
    } catch (error: any) {
      console.log('error --- ', error);
    }
  };
};

const signUp = (payload: SIGN_UP_TYPE) => {
  // console.log('signUp payload -- ', payload);

  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        auth.signup,
        createFrom(payload),
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
      };
    } catch (error: any) {
      console.log('error -- ', error?.response);

      let _message = error?.response
        ? error.response?.data?.message
        : error?.message;
      return {
        success: false,
        message: _message,
      };
    }
  };
};

const signIn = (payload: SIGN_IN_TYPE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        auth.login,
        createFrom(payload),
        _header,
      );

      const {status, data} = result;

      console.log('data  - -', data);

      return {
        success: status === 200,
        message: data?.message,
        data: data,
      };
    } catch (error: any) {
      console.log('error -- ', error);

      return {
        code: error.response.data?.status,
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const verifyOtp = (payload: VERIFY_OTP_TYPE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        auth.verfiyOtp,
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
      console.log('error?.response -- ', error?.response);

      return {
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const resendOtp = (payload: RESENT_OTP_TYPE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        auth.resendOtp,
        payload,
        _header,
      );

      const {status, data} = result;
      return {
        success: status === 200,
        message: data?.message,
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

const logoutRequest = () => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(auth.logout);

      const {status, data} = result;

      if (status === 200) {
        Storage.clearAll();
        dispatch(resetAuth());
        dispatch(resetOthers());
        dispatch(resetUser());
        dispatch(setUserStatus(false));
        reset(0, 'SignIn');
      }

      return {
        success: status === 200 && data?.status === 201,
        message: data?.message,
      };
    } catch (error: any) {
      if (error?.response) {
        Storage.clearAll();
        dispatch(setUserStatus(false));
        reset(0, 'SignIn');
      }

      return {
        success: false,
        message: error?.response
          ? `${error.response?.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

const getUserGradeList = () => {
  console.log('Call API - getUserGradeList');
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(grade.list);

      const {status, data} = result;

      if (data?.status === 200 && data?.data) {
        dispatch(setGradeList(data?.data));
      }

      return {
        success: status === 200 && data?.status === 201,
        message: data?.message,
        data: data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const getUserInterestList = () => {
  console.log('Call API - getUserInterestList');
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(interest.list);

      const {status, data} = result;

      if (data?.status === 200 && data?.data) {
        dispatch(setInterestList(data?.data));
      }

      return {
        success: status === 200 && data?.status === 201,
        message: data?.message,
        data: data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const getUserGoalsList = () => {
  console.log('Call API - getUserGoalsList');
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(goal.list);

      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setGoalsList(data?.data));
      }

      return {
        success: status === 200 && data?.status === 201,
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

const getUserFocusAssessmentList = () => {
  console.log('Call API - getUserFocusAssessmentList');
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(
        focus_assessment.list,
      );

      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setfocusAssessmentList(data?.data));
      }

      return {
        success: status === 200 && data?.status === 201,
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

const registerKid = (payload: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        kids.register,
        payload,
        _header,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
      };
    } catch (error: any) {
      let _message = error?.response
        ? error.response?.data?.message
        : error?.message;
      return {
        success: false,
        message: _message,
      };
    }
  };
};

const getTermsAndConditions = () => {
  console.log('Call API - getTermsAndConditions');
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(
        cms.termsAndConditions,
      );

      const {status, data} = result;

      return {
        success: status === 200 && data?.status === 201,
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

const removeAccount = () => {
  return async (dispatch: Dispatch) => {
    try {
      Storage.clearAll();
      dispatch(resetAuth());
      dispatch(resetOthers());
      dispatch(resetUser());
      dispatch(setUserStatus(false));
      reset(0, 'SignIn');
      showMessage('Logged out successfully');
    } catch (error: any) {
      if (error?.response) {
        Storage.clearAll();
        dispatch(setUserStatus(false));
        reset(0, 'SignIn');
        showMessage('Logged out successfully');
      }
    }
  };
};

const updateTimeZone = (payload: {timeZone: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        auth.timezone,
        payload,
      );

      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message,
      };
    } catch (error: any) {
      return {
        code: error.response.data?.status,
        success: false,
        message: error?.response
          ? `${error.response.data?.message}`
          : `${error?.message}`,
      };
    }
  };
};

export {
  getUserAvater,
  signUp,
  signIn,
  verifyOtp,
  resendOtp,
  userActive,
  logoutRequest,
  getUserInterestList,
  getUserGoalsList,
  getUserFocusAssessmentList,
  registerKid,
  getUserGradeList,
  getTermsAndConditions,
  removeAccount,
  updateTimeZone,
};
