import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { useQueries, useQuery } from 'react-query';
import { db } from '../../firebaseConfig';
import toast from 'react-hot-toast';
import { currentUserAllBlogs, currentUserFavBlogs, setCurrentUserAllBlogs, setCurrentUserFavBlogs } from '../AllBlogs/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import GetAllBlogs from './GetAllBlogs';
import GetFavoriteBlogs from './GetFavoriteBlogs';
import { togglePopup } from './UserSlice';



const ProfileContainer = styled.div`
    max-width: 540px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    &>div{
        
    }
`
const ProfileImageContent = styled.div`
    display: flex;
    align-items: center;
    gap: 3.2rem;
    margin-bottom: 1rem;
    &>span{
        font-size: 4.8rem;
        background-color: #f8f8f8;
        color: #0D7377;
        font-weight: 700;
        padding: 1.6rem;
        border-radius: 0.8rem;
    }
    &>div>p{
        font-size: 3.2rem;
        margin-bottom: 1rem;
        color: #414141;
    }
    &>div>span{
        font-size: 1.6rem;
        color: #464646;
    }
`
const Analytics = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.8rem;
    &>div{
        background-color: transparent;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        padding: 1rem 1.6rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        border-radius: 0.6rem;
    }
    &>div>strong{
        font-size: 3.2rem;
        color: #0D7377;
        margin-top: 0.4rem;
    }
    &>div>p{
        color: #6b6b6b;
        font-size: 2rem;
    }
`
const RadioContent = styled.div`
    margin-top: 2rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    &>label{
        font-size: 2rem;
        cursor: pointer;
        color: #585858;
        padding-bottom: 0.4rem;
    }
    &>input[type='radio']:checked + label{
        color: #1a8a8f;
        box-shadow: 0 2px 0 0 #1a8a8f;
    }
    &>input{
        display: none;
    }
`

function UserProfile() {
    const [searchQuery, setSearchQuery] = useSearchParams();
    const currentUserId = searchQuery.get('author-id')
    const [userData, setUserData] = useState({});
    const [toggleBlog, setToggleBlog] = useState('allBlogs')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(togglePopup(false));
        refetch()
    },[])

    const { data, isLoading, refetch } = useQuery(['user-id', currentUserId], async () => {
        const docRef = doc(db, 'users', currentUserId);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData);
          dispatch(setCurrentUserAllBlogs(userData));
          return userData;
        }
        return null;
      }, {
        enabled: true,
        refetchOnMount: true,
        cacheTime: 300000,
        staleTime: 30000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
      });

    useEffect(()=>{
        if (!isLoading && data) {
            setUserData(data);
            dispatch(setCurrentUserAllBlogs(userData))
            dispatch(setCurrentUserFavBlogs(userData))
        }
    }, [userData, isLoading, data])

    const currentUserBlog = useSelector(currentUserAllBlogs);
    const currentUserFavBlog = useSelector(currentUserFavBlogs);
    const currentBlogs = currentUserBlog?.allBlogs?.length > 0 ? currentUserBlog?.allBlogs : []
    const currentFavBlogs = currentUserFavBlog?.favoriteBlogs?.length > 0 ? currentUserFavBlog?.favoriteBlogs : []

    

    function formatDate(currDate) {
        const date = new Date(parseInt(currDate, 10));
        const formatted = date.toLocaleDateString().split('/');
        const formattedDate = `${formatted[2]}-${formatted[0].padStart(2, '0')}-${formatted[1].padStart(2, '0')}`;
        return formattedDate
    }

    if(isLoading) return <p>Loading...</p>

  return (
    <ProfileContainer>
        {!isLoading && <>
            <ProfileImageContent>
            <span>{data.fName[0].toUpperCase()}{data.lName[0].toUpperCase()}</span>
            <div>
                <p>{data.fName} {data.lName}</p>
                <span>Member Since: {formatDate(data.memberSince)}</span>
            </div>
        </ProfileImageContent>
        <Analytics>
            <div>
                <p>Total Likes</p>
                <strong>{data.totalLikes}</strong>
            </div>
            <div>
                <p>Total Blogs</p>
                <strong>{data.allBlogs.length}</strong>
            </div>
            <div>
                <p>Favorites</p>
                <strong>{data.favoriteBlogs.length}</strong>
            </div>
        </Analytics>
        <RadioContent>
            <input name='toggle' type="radio" id='allBlogs' onChange={() => setToggleBlog('allBlogs')} value='allBlogs' checked={toggleBlog === 'allBlogs'}/>
            <label htmlFor="allBlogs">All Blogs</label>

            <input name='toggle' type="radio" id='favBlogs' onChange={() => setToggleBlog('favBlogs')} value='favBlogs' checked={toggleBlog === 'favBlogs'}/>
            <label htmlFor="favBlogs">Favorite Blogs</label>
        </RadioContent>
        {toggleBlog=='allBlogs' && <GetAllBlogs currentBlogs={currentBlogs} userId={currentUserId}/>}
        {toggleBlog=='favBlogs' && <GetFavoriteBlogs currentFavBlogs={currentFavBlogs} userId={currentUserId}/>}
        </>}
    </ProfileContainer>
  )
}

export default UserProfile