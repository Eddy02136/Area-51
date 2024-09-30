import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Background from './components/background/Background';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Background />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<h1>Home Page</h1>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
