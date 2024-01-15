import React, { useState } from 'react'
import styled from 'styled-components'
import { Description, Title } from '../../CommonUI/Heading'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUserEditPopup } from './UserSlice'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Form } from '../../Onboarding/UserOnbordingStyle'
import Loader from '../../CommonUI/Loader'
import { Horizontal } from '../../CommonUI/FlexContainer'
import { TextInput } from '../../CommonUI/TextInput'
import { PrimaryButton } from '../../CommonUI/Button'
import { db } from '../../firebaseConfig'

const Popup = styled.div`
    z-index: 1;
    position: fixed;
    right: 0;
    top: 0;
    width: 100vw;
    background-color: rgba(0,0,0,0.05);
    backdrop-filter: blur(2px);
    height: 100vh;
`
const PopupContent = styled.div`
    max-width: 480px;
    width: 90%;
    background-color: #fff;
    height: 100vh;
    float: right;
    padding: 8rem 0 0 4rem;
    animation: slide 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);
    @keyframes slide {
        0%{
            transform: translateX(20rem);
        }
        100%{
            transform: translateX(0);
        }
    }
`
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 50px;
  max-height: 200px;
  resize: vertical;
  border-radius: 0.4rem;
  display: block;
  padding: 0.8rem 1rem;
  font-size: 1.8rem;
  color: #607274;
  border: none;
  border: 1px solid #b0b5b5;
  outline: none;
  outline-offset: 1px;
  &:focus{
    outline: 2px solid #3eb7bd;
  }
  &::placeholder{
    color: #B2A59B;
    font-size: 1.4rem;
  }
`
const Select = styled.select`
  width: 100%;
  height: 40px;
  resize: vertical;
  border-radius: 0.4rem;
  display: block;
  padding: 0.8rem 1rem;
  font-size: 1.6rem;
  color: #607274;
  border: none;
  border: 1px solid #b0b5b5;
  outline: none;
  outline-offset: 1px;
  &:focus{
    outline: 2px solid #3eb7bd;
  }
  &::placeholder{
    color: #B2A59B;
    font-size: 1.4rem;
  }
  &>option{
    color: #777675;
    font-size: 1.6rem;
  }
`
function EditPopupBlog({refetch, location, website, type, bio}) {
    const dispatch = useDispatch();
    const auth = getAuth();
    const user = auth.currentUser;
    const [loader, setLoader] = useState(false)

    const initialDataUser = {
        location: location,
        website: website,
        websiteType: type,
        bio: bio,
      };
      const [userData, setUserData] = useState(initialDataUser);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    async function updateProfile(e){
        setLoader(true)
        e.preventDefault()
        const userBase = doc(db, "users", user?.uid);
        await updateDoc(userBase, {
          location : userData.location ? userData.location : "",
          website: userData.website ? userData.website : "",
          websiteType: userData.websiteType ? userData.websiteType : "",
          bio : userData.bio ? userData.bio : "",
        });
        refetch();
        setLoader(false)
        dispatch(toggleUserEditPopup(false))
      }
    
    return (
        <Popup onClick={(e) => {
            if (e.target === e.currentTarget) {
                dispatch(toggleUserEditPopup(false));
            }
        }}>
            <PopupContent>
                <Form className="form" onSubmit={updateProfile}>
                    <Horizontal width='100%'>
                        <Title bottom="1.6rem">Edit Your Profile</Title>
                        {loader && <Loader color={'#1a8a8f'} />}
                    </Horizontal>
                    <TextInput autoComplete='off' name="location" value={userData.location} onChange={handleInputChange} className="input" type="text" placeholder="Location" />
                    <TextInput autoComplete='off' name="website" value={userData.website} onChange={handleInputChange} className="input" type="url" placeholder="Website"/>
                    <Select autoComplete='off' name="websiteType" value={userData.websiteType} onChange={handleInputChange} className="input">
                        <option value="" disabled selected>Website Type</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="github">Github</option>
                        <option value="medium">Medium</option>
                        <option value="youtube">YouTube</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="quora">Quora</option>
                    </Select>
                    <TextArea autoComplete='off' name="bio" value={userData.bio} onChange={handleInputChange} className="input" placeholder="Bio"/>
                    <PrimaryButton blockPadding="1rem" margin="2rem 0 0 0" type='submit' disabled={loader}>Update</PrimaryButton>
                </Form>
            </PopupContent>
        </Popup>
    )
}

export default EditPopupBlog