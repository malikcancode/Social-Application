import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  allPosts: () => {},
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

  function addPost(userId, postTitle, postBody, reactions, tags) {
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

  function allPosts(posts) {
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

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, allPosts }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
