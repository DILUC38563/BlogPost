import React from "react";
import Post from "../Post/post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((e) => (
        <Post post={e} />
      ))}
    </div>
  );
}
