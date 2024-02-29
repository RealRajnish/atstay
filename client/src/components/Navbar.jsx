import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setHostLogout, setLogout } from "../redux/state";
import LowerNavbar from "./LowerNavbar";
import UpperNavbar from "./UpperNavbar";
import { API_3 } from "../api/api";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);
  const host = useSelector((state) => state.host);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <UpperNavbar />
      <div className="navbar" style={{ gap: "3rem" }}>
        <a href="/">
          <img src="/assets/logo.webp" alt="logo" />
        </a>
        <div className="links-container">
          <ul className="navbar-nav falja">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/attours" className="nav-link">
                Tour
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/atstays" className="nav-link">
                Stays
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bloggerpage" className="nav-link">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar_search">
          <input
            type="text"
            placeholder="Destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton disabled={search === ""}>
            <Search
              sx={{ color: "#66cccc" }}
              onClick={() => {
                navigate(`/properties/search/${search}`);
              }}
            />
          </IconButton>
        </div>

        <div className="navbar_right">
          {host ? (
            <Link to="/create-listing" className="host">
              Become A Host
            </Link>
          ) : (
            <Link to="/HostLogin" className="host">
              Become A Host
            </Link>
          )}

          <button
            className="navbar_right_account"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <Menu sx={{ color: variables.darkgrey }} />
            {!user ? (
              <Person sx={{ color: variables.darkgrey }} />
            ) : (
              <img
                src={`${API_3}${user.profileImagePath.replace("public", "")}`}
                alt="profile photo"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
          </button>

          {dropdownMenu && !user && !host && (
            <div className="navbar_right_accountmenu">
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
              <Link to="/hostLogin">Host Login</Link>
            </div>
          )}

          {dropdownMenu && user && (
            <div className="navbar_right_accountmenu">
              <Link to={`/${user._id}/trips`}>Trip List</Link>
              <Link to={`/${user._id}/wishList`}>Wish List</Link>
              <Link to={`/${user._id}/properties`}>Property List</Link>
              <Link to={`/${user._id}/reservations`}>Reservation List</Link>
              <Link to="/create-listing">Become A Host</Link>

              <Link
                to="/login"
                onClick={() => {
                  dispatch(setLogout());
                }}
              >
                Log Out
              </Link>
            </div>
          )}
          {dropdownMenu && host && (
            <div className="navbar_right_accountmenu">
              <Link to="/hostDashboard">Dashboard</Link>
              <Link to="/create-listing">Become A Host</Link>

              <Link
                to="/"
                onClick={() => {
                  dispatch(setHostLogout());
                }}
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* <LowerNavbar /> */}
    </>
  );
};

export default Navbar;
