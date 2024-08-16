import { useState } from "react"


const SignupComp = () => {
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
 function registerUser() {
    fetch("http://localhost:5000/api/v1/register").then((response) => {
      response.json().then((data) => {
        console.log(data)
      })
    }).catch((err)=>{
      console.log(err)
    })
  }  
  
  return (
    <>
    <h1 className="text-center">Register</h1>
<form className="col-6 offset-3">
  <div className="mb-3">
    <label htmlFor="exampleInputText" className="form-label">First Name</label>
    <input type="text" name="firstName" className="form-control" id="exampleInputText" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputText1" className="form-label">Last Name</label>
    <input type="text" name="lastName" className="form-control" id="exampleInputText1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" onClick={registerUser} className="btn btn-primary">Register</button>
</form>
</>
  )
}

export default SignupComp
