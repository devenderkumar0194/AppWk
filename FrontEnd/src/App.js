import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TransList from './Component/Transaction/List';
import AddTrans from './Component/Transaction/AddTrans';
import StopWatch from './Component/StopWatch';

function App() {

  return (
    <Router>
          <div className="App">
              <Routes>      

                
                  <Route path="/" element={<TransList/>} />   
                  <Route path="/stop-watch" element={<StopWatch/>} />
                  <Route path="/add-trans" element={<AddTrans/>} />   

                                 
              </Routes>
            </div>
    </Router>

  );
}

export default App;
