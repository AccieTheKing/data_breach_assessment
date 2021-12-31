import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Draftpage from './components/draftpage/draftpage';
import Historypage from './components/historypage/historypage';
import Aboutpage from './components/homepage/About.page';
import Homepage from './components/homepage/Home.page';
import Resultpage from './components/resultpage/Result.page';
import AppProvider from './providers';
import GridLoader from "react-spinners/GridLoader";


function App() {
   const [loading, setLoading] = useState(false)

      useEffect(() => {
         setLoading(true)
         setTimeout(() => {
            setLoading(false)
         }, 2000)

      }, []
      
      )
   return (
      
      <AppProvider>
         <Router>
            <div className="App">
               {
                  loading ? 

                  <div className="Loading">
                     
                     
                     <GridLoader color={"#ea650d"} loading={loading}  size={100} /> 
                  </div>
                  

                  :

                  <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/about" element={<Aboutpage />} />
                  <Route path="/history" element={<Historypage />} />
                  <Route path="/draft" element={<Draftpage />} />
                  <Route path="/result" element={<Resultpage />} />
               </Routes>
               }
              
            </div>
         </Router>
      </AppProvider>
   );
}

export default App;
