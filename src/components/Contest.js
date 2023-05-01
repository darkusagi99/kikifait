import React, { Component } from 'react'

import '../App.css';

/** Component for Contest - v9 version */
class Contest extends React.Component {
	
	constructor(props) {

		super(props);

	}	
	
	/** Component display */
	render(){
		return (
			<div className="px-5 d-flex flex-column justify-content-center gap-3 mt-5"> { /* List element DIV */ }
				Contest A faire
			</div> 
		)
	}
}

export default Contest;