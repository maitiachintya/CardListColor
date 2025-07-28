export type RootAuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type RootMainStackParamList = {
  TabNavigation: undefined;
};

export type RootMainTabParamList = {
  Dashboard: undefined;
  List: undefined;
  Profile: undefined
};

export type SIGN_IN_TYPE = {
  username: string;
  password: string;
  expiresInMins: number;
};
