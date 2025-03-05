export interface Book {
    id: string;
    name: string;
    totalChapters: number;
  }
  
  export interface ApiBook {
    id: string;
    book: {
      chapter_contents: string;
    }[];
  }
  
  export interface ApiResponse {
    message: string;
    books: ApiBook[];
    generated: boolean;
    error: boolean;
  }