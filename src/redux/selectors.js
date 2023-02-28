//Селекторы для части стэйта tasks
export const getTasks = state => state.tasks.items;
export const getLoadingStatus = state => state.tasks.isLoading;
export const getError = state => state.tasks.error;

//Селектор для части стэйта filters
export const getStatusFilter = state => state.filters.status;
