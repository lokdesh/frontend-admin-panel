import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../Home/arrow.png";
import Axios from "../Axios/Axios";
import logo from "../../Assets/Favicon.png";
import { AuthContext } from "../../App";
import AnimatedRoutes from "./AnimatedRoutes";

const Navbar = () => {
  const { userData, setloading } = useContext(AuthContext);
  const navigator = useNavigate();
  const [search, setsearch] = useState("");
  const [AllUsers, setAllUsers] = useState([]);
  const handleLogout = () => {
    Axios.post("/logout")
      .then((res) => {
        setloading(true);
        navigator("/");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const [nwidth, setnwidth] = useState(1200);
  React.useEffect(() => {
    function handleResize() {
      setnwidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  });
  const handleSearch = async (e) => {
    setsearch(e.target.value);
    if (e.target.value.length > 0) {
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessToken")),
        },
      };
      const res = await Axios.get("/users", config);
      setAllUsers(res.data.users);
    } else {
      setAllUsers([]);
    }
  };
  return (
    <>
      <nav
        className="sb-topnav navbar navbar-expand navbar-dark"
        style={{ backgroundColor: "rgba(102 ,0, 0 , 0.59)" }}
      >
        <Link className="navbar-brand ps-3" to="/profile">
          <img src={logo} width="165" alt="" />
        </Link>
        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
              onChange={handleSearch}
              value={search}
              onBlur={() => {
                setTimeout(() => {
                  setAllUsers([]);
                }, 200);
              }}
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
          <ul className="list-group position-absolute z-index">
            {AllUsers.length > 0 &&
              AllUsers.filter((user) => {
                return user.username
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }).map((user) => {
                return (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    className="list-group-item list-group-item-action"
                    style={{ width: "135%" }}
                    aria-current="true"
                    onClick={() => setsearch("")}
                  >
                    <div className="d-flex justify-content-between">
                      <strong>{user.username}</strong>
                      <small>{user.role}</small>
                    </div>
                  </Link>
                );
              })}
          </ul>
        </div>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div onContextMenu={(e) => e.preventDefault()} id="layoutSidenav">
        <div
          id="layoutSidenav_nav"
          style={{ display: nwidth < 994 ? "none" : "initial" }}
        >
          <nav
            className="sb-sidenav accordion sb-sidenav-light"
            style={{ backgroundColor: "rgba(102 ,0, 0 , 0.59)" }}
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house"></i>
                  <div className="sb-nav-link-icon"></div>
                  Dashboard
                </Link>
                <Link className="nav-link" to="/channel">
                  <i className="bi bi-bricks"></i>
                  <div className="sb-nav-link-icon"></div>
                  Channel
                </Link>
                <Link className="nav-link" to="/folderManagement">
                  <i className="bi bi-menu-button-wide"></i>
                  <div className="sb-nav-link-icon"></div>
                  Folder Management
                </Link>
                {userData.role !== "Reporter" && <Link className="nav-link" to="/requests">
                  <i className="bi bi-app-indicator"></i>
                  <div className="sb-nav-link-icon"></div>
                  Requests
                </Link>}
                <Link className="nav-link" to="/categories">
                  <i className="bi bi-bounding-box"></i>
                  <div className="sb-nav-link-icon"></div>
                  Categories
                </Link>
                {/* Expense */}
                <Link
                  className="nav-link collapsed"
                  to="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#Expense"
                  aria-expanded="false"
                  aria-controls="Expense"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  List
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                  <img src={arrow} className="white-arrow" height="15" alt="" />
                </Link>
                <div
                  className="collapse"
                  id="Expense"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    {userData.role === "admin" && (
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    )}
                    <Link className="nav-link" to="/seniorEditor">
                      Senior Editors
                    </Link>
                    <Link className="nav-link" to="/editor">
                      Editors
                    </Link>
                    <Link className="nav-link" to="/repoter">
                      Repoters
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              {userData.role}
            </div>
          </nav>
        </div>
        <AnimatedRoutes />
      </div>
    </>
  );
};

export default Navbar;
