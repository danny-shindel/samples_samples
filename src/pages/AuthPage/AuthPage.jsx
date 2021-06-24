import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser, click, setClick }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main>
      <h1>AuthPage</h1>
      <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up' : 'Log In'}</button>
      {showLogin ? <LoginForm setUser={setUser} click={click} setClick={setClick} /> : <SignUpForm setUser={setUser} click={click} setClick={setClick} />}
    </main>
  );
}