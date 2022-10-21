import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase/firebase.config'
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const [user, setUser] = useState ([])
  // Google Sign In

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then (result =>{
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error => console.error('Error', error))
  }
// Google Sign Out
  const hangleGoogleSignOut = ()=>{
    signOut(auth)
    .then(()=>{
      setUser({})
    })
    .catch(()=>{
      setUser({})
    })
  }
// Github sign In
  const handleGitHubSignIn = ()=>{
    signInWithPopup(auth, githubProvider)
     .then((result)=>{
       const user = result.user
       setUser(user)
      console.log(user)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  

  return (
    <div className="App">
      {/* condition ? true : false */}

      {user.uid ? <button onClick={hangleGoogleSignOut}>Sign Out</button>
      :
       <>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
       </>}
      
      {/* Conditioning / sign in kora thakle email, name and img show korbe */}
      
      {user.uid && <div>
        <h3>Name: {user.displayName}</h3>
        <p>Email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}
      
    </div>
  );
}

export default App;
