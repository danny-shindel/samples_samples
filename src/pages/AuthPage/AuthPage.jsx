import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./AuthPage.css";

export default function AuthPage({ setUser, click, setClick }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="AuthPage">
      <div className="AuthPageContainer">
        {showLogin ? 
          <LoginForm setUser={setUser} click={click} setClick={setClick} /> 
          : 
          <SignUpForm setUser={setUser} click={click} setClick={setClick} />
        }
        <div className="AuthPageSignUpSignIn">
          <span>{showLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <button className="SignUpSignInButton" onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up' : 'Log In'}</button>
        </div>
      </div>
    </div>
  );
}