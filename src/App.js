import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Todo from './components/Todo';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/Login' element={<Login />} />

          <Route path='/Registration' element={<Registration />} />

          <Route path='/Todo' element={<Todo />} />
        </Routes>

        {/* <Route path="*" element={<Missing />} /> */}
      </Router>
    </div>
  );
}

export default App;
