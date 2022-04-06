import React, { useEffect, useState } from 'react';
import { globalConfig } from '../../../global';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import { UserType } from '../../@types/UserType';

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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

//@ts-ignore
const UserProfile = ({ route }) => {
  const [email, setEmail] = useState(route.params.email);
  const [avatarString, setAvatarString] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);
  const setUserData = (user: UserType) => {
    setAvatarString(user.avatar);
    setUsername(user.name);
    setBio(user.address);
  };
  useEffect(() => {
    const func_ = async () => {
      const dest = globalConfig.API_URL + '/user/' + `${email}`;
      const res = await fetch(dest);
      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        setUserData(user);
      }
      func_();
    };
  }, []);
  const getVideo = () => {};
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity
        style={{
          backgroundColor: '#FD5D5D',
          height: 40,
          padding: 2,
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{ color: 'white' }}>Back</Text>
      </TouchableOpacity>
      <Header>
        <Title>{username}</Title>
      </Header>
      <ScrollView>
        <Content>
          <Image
            style={
              StyleSheet.create({
                image: {
                  height: 120,
                  width: 120,
                  borderRadius: 50,
                },
              }).image
            }
            source={{
              uri: avatarString,
            }}
          />
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
        </Content>
      </ScrollView>
    </Container>
  );
};

export default UserProfile;
