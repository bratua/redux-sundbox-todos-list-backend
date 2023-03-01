import { useSelector } from "react-redux";
import { Task } from "components/Task/Task";
// import { selectTasks, selectStatusFilter } from "redux/selectors";
import { selectVisibleTasks } from "redux/selectors.js";
import css from "./TaskList.module.css";

// const selectVisibleTasks = (tasks, statusFilter) => {
//   switch (statusFilter) {
//     case statusFilters.active:
//       return tasks.filter(task => !task.completed);
//     case statusFilters.completed:
//       return tasks.filter(task => task.completed);
//     default:
//       return tasks;
//   }
// };

export const TaskList = () => {
  const tasks = useSelector(selectVisibleTasks);
  // const statusFilter = useSelector(selectStatusFilter);
  // const visibleTasks = selectVisibleTasks(tasks, statusFilter);

  return (
    <ul className={css.list}>
      {tasks.map(task => (
        <li className={css.listItem} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
