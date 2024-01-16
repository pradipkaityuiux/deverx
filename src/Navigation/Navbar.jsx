import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import GoogleLogo from "../assets/logo.png"
import { PrimaryButton, SecondaryButton } from '../CommonUI/Button'
import { getAuth, signOut } from 'firebase/auth'
import { BiBell } from "react-icons/bi";
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '../CommonUI/TextInput'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig'
import { useDispatch } from 'react-redux'
import { setSearchBlogs } from '../MainPages/AllBlogs/blogSlice'
import { CiSearch } from "react-icons/ci";
import { LuPenSquare } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";

const Header = styled.nav`
    width: 100vw;
    min-height: 60px;
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.14);
    padding: 1rem 0;
    background-color: #FFF;
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    z-index: 10;
`
const NavContaner = styled.div`
    max-width: 1080px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const SearchMobile = styled.div`
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100vw;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-10rem);
    animation: slideIn 0.2s ease-in-out forwards;
    @keyframes slideIn {
        0%{
            transform: translateY(-10rem);
        }
        100%{
            transform: translateY(0rem);
        }
    }
    &>div{
        display: none;
        font-size: 2.4rem;
        color: #0D7377;
        margin-left: 1rem;
        @media screen and (max-width: 600px){
            display: block;
        }
    }
`
const Logo = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
    &>h1{
        font-size: 2.4rem;
        color: #0D7377;
        font-weight: 700;
    }
    &>img{
        width: 3.2rem;
        height: auto;
    }
    &>svg{
        display: none;
        font-size: 2.4rem;
    }
    @media screen and (max-width: 600px){
        &>svg{
            display: inline;
        }
    }
`
const MainNav = styled.div`
    display: flex;
    gap: 1.6rem;
    align-items: center;
    justify-content: end;
    @media screen and (max-width: 600px){
        &>button{
            display: none;
        }
    }
`
const WriteIcon = styled.div`
    padding: 0.4rem 0.6rem;
    border-radius: 0.4rem;
    cursor: pointer;
    display: none;
    &>svg{
        font-size: 2.4rem;
        stroke: #0D7377 !important;
        color: #0D7377;
    }
    @media screen and (max-width: 600px){
        display: inline;
    }
`
const ProfilePic = styled.div`
    width: 3.6rem;
    height: 3.6rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.8rem;
    cursor: pointer;
    overflow: hidden;
    &>img{
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`
const Bell = styled.span`
    position: relative;
    font-size: 2.4rem;
    color: #0D7377;
    cursor: pointer;
    &>span{
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #0D7377;
    }
`
const Guest = styled.p`
    font-size: 2rem;
    color: #0D7377;
    font-weight: 500;
`
const Form = styled.form`
    max-width: 540px;
    position: relative;
    &>svg{
        position: absolute;
        right: 0.6rem;
        top: 0.6rem;
        font-size: 2rem;
        cursor: pointer;
    }
    @media screen and (max-width: 600px){
        display: none;
    }
`
const FormMobile = styled.form`
    max-width: 340px !important;
    position: relative;
    width: 80%;
    display: none;
    &>svg{
        position: absolute;
        right: 0.6rem;
        top: 0.6rem;
        font-size: 2rem;
        cursor: pointer;
    }
    @media screen and (max-width: 600px){
        display: block;
    }
`
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const refInput = useRef();
    const [searchTerm, setSearchTerm] = useState("");
    const search = async () => {
        try {
            const citiesRef = collection(db, "blogs");
            const q = query(citiesRef, where('titleArr', 'array-contains-any', [...searchTerm.split(' ').join(' ').toLowerCase().split(' ')]));
            const querySnapshot = await getDocs(q);
            const foundBlogs = [];
            querySnapshot.forEach((doc) => {
                const searchedBlogsList = doc.data();
                foundBlogs.push({
                    blogs: searchedBlogsList,
                });
            });
            dispatch(setSearchBlogs(foundBlogs))
            navigate(`/search-blog?query=${searchTerm.split(' ').join('-')}`)
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
      const handleSearchButtonClick = (e) => {
        e.preventDefault();
        if(searchTerm=='') return
        search();
      };
    async function logoutUser() {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigate('/')

        } catch (error) {
            toast.success("You are Logging Out")
        }
    }
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        <Header>
            <NavContaner>
                <Logo onClick={()=>navigate('/blog')}>
                    {/* <RiMenu3Fill/> */}
                    <img src={GoogleLogo} alt="" />
                    <h1>DeverX</h1>
                </Logo>
                {user?.emailVerified ? <MainNav>
                <Form onSubmit={handleSearchButtonClick}>
                    <TextInput padd={true} autoComplete='off' width={'unset'} name="location" value={searchTerm} onChange={handleSearchInputChange} className="input" type="text" placeholder="Search a Blog..." />
                    <CiSearch onClick={handleSearchButtonClick}/>
                </Form>
                    <WriteIcon><IoSearch onClick={()=>{
                        setShowSearchBar(true);
                        setSearchTerm("")
                        setTimeout(() => {
                            refInput.current.focus();
                        }, 200);
                    }}/></WriteIcon>
                    <PrimaryButton width='8rem' blockPadding='0.6rem' onClick={()=>navigate('write-new-blog')}>Write</PrimaryButton>
                    <WriteIcon onClick={()=>navigate('write-new-blog')}><LuPenSquare/></WriteIcon>
                    {/* <Bell>
                        <BiBell/>
                        <span></span>
                    </Bell> */}
                    {/* <ProfilePic title='Logout' onClick={logoutUser}>{user?.displayName?.split(' ').slice(0, 2).map(part => part[0].toUpperCase()).join('')}</ProfilePic> */}
                    <ProfilePic title='Logout' onClick={logoutUser}>
                        {user?.emailVerified && user?.photoURL ? 
                            <img src={user.photoURL} alt={user.displayName} /> : 
                            user?.emailVerified && user?.displayName ? 
                            <>{user?.displayName?.split(' ').slice(0, 2).map(part => part[0].toUpperCase()).join('')}</> :
                            <>{ user?.email.substring(0, 1).toUpperCase() }</>    
                        }
                    </ProfilePic>
                </MainNav> : <Guest>Welcome Guest</Guest>}
            </NavContaner>
            {showSearchBar && <SearchMobile>
                <FormMobile onSubmit={handleSearchButtonClick}>
                    <TextInput padd={true} autoComplete='off' width={'unset'} name="location" value={searchTerm} onChange={handleSearchInputChange} className="input" type="text" placeholder="Search a Blog..." ref={refInput}/>
                    <CiSearch onClick={handleSearchButtonClick} />
                </FormMobile>
                <div onClick={()=>setShowSearchBar(false)}><IoCloseSharp /></div>
            </SearchMobile>}
        </Header>
    )
}

export default Navbar