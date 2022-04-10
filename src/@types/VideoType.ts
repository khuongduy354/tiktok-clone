export type addVideoProp = {
  email: number;
  title: string;
  _public?: boolean;
};

export interface Item {
  id: number;
  email: string;
  title: string;
  likes: Array<number>;
  comments: Array<UserComment>;
  uri: string;
  public: boolean;
}

export type UserComment = {
  user_id: number;
  content: string;
  created_at: string;
  avatar: string;
};
