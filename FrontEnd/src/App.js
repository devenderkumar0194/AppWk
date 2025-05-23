import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import TransList from './Component/Transaction/List';
import AddTrans from './Component/Transaction/AddTrans';
import StopWatch from './Component/StopWatch';
import Wellcome from './Component/Home/Wellcome';
import Login from './Component/Home/Login';
import Register from './Component/Home/Register';



const ProtectedRoute = () => {
  
  var isAuthenticated = true;
  return true ? <Outlet/> : <Navigate to="/" replace/>;

}

function App() {

  return (
    <Router>
          <div className="App">
              <Routes>      

               
               <Route path="/" element={<Wellcome/>} />   
               <Route path="/login" element={<Login/>} />   
               <Route path="/register" element={<Register/>} />   
               
                <Route path="/trns-list" element={<TransList/>} />   

                <Route element={<ProtectedRoute />}>
                  <Route path="/add-trans" element={<AddTrans/>} />   
                  <Route path="/stop-watch" element={<StopWatch/>} />
                </Route>

              </Routes>
            </div>
    </Router>

  );
}

export default App;
