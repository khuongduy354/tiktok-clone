import React from 'react';
import { Image, Animated, Easing } from 'react-native';

import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Lottie from 'lottie-react-native';

import musicFly from '../../../assets/lottie-animations/music-fly.json';

import {
  Container,
  Details,
  Actions,
  User,
  Tags,
  Music,
  MusicBox,
  BoxAction,
  TextAction,
} from './styles';

interface Item {
  id: number;
  email: string;
  title: string;
  likes: Array<number>;
  comments: Array<Comment>;
  uri: string;
  public: boolean;
}

type Comment = {
  content: string;
  user_id: number;
  created_at: string;
};

interface Props {
  play: boolean;
  item: Item;
}

const Feed: React.FC<Props> = ({ play, item }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const rotateProp = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <LinearGradient
        colors={['rgba(0,0,0,.3)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '70%',
        }}
      />
      <Container>
        <Video
          source={{ uri: item.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={play}
          isLooping
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Container>
      <Details>
        <User>{item.email}</User>
        <MusicBox>
          <FontAwesome name="music" size={15} color="#f5f5f5" />
          <Music>{item.title}</Music>
        </MusicBox>
      </Details>
      <Actions>
        <BoxAction>
          <AntDesign
            style={{ alignSelf: 'center' }}
            name="heart"
            size={35}
            color="#fff"
          />
          <TextAction>{item.likes.length}</TextAction>
        </BoxAction>
        <BoxAction>
          <FontAwesome
            style={{ alignSelf: 'center' }}
            name="commenting"
            size={35}
            color="#fff"
          />
          <TextAction>{item.comments.length}</TextAction>
        </BoxAction>
        <BoxAction>
          <Animated.View
            style={{
              borderRadius: 50,
              borderWidth: 12,
              borderColor: '#292929',
            }}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
              }}
              source={{
                uri:
                  'https://th.bing.com/th/id/R.5423477a17d752e99d68047743d9de11?rik=5BK8zmsuAHk2fw&riu=http%3a%2f%2fcliparts.co%2fcliparts%2f8TE%2f48G%2f8TE48GETa.jpg&ehk=Be0xy8WENPNv62qEV8lk%2brJNaV%2bXKc3l73g5Uzew0%2f8%3d&risl=&pid=ImgRaw&r=0',
              }}
            />
          </Animated.View>

          <Lottie
            source={musicFly}
            progress={play ? spinValue : 0}
            style={{ width: 150, position: 'absolute', bottom: 0, right: 0 }}
          />
        </BoxAction>
      </Actions>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,.4)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '50%',
        }}
      />
    </>
  );
};

export default Feed;
