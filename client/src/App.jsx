import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import './App.css';
import GetAll from './pages/getAll';
import GetOne from './pages/getOne';
import UpdatePost from './pages/updatePost';
import PostOne from './pages/postOne';
import NoMatch from './pages/noMatch';
import AppState, { useGlobalContext } from './context/GlobalState';
import useToggle from './hooks/useToggle';
import useWindowDimensions from './hooks/useWindowDimensions';
import {
  CloseIcon,
  HamburgerIcon,
  LogoutIcon,
} from './components/SvgButtonIcons';
import Register from './pages/register';
import Login from './pages/login';
import { useEffect } from 'react';

function App() {
  return (
    <AppState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <GetAll />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:slug"
            element={
              <PrivateRoute>
                <GetOne />
              </PrivateRoute>
            }
          />
          <Route
            path="/update"
            element={
              <PrivateRoute>
                <UpdatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <PostOne />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </AppState>
  );
}

export default App;

function Navbar() {
  const navigate = useNavigate();
  const { user, logOut, isAuthenticated } = useGlobalContext();

  useEffect(() => {}, [isAuthenticated]);

  const { width } = useWindowDimensions();
  const [toggle, setToggle] = useToggle();

  const onMobileClick = width <= 460 && setToggle;

  const logOutHandler = async () => {
    await logOut();
    navigate('/login');
    width <= 460 && setToggle();
  };

  return (
    <nav className="navbar">
      <button
        className="nav-btn"
        aria-label={toggle ? 'Sidebar-open' : 'Sidebar-close'}
        onClick={setToggle}
      >
        {toggle ? <CloseIcon /> : <HamburgerIcon />}
      </button>
      <div
        onClick={setToggle}
        className={`overlay ${toggle ? 'd-flex' : 'd-none'}`}
      />
      <div
        className={`navbar-nav ${toggle ? 'positive-left' : 'negative-left'}`}
      >
        <div className="navlink-box">
          {user && isAuthenticated && (
            <div className="welcome">
              <span>Welcome</span>
              <span>{user?.username}</span>
              <span onClick={logOutHandler} role="button">
                <LogoutIcon />
              </span>
            </div>
          )}
          {user && isAuthenticated ? (
            <>
              <NavbarLink to="/" linkname="GetAll" onClick={onMobileClick} />
              <NavbarLink
                to="/add"
                linkname="PostOne"
                onClick={onMobileClick}
              />
            </>
          ) : (
            <NavbarLink to="/login" linkname="login" onClick={onMobileClick} />
          )}
        </div>
      </div>
    </nav>
  );
}

function NavbarLink({ to, linkname, onClick }) {
  return (
    <NavLink
      onClick={onClick}
      to={to}
      className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}
    >
      {linkname}
    </NavLink>
  );
}

function PrivateRoute({ children }) {
  const { user, isAuthenticated } = useGlobalContext();
  useEffect(() => {}, [isAuthenticated]);
  return <>{user && isAuthenticated ? children : <Navigate to="/login" />}</>;
}
