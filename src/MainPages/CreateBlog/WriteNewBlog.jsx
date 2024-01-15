import React, { useEffect, useState } from 'react'
import { Title } from '../../CommonUI/Heading'
import { Form } from '../../Onboarding/UserOnbordingStyle'
import { Horizontal } from '../../CommonUI/FlexContainer'
import Loader from '../../CommonUI/Loader'
import { NewTextAddInput, TextInput } from '../../CommonUI/TextInput'
import { PrimaryButton } from '../../CommonUI/Button'
import styled from 'styled-components'
import { BlogContainer } from '../../CommonUI/Container'
import TextFormat from '../TextFormat'
import { useMutation, useQueryClient } from 'react-query'
import { submitFormData, updateUserBlogs } from './useCreateNewBlog'
import toast from 'react-hot-toast'
import { getAuth } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'

const TextArea = styled.textarea`
  width: 100%;
  margin-block: 2rem;
  min-height: 50px;
  max-height: 300px;
  resize: vertical;
  display: block;
  padding: 0.8rem 1rem 0.8rem 0;
  font-size: 1.8rem;
  color: #607274;
  border: none;
  border-bottom: 1px solid #b0b5b5;
  outline: none;
  &:focus{
    border-bottom: 2px solid #3eb7bd;
  }
  &::placeholder{
    color: #B2A59B;
    font-size: 1.4rem;
  }
`

function WriteNewBlog() {
  const auth = getAuth();
  const user = auth.currentUser;
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const mutationAddForm = useMutation(submitFormData, {
    onSuccess: (data) => {
      toast.success("Blog Created Successfully 😃");
      queryClient.invalidateQueries('blogs-List')
      navigate('/blog')
    },
    
  })
  const mutationUpdateBlogs = useMutation(updateUserBlogs)
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    description: "",
    link: ""
  });
  const handleInputForm = (e) => {
    const { name, value } = e.target;
    setNewBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function blogId() {
    var length = 16,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  async function fetchCurrentUserData() {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()?.allBlogs;
    }
  }

  async function handleFormSubmit(e){
    e.preventDefault();
    const formData = {
      id: blogId(),
      authorId: user.uid,
      authorName: user.displayName,
      postedDate: (new Date()).getTime(),
      title: newBlogData.title,
      titleArr: newBlogData.title.toLowerCase().split(' '),
      body: newBlogData.description,
      link: newBlogData.link,
      totalLikes: 0,
      totalDislikes: 0,
    };
    const currentUserAllBlogs = {
      userId: user.uid,
      blogId: formData.id,
      allBlogs: await fetchCurrentUserData()
    }
    mutationAddForm.mutate(formData);
    mutationUpdateBlogs.mutate(currentUserAllBlogs);
    
  }


  return (
    <BlogContainer>
      <form onSubmit={handleFormSubmit}>
          <Horizontal width='100%'>
            <Title bottom="1.6rem">Write a new Blog</Title>
            {mutationAddForm.isLoading && <Loader color={'#1a8a8f'}/>}
          </Horizontal>
          <NewTextAddInput value={newBlogData.fName} onChange={handleInputForm} autoComplete='off' name="title" className="input" type="text" placeholder="Title of your blog" maxLength={100} required />
          <TextArea value={newBlogData.fName} onChange={handleInputForm} autoComplete='off' name='description' placeholder='Description' maxLength={500} rows={2}/>
          <NewTextAddInput value={newBlogData.fName} onChange={handleInputForm} autoComplete='off' name="link" className="input" type="text" placeholder="Additional Link" maxLength={100} required />

          <PrimaryButton blockPadding="1rem" width='10rem' disabled={mutationAddForm.isLoading} margin="2rem 0 0 0" type='submit'>Post</PrimaryButton>
        </form>
        {/* <TextFormat/> */}
      </BlogContainer>
  )
}

export default WriteNewBlog