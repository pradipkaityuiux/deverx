import styled from "styled-components";

export const Horizontal = styled.div`
    width: ${props => props.width ? props.width : ''};
    max-width: ${props=> props.maxwidth ? props.maxwidth : ''};
    display: flex;
    align-items: center;
    justify-content: space-between;
`