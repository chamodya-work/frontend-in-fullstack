import React, { useEffect, useState } from 'react'
import "./account.css"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate(); 
  const [gUser, setGUser] = useState();
  const [email, setEmail] = useState('');

  const saveUserData = async (name, email, password) => {
    fetch('http://localhost:8081/addGUser',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResult = await fetch(`http://localhost:8081/getGUserByEmail/${email}`);
        setGUser(await userResult.json());
    
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
    
  },[email]);


  const userValidation = () => {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    if(gUser?.email === email){
      alert("User already exists, Please login..!");

    }
    else{
      saveUserData(name, email, password);

      const user = {
        name: name,
        email: email,
        password: password
      }

      localStorage.setItem("userEmail", email);
      let loggedUser = JSON.stringify(user);
      localStorage.setItem("loggedUser", loggedUser);

      navigate('/');
      
      const sendEmail = async () => {
        fetch(`http://localhost:8081/registration/${email}`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            subject: "Registration to MYFLIX"
          })
        })
      }
      sendEmail();
    }
  }

  return (
    <div className='wrapper__create'>
        
        <div className='create-box'>
            <form>
                <label className='login-box-label'>SIGN UP</label>
                <input required className='login-box-userInputs' type='text' placeholder='Enter your name' id='name'></input>
                {/* <input className='login-box-userInputs' type='text' placeholder='Enter your last name'></input> */}
                <input required className='login-box-userInputs' type='text' placeholder='Enter your email' id='email' value={email} onChange={event => setEmail(event.target.value)}></input>
                <input className='login-box-userInputs' type='password' placeholder='Enter your password' id='password'></input>
                {/* <label className='login-box-profileText'>Upload a profile picture</label> */}
                {/* <input className='login-box-userInputs' type='file' /> */}
                <label required className='login-box-linkToPage' onClick={() => {navigate('/login')}}>👉 Are you a existing user? Login here...</label>
                <input className='login-box-CreateButton' type='button' value='Create Account' onClick={userValidation}></input>
            </form>
        </div>
    </div>
  )
}

export default SignUp