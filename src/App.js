/** Imports image / css */
import logo from './logo.svg';

/** Import react modules */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

import Login from './components/Login';
import Home from './components/Home';
import { db, auth, provider } from './services/firebase';

import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUser(user);
		})
	}, [])

	console.log(user);

	return (
		<div className="app">
		  <Login />
		</div>
	);
}

export default App;
