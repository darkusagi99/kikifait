/** Imports image / css */
import logo from './logo.svg';

/** Import react modules */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Contest from './components/Contest';
import { db, auth, provider } from './services/firebase';

import './App.css';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUser(user);
		})
	}, [])

	return (
		<div className="app">
			<Routes>
				<Route path="/" element={user ? <Home user={user} /> : <Login />} />
				<Route path="/:id" element={<Contest />} />
			</Routes>
			
		</div>
	);
}

export default App;
