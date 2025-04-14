import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token; // Stocker le token dans le state
      state.error = null; 
    },
    setUserData: (state, action) => {
      state.user = action.payload; // Stocker les infos de l'utilisateur dans le state
    },
    logout: (state) => {
      state.token = null; 
      state.user = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;  // Stocker le message d'erreur
    },
    updateUsername(state, action) {
      if (state.user) {
        state.user.userName = action.payload; // Mettre à jour le nom d'utilisateur
      }
    },
  },
});

export const { loginSuccess, setUserData, logout, loginFailure, updateUsername } = authSlice.actions;
export default authSlice.reducer;
