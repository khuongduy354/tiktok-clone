import React, { Fragment, useContext, useState } from 'react';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { Container, Search, Header, Input } from './styles';
import { Video } from 'expo-av';
import { globalConfig } from '../../../global';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Image, TextInput } from 'react-native';
import { Title } from '../Me/styles';
import UserContext from '../../ContextManager/ContextProvider';

const Discover: React.FC = () => {
  const { token, isLoggedIn } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);

  const searchUser = async () => {
    const url = globalConfig.API_URL + '/users?s=' + search;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setSearchedUsers(data.users);
    } else {
      alert('Error searching user');
    }
  };
  const unFollowUser = async u => {
    const url = globalConfig.API_URL + '/users/' + u.id + '/follow';
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      alert('User unfollowed');
    } else {
      alert('Error unfollowing user');
    }
  };
  const followUser = async u => {
    const url = globalConfig.API_URL + '/users/' + u.id + '/follow';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      alert('User followed');
    } else {
      alert('Error following user');
    }
  };
  return (
    <Container>
      <Header>
        <Search>
          <AntDesign
            style={{
              paddingRight: 10,
            }}
            name="search1"
            size={18}
            color="#838383"
            onPress={searchUser}
          />
          <Input
            onSubmitEditing={searchUser}
            placeholder="Search user by username or email here"
            value={search}
            returnKeyType="search"
            onChangeText={(text: string) => setSearch(text)}
          />
          {/* <Button onPress={searchUser} title="Search" /> */}
        </Search>
        <Ionicons size={25} color="black" />
      </Header>
      <ScrollView>
        {searchedUsers.map((user: any) => {
          return (
            <Container>
              <Image source={{ uri: user.avatar }} width={50} height={50} />
              <Title>{user.name}</Title>
              <Title>{user.email}</Title>
              {token !== '' && isLoggedIn && (
                <Fragment>
                  <Button onPress={() => followUser(user)} title="Follow" />
                  <Button onPress={() => unFollowUser(user)} title="Unfollow" />
                </Fragment>
              )}
            </Container>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Discover;
