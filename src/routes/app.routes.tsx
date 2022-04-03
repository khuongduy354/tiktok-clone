import React, { useState } from 'react';
import { StatusBar, Platform } from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeButtom from '../components/HomeButton';
import Discover from '../pages/Discover';
import Home from '../pages/Home';
import Inbox from '../pages/Inbox';
import Me from '../pages/Me';
import Record from '../pages/Record';
import UploadVid from '../pages/Record/UploadVid';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
  const [home, setHome] = useState(true);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  StatusBar.setBarStyle('dark-content');

  if (Platform.OS === 'android') StatusBar.setBackgroundColor('#fff');

  if (home) {
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('light-content');
    }
  } else {
    StatusBar.setHidden(false);
  }

  return (
    <Tab.Navigator
      shifting={false}
      barStyle={{
        backgroundColor: home ? '#000' : '#fff',
      }}
      initialRouteName="Home"
      activeColor={home ? '#fff' : '#000'}
    >
      <Tab.Screen
        name="Home"
        children={() => (
          <Home
            //@ts-ignore
            email={email}
            userId={userId}
            isLoggedIn={isLoggedIn}
          />
        )}
        listeners={{
          focus: () => setHome(true),
          blur: () => setHome(false),
        }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        children={() => (
          <UploadVid
            //@ts-ignore
            email={email}
            isLoggedIn={isLoggedIn}
          />
        )}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <HomeButtom home={home} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        children={() => (
          <Me
            //@ts-ignore
            email={email}
            setEmail={setEmail}
            isLoggedIn={true}
            setIsLoggedIn={setIsLoggedIn}
            setUserId={setUserId}
          />
        )}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStackScreen: React.FC = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Main"
        component={AppRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Record"
        component={Record}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
