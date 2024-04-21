import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
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
  const [postList, dispatchedPostList] = useReducer(
    postListReducer,
    DEFAULTPOST
  );

  function addPost(userId, postTitle, postBody, reactions, tags) {
    console.log(`${userId},${postTitle},${postBody},${reactions},${tags}`);
    dispatchedPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userID: userId,
        tags: tags,
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

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
const DEFAULTPOST = [
  {
    id: "user123",
    title: "New Post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reactions: 2,
    userId: "user-19",
    tags: ["tag1", "tag2"],
  },
  {
    id: "user-43",
    title: "New Post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reactions: 5,
    userId: "user02",
    tags: ["tag1", "tag2"],
  },
];

export default PostListProvider;
