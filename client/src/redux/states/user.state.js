import { createSlice } from "@reduxjs/toolkit";

const EmptyUserState = {
  accessToken: "",
  user: {
    id_persona: "",
    username: "",
    direccion: "",
    id_rol: "",
    password: "",
    rol: {
      id: "",
      nombre: "",
    }
  },
};

const persistLocalStorageUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("accessToken", data.accessToken);
};

const clearLocalStorageUser = () => {
  localStorage.removeItem("user");
};

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : EmptyUserState,
  reducers: {
    createUser: (_, action) => {
      // Cambiado de _state a _
      persistLocalStorageUser(action.payload);
      return action.payload;
    },
    resetUser: () => {
      // Cambiado de _state a _
      clearLocalStorageUser();
      return EmptyUserState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
