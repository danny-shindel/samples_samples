import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import "./SignUpForm.css";

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: false
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // const formData = new FormData()
      const fileField = document.querySelector("input[type='file']")
      if (fileField.files[0]) {
        const formData = new FormData()
        formData.append("name",this.state.name)
        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        formData.append("profile-pic",fileField.files[0])
        const user = await signUp(formData);
        this.props.setUser(user);
      } else {
        const formData = { ...this.state };
        delete formData.error;
        delete formData.confirm;
        const user = await signUp(formData);
        this.props.setUser(user);
      }
    } catch {
      // An error occurred
      this.setState({ error: true});
    }
  };

  // handleSubmit = async (evt) => {
  //   evt.preventDefault();
  //   try {
  //     const formData = { ...this.state };
  //     delete formData.error;
  //     delete formData.confirm;
  //     // The promise returned by the signUp service method
  //     // will resolve to the user object included in the
  //     // payload of the JSON Web Token (JWT)
  //     const user = await signUp(formData);
  //     // baby step
  //     this.props.setClick(this.props.click)
  //     this.props.setUser(user);
  //   } catch {
  //     // An error occurred
  //     this.setState({ error: 'Sign Up Failed - Try Again' });
  //   }
  // };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        
        <div className="form-container">
          <div className="formHeader">
            <span>Sign Up Form</span>
            <p style={{display: this.state.error ? 'block' : 'none'}} className="error-message">Sign Up Failed - Try Again</p>

          </div>
          <form autoComplete="off" onSubmit={this.handleSubmit} encType="multipart/form-data">
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" placeholder="samples@samples.com" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm Password</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <label>Choose A Profile Picture!</label>
            <input type="file" name="profile-pic" />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
      </div>
    );
  }
}