import "./App.css";
import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const Wrapper = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  let handleAddTodo = (e) => {
    e.preventDefault();
    if (newTitle === "" || newDescription === "") {
      return;
    }
    let data = JSON.parse(localStorage.getItem("todolist"));
    if (data) {
      let newTodoItem = {
        title: newTitle,
        description: newDescription,
        id: data.length === 0 ? 1 : data[data.length - 1].id + 1,
      };
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    } else if (!data) {
      let newTodoItem = {
        title: newTitle,
        description: newDescription,
        id: 1,
      };
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    }

    setNewTitle("");
    setNewDescription("");
    input_text_add.value = "";
input_text_add2.value = "";
  };
  // useEffect(() => {
  //   setNewTitle("");
  //   setNewDescription("");
  // }, [allTodos]);
  const handleDeleteTodo = (id) => {
    let data = JSON.parse(localStorage.getItem("todolist"));
    if (data) {
      let newFilter = data.filter((e) => e.id !== id);
      localStorage.setItem("todolist", JSON.stringify(newFilter));
      setTodos(newFilter);
    }
  };

  const handleDeleteCompletedTodo = (id) => {
    let data = JSON.parse(localStorage.getItem("completedTodos"));
    if (data.length !== 0) {
      let newFilter = data.filter((e) => e.id !== id);
      localStorage.setItem("completedTodos", JSON.stringify(newFilter));
      setCompletedTodos(newFilter);
    }
  };

  const handleComplete = (id) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    let data = JSON.parse(localStorage.getItem("todolist"));
    let t = data.filter((e) => e.id == id);
    let f = data.filter((e) => e.id != id);
    let data2 = JSON.parse(localStorage.getItem("completedTodos"));
    if (!data2) {
      let filteredItem = {
        title: t[0].title,
        description: t[0].description,
        id: t[0].id,
        dey: completedOn,
      };
      localStorage.setItem("completedTodos", JSON.stringify([filteredItem]));
      setCompletedTodos([filteredItem]);
    } else if (data2) {
      let filteredItem = {
        title: t[0].title,
        description: t[0].description,
        id: t[0].id,
        dey: completedOn,
      };
      data2.push(filteredItem);
      localStorage.setItem("completedTodos", JSON.stringify(data2));
      setCompletedTodos(data2);
    }
    localStorage.setItem("todolist", JSON.stringify(f));
    setTodos(f);
  };

  useEffect(() => {
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));

    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <>
      <div>
        <h1>My Todos</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input
                required
                type="text"
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What's the task title?"
                id="input_text_add"
              />
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input
                required
                type="text"
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                placeholder="What's the task description?"
                id="input_text_add2"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                onClick={(e) => handleAddTodo(e)}
                className="btnPrimary"
              >
                Add
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button
              onClick={() => {
                setIsCompleteScreen(false);
              }}
              className={`secondaryBtn ${
                isCompleteScreen === false && "active"
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => {
                setIsCompleteScreen(true);
              }}
              className={`secondaryBtn ${
                isCompleteScreen === true && "active"
              }`}
            >
              Completed
            </button>
          </div>

          <div className="todo-list">
            {isCompleteScreen === false &&
              allTodos.map((item) => {
                return (
                  <div className="todo-list-item" key={item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => {
                          handleDeleteTodo(item.id);
                        }}
                        title="Delete"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => {
                          handleComplete(item.id);
                        }}
                        title="Complete"
                      />
                    </div>
                  </div>
                );
              })}
            {isCompleteScreen === true &&
              completedTodos.map((item) => {
                return (
                  <div className="todo-list-item" key={item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <small>Completed on: {item.dey}</small>
                      </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteCompletedTodo(item.id)}
                        title="Delete"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
