import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Background from './components/background/Background';

function App() {
  return (
    <div className="App">
      <Background />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<h1 className="home-page">Home Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
