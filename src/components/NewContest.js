import React, { Component } from 'react'
import { auth, db } from '../services/firebase';
import { ref, push, set } from "firebase/database";


import '../App.css';
/** Component for NewContest - v9 version */
class NewContest extends React.Component {
	
	constructor(props) {

		super(props);
		this.state = {
		  newContestLabel:"",
		  entrantRangeValue: 5,
		  drawRangeValue:1
		};

		// Binding method
		this.onEntrantRangeChange = this.onEntrantRangeChange.bind(this);
		this.onDrawRangeChange = this.onDrawRangeChange.bind(this);
		this.onLabelChange = this.onLabelChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	/** Form submission management */
	onSubmit(e) {
		// Prevent default submission
        e.preventDefault();
		
		// Create new entry inside Realtime database
		const contestListRef = ref(db, 'contest');
		const newContestRef = push(contestListRef);
		set(newContestRef, {
			label: this.state.newContestLabel,
			entrant:this.state.entrantRangeValue,
			drawRange:this.state.drawRangeValue,
			status:"New",
			creator:this.props.user.email,
			contestorList:[],
			drawList:[]
		});

		this.setState({
			newContestLabel : "", 
			entrantRangeValue : 5,
			drawRangeValue : 1
		});
		
	}
	
	/** Manage label change */
	onLabelChange(e) {
		console.log("newContestLabel");
       this.setState({newContestLabel : e.target.value});
	}
	
	/** Manage range change - Entrant range */
	onEntrantRangeChange(e) {
       this.setState({entrantRangeValue : e.target.value});
	}
	
	
	/** Manage range change - Draw range */
	onDrawRangeChange(e) {
       this.setState({drawRangeValue : e.target.value});
	}
	
	
	/** Component display */
	render(){
		return (
			<div> { /* Form DIV */ }
				<form onSubmit={this.onSubmit}>
					<div className="px-5 d-flex flex-column justify-content-center gap-3">
						<div className="form-group">
							<label htmlFor="newTitle">Titre du kikifait</label>
							<input type="text" className="form-control" id="newTitle" aria-describedby="NewTitle" placeholder="Entrer titre" value={this.state.newContestLabel} onChange={this.onLabelChange} />
						</div>
						<div className="form-group">
							<label htmlFor="entrantRange">Nombre de participants</label>
							
							<input type="range" className="form-control form-range custom-range" id="entrantRange" min="2" max="15" value={this.state.entrantRangeValue} onChange={(e) => {this.onEntrantRangeChange(e)}} />
							<input type="number" className="form-control" id="entrantInput" min="2" max="15" value={this.state.entrantRangeValue} onChange={(e) => {this.onEntrantRangeChange(e)}} />
						</div>
						<div className="form-group">
							<label htmlFor="entrantRange">Nombre de personnes à selectionner</label>
							
							<input type="range" className="form-control form-range custom-range" id="drawRange" min="1" max="13" value={this.state.drawRangeValue} onChange={(e) => {this.onDrawRangeChange(e)}} />
							<input type="number" className="form-control" id="drawInput" min="1" max="13" value={this.state.drawRangeValue} onChange={(e) => {this.onDrawRangeChange(e)}} />
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</form>
			
			</div> 
		)
	}
}

export default NewContest;