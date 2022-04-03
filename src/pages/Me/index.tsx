import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { AntDesign } from '@expo/vector-icons';

type MeProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
};

//@ts-ignore
const Me: React.FC<MeProps> = ({
  email,
  setEmail,
  isLoggedIn,
  setIsLoggedIn,
  setUserId,
}) => {
  const [tempPassword, setTempPassword] = useState('');
  const [password, setPassword] = useState('');

  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);

  const [signupMode, setSignupMode] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const setUserData = (user: UserType) => {
    setEmail(user.email);
    setAvatar(user.avatar);
    setFollowers(user.followingState.followers.length);
    setFollowings(user.followingState.followings.length);
    setUsername(user.name);
    setUserId(user.id);
  };
  const getVideo = () => {};
  const login = () => {
    const _function = async () => {
      const dest = globalConfig.API_URL + '/user/' + `${email}`;
      const res = await fetch(dest);
      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        setUserData(user);
        setIsLoggedIn(true);
        console.log('ok');
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
            console.log('ok');
          }
        }
      }
    };
    function_();
  };
  const handleEditSubmit = async () => {};
  const renderEditProfile = () => {
    const styles = StyleSheet.create({
      EditorInput: {
        backgroundColor: 'white',
      },
      MainContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        justifyContent: 'center',
        margin: 20,
      },

      TextInputStyleClass: {
        backgroundColor: 'white',
      },
    });
    return (
      <View style={styles.MainContainer}>
        <TextInput
          onChangeText={setUsername}
          style={styles.EditorInput}
          defaultValue={username}
          placeholder="Change your username"
        />

        <TextInput
          onChangeText={setAvatar}
          placeholder="Avatar URL or Choose below"
          style={{ backgroundColor: 'white' }}
        ></TextInput>
        <AntDesign onPress={() => {}} name="upload" size={24} color="black" />

        <TextInput
          onChangeText={setBio}
          style={styles.TextInputStyleClass}
          multiline={true}
          placeholder="Bio."
          underlineColorAndroid="transparent"
        />
        <Button onPress={() => {}} title={`Submit`} color={'black'} />
        <Content>
          <StatsText onPress={() => setIsEdit(false)}>Close </StatsText>
        </Content>
      </View>
    );
  };
  const renderProfile = () => {
    return (
      <Container>
        <Header>
          <Title>{username}</Title>
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

            <StatsText onPress={() => setIsEdit(true)}>
              Tap to edit profile
            </StatsText>
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
  return isLoggedIn
    ? isEdit
      ? renderEditProfile()
      : renderProfile()
    : renderLogin();
};

export default Me;
