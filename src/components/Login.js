import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firebase';

import '../App.css';
/** Component for login Window - v9 version */
const Login = () => {
  return (
    <div className="text-center">
		<div>
			<button className="btn btn-default btn-lg active" onClick={() => {
				  signInWithPopup(auth, provider).then((result) => {
					// The signed-in user info.
					var user = result.user;
				  });

				}}>
			<i className="fab fa-google">
			</i>Sign in with google</button>
		</div>
		<div className="position-absolute bottom-0 start-50 translate-middle-x">
			<figure class="text-center">
				<figcaption className="blockquote-footer">
					By connecting to this application, you accept that all contest information are saved inside the application database.<br />
					All available data is directly visible inside the interface.<br />
					Data can be directly deleted in the interface or by the contest creator.
				</figcaption>
			</figure>
		</div>
    </div>
  )
}

export default Login;