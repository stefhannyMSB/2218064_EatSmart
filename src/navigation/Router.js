import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// FIX: Ubah cara import ini. Jika semua komponen diekspor secara default,
// Anda harus mengimpornya satu per satu seperti ini:
import Home from '../screens/Home'; // Asumsi Home.jsx memiliki `export default Home;`
import Discover from '../screens/Discover'; // Asumsi Discover.jsx memiliki `export default Discover;`
import Profile from '../screens/Profile'; // Asumsi Profile.jsx memiliki `export default Profile;`
import BlogDetail from '../screens/BlogDetail'; // Asumsi BlogDetail.jsx memiliki `export default BlogDetail;`
import Search from '../screens/Search'; // FIX: Impor Search secara langsung dari file Search.jsx

import {Home2, LocationDiscover, Receipt21, ProfileCircle} from 'iconsax-react-native';
import { fontType, colors } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.blue(),
        tabBarInactiveTintColor: colors.black(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: fontType['Pjs-Medium'],
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Home2
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({focused, color}) => (
            <LocationDiscover
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <ProfileCircle
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      {/* SearchPage harus diletakkan SEBELUM BlogDetail jika Anda ingin modal muncul di atas tab navigator */}
      <Stack.Screen
        name="SearchPage"
        component={Search} // Ini sekarang harusnya sudah diimpor dengan benar
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          // Menambahkan animasi slide dari bawah untuk modal
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetail}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection : 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};
export default Router;