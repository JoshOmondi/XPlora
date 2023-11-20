import { Request } from "express";

export interface User {
  userName: string;
  email: string;
  userID: string;
  role: string;
  phone_no: string;
  password: string;
}

export interface LoginUser extends Request {
  email: string;
  pass: string;
}
