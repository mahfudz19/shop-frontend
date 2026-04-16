export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  thumbnail: string;
  tags: string[];
  is_published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
