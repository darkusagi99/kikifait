import React, { Component } from 'react'
import { auth, db } from '../services/firebase';
import { ref, push, set, onValue, remove } from "firebase/database";
import { useParams  } from "react-router-dom";
import { Link } from 'react-router-dom';

import '../App.css';

import Logout from './Logout';

function withParams(Contest) {
  return props => <Contest {...props} params={useParams()} />;
}

/** Component for Contest - v9 version */
class Contest extends React.Component {
	
	
	constructor(props) {

		super(props);
		
        let { id } = this.props.params;
		
		this.state = {
		  contestData:[],
		  contestorList:[],
		  user:this.props.user,
		  id:id
		};
		
		
		this.addParticipation = this.addParticipation.bind(this);
		this.removeParticipation = this.removeParticipation.bind(this);
		this.addReadyState = this.addReadyState.bind(this);
		this.removeReadyState = this.removeReadyState.bind(this);

	}	
	
	// Chargement du composant
    componentDidMount() {
		
        let { id } = this.props.params;
		let contestActive = true;
		
		const contestRef = ref(db, 'contest/' + this.state.id);
		onValue(contestRef, (snapshot) => {
			if (snapshot.val()) {
				var contestorListTmp = [];
				let { contestorList } = snapshot.val();
				
				// Liste des participants non-vide
				if (!!contestorList) {
					
					// Boucle sur les clés et remise en forme de l'objet
					Object.keys(contestorList).forEach((contestorKey) => {
					
						var tmpEntry = contestorList[contestorKey];
						tmpEntry.key = contestorKey;
						
						contestorListTmp.push(tmpEntry);
					});
				}
				
				contestActive = snapshot.val().active;
				
				this.setState({
					contestData : snapshot.val(),
					contestorList : contestorListTmp
				});
			}
		});
		
		this.addParticipation(contestActive);
		
	}
	
	/** Add participation */
	addParticipation(contestActive) {
		
			if (contestActive) {
		
				// Create new participation inside DB
				const contestorRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid);
				set(contestorRef,{
					ready:false,
					name:this.state.user.displayName,
					email:this.state.user.email
				});
			
			}
		
	}
	
	/** Remove participation */
	removeParticipation() {
		
		// Remove participation
		const contestorToDeleteRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid);
		remove(contestorToDeleteRef);
		
		// Redirection vers la page principale
		window.location.href = '/';
		
	}
	
	/** Add ready state */
	addReadyState(){
		
		let nbeParticipants = this.state.contestorList.length;
		
		let nbeReady = this.state.contestorList.filter(x => x.ready).length;
		
		let readyColor = this.getRandColor(5);
		
		// Update ready state
		const contestorReadyRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid + '/ready');
		set(contestorReadyRef,
			true
		);	
		
		// Update ready state
		const contestorColorRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid + '/color');
		set(contestorColorRef,
			readyColor
		);	
		
		// Check if enough people and everybody ready
		// If yes -> Tirage and status update
		if (nbeParticipants > this.state.contestData.drawRange && nbeReady == nbeParticipants-1) {
			
			console.log('Tirage !!!!');
			
			let contestDataTmp = this.state.contestData;
			contestDataTmp.active = false;
			
			
			// Update draw state
			const contestorRef = ref(db, 'contest/' + this.state.id + '/active');
			set(contestorRef,
				false
			);	
			
			// Changer le statut de la demande
			this.setState({
				contestData : contestDataTmp
			});
			
			let selectedList = [];
			let tmpContestorList = this.state.contestorList;
			
			// Choose people for the draw
			for(let i = 0; i < this.state.contestData.drawRange; i++) {
				
				// Tirer les personnes sélectionnées
				let selectedIdx = Math.floor(Math.random() * tmpContestorList.length);
				
				let selectedLabel = tmpContestorList[selectedIdx].name + ' (' + tmpContestorList[selectedIdx].email + ')';
				let tmpKey = tmpContestorList[selectedIdx].key;
				selectedList.push(selectedLabel);
				
				// Suppression de la personne de la liste pour éviter un second tirage
				tmpContestorList = tmpContestorList.filter(x => x.key != tmpKey);
				
			}
			
			// Update draw info
			// Create new participation inside DB
			const drawRef = ref(db, 'contest/' + this.state.id + '/drawList/');
			set(drawRef, selectedList);
			
		}
		
		
	}
	
	
	getRandColor(brightness){

		// Six levels of brightness from 0 to 5, 0 being the darkest
		var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
		var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
		var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
		return "rgb(" + mixedrgb.join(",") + ")";
	}

	
	/** Remove ready state */
	removeReadyState(){
		
		const contestorReadyRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid + '/ready');
		set(contestorReadyRef,
			false
		);	
		
	}
	
	/** Component display */
	render(){
		return (
			<div className="px-5 d-flex flex-column justify-content-center gap-3 mt-5"> { /* List element DIV */ }
				
				{ /* logoff DIV */ }
				<Logout user={this.props.user} />
				
				<div> { /* Header DIV */ }
					<h1 className="text-center">{this.state.contestData.label}</h1>
					<h6 className="mb-2 text-muted">{this.state.contestData.creator}</h6>
					<h6 className="mb-2 text-muted">{this.state.contestData.status}</h6>
					<h6 className="mb-2 text-muted">Nombre de personnes à sélectionner : {this.state.contestData.drawRange}</h6>
					<h6 className="card-text">Liste des personnes choisies : {this.state.contestData.drawList}</h6>
				</div>
				
				<Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/"}>
					<button type="button" className="btn btn-default btn-xs active">
					Retour
					</button>
				</Link>
				
				{ /* Liste participants */ }
				
				<div className="px-5 d-flex flex-wrap justify-content-center gap-3 mt-5"> { /* List element DIV */ }
				{
					this.state.contestorList.map(entry => (
						<div className="card" key={entry.key}>
								<div style={{backgroundColor: entry.color}} className={entry.ready && this.state.contestData.active ?  "card-body blink" :  "card-body inactiveBg"}>
									<h5 className="card-title">{entry.email}</h5>
									<h6 className="card-subtitle mb-2 text-muted">{entry.name}</h6>
									<p className="card-text">Statut : {entry.ready ? "Pret" : "Pas Pret"}</p>
								</div>
								{
									(entry.key == this.props.user.uid && this.state.contestData.active) ? 
										<div className="card-footer">
											<button type="button" className="btn btn-default btn-xs active" onClick={this.removeParticipation}>
												Ne plus participer
											</button>
											{
											entry.ready ? 
											<button type="button" className="btn btn-default btn-xs active" onClick={this.removeReadyState}>
												Annuler
											</button> :
											<button type="button" className="btn btn-default btn-xs active" onClick={this.addReadyState}>
												Prêt
											</button>
											}
										</div>
									: <div />
								}
						</div>
							
						)
					)
				}
				</div> 
				
			</div> 
		)
	}
}

export default withParams(Contest);