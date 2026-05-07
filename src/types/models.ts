export interface User{
    nif: string;
    name: string;
    email: string;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  completed?: boolean;
  user: string;
}

export interface TaskResponse {
    id: number
    title: string
    description: string
    completed: boolean
    dueDate: string
}