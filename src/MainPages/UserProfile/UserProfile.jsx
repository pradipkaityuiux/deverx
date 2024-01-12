import React from 'react'
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../../firebaseConfig';



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

function UserProfile() {
    const [searchQuery, setSearchQuery] = useSearchParams();
    const currentUserId = searchQuery.get('author-id')

    async function fetchCurrentUser() {
        const docRef = doc(db, "users", currentUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
    }
    const { data, isLoading } = useQuery(['userI-id', currentUserId], fetchCurrentUser, {
        cacheTime: 300000,
        staleTime: 30000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
    });

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
        </>}
    </ProfileContainer>
  )
}

export default UserProfile