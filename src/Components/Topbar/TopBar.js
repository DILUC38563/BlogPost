import React, { useContext } from "react";
import "./TopBar.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handelLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topleft">
        <FacebookIcon style={{ padding: 10, cursor: "pointer" }} />
        <TwitterIcon style={{ padding: 10, cursor: "pointer" }} />
        <InstagramIcon style={{ padding: 10, cursor: "pointer" }} />
      </div>
      <div className="topcenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handelLogOut}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <Link className="link" to="/setting">
            <img className="image" src={user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <SearchIcon
          style={{
            fontSize: "25px",
            color: "#666",
            cursor: "pointer",
            paddingLeft: 10,
          }}
        />
      </div>
    </div>
  );
}
