import React, { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import Feed from './Feed';

import { Container, Header, Text, Tab, Separator } from './styles';

const Home: React.FC = () => {
  const [tab, setTab] = useState(1);
  return (
    <Container>
      <LinearGradient
        colors={['rgba(0,0,0,.7)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 150,
        }}
      />
      <Header>
        <Tab onPress={() => setTab(1)}>
          <Text active={tab === 1}>Seguindo</Text>
        </Tab>
        <Separator>|</Separator>
        <Tab onPress={() => setTab(2)}>
          <Text active={tab === 2}>Para você</Text>
        </Tab>
      </Header>
      <Feed uri="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" />
    </Container>
  );
};

export default Home;