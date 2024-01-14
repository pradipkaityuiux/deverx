import React, { useEffect, useRef, useState } from 'react'
import { Form, InputContainer } from './UserOnbordingStyle';
import { Title } from '../CommonUI/Heading';
import GoogleLogo from "../assets/Google-logo.png"
import { TextInput } from '../CommonUI/TextInput';
import { GoogleLogin, PrimaryButton } from '../CommonUI/Button';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import toast from 'react-hot-toast';
import { Horizontal } from '../CommonUI/FlexContainer';
import Loader from '../CommonUI/Loader';
import { getDoc, setDoc } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Login({ setRegister }) {
  const navigate = useNavigate()
  const auth = getAuth();
  const user = auth?.currentUser;
  const viewPassword = useRef(null);
  const [view, setView] = useState(false);
  const [loader, setLoader] = useState(false);
  const initialData = {
    email: '',
    password: '',
  };
  const [userDataLogin, setUserDataLogin] = useState(initialData);


  useEffect(()=>{
    if (user && user.emailVerified) {
      navigate('/blog')
    }
  },[user])

  // const {isLoading, data: cabins, error} = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: getCurrentUser
  // })

  // function getCurrentUser(currentUser){
  //   if(!currentUser) return;
  //   let user = {
  //     displayName: currentUser.displayName,
  //     createdAt: currentUser.metadata.createdAt,
  //     email: currentUser.email,
  //     uid: currentUser.uid,
  //     photoUrl: currentUser.photoURL,
  //     emailVerified: currentUser.emailVerified,
  //   };
  //   return user;
  // }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  function handleLogin(e) {
    e.preventDefault()
    setLoader(true)
    signInWithEmailAndPassword(auth, userDataLogin.email, userDataLogin.password)
      .then((userCredential) => {
        const user = auth.currentUser;
        toast.success("Welcome, "+user.displayName+'😃')
        setLoader(false)
        if (user.emailVerified) {
          navigate('/blog')
        } else {
          toast.error('Your Email is not Verified')
        }
      })
      .catch((error) => {
        setLoader(false)
        toast.error(error.message.replace('Firebase:', ''))
      });
  }
  async function signInGoogle() {
    const auth = getAuth();
    setLoader(true)
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          fName: "",
          lName: "",
          favoriteBlogs: [],
          memberSince: '',
          bio: '',
          allBlogs: [],
          likedBlogs: [],
          dislikedBlogs: [],
          location: '',
          website: "",
          websiteType: ''
        });
      }
      setLoader(false)
      toast.success('Taking you to the Landing Page')
    } catch (error) {
      setLoader(false)
      toast.error(error.message.replace('Firebase:', ''))
    }
  }

  return (
    <Form className="form" onSubmit={handleLogin}>
      <Horizontal width='100%'>
        <Title bottom="1.6rem">Login to your Account</Title>
        {loader && <Loader color={'#1a8a8f'} />}
      </Horizontal>
      <TextInput autoComplete='off' className="input" name='email' type="email" placeholder="Email" onChange={handleInputChange} value={userDataLogin.email} required />
      <InputContainer>
        <TextInput ref={viewPassword} name='password' className="input" type="password" autoComplete='off' placeholder="Password" onChange={handleInputChange} value={userDataLogin.password} required />
        {view ?
          <FiEye className='eyeView' onClick={() => {
            viewPassword.current.type = 'password'
            setView(false)
          }
          } /> :
          <FiEyeOff className='eyeView' onClick={() => {
            viewPassword.current.type = 'test'
            setView(true)
          }
          } />
        }
      </InputContainer>

      <PrimaryButton blockPadding="1rem" margin="2rem 0 0 0" type='submit' disabled={loader}>Log In</PrimaryButton>
      <p className="signin">Don't have an acount ? <a href="#" onClick={() => setRegister(true)}>Register</a> </p>
      <GoogleLogin onClick={signInGoogle} as={'a'}>
        <img src={GoogleLogo} alt="" />
        <p>Sign in with Google Account</p>
      </GoogleLogin>
    </Form>
  )
}

export default Login