import {SupportCharacterList} from '@app/types';
import {BUCKET_URL} from '@env';
import {
  Colors,
  DummyImages,
  GIFs,
  hexToRGB,
  Icons,
  Images,
} from '@themes/index';

export const IMAGES = {
  avater: `${BUCKET_URL}/uploads/avatar/`,
  profile: `${BUCKET_URL}/uploads/user/profile_pic/`,
  goal: `${BUCKET_URL}/uploads/goal/`,
  interest: `${BUCKET_URL}/uploads/interest/`,
  dailyRoutine: `${BUCKET_URL}/uploads/dailyRoutine/`,
  backgroundImage: `${BUCKET_URL}/uploads/backgroundImage/`,
  emotional: `${BUCKET_URL}/uploads/emotional/`,
  charecters: `${BUCKET_URL}/uploads/charecters/`,
  stickerImage: `${BUCKET_URL}/uploads/stickerImage/`,
  resource: `${BUCKET_URL}/uploads/resource/file/`,
  resourceThumbnail: `${BUCKET_URL}/uploads/resource/thumbnail/`,
  journal_base_url: `${BUCKET_URL}/uploads/journallingImage/`,
  journal_emotion: `${BUCKET_URL}/uploads/emotional/`,
  videoResources: `${BUCKET_URL}/uploads/videoResource/file/`,
  videoThumbnail: `${BUCKET_URL}/uploads/videoResource/thumbnail/`,
  activityWorksheets: `${BUCKET_URL}/uploads/activityWorksheets/thumbnail/`,
  activityWorksheetsFile: `${BUCKET_URL}/uploads/activityWorksheets/file/`,
  routineThumbnail: `${BUCKET_URL}/uploads/dailyRoutineStaticImage/`,
};

type StickerImageProps = {
  category: string;
  imageType: 'main' | 'thumbnail';
  image: string;
};

export const getStickerImage = ({
  category,
  imageType,
  image,
}: StickerImageProps) => {
  let img = `${BUCKET_URL}/uploads/stickerImage/${category}/${imageType}/${image}`;
  return img;
};

export const API = {
  avater: {
    avater_images: 'api/avatar/list/',
  },
  auth: {
    login: 'api/user/signin',
    signup: 'api/user/signup',
    verfiyOtp: 'api/user/verify-otp',
    resendOtp: 'api/user/resent-otp',
    logout: 'api/user/logout',
    refreshToken: 'api/user/refresh-token',
    timezone: 'api/user/time-zone/update'
  },
  user: {
    profile: 'api/user/profile',
    forgotPassword: 'api/user/forgot-password',
    resendForgotPassword: 'api/user/resend-forgot-password-otp',
    forgotOtpVerify: 'api/user/forget-password-otp-verification',
    forgotPasswordChange: 'api/user/forget-password-change-password',
    deleteAccount: 'api/user/delete',
    changePassword: 'api/user/change-password',
    updateUserDetails: 'api/user/personal-information/update',
    reportCard: 'api/kids/report-card/',
    kidChangePassword: 'api/user/kids-change-password',
  },
  interest: {
    list: 'api/interest/list',
    add: 'api/interest/add',
  },
  focus_assessment: {
    list: 'api/focusAssessment/list',
  },
  goal: {
    list: 'api/goal/list',
    add: 'api/goal/add',
  },
  grade: {
    list: 'api/grade/list',
  },
  kids: {
    register: 'api/kids/register',
    update: 'api/Kids/profile-information/update',
  },
  cms: {
    termsAndConditions: 'api/cms/details/terms-conditions',
    privacyPolicy: 'api/cms/details/privacy-policy',
    contactUs: 'api/cms/details/contact-us',
  },
  dailyRoutine: {
    list: 'api/daily-routine/list',
    add: 'api/daily-routine/custom-add',
    delete: 'api/daily-routine/custom-delete',
    imagelist: 'api/daily-routine-static-image/list'
  },
  story: {
    list: 'api/story/list/',
    details: 'api/story/details/',
  },
  resource: {
    list: 'api/resource/list',
    category: 'api/resource/category-list',
    journalsLists: 'api/parent-journalling/list',
    journalsDetails: 'api/parent-journalling/details',
    addAndRemove: 'api/resource/share-video', // 'api/resource/add-remove',
    videoList: 'api/video/list',
    videoCategory: 'api/video/category-list',
    activityWorksheet: 'api/activityWorksheets/list',
  },
  graph: {
    moodScore: 'api/graph/mood-score',
    moodReports: 'api/graph/mood-reports',
    emotionColorList: 'api/graph/emotion-color-list',
    mindfulnessScore: 'api/graph/mindfulness-score',
    dailyChecking: 'api/graph/daily-checking',
    journallingGraph: 'api/graph/journalling',
    storyGraph: 'api/graph/story',
    dailyRoutine: 'api/graph/daily-routine',
    monthlyTrend: 'api/graph/monthly-trend',
    dailyRoutineTaskColor: 'api/graph/daily-routine-task-color',
  },
  feedback: {
    dailyFeedback: 'api/openAi/daily-feedback',
    biweeklyMoodFeedback: 'api/openAi/biweekly-mood-feedback',
    biweeklyMindfulnessFeedback: 'api/openAi/biweekly-mindfulness-feedback',
  },
  card: {
    dailyCards: 'api/affirmation-cards/daily-quotes',
    lists: 'api/affirmation-cards/list',
  },
};

