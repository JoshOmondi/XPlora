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

export interface createBooking{
  tourist_name: string;
  tour_id: number;
  tour_name: string;
  total_seats: number;
  price: number;
  booking_date: number;

}
