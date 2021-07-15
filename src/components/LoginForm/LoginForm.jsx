import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LogIn({ setUser, click, setClick }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(false);

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError(false);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setClick(click)
      setUser(user);
    } catch {
      setError(true);
    }
  }

  return (
    <div>
      <div className="form-container" onSubmit={handleSubmit}>
        <div className="formHeader">
          <span>Log In</span>
          <p style={{display: error ? 'block' : 'none'}} className="error-message">Log In Failed - Try Again</p>
        </div>
        <form autoComplete="off" >
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      
    </div>
  );
}