const characterList: SupportCharacterList[] = [
  {
    _id: '673475f71b8b727053ff63d1', // need to change later
    title: 'Cousin Lilly',
    relation: 'Cousin',
    pronounce: 'Loving',
    icon: GIFs?.companion_cousine_lili,
  },
  {
    _id: '673475f71b8b727053ff63d2', // need to change later
    title: 'Liza',
    pronounce: 'Miss',
    relation: 'Curious Neighbor',
    icon: GIFs?.companion_miss_liza,
  },
  {
    _id: '673475f71b8b727053ff63d3', // need to change later
    title: 'Coach Sunny',
    pronounce: '',
    relation: 'Sports Coach',
    icon: GIFs?.companion_coach_sunny,
  },
  {
    _id: '673475f71b8b727053ff63d4', // need to change later
    title: 'Zee',
    pronounce: 'Mrs.',
    relation: 'Mom',
    icon: GIFs?.companion_miss_zee,
  },
  {
    _id: '673475f71b8b727053ff63d5', // need to change later
    title: 'Jerry',
    pronounce: 'Mr.',
    relation: 'Dad',
    icon: GIFs?.companion_mr_jerry,
  },
];

export const getCharacterImage = (id: string) => {
  let obj = characterList.find(item => item._id === id);
  return obj?.icon;
};

/***************************************************************************/

export const CHILD_ADD_INSTRACTION = [
  {
    icon: Images.basic_info,
    title: 'Basic Information',
    description: 'Curabitur consequat elit sit amet',
  },
  {
    icon: Images.mascot,
    title: 'Mascot',
    description: 'Phasellus eleifend purus id diam',
  },
  {
    icon: Images.interest,
    title: 'Interest',
    description: 'Phasellus eleifend purus id diam',
  },
  {
    icon: Images.focus_assessments,
    title: 'Focus Assessments',
    description: 'Phasellus eleifend purus id diam',
  },
  {
    icon: Images.goals,
    title: 'Goals',
    description: 'Phasellus eleifend purus id diam',
  },
  {
    icon: Images.passcode,
    title: 'Set Passcode',
    description: 'Phasellus eleifend purus id diam',
  },
];

export const GENDER = [
  {
    icon: Icons.male,
    title: 'Male',
  },
  {
    icon: Icons.female,
    title: 'Female',
  },
  {
    icon: Icons.others,
    title: 'Others',
  },
  {
    icon: Icons.others,
    title: 'Don’t want to disclose ',
  },
];

export const KIDS_INFO = ['Words', 'Sentences', 'Paragraphs'];

export const PLAY_TIME_OPTIONS = [
  {title: '30 minutes', value: 30},
  {title: '60 minutes', value: 60},
  {title: '90 minutes', value: 90},
];

export const GOALS_IMAGES = [
  DummyImages.goalsImg1,
  DummyImages.goalsImg2,
  DummyImages.goalsImg3,
  DummyImages.goalsImg4,
  DummyImages.goalsImg5,
  DummyImages.goalsImg6,
  DummyImages.goalsImg7,
  DummyImages.goalsImg8,
];

