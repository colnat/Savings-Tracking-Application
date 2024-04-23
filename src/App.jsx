import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Savings from './components/savings'

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    
    <Route path="/savings" element={<Savings />}/>
    
 
  </Routes>
</Router>
 
    
  )
}

export default App;
