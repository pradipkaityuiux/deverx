import { BiBookmark } from "react-icons/bi";
import { BiSolidBookmark } from "react-icons/bi";
import React, { useState } from 'react'
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

const BookmarkDiv = styled.button`
    margin-top: 2rem;
    margin-right: auto;
    font-size: 2rem;
    padding: 0.6rem 0.6rem 0.2rem 0.6rem;
    border-radius: 5rem;
    cursor: pointer;
    background-color: transparent;
    color: #0D7377;
    border: 1px solid #E5E1DA;
    &:disabled{
        cursor: not-allowed;
        opacity: 0.7;
    }

    &>span{
        color: #323232;
        margin-left: 2px;
        font-size: 1.8rem;
    }
    &:hover{
        background-color: rgba(0,0,0,0.04);
    }
`
function Bookmark({favorite, blogId, userFavoriteBlogs, refetch}) {
    const auth = getAuth();
    const user = auth.currentUser;
    const userUid = user.uid;
    const [save, setSave]= useState(false);
    const docRef = doc(db, "users", userUid);

    async function handleFavBlog(favoriteFlag) {
        const indexToRemove = userFavoriteBlogs.findIndex((item) => item == blogId);
        if (favoriteFlag) {
            if (indexToRemove !== -1) {
                userFavoriteBlogs.splice(indexToRemove, 1);
            }
        } else {
            if (indexToRemove === -1) {
                userFavoriteBlogs.push(blogId);
            }
        }
        await updateDoc(docRef, {
            favoriteBlogs: userFavoriteBlogs,
        });
        refetch()
    }

  return (
    <BookmarkDiv onClick={()=> handleFavBlog(favorite)}>
        {!favorite ? <BiBookmark/> : <BiSolidBookmark/>}
    </BookmarkDiv>
  )
}

export default Bookmark