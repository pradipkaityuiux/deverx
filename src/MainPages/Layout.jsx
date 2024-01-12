import React, { useEffect } from 'react'
import Navbar from '../Navigation/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import { Container } from '../CommonUI/Container';

function Layout() {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    useEffect(() => {
        if (!user) navigate('/user-onboarding')
        else navigate(`/blog`)
    }, [user])

    return (
        <>
            <Navbar width='8rem' paddingBlock='0.4rem' />
            <Container topMargin='10rem'>
                <Outlet/>
            </Container>
        </>
    )
}

export default Layout