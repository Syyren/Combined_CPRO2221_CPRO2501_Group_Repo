import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"; // Importing axios for making HTTP requests
function Login() { // Define Login functional component

   // Declare state variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Function for handling login
    async function login(event) {
        event.preventDefault();
        try {
            // Send POST request to login endpoint
          await axios.post("http://localhost:8090/api/v1/player/login", {
            username: username,
            password: password,
            }).then((res) => 
            {
             console.log(res.data);
                // Check response message
             if (res.data.message === "Username not exits") 
             {
               alert("Username not exits");
             } 
             else if(res.data.message === "Login Success")
             { 
                
                navigate('/home');
             } 
              else 
             { 
                alert("Incorrect User and Password not match");
             }
          }, fail => {
           console.error(fail); // Error!
  }); }
 
  catch (err) {
   alert(err);// Show alert message with error
 }

}
return (
<div>
<h2> Player Login</h2>
     <div class="container">
     <div class="row">
        
      <hr/>
      </div>
      <div class="row">
      <div class="col-sm-6">

     <form>
 <div class="form-group">
   <label>UserNAME</label>
   <input type="name"  class="form-control" id="username" placeholder="Enter Name"
   
   value={username}
   onChange={(event) => {
     setUsername(event.target.value);
   }}
   
   />
 </div> <div class="form-group">
            <label>password</label>
            <input type="password"  class="form-control" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" class="btn btn-primary" onClick={login} >Login</button>
              </form>
              <div style={{
                width: '100%',
                height : '300px',
                backgroundSize:"100%",
                backgroundImage: 'url("/images/download.jpg")'}}></div>
            </div>
            </div>
            </div>
            
            
     </div>
    );
  }
  
  export default Login;// Export Login component
