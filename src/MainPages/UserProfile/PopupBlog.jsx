import React from 'react'
import styled from 'styled-components'
import { Description, Title } from '../../CommonUI/Heading'
import { useDispatch, useSelector } from 'react-redux'
import { currentBlogId, togglePopup } from './UserSlice'

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
    max-width: 640px;
    width: 90%;
    background-color: #fff;
    height: 100vh;
    float: right;
    padding: 8rem 4rem 0;
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
function PopupBlog({allBlogs}) {
    const dispatch = useDispatch();
    const getBlogId = useSelector(currentBlogId);
    const findCurrentBlog = allBlogs?.find(blog => blog.data.id === getBlogId)
    console.log(getBlogId, findCurrentBlog);
    return (
        <Popup onClick={(e)=>{
            if (e.target === e.currentTarget) {
                dispatch(togglePopup(false));
            }
        }}>
            <PopupContent>
                <Title bottom='1.6rem'>{findCurrentBlog?.data?.title ? findCurrentBlog.data.title : "Not available"}</Title>
                <Description>{findCurrentBlog?.data?.body ? findCurrentBlog.data.body  : "Not available"}</Description>
            </PopupContent>
        </Popup>
    )
}

export default PopupBlog