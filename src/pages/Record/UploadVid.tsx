import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalConfig } from '../../../global';
import * as ImagePicker from 'expo-image-picker';
import { Container } from './styles';
import { addVideoProp } from '../../@types/VideoType';
import { TextInput } from 'react-native-paper';

//@ts-ignore
const UploadVid = ({ email, _public = true, isLoggedIn }: addVideoProp) => {
  const [title, setTitle] = useState('');
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

      //@ts-ignore
      formData.append('videoFile', obj);
      formData.append('title', JSON.stringify(email));
      formData.append('email', JSON.stringify(title));

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
      setVideo(result as any);
      //@ts-ignore
      uploadVideo(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    isLoggedIn &&
    email && (
      <Container style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={() => selectVideo()}>
          <MaterialIcons name="attach-file" size={50} color={'black'} />
        </TouchableOpacity>
        <TextInput
          style={{ marginTop: 20 }}
          onChangeText={setTitle}
          value={title}
          placeholder="Caption here"
        />
      </Container>
    )
  );
};

export default UploadVid;
