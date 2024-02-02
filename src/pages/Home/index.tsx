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
  const [server, setServer] = useState(mock_server);
  const {
    email,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    setEmail,
  } = useContext(UserContext);
  const fetchVideo = async () => {
    const result = await fetch(globalConfig.API_URL + '/video/feed/all');
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
  }, []);
  const [tab, setTab] = useState(1);
  const [active, setActive] = useState(0);

  return (
    <Container>
      <Header>
        {/* <Tab onPress={() => setTab(1)}>
          <Text active={tab === 1}>Following</Text>
        </Tab>
        <Separator>|</Separator>
        <Tab onPress={() => setTab(2)}>
          <Text active={tab === 2}>For You</Text>
        </Tab> */}
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
