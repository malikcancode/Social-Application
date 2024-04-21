import { useContext } from "react";
import Post from "./Post";
import { PostList } from "./Store/Post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import Loading from "./Loading";

function ListPost() {
  const { postList, loading } = useContext(PostList);

  return (
    <>
      {loading && <Loading />}
      {!loading && postList.length === 0 && <WelcomeMessage />}
      {!loading && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}

export default ListPost;
