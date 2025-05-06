import { TaskModel } from "@models/taskModel";
import { TaskInput, TaskType } from "@models/taskModel";
import { throwError } from "@utils/errorHandler";

export class TaskService {
  async getAllTasks(): Promise<TaskType[]> {
    return TaskModel.find().exec();
  }

  async createTask(taskInput: TaskInput): Promise<TaskType> {
    const newTask = new TaskModel(taskInput);

    return newTask.save();
  }

  async getTaskById(id: string): Promise<TaskType | null> {
    const task = await TaskModel.findById(id).exec();

    if (!task) this.taskNotFound();

    return task;
  }

  async getTaskByUserId(userId: string): Promise<TaskType[]> {
    return TaskModel.find({ userId }).exec();
  }

  async updateTask(id: string, taskInput: TaskInput): Promise<TaskType | null> {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, taskInput, {
      new: true,
    }).exec();

    if (!updatedTask) this.taskNotFound();

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const deletedTask = await TaskModel.findByIdAndDelete(id).exec();

    if (!deletedTask) this.taskNotFound();
  }

  taskNotFound = () => {
    throwError("Task not found", 404);
  };
}

export const taskService = new TaskService();
