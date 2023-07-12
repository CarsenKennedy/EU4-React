import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import './styles/style.css'
import Results from './Results';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </div>

  );
}

export default App;
