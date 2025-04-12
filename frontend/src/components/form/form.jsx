import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/userThunks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('password');
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(savedEmail || '');
  const [password, setPassword] = useState(savedPassword || '');

  const error = useSelector((state) => state.auth.error);  // Récupérer l'erreur depuis Redux

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si "Remember me" est coché, stocker l'email et le mot de passe dans le localStorage
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      // Si non coché, retirer les données du localStorage
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }

    dispatch(loginUser({ email, password }));
  };

  const token = useSelector((state) => state.auth.token); // Récupérer le token depuis Redux

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  // Fonction pour gérer l'event de la checkbox "Remember me"
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">E-mail</label>
            <input type="email" id='username' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
          </div>
          <div className="input-remember">
            <input 
              type="checkbox" 
              id="remember-me" 
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type='submit' className="sign-in-button">Sign In</button>
        </form>

        {error && <div className="error-message">{error}</div>}
      </section>
    </>
  );
};

export default Form;
