import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginComp = () => {
  const [formData, setFormData] = useState({
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

  function loginUser(e) {
    e.preventDefault(); // Prevent default form submission behavior
    fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data:", data); // Print the data to the console
        if (data.token) {
          // Set the token in cookies
          Cookies.set("token", data.token, { expires: 7 }); // Cookie expires in 7 days
          alert("Login successful");
          navigate("/"); // Redirect to the home page
        } else {
          alert(data.message || "Login failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error:", err); // Log any errors
        alert("Login failed. Please try again.");
      });
  }

  return (
    <>
      <h1 className="text-center">Login</h1>
      <form className="col-6 offset-3" onSubmit={loginUser}>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default LoginComp;
