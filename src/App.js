import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Add_workouts from './pages/Add_workouts'
import Create_workouts from './pages/Create_workouts'
import NoPage from './pages/NoPage'
import Navbar from "./components/Navbar";
import View_workouts from "./pages/View_workouts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
      {/*
    <Navbar/>
    */}
      <div>

        <Routes>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add_workouts" element={<ProtectedRoute><Add_workouts /></ProtectedRoute>} />
          <Route path="/create_workouts" element={<ProtectedRoute><Create_workouts /></ProtectedRoute>} />
          <Route path="/view_workouts" element={<ProtectedRoute><View_workouts /></ProtectedRoute>} />

          <Route path="*" element={<NoPage />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
