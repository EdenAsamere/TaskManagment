import { ITodoList } from "../interfaces/todolist.interface";
import { TodoList } from "../models/todolist.model";
import { TaskService } from "./task.service";

export class TodoListService {
    async createTodoList(todoListData: ITodoList) {
        const todoList = new TodoList(todoListData);
        return todoList.save();
    }
    async getTodoListById(todoListId: string) {
        return TodoList.findById(todoListId)
            .populate('project', 'name');
    }       
    async getTodoListsByProject(projectId: string) {
        return TodoList.find({ project: projectId });
    }   
    async updateTodoList(todoListId: string, updateData: Partial<ITodoList>) {
        const todoList = await TodoList.findByIdAndUpdate(todoListId, updateData, { new: true });
        if (!todoList) throw new Error('TodoList not found');
        return todoList;
    }
    async deleteTodoList(todoListId: string) {
        const todoList = await TodoList.findByIdAndDelete(todoListId);
        if (!todoList) throw new Error('TodoList not found');
        return { message: 'TodoList deleted successfully' };
    }
    async convertTodoListToTask(todoListId: string, userId: string) {
        const todoList = await TodoList.findById(todoListId);
        if (!todoList) throw new Error('TodoList not found');
        if (!todoList.project) {
            throw new Error('TodoList project is missing');
        }
        const task = {
            name: todoList.title,
            description: todoList.description,
            project: todoList.project,
            status: "pending" as any,
            createdBy: userId as any,
        };
        const taskService = new TaskService();
        await taskService.createTask(task);
        await this.deleteTodoList(todoListId);
        return task;
    }
    async getPaginatedTodoLists(createdBy: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        return TodoList.find({ createdBy })
            .skip(skip)
            .limit(limit)
            .exec();
    }
}
