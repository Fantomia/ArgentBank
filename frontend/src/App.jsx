import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './page/home';
import Nav from './components/nav/nav';
import SignIn from './page/sign-in';
import User from './page/user';
import Footer from './components/footer/footer';

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const mainClass = isHome ? '' : 'main bg-dark';
  return (
    <>
      <Nav />
      <main className={mainClass}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Sign' element={<SignIn />} />
          <Route path='/User' element={<User />} />
        </Routes>
      
      </main>
      <Footer />
    </>
  )
}

export default App
