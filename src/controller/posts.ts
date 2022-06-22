/** src/controllers/posts.ts */
import { NextFunction, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

interface UserPost {
  userName: string;
  id: Number;
  title: String;
  body: String;
}
const usersHostURL = "http://localhost:3000";

const posts = [
  {
    userId: 1,
    id: 1,
    title: "Sample1",
    body: "Sample Content 1 from user 1",
  },
  {
    userId: 1,
    id: 2,
    title: "Sample2",
    body: "Sample Content 2 from user 1",
  },
  {
    userId: 2,
    id: 3,
    title: "Sample3",
    body: "Sample Content 3 from user 3",
  },
];

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  // get some posts
  return res.status(200).json({
    message: posts,
  });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req
  let id: string = req.params.id;
  let post = undefined;
  posts.forEach((element) => {
    if (element.id === Number(id)) {
      post = element;
    }
  });
  if (post != undefined) {
    let postRef = <Post>post;
    let userId: Number = postRef.userId;
    let result: AxiosResponse = await axios.get(
      `${usersHostURL}/users/${userId}`
    );
    let userPost: UserPost = {
      id: postRef.id,
      title: postRef.title,
      userName: result.data.message.name,
      body: postRef.body,
    };
    return res.status(200).json({
      message: userPost,
    });
  }
};

export default { getPosts, getPost };
