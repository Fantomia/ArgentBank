import { Routes, Route, useLocation } from 'react-router-dom';
import { loginSuccess } from './features/authSlice';
import { fetchUserData } from './features/userThunks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PrivateRoute from './components/privateRoute/privateRoute';
import Home from './page/home';
import Nav from './components/nav/nav';
import SignIn from './page/sign-in';
import User from './page/user';
import Footer from './components/footer/footer';

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const mainClass = isHome ? '' : 'main bg-dark';

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess({ token }));  // Charge le token dans Redux
      dispatch(fetchUserData());  // Récupère les infos de l'utilisateur
    }
  }, [dispatch]);

  return (
    <>
      <Nav />
      <main className={mainClass}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Routes>
      
      </main>
      <Footer />
    </>
  )
}

export default App
