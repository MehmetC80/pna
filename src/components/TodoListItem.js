import { FaTrashAlt } from 'react-icons/fa';

export const TodoListItem = ({ handleCheck, handleDelete, todo }) => {
  return (
    <li className='todo' key={todo.id}>
      {
        <input
          type='checkbox'
          onChange={() => handleCheck(todo.id)}
          checked={todo.checked}
        />
      }
      <label
        style={todo.checked ? { textDecoration: 'line-through' } : null}
        onDoubleClick={() => handleCheck(todo.id)}
      >
        {todo.todo}
      </label>
      <button id='btnDetails'>Info</button>

      {
        <FaTrashAlt
          role='button'
          tabIndex='0'
          onClick={() => handleDelete(todo.id)}
        />
      }
    </li>
  );
};
