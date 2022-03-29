import React, { useEffect, useState } from 'react';
import { Linking, ScrollView } from 'react-native';
import { UserType } from '../../@types/UserType';
import { Button } from 'react-native';

import {
  Container,
  Title,
  Header,
  Avatar,
  Username,
  Content,
  Stats,
  Separator,
  StatsText,
  StatsColumn,
  StatsNumber,
  ProfileColumn,
  ProfileEdit,
  ProfileText,
} from './styles';
import { globalConfig } from '../../../global';
import { TextInput } from 'react-native-paper';

//@ts-ignore
const Me: React.FC = ({ email, setEmail, isLoggedIn, setIsLoggedIn }) => {
  const [tempPassword, setTempPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [avatar, setAvatar] = useState('');
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);

  const [signupMode, setSignupMode] = useState(true);

  const setUserData = (user: UserType) => {
    setEmail(user.email);
    setAvatar(user.avatar);
    setFollowers(user.followingState.followers.length);
    setFollowings(user.followingState.followings.length);
    setUsername(user.name);
  };
  const getVideo = () => {};
  const login = () => {
    const _function = async () => {
      const dest = globalConfig.API_URL + '/user/' + `${email}`;
      const res = await fetch(dest);
      if (res.ok) {
        console.log('ok');
        const data = await res.json();
        console.log(data);
        const user = data.user;
        console.log(user);
        setUserData(user);
        setIsLoggedIn(true);
      }
    };
    _function();
  };
  const signup = () => {
    const function_ = async () => {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      };

      const dest = globalConfig.API_URL + '/user/signup';
      if (password != tempPassword) {
        alert('Different passwords');
      } else {
        let response = await fetch(dest, options);
        response = await response.json();
        if (response.ok) {
          let result = await fetch(globalConfig.API_URL + '/user/' + email);
          result = await result.json();
          if (result.ok) {
            const data = await result.json();
            const user = data.user;
            setIsLoggedIn(true);
            setUserData(user);
          }
        }
      }
    };
    function_();
  };
  const renderProfile = () => {
    return (
      <Container>
        <Header>
          {/* check if user and allow follow */}
          {/* <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        /> */}
          {/* username goes here */}
          <Title>{username}</Title>
          {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" /> */}
          {/* <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
        </Header>
        <ScrollView>
          <Content>
            <Avatar source={avatar} />
            {/* email goes here */}
            <Username>{email}</Username>
            <Stats>
              <StatsColumn>
                <StatsNumber>{followings.toString()}</StatsNumber>
                <StatsText>Following</StatsText>
              </StatsColumn>
              <Separator>|</Separator>
              <StatsColumn>
                <StatsNumber>{followers.toString()}</StatsNumber>
                <StatsText>Followers</StatsText>
              </StatsColumn>
            </Stats>
            <ProfileColumn>
              <ProfileEdit>
                <ProfileText>
                  <Button title="See All videos" onPress={getVideo} />
                </ProfileText>
              </ProfileEdit>
            </ProfileColumn>

            <StatsText>Tap to edit profile</StatsText>
          </Content>
        </ScrollView>
      </Container>
    );
  };
  const renderLogin = () => {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <TextInput placeholder="Email here" onChangeText={setEmail} />
        <TextInput
          placeholder="Password here"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {signupMode && (
          <TextInput
            placeholder="Re-enter password here"
            onChangeText={setTempPassword}
            secureTextEntry={true}
          />
        )}

        <Button
          onPress={() => {
            signupMode ? signup() : login();
          }}
          title={`Click to ${signupMode ? 'Signup' : 'Login'}`}
          color={'black'}
        />
        <Button
          onPress={() => {
            setSignupMode(!signupMode);
          }}
          title={`Switch mode`}
        />
      </Container>
    );
  };
  return isLoggedIn ? renderProfile() : renderLogin();
};

export default Me;
