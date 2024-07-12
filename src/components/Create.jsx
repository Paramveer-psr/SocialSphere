import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
const Create = () => {
  const { addPost } = useContext(PostList);

  const userIdElement = useRef();
  const titleElement = useRef();
  const contentElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = () => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const title = titleElement.current.value;
    const body = contentElement.current.value;
    const reactions = {
      likes: reactionsElement.current.value,
      dislikes: 0,
    };
    const tags = tagsElement.current.value.split(/[ ,]+/);
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        reactions,
        userId,
        tags,
        /* other post data */
      }),
    })
      .then((res) => res.json())
      //.then(console.log)
      .then((res) => addPost(res));
    //.then(console.log());
    // fetch("https://dummyjson.com/posts/add", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     title,
    //     body,
    //     reactions,
    //     userId,
    //     tags,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(console.log())
    //   .then((resObj) => addPost(resObj));
    userIdElement.current.value = "";
    titleElement.current.value = "";
    contentElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="User-Id" className="form-label">
          User-Id
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="User-Id"
          ref={userIdElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Post Title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Post Title"
          ref={titleElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Post Content" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          className="form-control"
          placeholder="Post Content"
          ref={contentElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Reactions" className="form-label">
          Reactions
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Reactions"
          ref={reactionsElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Tags" className="form-label">
          Tags
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Tags"
          ref={tagsElement}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Post
      </button>
    </form>
  );
};

export default Create;
