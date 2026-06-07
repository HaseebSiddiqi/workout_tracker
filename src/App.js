import { Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
      

      <div>

        <Routes>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
       
          <Route path="*" element={<NoPage />} />
        </Routes>

      </div>
      <Analytics />
    </>
  );
}

export default App;
