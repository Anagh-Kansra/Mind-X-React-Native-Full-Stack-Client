import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//create context
const PostContext = createContext();

//provider
const PostProvider = ({ children }) => {
  //global state
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  const getAllPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setPost(data?.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //initial posts
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <PostContext.Provider value={[post, setPost, getAllPost]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
