import styled from 'styled-components';

export default styled.div.attrs(({width, height, offsetX, offsetY}) => ({
    style: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
    }
}))`
     position: absolute;
     overflow: hidden;
     background-image: url("../images/map-bg.svg");
     background-position: 0 0;
     background-size: contain;
     background-repeat: repeat;
`







