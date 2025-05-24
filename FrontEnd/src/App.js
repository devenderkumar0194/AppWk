import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';

import TransList from './Component/Transaction/List';
import AddTrans from './Component/Transaction/AddTrans';
import StopWatch from './Component/StopWatch';
import Wellcome from './Component/Home/Wellcome';
import Login from './Component/Home/Login';
import Register from './Component/Home/Register';
import AxiosAPI from './Axios_Api';
import { useEffect, useState } from 'react';
import { AuthProvider } from './AuthContext';
import Loader from './Component/Home/Loader';
import Head from './Component/Home/Head';


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
 
  if(isAuthenticated === null) {

    return <Loader/>;
  }else{
    return isAuthenticated ? <Outlet/> : <Navigate to="/" replace/>;
  }
}

const PublicRoute = () => {

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
 
  if(isAuthenticated === null) {
    return <Loader/>;
  }else{
    return !isAuthenticated ? <Outlet/> : <Navigate to="/trns-list" replace/>;
  }
}


const HeadWithProps = () => {
  const location = useLocation();
  const path =location.pathname; 
  
  var title = "";
  var subTitle = "";

  if(path === '/'){
    title = "Smart Way to Manage Your Money";
    subTitle = "Take control of your finances with ease";

  }else if(path === '/register'){
    title = "Create Your Free TrackWise Account";
    subTitle = "Start tracking your income and expenses today, it's simple, fast, and always free.";


  }else if(path === '/login'){
    title = "Please Log In to Continue";
    subTitle = "Access your TrackWise dashboard to manage your credits, debits, and balance with ease.";
  }else if(path === '/trns-list') {    
    title = "Transaction List";
    subTitle = "All your credits and debits, clearly organized and always accessible.";
  }else if(path === '/add-trans'){    
    title = "Add New Transaction";
    subTitle = "Easily track your income and expenses by recording a new transaction.";
  }else {    
    title = "";
    subTitle = "";
  }
  

  return <Head title={title} subTitle={subTitle} />;
};






function App() {

  return (
    <Router>
      <AuthProvider>
          <div className="App">
            <HeadWithProps/>
              <Routes>      
               <Route path="/" element={<Wellcome/>} />   

                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<Login/>} />   
                  <Route path="/register" element={<Register/>} /> 
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/trns-list" element={<TransList/>} />   
                  <Route path="/add-trans" element={<AddTrans/>} />   
                  <Route path="/stop-watch" element={<StopWatch/>} />
                </Route>

              </Routes>
            </div>
      </AuthProvider>          
    </Router>

  );
}

export default App;