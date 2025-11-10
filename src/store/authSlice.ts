// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface User {
//   id?: string;
//   name: string;
//   email: string;
//   role?: 'buyer' | 'farmer';
//   farmName?: string;
//   location?: string;
//   phone?: string;
//   photo?: string;
// }

// interface AuthState {
//   isLoggedIn: boolean;
//   user: User | null;
//   userPhoto?: string;
// }

// const initialState: AuthState = {
//   isLoggedIn: false,
//   user: null,
//   userPhoto: '',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action: PayloadAction<User>) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//       state.userPhoto = '';
//     },
//     setUserPhoto: (state, action: PayloadAction<string>) => {
//       state.userPhoto = action.payload;
//       if (state.user) {
//         state.user.photo = action.payload;
//       }
//     },
//   },
// });

// export const { loginSuccess, logout, setUserPhoto } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id?: string;
  name: string;
  email: string;
  role: 'buyer' | 'farmer';
  farmName?: string;
  location?: string;
  phone?: string;
  photo?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  registeredUsers: User[]; // 🔥 store signups in memory
  userPhoto?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  registeredUsers: [],
  userPhoto: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupSuccess: (state, action: PayloadAction<User>) => {
      // add to registered users
      state.registeredUsers.push(action.payload);
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userPhoto = '';
    },
    setUserPhoto: (state, action: PayloadAction<string>) => {
      state.userPhoto = action.payload;
      if (state.user) {
        state.user.photo = action.payload;
      }
    },
  },
});

export const { signupSuccess, loginSuccess, logout, setUserPhoto } =
  authSlice.actions;
export default authSlice.reducer;

