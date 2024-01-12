import React from 'react'
import styled from 'styled-components'
import GoogleLogo from "../assets/Google-logo.png"
import { SecondaryButton } from '../CommonUI/Button'
import { getAuth, signOut } from 'firebase/auth'
import { BiBell } from "react-icons/bi";
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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
        width: 2.4rem;
        height: auto;
    }
`
const MainNav = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
`
const ProfilePic = styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 0.8rem;
    background-color: rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2rem;
    cursor: pointer;
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
function Navbar({ width, paddingBlock }) {
    const navigate = useNavigate();
    async function logoutUser() {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigate('/user-onboarding')

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
                    <img src={GoogleLogo} alt="" />
                    <h1>DeverX</h1>
                </Logo>
                {user ? <MainNav>
                    <SecondaryButton width={width} blockPadding={paddingBlock} onClick={()=>navigate('write-new-blog')}>Write</SecondaryButton>
                    <Bell>
                        <BiBell/>
                        <span></span>
                    </Bell>
                    <ProfilePic title='Logout' onClick={logoutUser}>{user?.displayName.split(' ').slice(0, 2).map(part => part[0].toUpperCase()).join('')}</ProfilePic>
                </MainNav> : <Guest>Welcome Guest</Guest>}
            </NavContaner>
        </Header>
    )
}

export default Navbar