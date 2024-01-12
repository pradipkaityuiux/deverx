import { BiBookmark } from "react-icons/bi";
import { BiSolidBookmark } from "react-icons/bi";
import React, { useState } from 'react'
import styled from "styled-components";

const BookmarkDiv = styled.div`
    margin-top: 2rem;
    margin-right: auto;
    font-size: 2rem;
    padding: 0.6rem 0.6rem 0.2rem 0.6rem;
    border-radius: 5rem;
    cursor: pointer;
    color: #0D7377;
    border: 1px solid #E5E1DA;
    

    &>span{
        color: #323232;
        margin-left: 2px;
        font-size: 1.8rem;
    }
    &:hover{
        background-color: rgba(0,0,0,0.04);
    }
`
function Bookmark() {
    const [save, setSave]= useState(false)
  return (
    <BookmarkDiv onClick={()=> setSave(prev => !prev)}>
        {!save ? <BiBookmark/> : <BiSolidBookmark/>}
    </BookmarkDiv>
  )
}

export default Bookmark