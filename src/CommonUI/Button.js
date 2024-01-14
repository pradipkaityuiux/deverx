import styled from "styled-components";

export const PrimaryButton = styled.button`
    padding-block: ${props => props.blockPadding ? props.blockPadding : ''};
    width: ${props => props.width ? props.width : ''};
    font-size: ${props => props.size ? props.size : '1.8rem'};
    margin: ${props => props.margin ? props.margin : ''};
    border-radius: 0.6rem;
    background-color: #0D7377;
    color: #FFF;
    text-align: center;
    position: relative;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(0.6, 0.04, 0.98, 0.335);
    &:hover{
        background-color: #1a8a8f;
    }
    &:active{
        transform: translateY(2px);
    }
    &:disabled{
        opacity: 0.75;
        cursor: not-allowed;
    }
`
export const SecondaryButton = styled.button`
    padding-block: ${props => props.blockPadding ? props.blockPadding : ''};
    width: ${props => props.width ? props.width : ''};
    font-size: ${props => props.size ? props.size : '1.8rem'};
    margin: ${props => props.margin ? props.margin : ''};
    border-radius: 0.6rem;
    background-color: #FFF;
    color: #0D7377;
    border: 1px solid #0D7377;
    text-align: center;
    position: relative;
    outline: none;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(0.6, 0.04, 0.98, 0.335);
`
export const GoogleLogin = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 0.8rem 1.6rem;
    background-color: #FFF;
    border: none;
    outline: none;
    border-radius: 0.6rem;
    /* box-shadow: 4px 4px 8px 1px rgba(0,0,0,0.1); */
    border: 1px solid  #1a8a8f;
    margin-top: 2rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &>p{
        font-size: 1.6rem;
        font-weight: 600;
        color: #0D7377;
    }
    &>img{
        width: 2.4rem;
        height: 2.4rem;
    }
    &:hover{
        background-color: #0D7377;
        &>p{
            color: #FFF;
        }
    }
`
export const BookMarkBtn = styled.button`
    margin-top: 2rem;
    margin-right: auto;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    &:disabled{
        cursor: not-allowed !important;
        opacity: 0.7;
    }
`