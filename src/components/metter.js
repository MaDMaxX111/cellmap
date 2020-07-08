import React, { useRef, useEffect } from 'react';
import MetterContainer from './../styled/metterContainer';
import useLegacyState from '../hooks/legacyState';
const formatter = new Intl.NumberFormat();

const Metter = ({offset, mapSize, widthParent, heightParent, zoom, onSetMapSize} : {
    offset: [number, number],
    mapSize: [number, number],
    widthParent: number,
    heightParent: number,
    zoom: number,
    onSetMapSize: Function,
}) => {

    const intervalRef = useRef();

    const columnInput : { current: ?HTMLInputElement } = useRef();
    const rowInput : { current: ?HTMLInputElement } = useRef();

    const [state, setState] = useLegacyState({
        totalJSHeapSize: null,
        usedJSHeapSize: null,
    })

    useEffect(() => {

        intervalRef.current = setInterval(() => {
            // $FlowFixMe
            const {totalJSHeapSize, usedJSHeapSize} = performance.memory

            setState({
                totalJSHeapSize, usedJSHeapSize
            })

        }, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [setState]);

    const { totalJSHeapSize, usedJSHeapSize } = state

    const [columns, rows] = mapSize;
    const [offsetX, offsetY] = offset;

    const handleInputSizeChange = () => {
        const { current: columnInputRef } = columnInput
        const { current: rowInputRef } = rowInput
        const { value : columnInputValue } = columnInputRef || {}
        const { value : rowInputValue } = rowInputRef || {}

        if (columnInputValue && rowInputValue) {
            onSetMapSize([columnInputValue, rowInputValue])
        }
    }

    return (
        <MetterContainer>
            <div>totalJSHeapSize: {formatter.format(totalJSHeapSize)}</div>
            <div>usedJSHeapSize: {formatter.format(usedJSHeapSize)}</div>
            <div>{`OffesetX: ${offsetX}`}</div>
            <div>{`OffesetY: ${offsetY}`}</div>
            {/*<div>{`mapSize: [${columns}, ${rows}]`}</div>*/}
            <div>{`mapSize: [`}
                <input onChange={handleInputSizeChange} name={'column'} value={columns} ref={columnInput} />
                {','}
                <input onChange={handleInputSizeChange} nmae={'rows'} value={rows} ref={rowInput} />
                {']'}
            </div>
            <div>{`size: [${widthParent}, ${heightParent}]`}</div>
            <div>{`zoom: ${zoom}`}</div>
        </MetterContainer>
    )
}

Metter.whyDidYouRender = true

export default Metter

