import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Draftpage from './components/draftpage/draftpage';
import Historypage from './components/historypage/historypage';
import Aboutpage from './components/aboutpage/aboutpage';
import Homepage from './components/homepage/Home.page';
import Questionnairpage from './components/questionairpage/Questionair.page';
import Resultpage from './components/resultpage/Result.page';
import GridLoader from 'react-spinners/GridLoader';
import AppWrapper from './providers';

function App() {
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 2000);
   }, []);
   return (
      <Router>
         <RecoilRoot>
            <AppWrapper>
               <div className="App">
                  {loading ? (
                     <div className="Loading">
                        <GridLoader color={'#ea650d'} loading={loading} size={100} />
                     </div>
                  ) : (
                     <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/start" element={<Questionnairpage />} />
                        <Route path="/history" element={<Historypage />} />
                        <Route path="/history/:id" element={<Resultpage />} />
                        <Route path="/drafts" element={<Draftpage />} />
                        <Route path="/about" element={<Aboutpage />} />
                        <Route path="/result" element={<Resultpage />} />
                     </Routes>
                  )}
               </div>
            </AppWrapper>
         </RecoilRoot>
      </Router>
   );
}

export default App;
