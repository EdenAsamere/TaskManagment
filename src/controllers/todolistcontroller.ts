import { Request, Response } from "express";
import { TodoListService } from "../services/todolist.service";
import { ITodoList } from "../interfaces/todolist.interface";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TodoList } from "../models/todolist.model";

const todoListService = new TodoListService();

const getUserId = (req: Request) => (req as AuthRequest).user?.id;

const ensureOwnership = async (id: string, userId: string) => {
  const todoList = await todoListService.getTodoListById(id);
  if (!todoList) throw new Error("NOT_FOUND");
  if (todoList.createdBy.toString() !== userId) throw new Error("FORBIDDEN");
  return todoList;
};

export const createTodoList = async (req: Request, res: Response) => {
  try {
    const createdBy = getUserId(req);
    const todoListData: ITodoList = { ...req.body, createdBy };
    const todoList = await todoListService.createTodoList(todoListData);
    res.status(201).json(todoList);
  } catch (error) {
    res
      .status((error as Error).message === "FORBIDDEN" ? 403 : 400)
      .json({ error: (error as Error).message });
  }
};

export const getTodoListById = async (req: Request, res: Response) => {
  try {
    const createdBy = getUserId(req);
    const todoList = await ensureOwnership(req.params.id, createdBy);
    res.json(todoList);
  } catch (error) {
    if ((error as Error).message === "NOT_FOUND")
      return res.status(404).json({ error: "TodoList not found" });
    if ((error as Error).message === "FORBIDDEN")
      return res.status(403).json({ error: "Forbidden" });
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getTodoListsByProject = async (req: Request, res: Response) => {
  try {
    const createdBy = getUserId(req);
    const todoLists = await todoListService.getTodoListsByProject(req.params.projectId);
    res.json(todoLists.filter((list: any) => list.createdBy.toString() === createdBy));
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateTodoList = async (req: Request, res: Response) => {
  try {
    const createdBy = getUserId(req);
    await ensureOwnership(req.params.id, createdBy);
    const updated = await todoListService.updateTodoList(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    if ((error as Error).message === "NOT_FOUND")
      return res.status(404).json({ error: "TodoList not found" });
    if ((error as Error).message === "FORBIDDEN")
      return res.status(403).json({ error: "Forbidden" });
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteTodoList = async (req: Request, res: Response) => {
  try {
    const createdBy = getUserId(req);
    await ensureOwnership(req.params.id, createdBy);
    const result = await todoListService.deleteTodoList(req.params.id);
    res.json(result);
  } catch (error) {
    if ((error as Error).message === "NOT_FOUND")
      return res.status(404).json({ error: "TodoList not found" });
    if ((error as Error).message === "FORBIDDEN")
      return res.status(403).json({ error: "Forbidden" });
    res.status(400).json({ error: (error as Error).message });
  }
};

export const convertTodoListToTask = async (req: Request, res: Response) => {
  try {
    const createdBy = getUserId(req);
    await ensureOwnership(req.params.id, createdBy);
    const task = await todoListService.convertTodoListToTask(req.params.id, createdBy);
    res.json(task);
  } catch (error) {
    if ((error as Error).message === "NOT_FOUND")
      return res.status(404).json({ error: "TodoList not found" });
    if ((error as Error).message === "FORBIDDEN")
      return res.status(403).json({ error: "Forbidden" });
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getPaginatedTodoLists = async (req: Request, res: Response) => {
  try {
    const createdBy = getUserId(req);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const todoLists = await todoListService.getPaginatedTodoLists(createdBy, page, limit);
    res.json(todoLists);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
