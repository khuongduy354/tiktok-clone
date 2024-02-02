import React, { useContext, useEffect, useState } from 'react';
import VideoGrid from '../../components/HomeButton/VideoGrid';
import * as ImagePicker from 'expo-image-picker';
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import UserContext from '../../ContextManager/ContextProvider';
import { Item } from '../../@types/VideoType';
import Feed from '../Home/Feed';
import { Video } from 'expo-av';
import { setVideoData } from '../../helper/setVideo';
import ViewPager from '@react-native-community/viewpager';

const Me: React.FC = () => {
  const { setToken } = useContext(UserContext);

  const [tempPassword, setTempPassword] = useState('');
  const [password, setPassword] = useState('');
  const [selectedVid, setSelectedVid] = React.useState<Item | null>(null);

  const [avatarString, setAvatarString] = useState('');
  const [avatarImg, setAvatarImg] = useState(null);
  const [username, setUsername] = useState('');
  const [videos, setVideos] = useState<Array<Item> | null>(null);
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);

  const [signupMode, setSignupMode] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [showVids, setShowVids] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const {
    email,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    setEmail,
  } = useContext(UserContext);

  const setUserData = (user: UserType, isUpdate = false) => {
    if (!isUpdate) {
      setEmail(user.email);
      //@ts-ignore
      setAvatarString(user.avatar); //@ts-ignore
      // setFollowers(user.followingState.followers.length);
      // setFollowings(urser.followingState.followings.length);
      setUsername(user.name);
      setUserId(user.id);
      setBio(user.address);
      setPhoneNumber(user.phone_number);
    } else {
      //@ts-ignore
      setAvatarString(user.avatar);
      setUsername(user.name);
      setBio(user.address);
      setPhoneNumber(user.phone_number);
    }
  };
  const getVideo = async () => {
    const dest = globalConfig.API_URL + '/users/' + email;
    const res = await fetch(dest);
    if (res.ok) {
      const data = await res.json();
      const user = data.user;
      let feedData = [];
      for (let video of user.videos) {
        const resultObj = setVideoData(video as any);
        feedData.push(resultObj);
      }
      setVideos(feedData);
    } else {
      alert('Cant login');
    }
  };
  const login = () => {
    const _function = async () => {
      const dest = globalConfig.API_URL + '/user/login';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      };
      const res = await fetch(dest, options);
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        const user = data.user;
        setUserData(user);
        await getVideo();
        setIsLoggedIn(true);
      } else {
        alert('Cant login');
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
        if (response.ok) {
          setToken((await response.json()).token);

          let result = await fetch(globalConfig.API_URL + '/users' + email);
          if (result.ok) {
            const data = await result.json();
            const user = data.user;
            setIsLoggedIn(true);
            setUserData(user);
          }
        } else {
          alert('Cannot Signup');
        }
      }
    };
    function_();
  };
  const handleEditSubmit = async () => {
    const dest = globalConfig.API_URL + '/user';
    let formData = new FormData();

    formData.append('email', JSON.stringify(email));
    formData.append('name', JSON.stringify(username));
    formData.append('phone_number', JSON.stringify(phoneNumber));
    formData.append('address', JSON.stringify(bio));

    //@ts-ignore
    if (avatarImg) {
      const obj = {
        //@ts-ignore
        uri: avatarImg.uri,
        //@ts-ignore
        type: 'image/png',
        name: 'asdas',
      };
      //@ts-ignore
      formData.append('avatar', obj);
    } else {
      formData.append('avatar', JSON.stringify(avatarString));
    }

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    let result = await fetch(dest, options);
    if (result.ok) {
      result = await result.json();
      //@ts-ignore
      const user = result.user;
      setUserData(user);
      setIsEdit(false);
    }
  };
  const selectAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
      //@ts-ignore
      setAvatarImg(result as any);
    } catch (e) {}
  };

  const renderEditProfile = () => {
    const styles = StyleSheet.create({
      EditorInput: {
        backgroundColor: 'white',
      },
      MainContainer: {
        flex: 1,
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,
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
          //@ts-ignore
          disabled={avatarImg}
          //@ts-ignore
          onChangeText={setAvatarString}
          placeholder={
            avatarImg !== null ? 'Avatar chosen' : 'Avatar URL or Choose below'
          }
          style={{ backgroundColor: 'white' }}
        ></TextInput>
        {avatarImg && <Text>Click to change avatar</Text>}
        <AntDesign
          onPress={() => {
            avatarImg ? setAvatarImg(null) : selectAvatar();
          }}
          name="upload"
          size={24}
          color="black"
        />
        <TextInput
          onChangeText={setPhoneNumber}
          placeholder="Your phone number"
          style={{ backgroundColor: 'white' }}
        ></TextInput>
        <TextInput
          onChangeText={setBio}
          style={styles.TextInputStyleClass}
          multiline={true}
          placeholder="Bio."
          underlineColorAndroid="transparent"
        />
        <Button
          onPress={() => handleEditSubmit()}
          title={`Submit`}
          color={'black'}
        />
        <Content>
          <StatsText onPress={() => setIsEdit(false)}>Close </StatsText>
        </Content>
      </View>
    );
  };
  const renderSelectedVideo = () => {
    return (
      <ViewPager orientation="vertical" style={{ flex: 1 }} initialPage={0}>
        <View>
          {/* @ts-ignore */}
          <Feed play={true} item={selectedVid} outCb={setSelectedVid} />
        </View>
      </ViewPager>
    );
  };
  const renderGrid = () => {
    return (
      <VideoGrid
        videos={videos}
        selectedVid={selectedVid}
        setSelectedVid={setSelectedVid}
      />
    );
  };
  const renderProfile = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              login();
            }}
            refreshing={refreshing}
          />
        }
      >
        <Container>
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
                    {showVids ? (
                      <Button
                        title="Collapse"
                        onPress={() => {
                          setShowVids(false);
                        }}
                      />
                    ) : (
                      <Button
                        title="See All videos"
                        onPress={() => setShowVids(true)}
                      />
                    )}
                  </ProfileText>
                </ProfileEdit>
              </ProfileColumn>

              <StatsText onPress={() => setIsEdit(true)}>
                Tap to edit profile
              </StatsText>
            </Content>
          </ScrollView>
          {showVids && renderGrid()}
        </Container>
      </ScrollView>
    );
  };
  const renderLogin = () => {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <TextInput
          defaultValue="khuongduy354@gmail.com"
          placeholder="Email here"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password here"
          defaultValue="1234567891Duy"
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
      : selectedVid
      ? renderSelectedVideo()
      : renderProfile()
    : renderLogin();
};

export default Me;
