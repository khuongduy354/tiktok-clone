import React, { useContext, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Item } from '../../@types/VideoType';
import { Button } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { convert1ToPng, convertToPng } from '../../helper/convertToPng';
import { Image } from 'react-native';
import Feed from '../../pages/Home/Feed';
type gridProps = {
  videos: Array<Item> | null;
  selectedVid: Item | null;
  setSelectedVid: React.Dispatch<React.SetStateAction<Item | null>>;
};

export default function VideoGrid({
  videos,
  setSelectedVid,
  selectedVid,
}: gridProps) {
  const [items, setItems] = React.useState(videos);

  return (
    <React.Fragment>
      <FlatGrid
        data={items}
        spacing={1}
        renderItem={({ item }: any) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedVid(item);
              }}
            >
              <Image
                key={item.video_id}
                source={{
                  uri: convert1ToPng(item.uri),
                }}
                style={{ height: 100, width: 100 }}
                height={100}
                width={100}
              />
            </TouchableOpacity>
          );
        }}
      />
    </React.Fragment>
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
