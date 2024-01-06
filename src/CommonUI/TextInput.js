import styled from "styled-components";

export const TextInput = styled.input`
    display: block;
    padding: 0.8rem 1rem;
    font-size: 1.8rem;
    color: #607274;
    width: 100%;
    border-radius: 0.4rem;
    /* border: none; */
    border: 1px solid #b0b5b5;
    outline: none;
    &:focus{
        outline: 2px solid #3eb7bd;
        outline-offset: 1px;
    }
    &::placeholder{
        color: #B2A59B;
        font-size: 1.4rem;
    }
`