import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
    return newPostList;
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
    return newPostList;
  } else {
    newPostList = [...currPostList, action.payload.post];
    return newPostList;
  }
  return currPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (post) => {
    //console.log(post);
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        post,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };
  const addIntialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setFetching(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addIntialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <PostList.Provider value={{ postList, addPost, deletePost, fetching }}>
      {children}
    </PostList.Provider>
  );
};
// const DEFAULT_POST_DATA = [
//   {
//     id: "12",
//     title: "Going for vacations",
//     body: "Hi Guys, I am going to Mumbai",
//     reactions: 0,
//     userId: "xyz001",
//     tags: ["travelling", "fun"],
//   },
//   {
//     id: "54",
//     title: "Going for vacations",
//     body: "Hi Guys, I am going to Mumbai",
//     reactions: 46,
//     userId: "xyz001",
//     tags: ["travelling", "fun"],
//   },
// ];

export default PostListProvider;
