import React, { Component, useEffect } from 'react'
import { auth, db } from '../services/firebase';
import { ref, push, set, onValue } from "firebase/database";


import '../App.css';



/** Component for ContestList - v9 version */
class ContestList extends React.Component {
	
	constructor(props) {

		super(props);
		
		this.state = {
		  contestData:[]
		};

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
		
	
	/** Component display */
	render(){
		return (
			<div className="px-5 d-flex flex-column justify-content-center gap-3 mt-5"> { /* List element DIV */ }
			{
				this.state.contestData.map(function(entry, idx){
				return (
					<div className="card" key={idx}>
						<div className="card-body">
							<h5 className="card-title">{entry.label}</h5>
							<h6 className="card-subtitle mb-2 text-muted">{entry.creator}</h6>
							<p className="card-text">Nombre de personnes à sélectionner : {entry.drawRange}</p>
							<p className="card-text">Nombre de participants : </p>
							<p className="card-text">Liste des participants : </p>
							<p className="card-text">Liste des personnes choisies : </p>
							<p className="card-text">Statut : {entry.status}</p>
							<a href="#" className="card-link">Delete Contest</a>
							<a href="#" className="card-link">Access contest</a>
							<h6 className="card-subtitle mb-2 text-muted">Clé : {entry.key}</h6>
						</div>
					</div>
				)
				})
			}
			</div> 
		)
	}
}

export default ContestList;