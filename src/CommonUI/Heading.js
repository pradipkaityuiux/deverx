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
    color: #607274;
`