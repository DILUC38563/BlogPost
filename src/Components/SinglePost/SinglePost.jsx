import "./SinglePost.css";
import axios from "axios";
import { useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("https://blogservr.herokuapp.com/posts/" + path);
      setPost(res.data);
      setDesc(res.data.desc);
      setTitle(res.data.title);
    };
    getPost();
  }, [path]);

  const handelDelete = async () => {
    try {
      await axios.delete("https://blogservr.herokuapp.com/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      alert({ message: "Something Went Worng!" });
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put("https://blogservr.herokuapp.com/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      setUpdate(false)
    } catch (error) {
      alert({ message: "Something Went Worng!" });
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={post.photo} alt="" />
        )}
        {update ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <FontAwesomeIcon
                  onClick={() => setUpdate(true)}
                  icon={faEdit}
                  style={{
                    marginLeft: 10,
                    color: "rgb(27, 204, 71)",
                    fontSize: 25,
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={handelDelete}
                  style={{ marginLeft: 10, color: "red", fontSize: 25 }}
                />
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="Author">
            Author :
            <Link to={`/?user=${post.username}`} className="link">
              <b style={{ paddingLeft: 10, textTransform: "uppercase" }}>
                {post.username}
              </b>
            </Link>
          </span>
          <span className="Date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {update ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {update && (
          <button className="singlePostBtn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
