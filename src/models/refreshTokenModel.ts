import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      now.setHours(now.getHours() + 8);
      return now;
    },
  },
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);

export { RefreshToken, refreshTokenSchema };
