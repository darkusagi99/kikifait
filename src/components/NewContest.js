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
		  drawRangeValue:1
		};

		// Binding method
		this.onDrawRangeChange = this.onDrawRangeChange.bind(this);
		this.onLabelChange = this.onLabelChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	/** Form submission management */
	onSubmit(e) {
		// Prevent default submission
        e.preventDefault();
		
		// Check empty label
		if (!!this.state.newContestLabel.trim()) {
			// Create new entry inside Realtime database
			const contestListRef = ref(db, 'contest');
			const newContestRef = push(contestListRef);
			set(newContestRef, {
				label: this.state.newContestLabel,
				drawRange:this.state.drawRangeValue,
				active:true,
				creator:this.props.user.email,
				contestorList:[],
				drawList:[],
				timestamp:Date.now()
			});

			this.setState({
				newContestLabel : "", 
				drawRangeValue : 1
			});
		
		}
		
	}
	
	/** Manage label change */
	onLabelChange(e) {
       this.setState({newContestLabel : e.target.value});
	}
	
	
	/** Manage range change - Draw range */
	onDrawRangeChange(e) {
       this.setState({drawRangeValue : e.target.value});
	}
	
	
	/** Component display */
	render(){
		return (
			<div> { /* Form DIV */ }
				{/* Alert message */}
			
				{/* Input form */}
				<form onSubmit={this.onSubmit}>
					<div className="px-5 d-flex flex-column justify-content-center gap-3">
						<div className="form-group">
							<label htmlFor="newTitle">Titre du kikifait</label>
							<input type="text" className="form-control" id="newTitle" aria-describedby="NewTitle" placeholder="Entrer titre" value={this.state.newContestLabel} onChange={this.onLabelChange} required />
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