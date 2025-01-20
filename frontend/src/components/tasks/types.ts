export interface Task {
  _id: string;
  title: string;
  comment?: string;
  priority: "extreme" | "moderate" | "low";
  status: "in progress" | "completed";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTask {
  title?: string;
  comment?: string;
  priority?: "extreme" | "moderate" | "low";
  status?: "in progress" | "completed";
}

export interface DeleteTask {
  _id: string;
}
