import { useState, useEffect } from "react";
import "./todo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  document.title = "Todo List";

  const [input, setInput] = useState("");
  const [arr, updateArr] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      console.log("Loading tasks from local storage:", storedTasks); // Debugging log
      updateArr(JSON.parse(storedTasks));
    } else {
      console.log("No tasks found in local storage."); // Debugging log
    }
  }, []);

  // Function to update local storage whenever the tasks array changes
  const updateLocalStorage = (tasks) => {
    console.log("Updating local storage with tasks:", JSON.stringify(tasks)); // Debugging log
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  function FormSubmit(e) {
    e.preventDefault();
    if (editIndex === null) {
      const newTasks = [...arr, { text: input, completed: false }];
      updateArr(newTasks);
      updateLocalStorage(newTasks);
    } else {
      const newArr = [...arr];
      newArr[editIndex] = { text: editInput, completed: false };
      updateArr(newArr);
      updateLocalStorage(newArr);
      setEditIndex(null); // Reset editIndex after updating
      setEditInput(""); // Clear the editInput
    }
    setInput(""); // Clear the main input field
  }

  function valueChanged(e) {
    setInput(e.target.value);
  }

  function editValueChanged(e) {
    setEditInput(e.target.value);
  }

  function DeleteList(index) {
    const newArr = [...arr];
    newArr.splice(index, 1);
    updateArr(newArr);
    updateLocalStorage(newArr);
  }

  function EditList(index) {
    if (!arr[index].completed) {
      setEditInput(arr[index].text); // Set the editInput with the task being edited
      setEditIndex(index); // Set the index of the task being edited
    }
  }

  function ChangeList() {
    // This function is called when the "Change" button is clicked.
    // It's used to apply changes when editing.
    FormSubmit(new Event("submit"));
  }

  function TaskDashed(index) {
    const newArr = [...arr];
    newArr[index].completed = !newArr[index].completed;
    updateArr(newArr);
    updateLocalStorage(newArr);
    if (editIndex === index) {
      // If the edited task is marked as completed, reset editing state
      setEditIndex(null);
      setEditInput("");
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <form action="" onSubmit={FormSubmit}>
        <input type="text" placeholder="Enter Task" value={input} onChange={valueChanged} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {arr.map((item, index) => {
          const isEditing = index === editIndex;
          return (
            <li key={index} className={item.completed ? "underline" : ""}>
              {isEditing ? (
                <input type="text" value={editInput} onChange={editValueChanged} />
              ) : (
                <pre>{index + 1}.  {item.text}</pre>
              )}
              <div className="option">
                <button onClick={() => DeleteList(index)}><FontAwesomeIcon icon={faTrash} /></button>
                {isEditing ? (
                  <button onClick={ChangeList}><FontAwesomeIcon icon={faCheck} /></button>
                ) : (
                  <button onClick={() => EditList(index)} disabled={item.completed}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                )}
                <button onClick={() => TaskDashed(index)}>
                  {item.completed ? <FontAwesomeIcon icon={faThumbsDown} /> : <FontAwesomeIcon icon={faThumbsUp} />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
