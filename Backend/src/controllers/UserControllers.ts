import { Request, Response } from "express";
import mssql, { pool } from "mssql";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { sqlConfig } from "../config/sqlConfig";
import {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "../validators/UserValidators";
import { ExtendedUser } from "../middlewares/tokenVerify";
import { v4 } from "uuid";
import { connection, Query } from "mongoose";

//register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    let { userName, email, password, phone_no } = req.body;

    let { error } = userRegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let userID = v4();
    const hashedPwd = await bcrypt.hash(password, 5);

    const pool = await mssql.connect(sqlConfig);

    const checkEmailQuery = `SELECT 1 FROM Users WHERE email = @email`;
    const emailCheckResult = await pool
      .request()
      .input("email", mssql.VarChar, email)
      .query(checkEmailQuery);

    if (emailCheckResult.recordset.length > 0) {
      return res
        .status(400)
        .json({ error: "Email already exists. User not registered." });
    }

    const data = await pool
      .request()
      .input("userID", mssql.VarChar, userID)
      .input("userName", mssql.VarChar, userName)
      .input("email", mssql.VarChar, email)
      .input("password", mssql.VarChar, hashedPwd)
      .input("phone_no", mssql.VarChar, phone_no)
      .execute("registerUsers");

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);

    let user = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, password)
        .execute("loginUser")
    ).recordset;

    if (user.length === 1) {
      const correctPwd = await bcrypt.compare(password, user[0].password);

      if (!correctPwd) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      const loginCredentials = user.map((record) => {
        const { phone_no, id_no, password, ...rest } = record;
        return rest;
      });
      const secretKey = "112233";
      const token = jwt.sign(loginCredentials[0], secretKey, {
        expiresIn: "3600s",
      });

      return res.status(200).json({
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        message: "Email not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let users = (await pool.request().execute("fetchAllUsers")).recordset;
    return res.json({
      users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

//checkUser Details
export const checkUserDetails = async (req: ExtendedUser, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};

// reload user page

//get single user
export const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const pool = await mssql.connect(sqlConfig);
    let user = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .execute("getSingleUser")
    ).recordset;

    return res.json({
      message: "fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};


// Controller function for creating a booking
export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { tourist_name,  booking_date } = req.body;
    let tour_id = v4()
    // Call the CreateBooking stored procedure
    const result: mssql.IProcedureResult<any> = await pool
      .request()
      .input("p_tourist_name", mssql.VarChar, tourist_name)
      .input("p_tour_id", mssql.Int, tour_id)
      .input("p_booking_date", mssql.Date, booking_date)
      .execute("CreateBooking");

    // Return the result
    res.json({ message: result.recordset[0].message });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
};
