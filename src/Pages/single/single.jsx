import "./single.css";
// import Post from "../../Components/Post/post"
import Sidebar from "../../Components/Sidebar/sidebar";
import SinglePost from "../../Components/SinglePost/SinglePost";

export default function single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}
