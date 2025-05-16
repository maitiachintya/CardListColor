import {Dispatch} from 'redux';
import {AxiosResponse} from 'axios';
import {
  setJournalsDetails,
  setJournalsList,
  setRoutineList,
  setRoutineThumnails,
  setStoryList,
} from '@app/redux/slice/others.slice';
import {
  ADD_ROUTINE_TYPE,
  DELETE_ROUTINE_TYPE,
  initial_journalDataInterface_id_image_cat,
  initial_journalDataInterface_id_title_image,
  STORY_DETAILS_TYPE,
  STORY_LIST_TYPE,
} from '@app/types';
import {API} from '@app/utils/constants';
import {instance} from '@app/utils/server/instance';

const {dailyRoutine, story, user, resource, feedback, card} = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const getRoutineThumnails = () => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(
        dailyRoutine.imagelist,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setRoutineThumnails(result?.data?.data));
      }

      return {
        success: status === 200,
        message: data?.message,
        data: result?.data?.data,
      };
    } catch (error: any) {
      console.log('error  -- ',error.response);
      
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const getDailyRoutineList = (payload: {kidId: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        dailyRoutine.list,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setRoutineList(result?.data?.data));
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

const addDailyRoutine = (payload: ADD_ROUTINE_TYPE) => {
  console.log('payload -- ', payload);

  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        dailyRoutine.add,
        payload,
      );
      const {status, data} = result;

      console.log('status, data -- ', status, data);

      if (data?.status === 200) {
        getDailyRoutineList({kidId: payload?.kidId});
      }

      return {
        success: status === 200,
        message: data?.message,
      };
    } catch (error: any) {
      console.log('error -- ', error.response);

      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const deleteDailyRoutine = (payload: DELETE_ROUTINE_TYPE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        dailyRoutine.delete,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        getDailyRoutineList({kidId: payload?.kid_id});
      }

      return {
        success: status === 200,
        message: data?.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const getAllStoryList = (payload: STORY_LIST_TYPE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        story.list,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setStoryList(result?.data?.data));
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

const getStoryDetails = (payload: STORY_DETAILS_TYPE) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        story.details,
        payload,
      );
      const {status, data} = result;

      console.log('getStoryDetails result -- ', result);

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

const getKidReports = (payload: {kidId: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(
        `${user.reportCard}${payload.kidId}`,
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

const getAllCategoryList = (payload?: {search: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.category,
        payload,
      );
      const {status, data} = result;

      return {
        success: status === 200,
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

const getAllResourceList = (payload: {search?: string; category: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.list,
        payload,
      );
      const {status, data} = result;

      return {
        success: status === 200,
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

const getAllActivityWorksheet = (payload: {
  search?: string;
  category?: string;
  kid_id?: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.activityWorksheet,
        payload,
      );
      const {status, data} = result;

      return {
        success: status === 200,
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

const setResourceVisibleOrNot = (payload: {
  resource: string;
  kid_id: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.addAndRemove,
        payload,
      );
      const {status, data} = result;

      return {
        success: status === 200,
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

const getAllJournalsList = (payload: {kid_id: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.journalsLists,
        payload,
      );
      const {status, data} = result;

      if (data?.status === 200) {
        dispatch(setJournalsList(result?.data?.data));
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

const getJournalsDetails = (payload: {kid_id: string; date: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.journalsDetails,
        payload,
      );
      const {status, data} = result;

      console.log('result -- ', result);

      if (data?.status === 200) {
        dispatch(
          setJournalsDetails({
            day: result?.data?.data?.day || 'Monday',
            cover_color: result?.data?.data?.cover_color || '',
            kindness: result?.data?.data?.kindness || ['', '', ''],
            colorsList: result?.data?.data?.kindness_colors_list || [],
            feeling:
              result?.data?.data?.feeling ||
              initial_journalDataInterface_id_title_image,
            proud: result?.data?.data?.proud || [],
            i_did: result?.data?.data?.i_did || [],
            struggle:
              result?.data?.data?.struggle ||
              initial_journalDataInterface_id_image_cat,
            struggle_other: result?.data?.data?.struggle_other || '',
            greatful_for: result?.data?.data?.greatful_for || [],
            favourite_food:
              result?.data?.data?.favourite_food ||
              initial_journalDataInterface_id_image_cat,
            excited_for_tomorrow:
              result?.data?.data?.excited_for_tomorrow ||
              initial_journalDataInterface_id_image_cat,
            excited_for_tomorrow_other:
              result?.data?.data?.excited_for_tomorrow_other || '',
            things_to_do_on_weekend:
              result?.data?.data?.things_to_do_on_weekend ||
              initial_journalDataInterface_id_image_cat,
            wishes_for_next_week:
              result?.data?.data?.wishes_for_next_week ||
              initial_journalDataInterface_id_image_cat,
            wishes_for_next_week_other:
              result?.data?.data?.wishes_for_next_week_other || '',
            weekend_wishes:
              result?.data?.data?.weekend_wishes ||
              initial_journalDataInterface_id_image_cat,
            weekend_wishes_other:
              result?.data?.data?.weekend_wishes_other || '',
          }),
        );
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

const getDailyFeedback = (payload: {kid_id: string; local_time: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        feedback.dailyFeedback,
        payload,
      );
      const {status, data} = result;

      return {
        success: status === 200,
        message: data?.message || '',
        data: {
          feedback: data?.data?.feedback || '',
          tips: data?.data?.tips || '',
          activities: data?.data?.activities || '',
          lastUpdateDate: data?.data?.lastUpdateDate || '',
          moduleindfulness: data?.data?.Mindfulness || '',
          journaling: data?.data?.Journaling || '',
          story: data?.data?.story || '',
          routine: data?.data?.routine || '',
          games: data?.data?.games || '',
          daily_checkin: data?.data?.daily_checkin || '',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const getQuotesCards = () => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.get(card.dailyCards);
      const {status, data} = result;

      console.log('result -- ', result);

      return {
        success: status === 200,
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

const getCardsList = (payload: {page: number; limit: number}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        card.lists,
        payload,
      );
      const {status, data} = result;

      return {
        success: status === 200,
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

const getAllResourceVideoList = (payload: {
  search?: string;
  category: string;
  kid_id: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.videoList,
        payload,
      );
      const {status, data} = result;

      console.log('getAllResourceVideoList result -- ', result);

      return {
        success: status === 200,
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

const getVideoCategoryList = (payload?: {search: string}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        resource.videoCategory,
        payload,
      );
      const {status, data} = result;

      return {
        success: status === 200,
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

const getDailyMoodFeedback = (payload: {
  kid_id: string;
  local_time: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        feedback.biweeklyMoodFeedback,
        payload,
      );
      const {status, data} = result;
      console.log('mood -- result --> ', result);

      return {
        success: status === 200,
        message: data?.message,
        data: {
          feedback: data?.data?.feedback || '',
          date: data?.data?.lastUpdateDate || '',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

const getDailyMindfulnessFeedback = (payload: {
  kid_id: string;
  local_time: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<any> = await instance.post(
        feedback.biweeklyMindfulnessFeedback,
        payload,
      );
      const {status, data} = result;

      console.log('mind -- result --> ', result);

      return {
        success: status === 200,
        message: data?.message,
        data: {
          feedback: data?.data?.feedback || '',
          date: data?.data?.lastUpdateDate || '',
        },
      };
    } catch (error: any) {
      console.log('error -- ', error?.response);

      return {
        success: false,
        message: `${error.response?.data?.message}`,
      };
    }
  };
};

export {
  getDailyRoutineList,
  addDailyRoutine,
  deleteDailyRoutine,
  getAllStoryList,
  getKidReports,
  getStoryDetails,
  getAllCategoryList,
  getAllResourceList,
  getAllJournalsList,
  getJournalsDetails,
  getDailyFeedback,
  setResourceVisibleOrNot,
  getQuotesCards,
  getCardsList,
  getAllResourceVideoList,
  getVideoCategoryList,
  getAllActivityWorksheet,
  getDailyMoodFeedback,
  getDailyMindfulnessFeedback,
  getRoutineThumnails
};
