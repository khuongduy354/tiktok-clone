import React, { PureComponent } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Comment = ({ comment }: any) => {
  // Pull comment object out of props
  const navigation = useNavigation();
  // Pull data needed to display a comment out of comment object
  const { content, avatar, email, created_at } = comment;
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatar && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserProfile', { email: email });
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.avatar}
              source={{ uri: avatar }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text>
          <Text style={[styles.text, styles.name]}>{email}</Text>{' '}
          <Text style={styles.text}>{content}</Text>
        </Text>
        <Text style={[styles.text, styles.created]}>
          {moment(created_at).fromNow()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});
export default Comment;
