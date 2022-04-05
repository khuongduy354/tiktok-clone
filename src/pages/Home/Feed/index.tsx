import React, { useEffect, useState } from 'react';
import { Image, Animated, Easing } from 'react-native';
import Comment from '../Comment/list';

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
import { globalConfig } from '../../../../global';

interface Item {
  id: number;
  email: string;
  title: string;
  likes: Array<number>;
  comments: Array<Comment>;
  uri: string;
  public: boolean;
}

type CommentProp = {
  content: string;
  user_id: number;
  created_at: string;
};

interface Props {
  play: boolean;
  item: Item;
  comments: any;
  userId: number;
  isLoggedIn: boolean;
}
const Feed: React.FC<Props> = ({
  play,
  item,
  userId,
  comments,
  isLoggedIn,
}) => {
  const spinValue = new Animated.Value(0);
  const [isLiked, setIsLiked] = useState(item.likes.includes(userId));
  const [likes, setLikes] = useState(item.likes);
  const [isVid, setIsVid] = useState(true);
  const [commentMode, setCommentMode] = useState(false);
  const [commentState, setCommentState] = useState(comments);

  useEffect(() => {
    setIsVid(item.uri.slice(-4) === '.mp4');
  }, [item.uri]);

  const handleLike = () => {
    if (!isLoggedIn) return alert('please login');
    const _function = async () => {
      //@ts-ignore
      setIsLiked(!isLiked);
      const dest = globalConfig.API_URL + '/video/like';
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author_id: userId, video_id: item.id }),
      };
      const res = await fetch(dest, options);
      if (res.ok) {
        const dest = globalConfig.API_URL + '/video' + `/${item.id}`;
        let result = await fetch(dest);
        result = await result.json();
        //@ts-ignore
        const likeArr = result.video.hearts.filter(heart => heart !== null);
        setLikes(likeArr);

        //@ts-ignore
        setIsLiked(result.video.hearts.includes(userId));
      }
    };
    _function();
  };

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
  const renderFeed = () => {
    return (
      <React.Fragment>
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
          {isVid ? (
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
          ) : (
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{ uri: item.uri }}
            />
          )}
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
              onPress={handleLike}
              style={{ alignSelf: 'center' }}
              name="heart"
              size={35}
              color={`${isLiked ? '#F56D91' : '#fff'}`}
            />
            <TextAction>{likes.length}</TextAction>
          </BoxAction>
          <BoxAction>
            <FontAwesome
              onPress={() => {
                setCommentMode(true);
              }}
              style={{ alignSelf: 'center' }}
              name="commenting"
              size={35}
              color="#fff"
            />
            <TextAction>{commentState.length}</TextAction>
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
              style={{
                width: 150,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
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
      </React.Fragment>
    );
  };
  const submitComment = async (content: string) => {
    if (!isLoggedIn) return alert('please login');
    const dest = globalConfig.API_URL + '/video/comment';
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        video_id: item.id,
        content: content,
      }),
    };
    let res = await fetch(dest, options);
    if (res.ok) {
      const dest = globalConfig.API_URL + '/video/' + item.id;
      res = await fetch(dest);
      if (res.ok) {
        res = await res.json();
        //@ts-ignore
        setCommentState(res.video.comments);
      }
    } else {
      alert('Cannot comment');
    }
  };

  const renderComment = () => {
    return (
      <Comment
        //@ts-ignore
        comments={commentState}
        //@ts-ignore
        onSubmit={submitComment}
        onExit={() => {
          setCommentMode(false);
        }}
      />
    );
  };
  return <>{commentMode ? renderComment() : renderFeed()}</>;
};

export default Feed;
