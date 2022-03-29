import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalConfig } from '../../../global';
import * as ImagePicker from 'expo-image-picker';
import { Container } from './styles';
import { addVideoProp } from '../../@types/VideoType';

const UploadVid = ({ author_id, title, _public = true }: addVideoProp) => {
  useEffect(() => {
    (async () => {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  //@ts-ignore
  const [video, setVideo] = useState(null);

  const uploadVideo = () => {
    let formData = new FormData();
    //@ts-ignore
    if (video) {
      const obj = {
        name: 'myname.mp4',
        //@ts-ignore
        uri: video.uri,
        //@ts-ignore
        type: 'video/mp4',
      };
      const userProp: addVideoProp = {
        author_id,
        title,
        _public,
      };
      //@ts-ignore
      formData.append('videoFile', obj);
      formData.append('userProp', JSON.stringify(userProp));

      fetch(globalConfig.API_URL + '/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
    }
  };
  const selectVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      setVideo(result as any);
      //@ts-ignore
      uploadVideo(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <TouchableOpacity onPress={() => selectVideo()}>
        <MaterialIcons
          name="arrow-drop-down"
          size={100}
          color={video ? '#fff' : '#6200ee'}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default UploadVid;
