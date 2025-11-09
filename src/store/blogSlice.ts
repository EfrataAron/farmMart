import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt?: string;
  image?: string;
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost>) => {
      state.currentPost = action.payload;
    },
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.push(action.payload);
    },
  },
});

export const { setPosts, setCurrentPost, addPost } = blogSlice.actions;
export default blogSlice.reducer;
