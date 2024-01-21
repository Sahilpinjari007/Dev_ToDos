import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [popupActive, setPopupActive] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const [updatePopup, setUpdatePopup] = useState(false);
  const [updateVal, setUpdateVal] = useState("");
  const [updateKey, setUpdateKey] = useState("");
  const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_SERVER_BASE_URL+"todos", requestOptions)
      .then((response) => response.json())
      .then((result) => setTodos(result))
      .catch((error) => console.log("error", error));
  };

  const updateComple = (key) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_SERVER_BASE_URL+"todos/complete/" + key, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setTodos(
          Todos.map((elem) => {
            if (elem._id === key) {
              elem.complete = !elem.complete;
            }

            return elem;
          })
        );
      })
      .catch((error) => console.log("error", error));
  };

  const deleteTodo = (key) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_SERVER_BASE_URL+"todos/delete/" + key, requestOptions)
      .then((response) => response.text())
      .then((result) => getData())
      .catch((error) => console.log("error", error));
  };

  const addTodo = () => {
    if (newTodo !== "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        text: newTodo,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.REACT_APP_SERVER_BASE_URL+"todos/new", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setPopupActive(!popupActive);
          getData();
        })
        .catch((error) => console.log("error", error));
    } else {
      alert("Please Enter Todo....");
    }
  };

  const updateTodo = (key, val) => {
    setUpdatePopup(!updatePopup);
    setUpdateVal(val);
    setUpdateKey(key);
  };

  const updateTodoBtn = () => {
    if (updateVal !== "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        text: updateVal,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.REACT_APP_SERVER_BASE_URL+"todos/update/" + updateKey, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          getData();
          setUpdatePopup(!updatePopup);
        })
        .catch((error) => console.log("error", error));
    } else {
      alert("Please Enter Todo....");
    }
  };

  useEffect(() => {
    getData();
  }, [BASE_URL]);

  return (
    <div className="App">
      <div className="heading-section">
        <h1>Welcom To, Our Dev_ToDos</h1>
        <h4>YOUR TASK</h4>
      </div>

      <div className="bottom-todos-section">
        {Todos.map((elem) => {
          return (
            <div className="todo" key={elem._id}>
              <button
                onClick={() => updateComple(elem._id)}
                className={
                  "complete-check " + (elem.complete ? "completed-todo" : "")
                }
              ></button>
              <p className="todo-txt" onClick={() => updateTodo(elem._id, elem.text)}>{elem.text}</p>
              <button
                className="delete-todo-check"
                onClick={() => deleteTodo(elem._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          );
        })}
      </div>

      <button
        className="open-popup-btn"
        onClick={() =>{ setPopupActive(!popupActive); setNewTodo('')}}
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      {popupActive ? (
        <div className="add-todo-popup">
          <div>
            <h4>Add New Todo</h4>
            <button
              className="close-popop-btn"
              onClick={() => setPopupActive(!popupActive)}
            >
              x
            </button>
          </div>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            type="text"
            placeholder="Type Todo hear..."
          />
          <button onClick={() => addTodo()} className="add-todo-btn">
            Create Task
          </button>
        </div>
      ) : (
        ""
      )}

      {updatePopup ? (
        <div className="add-todo-popup">
          <div>
            <h4>Update Todo</h4>
            <button
              className="close-popop-btn"
              onClick={() => setUpdatePopup(!updatePopup)}
            >
              x
            </button>
          </div>
          <input
            value={updateVal}
            onChange={(e) => setUpdateVal(e.target.value)}
            type="text"
            placeholder="Type Todo hear..."
          />
          <button onClick={() => updateTodoBtn()} className="add-todo-btn">
            Update Task
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
