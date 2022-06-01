import Header from './Header';
import Nav from './Nav';
import { useState, useEffect } from 'react';

import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';
import { TodoList } from './TodoList';

function Todo() {
  const url = 'http://localhost:3500/todos';

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let anzahl = todos.length;
  let erledigt = todos.filter((todo) => todo.checked === true).length;
  let offen = anzahl - erledigt;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw Error('Keine Daten erhalten.');
        const listTodos = await response.json();
        setTodos(listTodos);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      //Dies ist ein IEFE zum ausführen der fetchItems
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addTodo = async (todo) => {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const myNewTodo = { id, checked: false, todo };
    const listTodos = [...todos, myNewTodo];
    setTodos(listTodos);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    setNewTodo('');
  };

  const handleDelete = async (id) => {
    const listTodos = todos.filter((todo) => todo.id !== id);
    setTodos(listTodos);

    const requestOptions = {
      method: 'DELETE',
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
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ckecked: myTodo[0].checked }),
    };
    const reqUrl = `http://localhost:3500/todos/${id}`;
    const result = await fetch(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  return (
    <div className='Todo'>
      <Header title='Meine Todo-Liste' />
      <Nav />
      <main className='todo'>
        <AddTodo
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleSubmit={handleSubmit}
        />
        <SearchTodo search={search} setSearch={setSearch} />

        {isLoading && <p>Loading Todos...</p>}
        {!isLoading && (
          <>
            <p>Anzahl Todos: {anzahl}</p>
            <p>Erledigt: {erledigt}</p>
            <p>Offen: {offen}</p>

            <TodoList
              todos={todos.filter((todo) =>
                todo.todo.toLowerCase().includes(search.toLowerCase())
              )}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Todo;
