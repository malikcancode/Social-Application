import { useContext } from "react";
import Post from "./Post";
import { PostList } from "./Store/Post-list-store";
import WelcomeMessage from "./WelcomeMessage";

function ListPost() {
  const { postList } = useContext(PostList);

  return (
    <>
      {postList.length === 0 && <WelcomeMessage />}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default ListPost;
