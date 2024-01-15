import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchBlogs, selectVisibleBlogs, toggleVisibility } from '../AllBlogs/blogSlice'
import { BlogContainer } from '../../CommonUI/Container';
import { Description, TitleBlog } from '../../CommonUI/Heading';
import { Horizontal } from '../../CommonUI/FlexContainer';
import UserChip from '../../CommonUI/UserChip';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const SearchTitle = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    color: #4b4b4b;
    &>span{
        font-size: 2.4rem;
        color: #0D7377;
        margin-left: 0.6rem;
    }
`

function SearchBlog() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useSearchParams();
    const queryInput = searchQuery.get('query')
    const query = useSelector(searchBlogs)
    const visibleBlogs = useSelector(selectVisibleBlogs);
    const handleReadMoreClick = (blogId) => {
        dispatch(toggleVisibility(blogId));
    };
    function formatDate(currDate) {
        const date = new Date(parseInt(currDate, 10));
        const formatted = date.toLocaleDateString().split('/');
        const formattedDate = `${formatted[2]}-${formatted[0].padStart(2, '0')}-${formatted[1].padStart(2, '0')}`;
        return formattedDate;
    }
    return (
        <BlogContainer>
            <SearchTitle>Search result for: <span>{queryInput.split('-').join(' ')}</span></SearchTitle>
            {query?.map((blog, index) => {
                return (
                    <div key={blog.blogs.id}>
                        <TitleBlog bottom='1.2rem'>{blog.blogs.title}</TitleBlog>
                        <Description>
                            {!visibleBlogs.includes(blog.blogs.id)
                                ? `${blog.blogs.body.substring(0, 120)}...`
                                : blog.blogs.body}
                            <span onClick={() => handleReadMoreClick(blog.blogs.id)}>
                                {!visibleBlogs.includes(blog.blogs.id) ? 'Read More' : 'Show Less'}
                            </span>
                        </Description>
                        <Horizontal maxwidth='530px' width='95%' align='center'>
                            {/* <UserLikes likesNumber={blog.blogs.totalLikes} dislikesNumber={blog.blogs.totalDislikes} blogId={blog.blogs.id} authorId={blog.blogs.authorId} liked={blog.isLiked} isDisliked={blog.isDisliked} currentUserLiked={currentUserLiked} currentUserDisliked={currentUserDisliked} refetch={refetch} />
                            <BookMarkBtn disabled={userUid == blog.blogs.authorId}>
                                <Bookmark favorite={blog.favorite} blogId={blog.blogs.id} userFavoriteBlogs={currentUserFavBlogs} refetch={refetch} isFetching={isFetching} />
                            </BookMarkBtn> */}
                            <UserChip author={blog.blogs.authorName} authorId={blog.blogs.authorId} date={formatDate(blog.blogs.postedDate)} />
                        </Horizontal>
                    </div>
                )
            })}
            {query=='' && <section>
                <TitleBlog bottom='1.2rem'>No Results found for "{queryInput.split('-').join(' ')}"</TitleBlog>
                </section>}
        </BlogContainer>
    )
}

export default SearchBlog