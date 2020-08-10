import axios from "axios";

export type ExerciseData = {
  userName: string;
  description: string;
  duration: number;
  date: Date;
};

export type UserData = {
  userName: string;
};

export interface Exercise extends ExerciseData {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}
const baseUrl = "http://localhost:4000";

export const createExercise = async (data: ExerciseData) => {
  try {
    const response = await axios.post(`${baseUrl}/exercises/add`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (data: UserData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/add`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getExercises = async () => {
  try {
    const response = await axios.get(`${baseUrl}/exercises`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editExercise = async (id: string, data: ExerciseData) => {
  try {
    const response = await axios.put(`${baseUrl}/exercises/edit/${id}`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getExercise = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseUrl}/exercises/${id}`);
    const { userName, description, duration, date } = data[0];
    return { userName, description, duration, date };
  } catch (error) {
    return error;
  }
};

export const deleteExercise = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/exercises/delete/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  } catch (error) {
    return error;
  }
};
