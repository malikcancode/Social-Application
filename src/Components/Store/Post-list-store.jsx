import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  loading: false,
});

function postListReducer(currPostList, action) {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postID
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
}

const PostListProvider = ({ children }) => {
  const [postList, dispatchedPostList] = useReducer(postListReducer, []);
  const [loading, setLoading] = useState(false);

  function addPost(post) {
    dispatchedPostList({
      type: "ADD_POST",
      payload: post,
    });
  }

  function addInitialPosts(posts) {
    dispatchedPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  }

  function deletePost(postID) {
    dispatchedPostList({
      type: "DELETE_POST",
      payload: {
        postID,
      },
    });
  }

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider value={{ postList, loading, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

// const DEFAULTPOST = [
//   {
//     id: "user123",
//     title: "New Post",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     reactions: 2,
//     userId: "user-19",
//     tags: ["tag1", "tag2"],
//   },
//   {
//     id: "user-43",
//     title: "New Post",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     reactions: 5,
//     userId: "user02",
//     tags: ["tag1", "tag2"],
//   },
// ];

export default PostListProvider;
