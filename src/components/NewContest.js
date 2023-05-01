import React, { Component } from 'react'
import { auth } from '../services/firebase';

import '../App.css';
/** Component for NewContest - v9 version */
class NewContest extends React.Component {
	
	constructor() {

		super();
		this.state = {
		  entrantRangeValue: 5,
		  drawRangeValue:1
		};

		// Binding method
		this.onEntrantRangeChange = this.onEntrantRangeChange.bind(this);
		this.onDrawRangeChange = this.onDrawRangeChange.bind(this);
	}
	
	onEntrantRangeChange(e) {
		console.log("OnRangeChange");
       this.setState({entrantRangeValue : e.target.value});
	}
	
	onDrawRangeChange(e) {
		console.log("OnRangeChange");
       this.setState({drawRangeValue : e.target.value});
	}
	
	render(){
		return (
			<div> { /* Form DIV */ }
				<form>
					<div className="px-5 d-flex flex-column justify-content-center gap-3">
						<div className="form-group">
							<label htmlFor="newTitle">Titre du kikifait</label>
							<input type="text" className="form-control" id="newTitle" aria-describedby="NewTitle" placeholder="Entrer titre" />
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