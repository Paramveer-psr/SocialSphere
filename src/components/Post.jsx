import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";
const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card card-container">
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        onClick={() => deletePost(post.id)}
      >
        <MdDelete />

        <span className="visually-hidden">unread messages</span>
      </span>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary tag-badge">
            {tag}
          </span>
        ))}
        <br />
        <span className="badge text-bg-info reactions-badge">
          Reactons: {post.reactions.likes}
        </span>
      </div>
    </div>
  );
};
export default Post;
