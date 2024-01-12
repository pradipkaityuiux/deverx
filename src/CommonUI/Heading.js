import styled from "styled-components";

export const MainHeading = styled.h1`
    font-size: 6.4rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: #607274;
    text-align: center;
    margin-top: 2rem;
`
export const SubHeading = styled.h1`
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: 2px;
    color: #607274;
    text-align: center;
    margin-top: 2rem;
    max-width: 360px;
`
export const Title = styled.h1`
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: ${props => props.bottom ? props.bottom : ''};
    color: #0D7377;
`
export const TitleBlog = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: ${props => props.bottom ? props.bottom : ''};
    color: #0D7377;
`
export const Description = styled.p`
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: ${props => props.bottom ? props.bottom : ''};
    color: #607274;
    line-height: 160%;
    overflow: hidden;
    &>span{
        text-decoration: underline;
        font-size: 1.6rem;
        color: #0D7377;
        cursor: pointer;
        font-weight: 400;
    }
`