import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firebase';

import '../App.css';
/** Component for login Window - v9 version */
const Login = () => {
  return (
    <div className="text-center">
      <button className="button" onClick={() => {
			  signInWithPopup(auth, provider).then((result) => {
				// The signed-in user info.
				var user = result.user;
			  });

            }}>
	  <i className="fab fa-google">
	  </i>Sign in with google</button>
    </div>
  )
}

export default Login;