import { Item } from '../@types/VideoType';

export const convertToPng = (videos: Array<Item> | null) => {
  if (videos) {
    let newVideos = [...videos];
    newVideos.forEach(video => video.uri.replace('.mp4', '.png'));
    return newVideos;
  }
  return null;
};

export const convert1ToPng = (uri: string) => {
  return uri.replace('.mp4', '.png');
};
