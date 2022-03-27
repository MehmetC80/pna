import Header from "../Header";
import Nav from "../Nav";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import AddTodo from "./AddTodo";
import SearchTodo from "../SearchTodo";

function Todo() {
  const url = "http://localhost:3500/todos";

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let anzahl = todos.length;
  let erledigt = todos.filter((todo) => todo.checked === true).length;
  let offen = anzahl - erledigt;
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setTodos(data);
  //   })();
  // }, []);

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setTodos(data);
  //     });
  // }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw Error("Keine Daten erhalten.");
        const listTodos = await response.json();
        setTodos(listTodos);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => fetchItems(), 2000);
  }, []);

  const addTodo = async (todo) => {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const myNewTodo = { id, checked: false, todo };
    const listTodos = [...todos, myNewTodo];
    setTodos(listTodos);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewTodo),
    };

    const result = await fetch(url, postOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    addTodo(newTodo);
    setNewTodo("");
  };

  const handleDelete = async (id) => {
    const listTodos = todos.filter((todo) => todo.id !== id);
    setTodos(listTodos);

    const requestOptions = {
      method: "DELETE",
    };
    const result = await fetch(
      `http://localhost:3500/todos/${id}`,
      requestOptions
    );
    if (result) setFetchError(result);
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
    const reqUrl = `http://localhost:3500/todos/${id}`;
    const result = await fetch(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleSearch = async () => {
    const todoList = todos.filter((todo) =>
      todo.todo.toLowerCase().includes(search.toLowerCase())
    );
    setTodos(setSearch(todoList));
  };

  return (
    <div className="Todo">
      <Header title="Meine Todo-Liste" />
      <Nav />
      <main className="todo">
        <AddTodo
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleSubmit={handleSubmit}
        />
        <SearchTodo
          search={search}
          setSearch={setSearch}
          onChange={handleSearch}
        />
        <p>Anzahl Todos: {anzahl}</p>
        <p>Erledigt: {erledigt}</p>
        <p>Offen: {offen}</p>
        {todos.length ? (
          <ul>
            {todos.map((todo) => (
              <li className="todo" key={todo.id}>
                {
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(todo.id)}
                    checked={todo.checked}
                  />
                }
                <label
                  style={
                    todo.checked ? { textDecoration: "line-through" } : null
                  }
                  onDoubleClick={() => handleCheck(todo.id)}
                >
                  {todo.todo}
                </label>
                <button id="btnDetails">Info</button>

                {
                  <FaTrashAlt
                    role="button"
                    tabIndex="0"
                    onClick={() => handleDelete(todo.id)}
                  />
                }
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
