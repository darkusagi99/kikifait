import React, { Component } from 'react'
import { auth, db } from '../services/firebase';
import { ref, push, set, onValue, remove } from "firebase/database";
import { useParams  } from "react-router-dom";

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
		console.log('Creation ID -- : ', id);
		
		const contestRef = ref(db, 'contest/' + this.state.id);
		onValue(contestRef, (snapshot) => {
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
			console.log(contestorListTmp);
			this.setState({
				contestData : snapshot.val(),
				contestorList : contestorListTmp
				});
		});
	}
	
	/** Add participation */
	addParticipation() {
		
		// Create new participation inside DB
		const contestorRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid);
		set(contestorRef,{
			ready:false,
			name:this.state.user.displayName,
			email:this.state.user.email
		});
		
	}
	
	/** Remove participation */
	removeParticipation() {
		
		// Remove participation
		const contestorToDeleteRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid);
		remove(contestorToDeleteRef);
		
	}
	
	/** Add ready state */
	addReadyState(){
		const contestorReadyRef = ref(db, 'contest/' + this.state.id + '/contestorList/' + this.state.user.uid + '/ready');
		set(contestorReadyRef,
			true
		);	
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
				
				<div> { /* Header DIV */ }
					<h1 className="text-center">{this.state.contestData.label}</h1>
					<h6 className="mb-2 text-muted">{this.state.contestData.creator}</h6>
					<h6 className="mb-2 text-muted">{this.state.contestData.status}</h6>
					<h6 className="mb-2 text-muted">Nombre de personnes à sélectionner : {this.state.contestData.drawRange}</h6>
				</div>
				
				{ /* logoff DIV */ }
				<Logout user={this.props.user} />
				
				{ /* Liste participants */ }
				
				<div className="px-5 d-flex flex-column justify-content-center gap-3 mt-5"> { /* List element DIV */ }
				{
					this.state.contestorList.map(entry => (
						<div className="card" key={entry.key}>
								<div className="card-body">
									<h5 className="card-title">{entry.email}</h5>
									<h6 className="card-subtitle mb-2 text-muted">{entry.name}</h6>
									<p className="card-text">Nombre de personnes à sélectionner : {entry.ready ? "Pret" : "Pas Pret"}</p>
								</div>
							<div className="card-footer">
								<button type="button" className="btn btn btn-outline-danger" onClick={this.addParticipation}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
									  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
									  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
									</svg>
								</button>
								<button type="button" className="btn btn btn-outline-danger" onClick={this.removeParticipation}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
									  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
									  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
									</svg>
								</button>
								<button type="button" className="btn btn btn-outline-danger" onClick={this.addReadyState}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
									  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
									  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
									</svg>
								</button>
								<button type="button" className="btn btn btn-outline-danger" onClick={this.removeReadyState}>
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
				
			</div> 
		)
	}
}

export default withParams(Contest);