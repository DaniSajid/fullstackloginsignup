 
 
 const LoginComp = () => {
   return (
    <>
    <h1 className="text-center">Login</h1>
<form className="col-6 offset-3">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
</>
   )
 }
 
 export default LoginComp
 