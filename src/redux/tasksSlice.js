import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleStatusTask,
} from "./operations";

//Выносим одинаковый код редьюсеров
const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    // забираем все ТУДУ-хи с сервера
    [fetchTasks.pending]: handlePending,
    [fetchTasks.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchTasks.rejected]: handleRejected,

    // добавляем новую ТУДУ-ху на сервер
    [addTask.pending]: handlePending,
    [addTask.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      // console.log(action);
      state.items.push(action.payload);
    },
    [addTask.rejected]: handleRejected,

    // удаляем ТУДУ-ху по ИД
    [deleteTask.pending]: handlePending,
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
    [deleteTask.rejected]: handleRejected,

    // меняем статус ТУДУ-хи по ИД
    [toggleStatusTask.pending]: handlePending,
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
    [toggleStatusTask.rejected]: handleRejected,
  },
});

export const tasksReducer = tasksSlice.reducer;
