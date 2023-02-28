import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "redux/operations";
import { getError, getLoadingStatus } from "redux/selectors";

import { Layout } from "components/Layout/Layout";
import { AppBar } from "components/AppBar/AppBar";
import { TaskForm } from "components/TaskForm/TaskForm";
import { TaskList } from "components/TaskList/TaskList";

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingStatus);
  const error = useSelector(getError);
  const itemsState = useSelector(state => state.tasks.items);
  console.log("itemsState", itemsState);

  useEffect(() => {
    console.log("при монтаже АПП диспатчим ОПЕРАЦИЮ fetchTasks");
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Layout>
      <AppBar />
      <TaskForm />
      {isLoading && !error && <div>Loading in progress...</div>}
      {!isLoading && <TaskList />}
    </Layout>
  );
};
