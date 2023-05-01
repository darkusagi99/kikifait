/** Imports image / css */
import logo from './logo.svg';

/** Import react modules */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

import Login from './components/Login';
import Home from './components/Home';
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
			{user ? <Home user={user} /> : <Login />}
		</div>
	);
}

export default App;
