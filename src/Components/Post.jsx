import { useContext } from "react";
import { PostList } from "./Store/Post-list-store";

function Post({ post }) {
  const { deletePost } = useContext(PostList);
  return (
    <>
      <div className="card post-card">
        <div className="card-body">
          <h5 className="card-title">
            {post.title}
            <span
              onClick={() => deletePost(post.id)}
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              ❌
            </span>
          </h5>
          <p className="card-text">{post.body}</p>
          {post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary m-1">
              {tag}
            </span>
          ))}
          <div
            className="alert alert-success text-capitalize alert"
            role="alert"
          >
            this post has been reacted by {post.reactions} people
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
