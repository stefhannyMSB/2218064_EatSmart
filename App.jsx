// import * as React from 'react';
// import {Discover} from './src/screens';
// export default function App() {
//   return <Discover />;
// }

// import * as React from 'react';
// import {Profile} from './src/screens';
// export default function App() {
//   return <Profile />;
// }

import * as React from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();

  console.log('FCM token', token);
}

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
registerAppWithFCM();

import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
export default function App() {
  return (
    <NavigationContainer>
     <Router/>
    </NavigationContainer>
  );
}
