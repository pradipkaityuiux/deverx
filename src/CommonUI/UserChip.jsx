// import { Auth } from "firebase/auth";

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserContent = styled.div`
    margin-top: 2rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    &>a{
        background-color: rgba(0,0,0,0.06);
        border-radius: 50%;
        padding: 0.6rem;
        cursor: pointer;
        min-width: 2.8rem;
        color: #0D7377;
        text-decoration: none;
    }
    &>span{
        color: #969696;
    }
`

function UserChip({author, date, authorId}) {
  const formatAuthor = author.split(' ').join('-').toLowerCase();
  return (
    <UserContent>
        <span>{date}</span>
        <Link to={`/user-profile/${formatAuthor}?author-id=${authorId}`} title={author}>{author.split(' ').slice(0, 2).map(part => part[0].toUpperCase()).join('')}</Link>
    </UserContent>
  )
}

export default UserChip