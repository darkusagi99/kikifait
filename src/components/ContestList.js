import React, { Component, useEffect } from 'react'
import { auth, db } from '../services/firebase';
import { ref, push, set, onValue, remove } from "firebase/database";
import { Link } from 'react-router-dom';

import '../App.css';



/** Component for ContestList - v9 version */
class ContestList extends React.Component {
	
	constructor(props) {

		super(props);
		
		
		this.state = {
		  contestData:[]
		};
		
		
		this.deleteEntry = this.deleteEntry.bind(this);

	}
	
	// Chargement du composant
    componentDidMount() {
		const contestRef = ref(db, 'contest');
		onValue(contestRef, (snapshot) => {
			
			
			var tmpContestData = [];
			
			console.log('User data: ', snapshot.val());
			
			snapshot.forEach((contestEntry) => {
				
				console.log('Contest entry data: ', contestEntry);
				console.log('Contest entry key: ', contestEntry.key);
				console.log('Contest entry creator: ', contestEntry.creator);
				
				var tmpEntry = contestEntry.val();
				tmpEntry.key = contestEntry.key;
				
				tmpContestData.push(tmpEntry);
			});
			
			this.setState({contestData : tmpContestData});
		});
	}
	
	
	
	/** Manage deletion */
	deleteEntry(entryKey) {
		const contestToDeleteRef = ref(db, 'contest/'+entryKey);
		remove(contestToDeleteRef);
	}
		
	
	/** Component display */
	render(){
		return (
			<div className="px-5 d-flex flex-column justify-content-center gap-3 mt-5"> { /* List element DIV */ }
			{
				this.state.contestData.map(entry => (
					<div className="card" key={entry.key}>
						<Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/" + entry.key}>
							<div className="card-body">
								<h5 className="card-title">{entry.label}</h5>
								<h6 className="card-subtitle mb-2 text-muted">{entry.creator}</h6>
								<p className="card-text">Nombre de personnes à sélectionner : {entry.drawRange}</p>
								<p className="card-text">Nombre de participants : </p>
								<p className="card-text">Liste des participants : </p>
								<p className="card-text">Liste des personnes choisies : </p>
								<p className="card-text">Statut : {entry.status}</p>
							</div>
						</Link>
						<div className="card-footer">
							<button type="button" className="btn btn btn-outline-danger" onClick={() => {this.deleteEntry(entry.key)}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
								  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
								  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
								</svg>
							</button>
						</div>
					</div>
						
					)
				)
			}
			</div> 
		)
	}
}

export default ContestList;