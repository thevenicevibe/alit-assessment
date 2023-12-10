import { BrowserRouter as Router, Route, Routes, Redirect, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';
import ReceiptList from './ReceiptList';

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/login" element={<LoginPage/>} />
    <Route exact path="/receipt-list" element={<ReceiptList />} />
    <Route exact path="/" element={<LoginPage/>}/>
  </Routes>
  </Router>
  );
}

export default App;
