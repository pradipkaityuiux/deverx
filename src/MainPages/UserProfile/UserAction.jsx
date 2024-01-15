import React from 'react'
import { BiSolidTrash } from "react-icons/bi";
import { BiSolidEdit } from "react-icons/bi";
import { BiLinkExternal } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setCurrentBlog, togglePopup } from './UserSlice';

const ActionContent = styled.div`
    /* opacity: 0; */
    transform: translateX(7rem);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 1rem;
    height: 100%;
    background-color: #FFF;
    box-shadow: -4px 4px 8px 0 rgba(0,0,0,0.1);
    transition: all 0.2s cubic-bezier(0.23, 1, 0.320, 1);
    &>div{
        padding: 1rem 1rem 0.4rem 1rem;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        border-radius: 0.8rem;
        font-size: 2rem;
        color: #0D7377;
    }
    &>div:hover{
        background-color: rgba(0,0,0,0.04);
        color: #0D7377;
        cursor: pointer;
    }
`
function UserAction({flag, blogId}) {
    const dispatch = useDispatch()
  return (
    <ActionContent>
        <div onClick={()=> {
            dispatch(togglePopup(true));
            dispatch(setCurrentBlog(blogId))
        }}>
            <BiLinkExternal/>
        </div>
        {/* {flag && <>
            <div>
            <BiSolidEdit/>
        </div>
        <div>
            <BiSolidTrash/>
        </div>
        </>} */}
    </ActionContent>
  )
}

export default UserAction