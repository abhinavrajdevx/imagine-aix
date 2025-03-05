export interface Page {
  id: string;
  content: string;
  imagePrompt?: string;
  imageUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverPrompt?: string;
  coverUrl?: string;
  pages: Page[];
  createdAt: number;
  updatedAt: number;
  name : string;
  totalChapters : number
}

export type Genre = 
  | "Fantasy" 
  | "Science Fiction" 
  | "Mystery" 
  | "Romance" 
  | "Adventure" 
  | "Horror" 
  | "Children's" 
  | "Non-fiction" 
  | "Poetry" 
  | "Other";