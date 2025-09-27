export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readTime: number; // in minutes
  featured?: boolean;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  imageUrl: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
}