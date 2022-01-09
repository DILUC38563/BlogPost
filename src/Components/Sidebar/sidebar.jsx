import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import React, { useState } from "react";
import "./sidebar.css";
import { useEffect } from "react";
import axios from "axios";
import {Link}  from "react-router-dom";

export default function Sidebar() {
  const [cate, setCate] = useState([]);

  useEffect(() => {
    const getCate = async () => {
      const res = await axios.get("https://blogservr.herokuapp.com/category");
      setCate(res.data);
    };
    getCate();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="sidebarImg"
          src="https://comicvine.gamespot.com/a/uploads/scale_medium/11117/111173561/5994041-8086170340-63780.jpg"
          alt=""
        />
        <p className="p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor est
          ullam delectus laudantium facere dolorem voluptate.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cate.map((e) => (
            <Link to={`/?cate=${e.name}`} className="link">
              <li className="sidebarListItem">{e.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <FacebookIcon style={{ padding: 10, cursor: "pointer" }} />
          <TwitterIcon style={{ padding: 10, cursor: "pointer" }} />
          <InstagramIcon style={{ padding: 10, cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}
