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
import { toggleVisibility, selectVisibleBlogs, selectBlogs } from "./blogSlice"
import UserChip from '../../CommonUI/UserChip';
import { BookMarkBtn } from '../../CommonUI/Button';
import Loader from '../../CommonUI/Loader';

export default function BlogsLanding() {
    const dispatch = useDispatch();
    const visibleBlogs = useSelector(selectVisibleBlogs);
    const [currentUserFavBlogs, setCurrentUserFavBlogs] = useState([]);
    const [currentUserLiked, setCurrentUserLiked] = useState([])
    const [currentUserDisliked, setCurrentUserDisliked] = useState([])
    const handleReadMoreClick = (blogId) => {
        dispatch(toggleVisibility(blogId));
    };

    useEffect(()=>{
        refetch()
    },[])
    

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
    const userUid = user?.uid;

    const { data, isLoading, refetch, isFetching } = useQuery('blogs-List', getBlogList, {
        cacheTime: 300000,
        staleTime: 30000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
    });

    async function getBlogList() {
        const userDocRef = doc(db, 'users', userUid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userFavoriteBlogs = userDocSnapshot.data()?.favoriteBlogs || [];
        const userLikedBlogs = userDocSnapshot.data()?.likedBlogs || [];
        const userDislikedBlogs = userDocSnapshot.data()?.dislikedBlogs || [];
        setCurrentUserFavBlogs(userFavoriteBlogs);
        setCurrentUserLiked(userLikedBlogs)
        setCurrentUserDisliked(userDislikedBlogs)

        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const getArray = [];
        querySnapshot.forEach((doc) => {
            const blogsList = doc.data();

            const isFavorite = userFavoriteBlogs.some((item) => {
                return item == blogsList.id;
            });
            const isLiked = userLikedBlogs.some((like) => {
                return like == blogsList.id;
            });
            const isDisliked = userDislikedBlogs.some((dislike) => {
                return dislike == blogsList.id;
            });

            getArray.push({
                blogs: blogsList,
                favorite: isFavorite,
                isLiked: isLiked,
                isDisliked: isDisliked
            });
        });
        return getArray
    }

    if(isLoading){
        return <BlogContainer loader={true}><Loader color={'#1a8a8f'}/></BlogContainer>
    }
    function formatDate(currDate) {
        const date = new Date(parseInt(currDate, 10));
        const formatted = date.toLocaleDateString().split('/');
        const formattedDate = `${formatted[2]}-${formatted[0].padStart(2, '0')}-${formatted[1].padStart(2, '0')}`;
        return formattedDate;
    }

    return (
        <BlogContainer loader={false}>
            {data?.map((blog, index) => {
                return (
                    <div key={blog.blogs.id}>
                        <TitleBlog bottom='1.2rem'>{blog.blogs.title}</TitleBlog>
                        {/* <p>{blog.blogs.id}</p> */}
                        <Description>
                            {!visibleBlogs.includes(blog.blogs.id)
                                ? `${blog.blogs.body.substring(0, 120)}...`
                                : blog.blogs.body}
                            <span onClick={() => handleReadMoreClick(blog.blogs.id)}>
                                {!visibleBlogs.includes(blog.blogs.id) ? 'Read More' : 'Show Less'}
                            </span>
                        </Description>
                        <Horizontal maxwidth='530px' width='95%' align='center'>
                            <UserLikes likesNumber={blog.blogs.totalLikes} dislikesNumber={blog.blogs.totalDislikes} blogId={blog.blogs.id} authorId={blog.blogs.authorId} liked={blog.isLiked} isDisliked={blog.isDisliked} currentUserLiked={currentUserLiked} currentUserDisliked={currentUserDisliked} refetch={refetch}/>
                            <BookMarkBtn disabled={userUid == blog.blogs.authorId}>
                                <Bookmark favorite={blog.favorite} blogId={blog.blogs.id} userFavoriteBlogs={currentUserFavBlogs} refetch={refetch} isFetching={isFetching}/>
                            </BookMarkBtn>
                            <UserChip author={blog.blogs.authorName} authorId={blog.blogs.authorId} date={formatDate(blog.blogs.postedDate)}/>
                        </Horizontal>
                    </div>
                )
            })}
        </BlogContainer>
    )
}