export const COLORS_INTEREST = [
  {
    linearColor: ['#DFFEFA', '#F1FFFD'],
    selectedColor: hexToRGB('#098D80', 0.3),
    color: '#098D80',
  },
  {
    linearColor: ['#E6FEDF', '#F7FFF5'],
    selectedColor: '#CBF4C0',
    color: '#37B91A',
  },
  {
    linearColor: ['#DFEBFE', '#F8FBFF'],
    selectedColor: '#D7E3F8',
    color: '#1D5BAF',
  },
  {
    linearColor: ['#FBE4FF', '#FAF7FF'],
    selectedColor: hexToRGB('#810EA5', 0.3),
    color: '#810EA5',
  },
  {
    linearColor: ['#D0FFD2', '#F1FFFD'],
    selectedColor: '#B6F8BC',
    color: '#0CB482',
  },
  {
    linearColor: ['#FFFFD5', '#FFFFED'],
    selectedColor: '#EBEBAD',
    color: '#A5A50A',
  },
  {
    linearColor: ['#FFDBD5', '#FFF9F8'],
    selectedColor: hexToRGB('#BF6E60', 0.3),
    color: '#BF6E60',
  },
];

export const COLORS_FOCUS_ASSESSMENT = [
  {
    backgroundColor: '#BCFFDD',
    color: '#3FD78A',
    width: '70%',
  },
  {
    backgroundColor: '#FFC8ED',
    color: '#FC68CA',
    width: '75%',
  },
  {
    backgroundColor: '#C7E3FF',
    color: '#66B4FF',
    width: '85%',
  },
  {
    backgroundColor: '#FFE9C5',
    color: '#FFB53C',
    width: '90%',
  },
  {
    backgroundColor: '#E1D3FF',
    color: '#A378FF',
    width: '95%',
  },
];

export const SELECTION_DATA = [
  {
    id: 1,
    image: Images.role1,
    title: 'I’m a Teacher',
    shadowColor: Colors.cobalt,
  },
  {
    id: 2,
    image: Images.role2,
    title: 'I’m a Parent',
    shadowColor: Colors.aqua,
  },
  {
    id: 3,
    image: Images.role3,
    title: 'I’m a Therapist/Counselor',
    shadowColor: Colors.gamboge,
  },
];

export const SUBSCRIPTION_PLAN = [
  'Daily Mindfulness Challenges',
  'Games - De-Stress & Regulate Emotions',
  'Track Kids Progress',
  'Mood Tracking & Feedback',
  'Parent Portal',
];

export const REPORT_TYPES = [
  {
    title: 'Mood',
    color: Colors.violet_Velvet,
  },
  {
    title: 'Mindfulness',
    color: Colors.perfume,
  },
  {
    title: 'Game',
    color: Colors.drifting_Dream,
  },
  {
    title: 'Activities',
    color: Colors.lavender_Princess,
  },
];

export const REPORT_CATEGORY = [
  {
    title: 'Anger',
    color: Colors.egyptian_Blue,
  },
  {
    title: 'Frustrated',
    color: Colors.waiporoporo_Purple,
  },
  {
    title: 'Calm',
    color: Colors.strawberry_Pink,
  },
  {
    title: 'Sad',
    color: Colors.pelati,
  },
  {
    title: 'Happy',
    color: Colors.boredom_Buster,
  },
  {
    title: 'Disappointed',
    color: Colors.luminous_Lavender,
  },
  {
    title: 'Surprised',
    color: Colors.north_Texas_Green,
  },
  {
    title: 'Jealous',
    color: Colors.pale_Beryl,
  },
  {
    title: 'Embarrassed',
    color: Colors.stylish,
  },
  {
    title: 'lonely',
    color: Colors.bone,
  },
  {
    title: 'Excited',
    color: Colors.matt_Purple,
  },
  {
    title: 'Bored',
    color: Colors.blueberry_Soft_Blue,
  },
  {
    title: 'Anxious',
    color: Colors.beacon_Blue,
  },
  {
    title: 'Worried',
    color: Colors.C64_NTSC,
  },
  {
    title: 'Guilty',
    color: Colors.C64_NTSC,
  },
  {
    title: 'Afraid',
    color: Colors.shadow_Azalea_Pink,
  },
  {
    title: 'Proud',
    color: Colors.trunks_Hair,
  },
  {
    title: 'Confused',
    color: Colors.boredom_Buster,
  },
  {
    title: 'Shy',
    color: Colors.jubilant_Meadow,
  },
];

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const YEARS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export const dayMapping: any = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};
