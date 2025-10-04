import * as userservice from "../services/userService.js";
import { Request, Response } from "express";

export const createuser = async (req: Request, res: Response) => {
  try {
    const user = await userservice.createUserService(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllusers = async (req: Request, res: Response) => {
  try {
    const users = await userservice.getAllUserService(); 
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getuserById = async (req: Request, res: Response) => {
  try {
    const user = await userservice.getUserByIdService(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateuser = async (req: Request, res: Response) => {
  try {
    const user = await userservice.updateUserService(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeuser = async (req: Request, res: Response) => {
  try {
    const user = await userservice.removeUserService(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
