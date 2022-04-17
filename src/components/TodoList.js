import { TodoListItem } from './TodoListItem';
export const TodoList = ({ todos, handleCheck, handleDelete }) => {
  return (
    <>
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '2rem' }}> Deine Liste ist Leer! </p>
      )}
    </>
  );
};
