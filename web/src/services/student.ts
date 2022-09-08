import type { IStudent } from "@/interfaces/IStudent";
import api from "./api";

export const getStudents = async () => {
  const { data } = await api.get("/students");

  return data;
};

export const createStudent = async (student: Omit<IStudent, "id">) => {
  const { data } = await api.post("/students", student);

  return data;
};

export const updateStudent = async (student: IStudent) => {
  const { data } = await api.put(`/students/${student.id}`, student);

  return data;
};

export const deleteStudent = async (id: number) => {
  const { data } = await api.delete(`/students/${id}`);

  return data;
};
