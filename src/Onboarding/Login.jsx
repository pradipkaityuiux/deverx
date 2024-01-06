import React, { useRef, useState } from 'react'
import { Form, InputContainer } from './UserOnbordingStyle';
import { Title } from '../CommonUI/Heading';
import GoogleLogo from "../assets/Google-logo.png"
import { TextInput } from '../CommonUI/TextInput';
import { GoogleLogin, PrimaryButton } from '../CommonUI/Button';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

function Login({setRegister}) {
  const viewPassword = useRef(null)
  const [view, setView] = useState(false)
  return (
    <Form className="form">
        <Title bottom="1.6rem">Login to your Account</Title>
        <TextInput className="input" type="email" placeholder="Email" required="" />
        <InputContainer>
            <TextInput ref={viewPassword} className="input" type="password" autoComplete='false' placeholder="Password" required="" />
            {view ? 
                <FiEye className='eyeView' onClick={()=> {
                    viewPassword.current.type = 'password'
                    setView(false)}
                }/> : 
                <FiEyeOff className='eyeView' onClick={()=> {
                    viewPassword.current.type = 'test'
                    setView(true)}
                }/>
            }
        </InputContainer>
        
        <PrimaryButton blockPadding="1rem" margin="2rem 0 0 0">Log In</PrimaryButton>
        <p className="signin">Don't have an acount ? <a href="#" onClick={()=>setRegister(true)}>Register</a> </p>
        <GoogleLogin>
            <img src={GoogleLogo} alt="" />
            <p>Sign in with Google Account</p>
        </GoogleLogin>
    </Form>
  )
}

export default Login