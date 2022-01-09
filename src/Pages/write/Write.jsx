import "./write.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import AddIcon from "@mui/icons-material/Add";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const { user } = useContext(Context);

  const uploadImg = async (e) => {
    const file = e.target.files[0];
    const base64 = await base64file(file);
    setPhoto(base64);
  };
  const base64file = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
      photo,
    };
    try {
      const res = await axios.post("https://blogservr.herokuapp.com/posts", newPost);
      window.location.replace("https://blogservr.herokuapp.com/post/" + res.data._id);
    } catch (error) {
      alert("Something went worng!");
    }
  };
  return (
    <div className="write">
      {photo && <img className="writeImg" src={photo} alt="" />}

      <form className="writeForm" onSubmit={handelSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <AddIcon
              style={{
                cursor: "pointer",
                border: "1px solid",
                borderRadius: "50%",
              }}
            />
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                uploadImg(e);
              }}
              style={{ display: "none" }}
            />
          </label>
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Your Story..."
            type="text"
            className="writeText"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
