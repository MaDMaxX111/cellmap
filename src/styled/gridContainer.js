import styled from 'styled-components';

export default styled.div.attrs(({width, height, top, left}) => ({
    style: {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 1,
    }
}))`
     z-index: 1;
     position: absolute;
`
