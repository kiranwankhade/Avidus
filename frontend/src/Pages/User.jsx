import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useToast } from '@chakra-ui/react';

const User = () => {
    let token = localStorage.getItem("token");
    const [data,setData] = useState({});
    const getData = async()=>{
    
        await fetch(`http://localhost:8000/user`, {
            method:'GET',
            headers: {
              Authorization: token,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setData(res);
            }).catch(err=> console.log(err.message));
    }

    useEffect(()=>{
        getData()
    },[])

    console.log("data",data)
  return (
    <div>
        <Navbar/>
        <h1>USERS</h1>
    </div>
  )
}

export default User