import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ViewLectures from './pages/ViewLectures';
import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
import CreateLecture from './pages/CreateLecture';
// import UpdateLecture from './pages/UpdateLecture';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lectures/create" element={<CreateLecture />} />
        <Route path="/lectures/view/" element={<ViewLectures />} />
        {/* <Route path="/update/:id" element={<UpdateLecture />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
