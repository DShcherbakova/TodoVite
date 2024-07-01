import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users/1/todos");
        setTasks(response.data.splice(0, 10).map((e) => ({ title: e.title, isCompleted: false, updatedAt: new Date().toISOString() })));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const tasksCopy = [...tasks];
      tasksCopy.push({ title: newTask, isCompleted: false, updatedAt: new Date().toISOString() });
      setTasks(tasksCopy);
    }
    setNewTask("");
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => i !== index));
  };

  const editTask = (i, updatedTask) => {
    setTasks(tasks.map((e, index) => (index === i ? updatedTask : e)));
  };

  const sortedTasks = tasks.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Task Manager App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
          placeholder="New Task"
        />
        <button onClick={addTask} className="btn btn-primary">
          Add Task
        </button>
      </div>
      <div>
      {sortedTasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            deleteTask={() => deleteTask(index)}
            editTask={editTask}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};


export default TaskList;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import Task from "./Task";


// const TaskList = () => {
//   //
//   const [tasks, setTasks] = useState([ ]);
//   const [newTask, setNewTask] = useState({ title: "", isCompleted: false });

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const data = await axios.get("https://jsonplaceholder.typicode.com/").data;
//         setTasks(data.splice(0, 10).map((e) => e.title));
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchTodos();
//   }, []);

//   const addTask = () => {
//     if (newTask.title.trim()) {
//       const tasksCopy = [...tasks];
//       tasksCopy.push({ ...newTask, createAd: new Date().toISOString() });
//       setTasks(tasksCopy);
//     }
//     setNewTask("");
//   };

//   const deleteTask = (i) => {
//     setTasks(tasks.filter((_, index) => i !== index));
//   };

//   const editTask = (i, updatedTask) => {
//     setTasks(tasks.map((e, index) => (index === i ? updatedTask : e)));
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4 text-center">Task Manager App</h1>
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           value={newTask.title}
//           onChange={(e) =>
//             setNewTask({ title: e.target.value, isCompleted: false })
//           }
//           className="form-control"
//           placeholder="New Task"
//         />
//         <button onClick={addTask} className="btn btn-primary">
//           Add Task
//         </button>
//       </div>
//       <div>
//         {tasks.map((task, index) => (
//           <Task
//             key={index}
//             task={task}
//             deleteTask={() => deleteTask(index)}
//             editTask={editTask}
//             index={index}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;
