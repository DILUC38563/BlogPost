import React from "react";
import "./header.css"

export default function header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_960_720.jpg"
        alt=""
      />
    </div>
  );
}
