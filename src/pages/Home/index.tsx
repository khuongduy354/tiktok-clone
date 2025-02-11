import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../ContextManager/ContextProvider';
import { globalConfig } from '../../../global';
import { View } from 'react-native';

import ViewPager from 'react-native-pager-view';

import mock_server from '../../../server.json';
import Feed from './Feed';

import { Container, Header, Text, Tab, Separator } from './styles';
import { setVideoData } from '../../helper/setVideo';

const Home: React.FC = () => {
  const [tab, setTab] = useState(1);
  const [active, setActive] = useState(0);
  const [server, setServer] = useState(mock_server);
  const {
    email,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    setEmail,
    token,
  } = useContext(UserContext);
  const fetchVideo = async () => {
    const option = tab === 1 ? 'all' : 'following';
    const url = globalConfig.API_URL + '/videos/feed/' + option;
    console.log(url);
    const result = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.ok) {
      const data = await result.json();
      let feedData = [];
      for (let video of data.feed) {
        const resultObj = setVideoData(video as any);
        feedData.push(resultObj);
      }
      setServer({ feed: feedData });
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [tab]);
  return (
    <Container>
      <Header>
        <Tab onPress={() => setTab(1)}>
          <Text active={tab === 1}>All</Text>
        </Tab>
        <Separator>|</Separator>
        <Tab onPress={() => setTab(2)}>
          <Text active={tab === 2}>Following</Text>
        </Tab>
      </Header>
      <ViewPager
        onPageSelected={e => {
          setActive(e.nativeEvent.position);
        }}
        orientation="vertical"
        style={{ flex: 1 }}
        initialPage={0}
      >
        {server.feed.map((item, index) => (
          <View key={item.id}>
            <Feed
              fetchVideo={fetchVideo}
              item={item}
              play={index === active}
              tab={active}
            />
          </View>
        ))}
      </ViewPager>
    </Container>
  );
};

export default Home;
