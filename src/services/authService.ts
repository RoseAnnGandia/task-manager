import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel, UserDoc, UserType } from "@models/userModel";
import { RefreshToken } from "@models/refreshTokenModel";
import { throwError } from "@utils/errorHandler";
import { TokenPayload } from "../types/auth";
import { UserInput } from "../types/user";
import { userService } from "@services/userService";

dotenv.config();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET!;

export class AuthService {
  async signup(input: UserInput): Promise<UserType> {
    return await userService.registerUser(input);
  }

  async signin(email: string, password: string) {
    const userDetails: UserDoc | null = await UserModel.findOne({ email });
    if (!userDetails) throwError("Email not registered", 404);

    const user = userDetails as UserDoc;
    const userId = user?._id?.toString() || "";

    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password as string
    );
    if (!isPasswordMatch) throwError("Invalid credentials", 401);

    const accessToken = await this.generateAccessToken(userId);
    const refreshToken = await this.generateRefreshToken(userId);

    const hashedRefreshToken = await this.hashToken(refreshToken);
    await RefreshToken.create({ userId: user._id, token: hashedRefreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const decodedToken = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const tokenUserId = (decodedToken as TokenPayload)?.userId;

    const storedToken = await RefreshToken.findOne({
      userId: tokenUserId,
    });
    if (!storedToken) throwError("Invalid refresh token", 403);

    const isValidToken = await this.verifyHashedToken(
      token,
      storedToken?.token || ""
    );
    if (!isValidToken) throwError("Invalid refresh token", 403);

    const user = await UserModel.findById(tokenUserId);

    const userId = user?._id?.toString() || "";
    const accessToken = await this.generateAccessToken(userId);
    const newRefreshToken = await this.generateRefreshToken(userId);

    const hashedRefreshToken = await this.hashToken(newRefreshToken);
    await RefreshToken.findOneAndUpdate(
      { userId },
      { token: hashedRefreshToken },
      { upsert: true }
    );

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(token: string) {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
    await RefreshToken.deleteOne({ userId: decoded.userId });
  }

  private async generateAccessToken(userId: string) {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  private async generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
  }

  private async hashToken(token: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(token, salt);
  }

  private async verifyHashedToken(token: string, hashedToken: string) {
    const isValid = await bcrypt.compare(token, hashedToken);

    if (!isValid) throwError("Invalid token", 401);

    return isValid;
  }
}

export const authService = new AuthService();
