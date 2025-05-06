import { TaskInput, TaskType } from "@models/taskModel";
import { Request, Response, NextFunction } from "express";
import { taskService } from "@services/taskService";

export const getAllTasks = async (
  req: Request,
  res: Response<TaskType[]>,
  next: NextFunction
) => {
  try {
    const tasks: TaskType[] = await taskService.getAllTasks();

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request<{}, {}, TaskInput>,
  res: Response<TaskType>,
  next: NextFunction
) => {
  try {
    const { userId } = res.locals.user;
    req.body.userId = userId;
    const newTask = await taskService.createTask(req.body);

    res.json(newTask);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response<TaskType | null>,
  next: NextFunction
) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response<TaskType | null>,
  next: NextFunction
) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  try {
    await taskService.deleteTask(req.params.id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getTaskByUserId = async (
  req: Request,
  res: Response<TaskType[]>,
  next: NextFunction
) => {
  try {
    const tasks: TaskType[] = await taskService.getTaskByUserId(req.params.id);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
