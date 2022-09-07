import { useStore } from "../hooks/useStore";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const { authData, setAuthData } = useStore();
  const removeToken = () => {
    console.warn("Remove token !");
    setAuthData(localStorage.removeItem("my_events"));
    navigate("/" + location.search);
  };
  return (
    <>
      <nav className="navbar">
        <div>
          <ul className="  navbar-nav">
            <li className="  nav-item">
              <NavLink to="/" className="nav-link">
                <button className="" aria-label="menu">
                  <svg
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="icon"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                  </svg>
                </button>
              </NavLink>
            </li>
            <li className="navbar nav-item">
              <Link to="/" className="nav-link">
                Events
              </Link>
            </li>
            {/* {console.warn(authData)} */}
            {/* {console.warn(location.pathname.split("/")[1])}
            {console.warn(params)} */}
            {authData ? (
              <>
                <li className="navbar nav-item">
                  <Link to="/profile" className="nav-link">
                    Profil
                  </Link>
                </li>
                <li className="navbar nav-item">
                  <Link to="/" className="nav-link" onClick={removeToken}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="navbar nav-item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="navbar nav-item">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
