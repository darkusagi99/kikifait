import React from 'react';

import { auth } from '../services/firebase'
import Logout from './Logout';
import NewContest from './NewContest';

import '../App.css';

const Home = ({ user }) => {
  return (
    <div className="home">
		<div> { /* Header DIV */ }
			<h1 className="text-center">Kikifait</h1>
		</div>
		{ /* logoff DIV */ }
		<Logout user={user} />
		
		{ /* Form DIV */ }
		<NewContest />

		<div> { /* List element DIV */ }
		
		</div> 
    </div>
  )
}

export default Home;