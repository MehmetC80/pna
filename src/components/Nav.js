import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='navbar'>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/Login'>Login</Link>
        <Link to='/Todo'>Todos</Link>
        <Link to='/Registration'>Registration</Link>
      </div>
    </nav>
  );
};

export default Nav;
