import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleStatusTask,
} from "./operations";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    // забираем все ТУДУ-хи с сервера
    [fetchTasks.pending](state) {
      state.isLoading = true;
    },
    [fetchTasks.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchTasks.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // добавляем новую ТУДУ-ху на сервер
    [addTask.pending](state) {
      state.isLoading = true;
    },
    [addTask.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      // console.log(action);
      state.items.push(action.payload);
    },
    [addTask.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // удаляем ТУДУ-ху по ИД
    [deleteTask.pending](state) {
      state.isLoading = true;
    },
    [deleteTask.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      // console.log("DEL payload", action.payload.id);
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      // console.log("ID to delete", index);
      state.items.splice(index, 1);
    },
    [deleteTask.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // меняем статус ТУДУ-хи по ИД
    [toggleStatusTask.pending](state) {
      state.isLoading = true;
    },
    [toggleStatusTask.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      // console.log("Change payload", action.payload.id);
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      // console.log("ID to change", index);
      state.items.splice(index, 1, action.payload);
    },
    [toggleStatusTask.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
