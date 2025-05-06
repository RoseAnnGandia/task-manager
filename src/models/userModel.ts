import { InferSchemaType, Schema, model, Document } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDoc = Document & UserType;
export type UserUpdateInput = Omit<UserType, "_id" | "createdAt" | "updatedAt">;

const UserModel = model<UserType>("User", userSchema);

export { UserModel, userSchema };
