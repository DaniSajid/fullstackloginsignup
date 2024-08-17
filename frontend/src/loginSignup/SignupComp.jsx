import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignupComp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function registerUser(e) {
    e.preventDefault(); 
    fetch("http://localhost:5000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json()) 
      .then((data) => {
        console.log("Response Data:", data); 
        alert(data.message); 
        if (data.message === "User created successfully" && data.user.token) {
          Cookies.set("token", data.user.token, { expires: 7 });
          navigate("/"); 
        }
      })
      .catch((err) => {
        console.error("Error:", err); 
      });
  }

  return (
    <>
      <h1 className="text-center">Register</h1>
      <form className="col-6 offset-3" onSubmit={registerUser}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className="form-control"
            id="firstName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            className="form-control"
            id="lastName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  );
};

export default SignupComp;
