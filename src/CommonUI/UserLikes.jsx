import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import React, { useState } from 'react'
import styled from "styled-components";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

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
const Like = styled.button`
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    position: relative;
    color: #323232;
    padding: 0.4rem 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border-right: ${props => props.hasLine ? '1px solid #e2e2e2' : ''};
    &:hover{
        background-color: rgba(0,0,0,0.05);
    }
    &>p{
        margin-left: 2px;
    }
    &:disabled{
        cursor: not-allowed;
        opacity: 0.7;
    }
`

function UserLikes({likesNumber, dislikesNumber, blogId, authorId, liked, isDisliked, currentUserLiked, currentUserDisliked, refetch}) {
    const [current, setCurrent] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const userUid = user.uid;
    const docRefUser = doc(db, "users", userUid);
    const docRefBlog = doc(db, "blogs", blogId);
    
    async function handleLike(id, likeType, likeFlag) {
        const currentBlogUser = doc(db, "users", authorId);
        const docSnapAuthor = await getDoc(currentBlogUser);
        
        const indexToRemoveLiked = currentUserLiked.findIndex((item) => item === blogId);
        const indexToRemoveDisliked = currentUserDisliked.findIndex((item) => item === blogId);
    
        if (likeType === 'like') {
            if (likeFlag) {
                if (indexToRemoveLiked !== -1) {
                    setCurrent('');
                    currentUserLiked.splice(indexToRemoveLiked, 1);
                    likesNumber = likesNumber - 1;
                } else if (indexToRemoveDisliked === -1) {
                    setCurrent('');
                }
            } else {
                if (indexToRemoveLiked === -1) {
                    setCurrent('liked');
                    currentUserLiked.push(blogId);
                    likesNumber = likesNumber + 1;
    
                    if (indexToRemoveDisliked !== -1) {
                        currentUserDisliked.splice(indexToRemoveDisliked, 1);
                        dislikesNumber = dislikesNumber - 1;
                    }
                }
            }
        }
    
        if (likeType === 'dislike') {
            if (likeFlag) {
                if (indexToRemoveDisliked !== -1) {
                    setCurrent('');
                    currentUserDisliked.splice(indexToRemoveDisliked, 1);
                    dislikesNumber = dislikesNumber - 1;
                } else if (indexToRemoveLiked === -1) {
                    setCurrent('');
                }
            } else {
                if (indexToRemoveDisliked === -1) {
                    setCurrent('disliked');
                    currentUserDisliked.push(blogId);
                    dislikesNumber = dislikesNumber + 1;
    
                    if (indexToRemoveLiked !== -1) {
                        currentUserLiked.splice(indexToRemoveLiked, 1);
                        likesNumber = likesNumber - 1;
                    }
                }
            }
        }
    
        await updateDoc(docRefUser, {
            likedBlogs: currentUserLiked,
            dislikedBlogs: currentUserDisliked,
        });
    
        await updateDoc(docRefBlog, {
            totalLikes: Number(likesNumber),
            totalDislikes: Number(dislikesNumber),
        });
    
        refetch();
    }    
    
  return (
      <LikeContainer>
          <Like onClick={() => handleLike(blogId, 'like', liked)} hasLine={true} disabled={userUid==authorId}>
            {!liked ? <BiLike /> : <BiSolidLike/>}
              <p>{likesNumber}</p>
          </Like>
          
          <Like onClick={() => handleLike(blogId, 'dislike', isDisliked)} disabled={userUid==authorId}>
              {!isDisliked ? <BiDislike /> : <BiSolidDislike/>}
              <p>{dislikesNumber}</p>
          </Like>

      </LikeContainer>
  )
}

export default UserLikes