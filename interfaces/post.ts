export interface IPost {
  id: number;
  userId: number;
  image: string;
  title: string;
  content: string;
  likes: number;
  createdAt?: string;
  isLiked?: boolean;
  userFirstName?: string;
}
