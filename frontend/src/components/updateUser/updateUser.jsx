import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData, updateUserUsername } from "../../features/userThunks";

const UpdateUser = () => { 
    const dispatch = useDispatch(); // Récupérer le dispatch de Redux
    const token = useSelector((state) => state.auth.token); // Récupérer le token depuis Redux 
    const user = useSelector((state) => state.auth.user); // Récupérer les données de l'utilisateur

    const [isEditing, setIsEditing] = useState(false); // État pour gérer l'affichage du formulaire d'édition
    const [username, setUsername] = useState(user?.username || ""); // État pour gérer le nouvel userName
    
    useEffect(() => {
        if (token) {
          dispatch(fetchUserData()); // Récupérer les infos de l'utilisateur
        }
    }, [token, dispatch]);
    
    useEffect(() => {
        if (user) {
          setUsername(user.username); // Mettre à jour l'userName
        }
    }, [user]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserUsername(username)); // Mettre à jour le nouvel userName
        setIsEditing(false);
    };

    return (
    <div className="header">
        {user && ( // Vérifier si l'utilisateur est connecté
          <>
            <h1>Welcome back, {user.firstName} {user.lastName}!</h1>
            {!isEditing ? ( // Afficher le formulaire d'édition
              <button className="edit-button" onClick={() => setIsEditing(true)}> 
                Edit Name
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="input-wrapper">
                  <label htmlFor="username">User name</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="firstName">First name</label>
                  <input type="text" id="firstName" value={user.firstName} disabled />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" id="lastName" value={user.lastName} disabled />
                </div>
                <div className="button-group">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    );
};

export default UpdateUser;