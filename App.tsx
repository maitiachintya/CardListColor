import 'react-native-gesture-handler';
import StackNavigation from './src/navigators/StackNavigation';
import {useEffect} from 'react';
import Storage from './src/utils/storage';
import {useAppDispatch} from './src/redux/store/Store';
import {setToken} from './src/redux/reducer/AuthReducer';

const App = () => {
  const dispatch = useAppDispatch();

  async function getUserToken() {
    let token = await Storage.getItem('token');
    let refreshToken = await Storage.getItem('refresh-token');

    console.log('Token -- ', token);
    console.log('Refresh Token --- ', refreshToken);

    dispatch(
      setToken({
        token: token || '',
        refreshToken: refreshToken || '',
      }),
    );
  }

  useEffect(() => {
    setTimeout(() => {
      getUserToken();
    }, 2000);
  }, []);

  return <StackNavigation />;
};

export default App;
