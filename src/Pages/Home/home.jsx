import React, { useState } from "react";
import "./home.css";
import Header from "../../Components/Header/header";
import Posts from "../../Components/Posts/posts";
import Sidebar from "../../Components/Sidebar/sidebar";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setposts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("https://blogservr.herokuapp.com/posts"+ search);
      setposts(res.data);
    };
    fetchPost();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
