import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://63fe0be119f41bb9f659e8fc.mockapi.io";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    // console.log("fetchAll --- пошёл запрос");
    try {
      const response = await axios.get("/todos/tasks");
      // console.log(response.data);
      // console.log("fetchTasks --- запрос выполнен ОК");
      return response.data;
    } catch (error) {
      // console.log("fetchTasks --- запрос с ошибкой");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkAPI) => {
    try {
      const response = await axios.post("/todos/tasks", { text });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/todos/tasks/${taskId}`);
      // console.log("DEL op", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleStatusTask = createAsyncThunk(
  "tasks/toggleStatusTask",
  async (task, thunkAPI) => {
    try {
      const response = await axios.put(`/todos/tasks/${task.id}`, {
        completed: !task.completed,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
