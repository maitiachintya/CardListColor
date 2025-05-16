import {Dispatch} from 'redux';
import {AxiosResponse} from 'axios';
import {API} from '@app/utils/constants';
import {instance} from '@app/utils/server/instance';
import {
  setDailyChecking,
  setEmotionColor,
  setJournallingScore,
  setMindfulnessScore,
  setMoodReports,
  setMoodScore,
  setStoryScore,
} from '@app/redux/slice/graph.slice';

const {graph} = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const getMoodScore = (payload: {time: string; kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.moodScore,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setMoodScore(result?.data?.data));
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

const getMoodReports = (payload: {time: string; kid_id: string}) => {
  return async (dispatch: Dispatch) => {

    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.moodReports,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setMoodReports(result?.data?.data));
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

const getEmotionColorList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(
        graph.emotionColorList,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setEmotionColor(result?.data?.data));
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

const getMindfulnessScore = (payload: {time: string; kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    // console.log('getMindfulnessScore ', payload);

    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.mindfulnessScore,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setMindfulnessScore(result?.data?.data));
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

const getDailyChecking = (payload: {kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.dailyChecking,
        payload,
      );
      const {status, data} = result;

      // console.log('getDailyChecking result ', result);

      if (data?.status === 200) {
        dispatch(setDailyChecking(result?.data?.data));
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

const getJournallingScore = (payload: {time: string; kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    // console.log('getMindfulnessScore ', payload);

    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.journallingGraph,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setJournallingScore(result?.data?.data));
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

const getStoryScore = (payload: {time: string; kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    // console.log('getMindfulnessScore ', payload);

    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.storyGraph,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setStoryScore(result?.data?.data));
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

const getDailyRoutine = (payload: {time: string; kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.dailyRoutine,
        payload,
      );
      const {status, data} = result;

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

const getDailyRoutineTaskColor = (payload: {kid_id: string; time: string}) => {
  
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.dailyRoutineTaskColor,
        payload,
      );
      const {status, data} = result;

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

const getMonthlyTrend = (payload: {kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        graph.monthlyTrend,
        payload,
      );
      const {status, data} = result;

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

export {
  getMoodScore,
  getMoodReports,
  getEmotionColorList,
  getMindfulnessScore,
  getDailyChecking,
  getJournallingScore,
  getStoryScore,
  getDailyRoutine,
  getMonthlyTrend,
  getDailyRoutineTaskColor,
};
