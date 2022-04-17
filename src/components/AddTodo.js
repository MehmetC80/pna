import { FaPlus } from 'react-icons/fa';

const AddTodo = ({ newTodo, setNewTodo, handleSubmit }) => {
  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label htmlFor='addTodo'>Meine Todos</label>
      <input
        autoFocus
        id='addTodo'
        type='text'
        placeholder='Todo hinzufügen'
        required
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button type='submit' aria-label='Todo hinzufügen'>
        <FaPlus />
      </button>
    </form>
  );
};

export default AddTodo;
