import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './App.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    Name:'',
    Email:'',
    Password:''
  })

const  handleChange = (event)=>{
  const {name, value} = event.target;
  setFormData({
    ...formData,
    [name]:value
  })
}

  const handleEvent = async (event) => {
    event.preventDefault();
    // console.log('formdata',formData)
    try {
     const res = await axios.post('http://localhost:3000/WebsiteData',formData);
      console.log(res.data);
      navigate("/login"); 
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="column image-column">
          <img
            src="https://4kwallpapers.com/images/walls/thumbs_3t/11350.jpg"
            alt="Signup Illustration"
            className="image"
          />
        </div>

        <div className="column form-column">
          <h2 className="font-bold">Create an Account</h2>
          <form onSubmit={handleEvent}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Enter your Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
              />
            </div>

            <div className="button-group">
              <button
                type="button"
                className="btn btn-signin font-bold"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button type="submit" onClick={handleEvent} className="btn btn-create font-bold">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
