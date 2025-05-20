import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userThunks";
import logo from "../../assets/argentBankLogo.png";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
        <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="sign-in">
          {token ? (
            <div className="nav-login">
              <Link to='/profile' className="main-nav-item">
                {user ? user.userName : ""}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" class="nav-svg">
                  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                </svg>

              </Link>
              <Link to="/login" className="main-nav-item" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke-width="2" stroke="currentColor" className="nav-svg">
                <path stroke-linecap="" stroke-linejoin="" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
              </svg>

              </Link>  
            </div>
          ) : (
          <Link to="/login" className="main-nav-item">
            <p className="on">Sign in</p>
          </Link>
          )}
        </div>
    </nav>
  );
};

export default Nav;