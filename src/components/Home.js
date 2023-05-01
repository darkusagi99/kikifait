import React from 'react';

import { auth, db } from '../services/firebase';
import { onValue, ref } from 'firebase/database';
import Logout from './Logout';
import NewContest from './NewContest';
import ContestList from './ContestList';

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
			<NewContest user={user} />

			{ /* List element DIV */ }
			<ContestList user={user} />
 
		</div>
	)
}

export default Home;