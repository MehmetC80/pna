const SearchTodo = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchTodo">Suche</label>
      <input
        autoFocus
        id="search"
        type="text"
        role="searchbox"
        placeholder="Suche Todos"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchTodo;
