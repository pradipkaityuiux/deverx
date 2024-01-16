import styled from "styled-components";

export const OnbordingLanding = styled.div`
    display: flex;
    justify-content: center;
    gap: 0;
    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`
export const LeftPanel = styled.div`
    background-color: #FFF;
    display: flex;
    flex-shrink: 5;
    position: relative;
    &::before{
        content: "";
        height: 200px;
        width: 0.2px;
        background-color: #d5d5d5;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(-50%, 70%);
        z-index: 2;
    }
    @media screen and (max-width: 900px) {
        &::before{
            display: none;
        }
    }

`
export const RightPanel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 2;
    flex-shrink: 1;
    background-color: #FFF;
    `
export const Image = styled.img`
    width: 100%;
    max-width: 360px;
    height: auto;
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
    max-width: 400px;
    /* background-color: rgba(13, 115, 119, 0.1); */
    padding: 2.4rem;
    border-radius: 0.4rem;
    position: relative;
    @media screen and (max-width: 350px) {
        padding: 2.4rem 0;
    }
`
export const NavigationPanel = styled.nav`
    text-align: center;
    padding: 2.4rem 0;
    font-size: 4rem;
    font-weight: 600;
    color: #0D7377;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.05);
    z-index: 10;
    position: relative;
    margin-bottom: 2.4rem;
`
export const InputContainer = styled.div`
    position: relative;
`