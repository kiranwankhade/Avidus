import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { useToast } from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const toast = useToast()
  const navigate = useNavigate();

  const signIn = async() => {
    if(email === "" && pass===""){
        toast({
            title: "Please fill all the Fields",
            status: 'error',
            isClosable: true,
            position:'top-right'
          })
    }else{
        const payload = {
            email,
            pass
        }
        console.log('payload:', payload)
        await fetch("http://localhost:8000/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res=> res.json())
        .then(res=> {
           console.log(res);
           localStorage.setItem("token",res.token)
           navigate("/dashboard")
       })
        .catch(err=>{
            console.log(err)
            toast({
                title: `Please Register First`,
                status: 'error',
                isClosable: true,
                position:'top-right'
            })
        })
    }
   
  } 
  
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          required
        />
        <input
          type="password"
          className="login__textBox"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          className="login__btn"
          onClick={() => signIn()}
        >
          Login
        </button>
        <div>
          <Link to="">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;