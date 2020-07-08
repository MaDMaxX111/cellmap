import styled from "styled-components";

export const CoordColumn = styled.div.attrs(({top}) => ({
    style: {
        top: `${top}px`,
    }
}))`
  position: absolute;
`

export const CoordRow = styled.div.attrs(({left}) => ({
    style: {
        left: `${left}px`,
    }
}))`
  position: absolute;
  width: 0;
`

export const CoordColumnItem = styled.div.attrs(({size}) => ({
    style: {
        width: `${size}px`,
        height: `${size / 5}px`,
    }
}))`
   box-sizing: border-box;
   float: left;
   position: relative;
   &:after {
     content: attr(data-coord);
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     font-weight: bold;
     color: red;
     font-size: 11px;
     width: 100%;
     text-align: center;
   }
`;

export const CoordRowItem = styled.div.attrs(({size}) => ({
    style: {
        width: `${size / 5}px`,
        height: `${size}px`,
    },
}))`
   box-sizing: border-box;
   float: left;
   position: relative;
   &:after {
     content: attr(data-coord);
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     font-weight: bold;
     color: red;
     font-size: 11px;
     width: 100%;
     text-align: center;
     white-space: nowrap;
   }
`


