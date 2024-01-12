import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import React, { useState } from 'react'
import styled from "styled-components";

const LikeContainer = styled.div`
    margin-top: 2rem;
    margin-right: 1rem;
    overflow: hidden;
    border-radius: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border: 1px solid #E5E1DA;
` 
const Like = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    position: relative;
    color: #323232;
    padding: 0.4rem 1rem;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.05);
    }
    &>p{
        margin-left: 2px;
    }
`

function UserLikes({likesNumber, dislikesNumber, handleLike, blogId}) {
  return (
    <LikeContainer>
        <Like onClick={() => handleLike(blogId, 'like')}>
            <BiLike/>
            <p>{likesNumber}</p>
        </Like>
        <Like onClick={() => handleLike(blogId, 'dislike')}>
            <BiDislike/>
            <p>{dislikesNumber}</p>
        </Like>
        
    </LikeContainer>
  )
}

export default UserLikes