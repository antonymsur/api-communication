/** src/controllers/posts.ts */
import { NextFunction, Request, Response } from "express";
//import axios, { AxiosResponse } from "axios";

interface User {
  id: Number;
  name: String;
}

const users = [
  {
    name: "Antony",
    id: 1,
  },
  {
    userId: "Susanta",
    id: 2,
  },
];

// getting all posts
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // get some posts
  return res.status(200).json({
    message: users,
  });
};

// getting a single post
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req
  let id: string = req.params.id;
  let user;
  users.forEach((element) => {
    if (element.id === Number(id)) {
      user = element;
    }
  });
  return res.status(200).json({
    message: user,
  });
};

export default { getUsers, getUser };
