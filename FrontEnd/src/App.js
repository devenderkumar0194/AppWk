import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import TransList from './Component/Transaction/List';
import AddTrans from './Component/Transaction/AddTrans';
import StopWatch from './Component/StopWatch';
import Wellcome from './Component/Home/Wellcome';
import Login from './Component/Home/Login';
import Register from './Component/Home/Register';
import AxiosAPI from './Axios_Api';
import { useEffect, useState } from 'react';


const ProtectedRoute = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(()=> {
    const checkAuth = async () => {
      const user = await AxiosAPI.getUserDetails();
      if(user.status === 200){
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
    }
    checkAuth();

  }, []);
  
  // if(user.status === "error"){
  //   console.log("===>>>>>>>>");
  //     var isAuthenticated = false;
  // }else {
  //   console.log(user);
  // }

  if(isAuthenticated === null) {
    return <div>Loading...</div>;
  }else{
    return isAuthenticated ? <Outlet/> : <Navigate to="/" replace/>;
  }
}

function App() {
  return (
    <Router>
          <div className="App">
              <Routes>      
               <Route path="/" element={<Wellcome/>} />   
               <Route path="/login" element={<Login/>} />   
               <Route path="/register" element={<Register/>} />   
        
                <Route element={<ProtectedRoute />}>
                  <Route path="/trns-list" element={<TransList/>} />   
                  <Route path="/add-trans" element={<AddTrans/>} />   
                  <Route path="/stop-watch" element={<StopWatch/>} />
                </Route>

              </Routes>
            </div>
    </Router>

  );
}

export default App;