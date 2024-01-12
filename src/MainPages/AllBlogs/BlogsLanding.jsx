import React, { useEffect, useState } from 'react'
import { Description, TitleBlog } from '../../CommonUI/Heading'
import { BlogContainer, Container } from '../../CommonUI/Container';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserLikes from '../../CommonUI/UserLikes';
import { Horizontal } from '../../CommonUI/FlexContainer';
import Bookmark from '../../CommonUI/Bookmark';
import { useQuery } from 'react-query'
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisibility, likeBlog, selectVisibleBlogs, selectBlogs } from "./blogSlice"
import UserChip from '../../CommonUI/UserChip';

export default function BlogsLanding() {
    const dispatch = useDispatch();
    const visibleBlogs = useSelector(selectVisibleBlogs);
    const blogs = useSelector(selectBlogs);
    const handleReadMoreClick = (blogId) => {
        dispatch(toggleVisibility(blogId));
    };
    const handleLike = (blogId, type) => {
        let incrementLikes = 0;
        let incrementDislikes = 0;

        if (type === 'like') {
            incrementLikes = 1;
        } else if (type === 'dislike') {
            incrementLikes = -1;
            incrementDislikes = 1;
        }
        console.log('handleLike', blogId, incrementLikes, incrementDislikes, data);
        dispatch(likeBlog({ blogId, incrementLikes, incrementDislikes }));
      };
    // function blogId() {
    //     var length = 16,
    //         charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    //         retVal = "";
    //     for (var i = 0, n = charset.length; i < length; ++i) {
    //         retVal += charset.charAt(Math.floor(Math.random() * n));
    //     }
    //    return retVal;
    // }
    
    //   useEffect(()=>{
    //     async function addDocs(){
    //         for(let i=0; i<allBlogs.length; i++){
    //           const currentBlogId = blogId()
    //           await setDoc(doc(db, "blogs", currentBlogId), {
    //             id: currentBlogId,
    //             authorId: Number(allBlogs[i].authorId),
    //             title: allBlogs[i].title,
    //             body: allBlogs[i].body,
    //             postedDate: allBlogs[i].postedDate,
    //             totalLikes: Number(allBlogs[i].totalLikes),
    //             totalDislikes: Number(allBlogs[i].totalDislikes)
    //           });
    //         }
    //       }
    //     addDocs();
    //   }, [])

    //   ------------------------------------------------
    const auth = getAuth()
    const user = auth.currentUser;
    console.log(user);

    const { data, isLoading } = useQuery('blogs-List', getBlogList, {
        cacheTime: 300000,
        staleTime: 30000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
    });

    async function getBlogList() {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const getArray = [];
        querySnapshot.forEach((doc) => {
            const blogsList = doc.data();
            getArray.push({
              blogs: blogsList,
              favorite: false
            });
        });
        return getArray
    }

    if(isLoading){
        return <TitleBlog>Loading...</TitleBlog>
    }

    function formatDate(currDate) {
        const date = new Date(parseInt(currDate, 10));
        const formatted = date.toLocaleDateString().split('/');
        const formattedDate = `${formatted[2]}-${formatted[0].padStart(2, '0')}-${formatted[1].padStart(2, '0')}`;
        return formattedDate;
    }

    return (
        <BlogContainer>
            {data.map((blog, index) => {
                return (
                    <div key={blog.blogs.id}>
                        <TitleBlog bottom='1.2rem'>{blog.blogs.title}</TitleBlog>
                        {/* <p>{blog.blogs.id}</p> */}
                        <Description>
                            {!visibleBlogs.includes(blog.blogs.id)
                                ? `${blog.blogs.body.substring(0, 180)}...`
                                : blog.blogs.body}
                            <span onClick={() => handleReadMoreClick(blog.blogs.id)}>
                                {!visibleBlogs.includes(blog.blogs.id) ? 'Read More' : 'Show Less'}
                            </span>
                        </Description>
                        <Horizontal maxwidth='530px' width='95%' align='center'>
                            <UserLikes likesNumber={blog.blogs.totalLikes} dislikesNumber={blog.blogs.totalDislikes} handleLike={handleLike} blogId={blog.blogs.id}/>
                            <Bookmark />
                            <UserChip author={blog.blogs.authorName} authorId={blog.blogs.authorId} date={formatDate(blog.blogs.postedDate)}/>
                        </Horizontal>
                    </div>
                )
            })}
        </BlogContainer>
    )
}