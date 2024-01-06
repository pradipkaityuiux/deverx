import React, { useEffect, useState } from 'react'
import { Form } from './UserOnbordingStyle';
import { Title } from '../CommonUI/Heading';
import { TextInput } from '../CommonUI/TextInput';
import { PrimaryButton } from '../CommonUI/Button';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import toast from 'react-hot-toast';

function Registration({setRegister}) {
    const initialData = {
        fName: '',
        lName: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        // loaderShow.value = true;
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth.currentUser, { displayName: `${userData.fName}${userData.lName}` })
              .then(() => {
                // message.value = "Registratioin Successful"
                // showAlert.value = true;
                // loaderShow.value = false;
                sendEmailVerification(auth.currentUser)
                  .then(() => {
                    // message.value = "Verification Email send"
                    toast.success("Verification Email Sent, Verify it.")
                    dataCreatedForUser();
                  });
              })
              .catch((error) => {
                  toast.error(error.message)
                  console.error("Error updating user profile:", error);
                });
            })
            .catch((error) => {
                toast.error('Email already in use.')
          });
      };
      const dataCreatedForUser = async() =>{
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
        console.log(auth.currentUser);
      }
  return (
    <Form className="form" onSubmit={register}>
        <Title bottom="1.6rem">Register for Free</Title>
        <TextInput name="fName" value={userData.fName} onChange={handleInputChange} className="input" type="text" placeholder="First Name" required="" />
        <TextInput name="lName" value={userData.lName} onChange={handleInputChange} className="input" type="text" placeholder="Last Name" required="" />
        <TextInput name="email" value={userData.email} onChange={handleInputChange} className="input" type="email" placeholder="Email" required="" />
        <TextInput name="password" value={userData.password} onChange={handleInputChange} className="input" type="password" placeholder="Password" autoComplete='false' required="" />
        <TextInput name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} className="input" type="password" placeholder="Confirm Password" autoComplete='false' required="" />
        
        <PrimaryButton blockPadding="1rem" margin="2rem 0 0 0" type='submit'>Register</PrimaryButton>
        <p className="signin">Already have an acount ? <a href="#" onClick={()=>setRegister(false)}>Signin</a> </p>
    </Form>
  )
}

export default Registration