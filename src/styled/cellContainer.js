import styled from 'styled-components';

export default styled.div.attrs(({size, selected = false}) => ({
    style: {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: selected && 'grey',
    }
}))`
    border: 1px solid grey;
    box-sizing: border-box;
    float: left;
    position: relative;
    &:after {
      content: attr(data-alphcoord);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 11px;
    }
 `;
