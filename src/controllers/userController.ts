import { UserType, UserUpdateInput } from "@models/userModel";
import { Request, Response, NextFunction } from "express";
import { userService } from "@services/userService";

export const getAllUsers = async (
  req: Request,
  res: Response<UserType[]>,
  next: NextFunction
) => {
  try {
    const users: UserType[] = await userService.getAllUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<UserType | null>,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, UserUpdateInput>,
  res: Response<UserType | null>,
  next: NextFunction
) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);

    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
