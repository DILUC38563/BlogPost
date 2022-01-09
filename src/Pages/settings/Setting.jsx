import "./setting.css";
import Sidebar from "../../Components/Sidebar/sidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useState } from "react";
import axios from "axios";

export default function Setting() {
  const { user, dispatch } = useContext(Context);
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [success, setSuccess] = useState(false);

  const uploadImg = async (e) => {
    const file = e.target.files[0];
    const base64 = await base64file(file);
    setProfilePic(base64);
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
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      profilePic,
      email,
      password,
    };
    try {
      const res = await axios.put("https://blogservr.herokuapp.com/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESSFULL", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAIL" });
      alert("Something Wemt Worng!");
    }
  };
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingForm" onSubmit={handelSubmit}>
          <label>Profile Picture</label>
          <div className="settingProfilePic">
            <img src={profilePic ? profilePic : user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <AccountCircleIcon className="settingProfileIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                uploadImg(e);
              }}
              style={{ display: "none" }}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="settingBtn" type="submit">
            Update
          </button>
          {success && alert("Profile has been updated")}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
