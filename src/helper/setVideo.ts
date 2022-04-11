import { APIVideo } from '../@types/APIVideo';
import { optimizeVid } from './optimizeVid';

export const setVideoData = (video: APIVideo) => {
  const resultObj = {} as any;
  resultObj.id = video.id;
  resultObj.title = video.title;
  resultObj.likes = video.hearts;
  resultObj.comments = video.comments;
  resultObj.uri = optimizeVid(video.video_link);
  resultObj.public = video.public;
  resultObj.author_id = video.author_id;
  return resultObj;
};
