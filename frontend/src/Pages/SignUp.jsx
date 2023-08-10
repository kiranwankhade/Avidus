import React, { useEffect, useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";

import "../Styles/SignUp.css";
import { useToast } from "@chakra-ui/react";
function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const history = useNavigate();

  const toast = useToast()

  const register = async() => {
    if(name === "" && email === "" && pass === ""){
      toast({
        title: "Please fill all the Fields",
        status: 'error',
        isClosable: true,
        position:'top-right'
      })
    }else{
      const payload = {
        name,
        email,
        pass
    }
    console.log('payloadRegister:', payload)
    await fetch("http://localhost:8000/user/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res=> res.json())
    .then(res=> {
       console.log(res);
       history("/")
   })
    .catch(err=> {
      console.log(err);
      toast({
        title: `${err.message}`,
        status: 'error',
        isClosable: true,
        position:'top-right'
      })
    })
    }
  };
  
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={()=>{
          register()
        }}>
          Register
        </button>
       
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default SignUp;