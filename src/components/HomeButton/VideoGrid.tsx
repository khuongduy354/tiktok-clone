import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Item } from '../../@types/VideoType';
import { Button } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { convert1ToPng, convertToPng } from '../../helper/convertToPng';
import { Image } from 'react-native';
import Feed from '../../pages/Home/Feed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
type gridProps = {
  videos: Array<Item> | null;
  selectedVid: Item | null;
  setSelectedVid: React.Dispatch<React.SetStateAction<Item | null>>;
};

export default function VideoGrid({
  videos,
  // setSelectedVid,
  // selectedVid,
}) {
  const [items, setItems] = React.useState(videos);

  return (
    <FlatGrid
      style={{ maxHeight: 300 }}
      data={items}
      renderItem={({ item }) => {
        console.log(item.uri);
        return (
          <TouchableOpacity
            onPress={() => {
              // setSelectedVid(item);
            }}
          >
            <Video
              key={item.video_id}
              shouldPlay={true}
              isLooping
              isMuted={true}
              style={{
                width: 150,
                height: 150,
              }}
              source={{
                uri: item.uri,
              }}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    // backgroundColor: 'red',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
