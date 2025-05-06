import bcrypt from "bcrypt";
import { UserModel, UserType, UserUpdateInput } from "@models/userModel";
import { UserInput } from "../types/user";
import { throwError } from "@utils/errorHandler";

export class UserService {
  async getAllUsers(): Promise<UserType[]> {
    return UserModel.find().exec();
  }

  async registerUser(userInput: UserInput): Promise<UserType> {
    const { password, email } = userInput;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throwError("User already exists", 409);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userDetails = {
      ...userInput,
      password: hashedPassword,
    };

    const newUser = new UserModel(userDetails);

    return newUser.save();
  }

  async getUserById(id: string): Promise<UserType | null> {
    const user = await UserModel.findById(id).exec();

    if (!user) this.userNotFound();

    return user;
  }

  async updateUser(
    id: string,
    userInput: UserUpdateInput
  ): Promise<UserType | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, userInput, {
      new: true,
    }).exec();

    if (!updatedUser) this.userNotFound();

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await UserModel.findByIdAndDelete(id).exec();

    if (!deletedUser) this.userNotFound();
  }

  userNotFound = () => {
    throwError("User not found", 404);
  };
}

export const userService = new UserService();
