import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Add_workouts from './pages/Add_workouts'
import Create_workouts from './pages/Create_workouts'
import NoPage from './pages/NoPage'
import Navbar from "./components/Navbar";
import View_workouts from "./pages/View_workouts";



function App() {
  return (
    <>
    {/*
    <Navbar/>
    */}
    <div>
    
        <Routes>
          <Route index element ={<Home/>} />
          <Route path ="/home" element={<Home/> } />
          <Route path ="/add_workouts" element={<Add_workouts/> } />
          <Route path ="/create_workouts" element={<Create_workouts/> } />
          <Route path ="/view_workouts" element={<View_workouts/> } />
          <Route path ="*" element={<NoPage/>} />
        </Routes>
      
    </div>
    </>
  );
}

export default App;
