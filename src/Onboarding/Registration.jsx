import React, { useState } from 'react'
import { Form } from './UserOnbordingStyle';
import { Title } from '../CommonUI/Heading';
import { TextInput } from '../CommonUI/TextInput';
import { PrimaryButton } from '../CommonUI/Button';
import {Horizontal} from "../CommonUI/FlexContainer"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import toast from 'react-hot-toast';
import Loader from '../CommonUI/Loader';

function Registration({ setRegister }) {
  const [loader, setLoader] = useState(false)
  const initialData = {
    fName: '',
    lName: '',
    email: '',
    password: '',
  };
  const [userData, setUserData] = useState(initialData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const auth = getAuth();
  const register = (e) => {
    e.preventDefault()
    setLoader(true)
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, { displayName: `${userData.fName} ${userData.lName}` })
          .then(() => {
            toast.success("Registration Successful")
            setLoader(false)
            sendEmailVerification(auth.currentUser)
              .then(() => {
                toast.success("Verification Email Sent, Verify it.")
                toast.success("Now Login to Visit DeverX")
                dataCreatedForUser();
                setRegister(false);
              });
          })
          .catch((error) => {
            setLoader(false)
            toast.error(error.message)
          });
      })
      .catch((error) => {
        setLoader(false)
        toast.error(error.message.replace('Firebase:', ''))
      });
  };
  const dataCreatedForUser = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      id: auth.currentUser.uid,
      fName: userData.fName,
      lName: userData.lName,
      favoriteBlogs: [],
      memberSince: '',
      totalBlogs: 0,
      totalLikes: 0,
      website: "",
    });
  }
  return (
    <>
      <Form className="form" onSubmit={register}>
        <Horizontal width='100%'>
          <Title bottom="1.6rem">Register for Free</Title>
          {loader && <Loader color={'#1a8a8f'}/>}
        </Horizontal>
        <TextInput autoComplete='off' name="fName" value={userData.fName} onChange={handleInputChange} className="input" type="text" placeholder="First Name" required />
        <TextInput autoComplete='off' name="lName" value={userData.lName} onChange={handleInputChange} className="input" type="text" placeholder="Last Name" required />
        <TextInput autoComplete='off' name="email" value={userData.email} onChange={handleInputChange} className="input" type="email" placeholder="Email" required />
        <TextInput autoComplete='off' name="password" value={userData.password} onChange={handleInputChange} className="input" type="password" placeholder="Password" required />

        <PrimaryButton blockPadding="1rem" margin="2rem 0 0 0" type='submit' disabled={loader}>Register</PrimaryButton>
        <p className="signin">Already have an acount ? <a href="#" onClick={() => setRegister(false)}>Signin</a> </p>
      </Form>
    </>
  )
}

export default Registration