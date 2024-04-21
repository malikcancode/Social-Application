import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList } from "./Store/Post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import Loading from "./Loading";

function ListPost() {
  const { postList, allPosts } = useContext(PostList);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        allPosts(data.posts);
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && postList.length === 0 && <WelcomeMessage />}
      {!loading && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}

export default ListPost;
