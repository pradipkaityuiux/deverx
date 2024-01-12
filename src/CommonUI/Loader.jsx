import React from 'react'
import styled from 'styled-components'

const LoaderContent = styled.div`
  position: relative;
  width: ${props => props.width ? props.width : ''};
  height: ${props => props.height ? props.height : ''};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`
const Spinner = styled.div`
  width: 32px;
  height: 20px;
  background: linear-gradient(#0000 calc(1*100%/6), ${props => props.color ? props.color : '#fff'} 0 calc(3*100%/6),#0000 0),
            linear-gradient(#0000 calc(2*100%/6), ${props => props.color ? props.color : '#fff'} 0 calc(4*100%/6),#0000 0),
            linear-gradient(#0000 calc(3*100%/6), ${props => props.color ? props.color : '#fff'} 0 calc(5*100%/6),#0000 0);
  background-size: 6px 400%;
  background-repeat: no-repeat;
  animation: matrix 0.4s infinite cubic-bezier(0.645, 0.045, 0.355, 1) alternate;
  @keyframes matrix {
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%
    }

    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%
    }
  }
`
function Loader({color, height, width}) {
  return (
    <LoaderContent height={height} width={width}>
        <Spinner color={color}/>
    </LoaderContent>
  )
}

export default Loader