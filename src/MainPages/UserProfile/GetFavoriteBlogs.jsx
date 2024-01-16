import React from 'react'
import { useSelector } from 'react-redux';
import { currentUserFavBlogs } from '../AllBlogs/blogSlice';
import { useQueries } from 'react-query';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Description, Title, TitleBlog } from '../../CommonUI/Heading';
import styled from 'styled-components';
import UserAction from './UserAction';
import { getAuth } from 'firebase/auth';
import Loader from '../../CommonUI/Loader';
import PopupBlog from './PopupBlog';
import { showPopup } from './UserSlice';

const AllBlogsContent = styled.div`
    padding: 2rem;
    border-radius: 0.8rem;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    &:hover div {
      opacity: 1 !important;
      transform: translateX(0rem) !important;
      pointer-events: auto;
    }
`

function GetFavoriteBlogs({currentFavBlogs, userId}) {
    const auth = getAuth();
    const user = auth.currentUser;
    const showAdditional = userId == user.uid;
    const toggleBlogPopup = useSelector(showPopup)

    async function fetchCurrentBlog(blogId) {
        const docRefBlogFav = doc(db, "blogs", blogId);
        const docSnapBlog = await getDoc(docRefBlogFav);

        if (docSnapBlog.exists()) {
            return docSnapBlog.data();
        }
    }
    const blogDataFav = useQueries(
        currentFavBlogs.map(blog => {
            return {
                queryKey: ['fav-blog-id', blog],
                queryFn: () => fetchCurrentBlog(blog)
            }
        })
    )
    const getBlogsDataFav = blogDataFav?.map(blog =>{
        return {
            data: blog.data,
            loading: blog.isLoading
        }
    });

  return (
      <div>
        {!getBlogsDataFav?.length && <Title>No Blogs Available</Title>}
          {getBlogsDataFav.map(blog => (
              blog.loading ? (
                  <AllBlogsContent key={blog.data?.id}>
                      <Loader color={'#1a8a8f'}/>
                  </AllBlogsContent>
              ) : (
                  <AllBlogsContent key={blog.data?.id}>
                      <TitleBlog bottom={'1rem'}>{blog.data?.title}</TitleBlog>
                      <Description>{blog.data?.body.substring(0, 100)}...</Description>
                      <UserAction flag={showAdditional}  blogId={blog.data?.id}/>
                  </AllBlogsContent>
              )
          ))}
          {toggleBlogPopup && <PopupBlog allBlogs={getBlogsDataFav}/>}
      </div>
  )
}

export default GetFavoriteBlogs