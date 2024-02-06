import { httpAxios } from "@/helper/httpHelper";

export async function addTask(task) {
  const result = await httpAxios
    .post("/api/tasks", task)
    .then((response) => response.data);
  return result;
}

export async function getTasksOfUser(userid) {
  const result = await httpAxios
    .get(`/api/users/${userid}/tasks`)
    .then((response) => response.data);
  return result;
}

export async function deleteTask(taskid) {
  const result = await httpAxios
    .delete(`/api/tasks/${taskid}`)
    .then((response) => response.data);
  return result;
}