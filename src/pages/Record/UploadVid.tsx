import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Button } from 'react-native';
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
  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const uploadVideo = () => {
    let formData = new FormData();
    //@ts-ignore
    if (isSelected) {
      const obj = {
        name: 'myname',
        //@ts-ignore
        uri: video ? video.uri : image.uri,
        //@ts-ignore
        type: video ? 'video/mp4' : 'image/png',
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
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setVideo(result as any);
      setIsSelected(true);
      //@ts-ignore
      // uploadVideo(result);
    } catch (e) {
      console.log(e);
    }
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setImage(result as any);
      setIsSelected(true);
    } catch (e) {
      console.log(e);
    }
  };

  return isLoggedIn && email ? (
    <Container style={{ marginTop: 50 }}>
      <TouchableOpacity disabled={isSelected} onPress={() => selectVideo()}>
        <MaterialIcons name="attach-file" size={50} color={'black'} />
      </TouchableOpacity>
      <TouchableOpacity disabled={isSelected} onPress={() => selectImage()}>
        <MaterialIcons name="attach-file" size={50} color={'black'} />
      </TouchableOpacity>
      {isSelected && (
        <Button
          title="Repick"
          onPress={() => {
            setIsSelected(false);
          }}
        >
          Choose again
        </Button>
      )}
      <TextInput
        style={{ marginTop: 20 }}
        onChangeText={setTitle}
        value={title}
        placeholder="Caption here"
      />
      <Button title="Submit" onPress={uploadVideo}>
        Submit
      </Button>
    </Container>
  ) : (
    <Text style={{ color: 'black', marginTop: 100 }}>Please login</Text>
  );
};

export default UploadVid;
