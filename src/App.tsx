import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Historypage from './components/historypage/historypage';
import Aboutpage from './components/homepage/About.page';
import Homepage from './components/homepage/Home.page';
import Resultpage from './components/resultpage/Result.page';

function App() {
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Homepage />} />
          <Route path='/about' element={<Aboutpage />} />
          <Route path='/history' element={<Historypage/>} />
					<Route path='/result' element={<Resultpage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
