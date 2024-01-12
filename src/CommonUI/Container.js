import styled from "styled-components";

export const Container = styled.div`
    /* max-width: 580px; */
    width: 90%;
    margin: 0 auto;
    position: relative;
    margin-top: ${props => props.topMargin ? props.topMargin : ''};
    `
export const BlogContainer = styled.div`
    max-width: 580px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    &>div{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
        padding: 1.6rem;
        border-radius: 0.8rem;
    }
`