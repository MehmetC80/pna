import Header from "../Header";
import Nav from "../Nav";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import AddTodo from "./AddTodo";
import SearchTodo from "../SearchTodo";
// import Footer from "../Footer";
function Todo() {
  const url = "http://localhost:3500/todos";

  const [todos, setTodos] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setTodos(data);
  //   })();
  // }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const addTodo = (todo) => {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const myNewTodo = { id, checked: false, todo };
    const listTodos = [...todos, myNewTodo];
    setTodos(listTodos);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewTodo),
    };

    fetch(url, requestOptions).then((response) => response.json());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    addTodo(newTodo);
    setNewTodo("");
  };

  const handleDelete = (id) => {
    const listTodos = todos.filter((todo) => todo.id !== id);
    setTodos(listTodos);

    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3500/todos/${id}`, requestOptions);
  };

  const handleCheck = async (id) => {
    const listTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(listTodos);

    const myTodo = listTodos.filter((todo) => todo.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ckecked: myTodo[0].ckecked }),
    };
    // fetch(`http://localhost:3100/todos/${id}`, updateOptions).then((response) =>
    //   response.json().then((data) => {})
    // );
    const reqUrl = `http://localhost:3500/todos/${id}`;
    await fetch(reqUrl, updateOptions);
  };

  return (
    <div className="Todo">
      <Header title="Meine Todo-Liste" />
      <Nav />
      <main className="todo">
        {todos && (
          <AddTodo
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            handleSubmit={handleSubmit}
          />
        )}

        <SearchTodo
          search={search}
          setSerarch={setSearch}
          // todos={todos.filter((todo) =>
          //   todo.todo.toLowerCase().includes(search.toLowerCase())
          // )}
        />
        {todos && todos.length ? (
          <ul>
            {todos.map((todo) => (
              <li className="todo" key={todo.id}>
                {todos && (
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleCheck(todo.id);
                    }}
                    checked={todo.checked}
                  />
                )}
                <label>{todo.todo}</label>
                <button id="btnDetails">Info</button>

                {todos && (
                  <FaTrashAlt
                    role="button"
                    tabIndex="0"
                    onClick={() => handleDelete(todo.id)}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: "2rem" }}> Deine Liste ist Leer! </p>
        )}
      </main>
    </div>
  );
}

export default Todo;
