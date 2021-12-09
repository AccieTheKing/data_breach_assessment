import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Resultpage from './components/resultpage/Result.page';

function App() {
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route path='/' element={<div></div>} />
					<Route path='/result' element={<Resultpage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
