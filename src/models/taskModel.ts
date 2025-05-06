import { InferRawDocType, Schema, model, InferSchemaType } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export type TaskType = InferSchemaType<typeof taskSchema>;
export type TaskInput = Omit<TaskType, "_id" | "createdAt" | "updatedAt">;

const TaskModel = model<TaskType>("Task", taskSchema);

export { TaskModel, taskSchema };
