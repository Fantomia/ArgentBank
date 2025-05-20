import { loginSuccess, loginFailure, setUserData, updateUsername, logout } from "./authSlice";

export const loginUser = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";

      if (data.message) {
        if (data.message.includes("Password is invalid")) {
          errorMessage = "Mot de passe incorrect. Veuillez réessayer.";
        } else if (data.message.includes("User not found")) {
          errorMessage = "Adresse e-mail inconnue. Vérifiez votre saisie.";
        }
      }

      throw new Error(errorMessage);
    }

    if (data.body && data.body.token) {
      dispatch(loginSuccess({ token: data.body.token }));
      if (rememberMe) {
        localStorage.setItem("token", data.body.token);
      } else {
        sessionStorage.setItem("token", data.body.token);
      }
      dispatch(fetchUserData());
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    dispatch(loginFailure(error.message)); 
  }
};

export const fetchUserData = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error("Token manquant");

    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Erreur ${response.status}: ${response.statusText}`);
    }

    dispatch(setUserData(data.body));
  } catch (error) {
    console.error("Erreur lors de la récupération des infos de l'utilisateur:", error);
  }
};

export const updateUserUsername = (newUsername) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    if (!token) {
      console.error("Token manquant");
      return;
    }

    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUsername }),
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch(updateUsername(newUsername)); // Met à jour l'userName dans Redux
  } catch (error) {
    console.error("Erreur lors de la mise à jour du username", error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  dispatch(logout());
};
