import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
}

interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<BlogPost[]>) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPost(state, action: PayloadAction<BlogPost>) {
      state.posts.unshift(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setPosts, addPost, setLoading, setError } = blogSlice.actions;
export default blogSlice.reducer;
